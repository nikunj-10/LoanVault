import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CustomerTabs() {
  const [activeTab, setActiveTab] = useState('active');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async (tab) => {
    setLoading(true);
    try {
      const endpoint =
        tab === 'active'
          ? '/api/customers/active'
          : '/api/customers/released';

      console.log("🔄 Fetching from:", endpoint); // ✅ Debug
      const res = await axios.get(endpoint);
      const data = res.data;

      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        console.warn("Expected array, got:", data);
        setCustomers([]);
      }
    } catch (err) {
      console.error('❌ Error fetching customers:', err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(activeTab);
  }, [activeTab]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active Customers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'released' ? 'bg-green-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('released')}
        >
          Released Customers
        </button>
      </div>

      {/* Customer List */}
      {loading ? (
        <p>Loading...</p>
      ) : customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="grid gap-4">
          {customers.map((c) => (
            <div key={c.id} className="p-4 border rounded shadow">
              <p><strong>Name:</strong> {c.full_name}</p>
              <p><strong>Phone:</strong> {c.phone}</p>
              <p><strong>Address:</strong> {c.address}</p>
              <p><strong>Status:</strong> {c.status}</p>
              {c.photo && (
                <img
                  src={`http://localhost:4000/uploads/${c.photo}`}
                  alt="Customer"
                  className="h-24 mt-2 rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
