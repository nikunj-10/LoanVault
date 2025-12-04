## LoanVault | USB-Secured Ornament Loan Management System
![ChatGPT Image Jun 28, 2025, 06_22_57 PM](https://github.com/user-attachments/assets/81963d58-e40d-46b7-aca8-436e3ba5fee1)


A fully offline, USB-authenticated system for managing ornament-based loans. Built with React and Node.js, this project emphasizes data privacy, security through hardware tokens (USB), and smart automation for loan handling.

🧩 Project Highlights
This system is designed to be used in environments where internet connectivity isn’t guaranteed, and data security is critical. It works entirely with local hardware (USB), encrypts all data, and only allows operations if the correct USB device is connected.Perfect! Here’s the updated `README.md` with everything you’ll need to publish a **developer-friendly**, **authentic-looking**, and professional GitHub project — including:

* ✅ Polished intro
* 🖼️ Optional banner placeholder
* 🎞️ GIF demo section
* 📦 Features
* ⚙️ Setup instructions
* 📁 Folder structure
* 🤝 Contribution guidelines
* 🪪 License

---

```markdown
# USB-Secured Ornament Loan Management System


> 🔐 A secure, offline-first system for managing ornament-based loans using USB hardware authentication, AES encryption, and biometric login. Fully built with React, Node.js, and SQLite.

---

![Project Banner – Optional Placeholder](https://via.placeholder.com/1200x400.png?text=USB+Loan+Management+System+%7C+React+%2B+Node+%2B+SQLite)

---

## 🎞️ Demo Preview

> *(Insert demo GIF here showing customer entry, USB detection, and QR slip generation)*  
> Example tools to record: [Loom](https://www.loom.com), [Screenity](https://chrome.google.com/webstore/detail/screenity-screen-recorder/), [OBS Studio](https://obsproject.com)

---

## 🔧 Features Overview

- 🔌 USB authentication using **WebUSB**
- 🔐 AES-encrypted customer data saved directly on USB
- 🧾 Auto-generated printable slips with secure QR codes
- 📊 Dashboard with graphs: city-wise loans, trends, and more
- 👤 Role-based admin access and login restrictions
- 🧠 Smart loan calculation with live gold/silver rates
- 📁 Manual entry for legacy customers
- 📤 Export reports to Excel

---

## ⚙️ Technologies Used

| Layer      | Stack / Tools                            |
|------------|-------------------------------------------|
| Frontend   | React, Axios, WebUSB, Chart.js, WebAuthn |
| Backend    | Node.js, Express, SQLite, crypto-js      |
| QR/Print   | qrcode.react, PrintJS, react-to-print     |
| Reporting  | ExcelJS                                   |
| Security   | AES Encryption, USB Serial Validation     |

---

## 🧪 How It Works

| Condition              | System Behavior                      |
|------------------------|---------------------------------------|
| USB Not Connected      | Block UI, show fake QR values         |
| USB Connected          | Unlock actions, decrypt QR properly   |
| QR Opened Outside App  | Shows fake values (undecryptable)     |

---

## 🧭 Folder Structure

```

📦 usb-loan-management/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── usb-check.js
│   └── utils/
└── frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx

````

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- USB device with `mortgage.sqlite` DB file
- Modern browser (Chrome) for WebUSB + WebAuthn support

### Steps

```bash
# Clone the repo
git clone https://github.com/<your-username>/usb-loan-management.git
cd usb-loan-management

# Start backend
cd backend
npm install
node server.js

# Start frontend
cd ../frontend
npm install
npm run dev
````

Visit: [http://localhost:5173](http://localhost:5173)

---

## ✅ Roadmap / To-Do

* [ ] Mobile/Tablet responsive layout
* [ ] Face verification with webcam
* [ ] USB failover backup mechanism
* [ ] Live sync (optional, using OneDrive/local LAN)

---

## 🤝 Contributing

Contributions are welcome! Here’s how:

1. Fork this repo
2. Create your branch: `git checkout -b new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin new-feature`
5. Create a pull request

---

## 🪪 License

This project is licensed under the **MIT License**.
Feel free to use it, extend it, or build upon it with proper credits.

---

## 👨‍💻 Developed By

**Nikunj Agarwal**
🔗 [LinkedIn](https://www.linkedin.com/in/nikunj-agarwal-326b562a4)
💻 [GitHub](https://github.com/nikunj-10)

---

```


