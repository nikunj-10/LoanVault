const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // save in uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg'); // always save as .jpg
  }
});

const upload = multer({ storage: storage });
// Ensure uploads folder exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// DB in local folder (no USB)
const DB_FILE = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(DB_FILE);
db.serialize(() => {
    
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
       full_name TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        national_id TEXT,
        metal TEXT,
        ornaments TEXT,
        weight REAL,
        metal_rate REAL,
        loan_amount REAL,
        photo TEXT,
        status TEXT DEFAULT 'active',
        interest_rate REAL DEFAULT 12,
        start_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  );
`);

});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

// Create customer (with photo)
app.post('/api/customers', upload.single('photo'), (req, res) => {
 const {
  full_name,
  email,
  phone,
  address,
  national_id,
  metal,
  ornaments,
  weight,
  metal_rate,
  loan_amount,
  interest_rate = 12, // default interest rate
  start_date = new Date().toISOString().split('T')[0]  // default to current date
} = req.body; 

const photo = req.file ? req.file.filename : null;

  db.run(
  `INSERT INTO customers (
    full_name, email, phone, address, national_id,
    metal, ornaments, weight, metal_rate, loan_amount,
    interest_rate, start_date, photo, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    full_name, email, phone, address, national_id,
    metal, ornaments, weight, metal_rate, loan_amount,
    interest_rate, start_date, photo, 'active'
  ],
  function (err) {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  }
);

});
// app.get('/', (req, res) => {
//   console.log("✅ Root route hit");
// });


// Generate PDF for customer
app.post('/api/customers/:id/release', (req, res) => {
  const { amountPaid, paymentMethod, remarks } = req.body;
  const id = req.params.id;

  db.run(`UPDATE customers SET status = 'released' WHERE id = ?`, [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    // You can log paymentMethod, amountPaid if needed
    res.json({ success: true });
  });
});

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashed],
      function (err) {
        if (err) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        res.json({ message: 'Signup successful' });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'Server error during signup' });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', name: user.name });
  });
});

app.get('/api/customers/released', (req, res) => {
  db.all("SELECT * FROM customers WHERE status = 'released'", [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});



app.get('/api/customers/:id/pdf', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM customers WHERE id = ?`, [id], (err, row) => {
    if (err || !row) return res.sendStatus(404);

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=customer_${id}.pdf`);
    doc.pipe(res);

    doc.fontSize(18).text('Customer Slip', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12);
    doc.text(`METAL: ${row.metal}`);
    doc.text(`ORNAMENTS: ${row.ornaments}`);
    doc.text(`WEIGHT: ${row.weight} gm`);
    doc.text(`METAL RATE: ₹${row.metal_rate}/gm`);
    doc.text(`LOAN AMOUNT: ₹${row.loan_amount}`);

    Object.entries(row).forEach(([k, v]) => {
      if (k === 'id' || k === 'photo') return;
      doc.text(`${k.replace('_', ' ').toUpperCase()}: ${v}`);
    });

    // If photo exists, add to PDF
    if (row.photo && fs.existsSync(path.join(__dirname, 'uploads', row.photo))) {
      doc.addPage();
      doc.image(path.join(__dirname, 'uploads', row.photo), {
        fit: [400, 400],
        align: 'center',
        valign: 'center',
      });
    }

    doc.end();
  });
});
// Get all customers who have not been released
app.get('/api/customers/active', (req, res) => {
  db.all("SELECT * FROM customers WHERE status != 'released'", [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});


app.get('/api/customers', (req, res) => {
  db.all('SELECT * FROM customers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows); // sends all customer rows back to frontend
  });
});
app.get('/api/metalrate', (req, res) => {
  res.json({
    Gold: 6700,
    Silver: 85
  });
});


app.get('/api/customers/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM customers WHERE id = ?`, [id], (err, row) => {
    if (err || !row) return res.sendStatus(404);
    res.json(row);
  });
});

app.get('/api/customers/stats', (req, res) => {
  console.log("📊 /api/customers/stats route hit");

  db.all(`SELECT address AS city, COUNT(*) AS count FROM customers GROUP BY address`, [], (err, rows) => {
    if (err) {
      console.error('❌ DB Error:', err.message);
      return res.status(500).json({ error: err.message });
    }

    const cityStats = {};
    rows.forEach(row => {
      cityStats[row.city] = row.count;
    });

    console.log("📦 Sending cityStats:", cityStats);
    res.json({ cityStats }); // ✅ correct response
  });
});



app.get('/test', (req, res) => {
  res.send("✅ Test route working");
});
app.use(express.json());



const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
