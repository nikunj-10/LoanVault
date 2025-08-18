import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Release() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/customers/active') // 🔄 Full API path
      .then(res => {
        console.log("API response from /api/customers/active:", res.data);
        if (Array.isArray(res.data)) {
          setCustomers(res.data);
        } else {
          console.warn("Expected array but got:", res.data);
          setCustomers([]);
        }
      })
      .catch(err => {
        console.error("Error fetching customers:", err);
        setCustomers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleClick = (id) => {
    console.log('handleClick called with id:', id);
    navigate(`/release/${id}`);
  };

  if (loading) {
    return <div className="p-4">Loading customers...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Active Pledged Customers</h2>
      {customers.length === 0 ? (
        <p className="text-gray-500">No active customers found.</p>
      ) : (
        <div className="grid gap-4">
          {customers.map((c) => (
            <div
              key={c.id}
              className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => handleClick(c.id)}
            >
              <p><strong>Name:</strong> {c.full_name}</p>
              <p><strong>Loan ID:</strong> {c.id}</p>
              <p><strong>City:</strong> {c.address}</p>
              {c.photo ? (
                <img
                  src={`http://localhost:4000/uploads/${c.photo}`}
                  alt="customer"
                  className="h-24 mt-2 rounded"
                />
              ) : (
                <p className="text-sm text-gray-400 mt-2">No photo available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
