import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomerDetails() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error('Error fetching customers', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Customer Entries</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Phone</th>
            <th>Address</th>
            <th>National ID</th>
            <th>Metal</th>
            <th>Ornaments</th>
            <th>Weight</th>
            <th>Metal Rate</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.full_name}</td>
             <td>{c.loan_amount}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>{c.national_id}</td>
             <td>{c.metal}</td>
              <td>{c.ornaments}</td>
              <td>{c.weight}</td>
               <td>{c.metal_rate}</td>

              <td>
                 {c.photo && (
                    <a href={`http://localhost:4000/uploads/${c.photo}`} target="_blank" rel="noopener noreferrer">
                    <img
                        src={`http://localhost:4000/uploads/${c.photo}`}
                        alt="customer"
                        width="100"
                        style={{ cursor: 'pointer' }}
                    />
                    </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
