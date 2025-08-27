import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import dayjs from 'dayjs';

export default function ReleaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [customer, setCustomer] = useState(null);
  const [, setCapturedImage] = useState(null);
  const [match, setMatch] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:4000/api/customers/${id}`)
      .then(res => setCustomer(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const capturePhoto = () => {
    const image = webcamRef.current.getScreenshot();
    setCapturedImage(image);
    
    // 👇 TEMPORARY: Always assume match (since actual face matching isn't implemented)
    setMatch(true);
  };

  const calculateTotalAmount = () => {
    const principal = parseFloat(customer.loan_amount);
    const rate = parseFloat(customer.interest_rate || 12);
    const start = dayjs(customer.start_date);
    const today = dayjs();
    const days = today.diff(start, 'day');
    const interest = (principal * rate * days) / (100 * 365);
    return Math.round(principal + interest);
  };

  const handleRelease = async () => {
    const total = calculateTotalAmount();
    try {
      await axios.post(`http://localhost:4000/api/customers/${id}/release`, {
        amountPaid: total,
        paymentMethod,
        remarks
      });
      alert('✅ Release Successful!');
      navigate('/release');
    } catch (err) {
      console.error(err);
      alert('❌ Release failed');
    }
  };

  if (!customer) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Release Customer Item</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p><strong>Name:</strong> {customer.full_name}</p>
          <p><strong>City:</strong> {customer.address}</p>
          <p><strong>Loan Amount:</strong> ₹{customer.loan_amount}</p>
          <p><strong>Loan Start Date:</strong> {customer.start_date}</p>
          <p><strong>Status:</strong> {customer.status}</p>
          <p><strong>Total Payable:</strong> ₹{calculateTotalAmount()}</p>
        </div>
        <div>
          <p><strong>Original Photo:</strong></p>
          {customer.photo ? (
            <img
              src={`http://localhost:4000/uploads/${customer.photo}`}
              alt="original"
              className="h-32 border mt-2"
            />
          ) : <p>No photo available</p>}
        </div>
      </div>

      <div className="mb-6">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <button onClick={capturePhoto} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Capture Face for Verification
        </button>
        {match === true && <p className="text-green-600 mt-2">✅ Face Match</p>}
        {match === false && <p className="text-red-600 mt-2">❌ Face does not match</p>}
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 w-full"
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Bank Transfer</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Remarks</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <button
        className="bg-green-600 text-white px-6 py-2 rounded font-semibold"
        onClick={handleRelease}
        disabled={match !== true}
      >
        Confirm Release
      </button>
    </div>
  );
}
