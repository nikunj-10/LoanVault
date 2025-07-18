import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useRef,useEffect } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';


export default function CustomerForm() {
  const { register, handleSubmit, reset } = useForm();
  const [pdfUrl, setPdfUrl] = useState(null);
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();
  const [selectedMetal, setSelectedMetal] = useState('');
    const [metalRate, setMetalRate] = useState('');
    const [weight, setWeight] = useState('');
    const [selectedOrnaments, setSelectedOrnaments] = useState([]);
    const [calculatedAmount, setCalculatedAmount] = useState('');

    useEffect(() => {
  if (selectedMetal) {
    axios.get('http://localhost:4000/api/metalrate')
      .then(res => {
        setMetalRate(res.data[selectedMetal]);
      })
      .catch(() => alert("Failed to fetch metal rate"));
  }
}, [selectedMetal]);
  
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('full_name', data.full_name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('address', data.address);
      formData.append('national_id', data.national_id);
      formData.append('metal', selectedMetal);
      formData.append('ornaments', selectedOrnaments.join(','));
      formData.append('weight', weight);
      formData.append('metal_rate', metalRate);
      formData.append('loan_amount', calculatedAmount);
     formData.append("interest_rate", data.interest_rate);
     formData.append('start_date', new Date().toISOString().split('T')[0]);
 // ✅ Add this
        

      if (capturedImage) {
        const resImg = await fetch(capturedImage);
        const blob = await resImg.blob();
        formData.append('photo', blob, 'photo.jpg');
      }

      const res = await axios.post('http://localhost:4000/api/customers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { id } = res.data;
      const url = `http://localhost:4000/api/customers/${id}/pdf`;
      setPdfUrl(url);
      alert('Customer saved! Click Download to get PDF.');
      reset();
      setCapturedImage(null);
       setSelectedMetal('');
      setSelectedOrnaments([]);
      setWeight('');
      setMetalRate('');
      setCalculatedAmount('');
    } catch (e) {
      alert('Error saving customer: ' + e.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>New Customer Entry</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
 <input {...register('full_name')} placeholder="Full Name" required /><br />
        <input {...register('email', {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        })} placeholder="Email"  /><br />
        <input {...register('phone', {
          required: true,
          pattern: /^[0-9]{10}$/
        })} placeholder="Phone" required /><br />
        <input {...register('address')} placeholder="Address" required /><br />
        <input {...register('national_id')} placeholder="National ID" required /><br />

        <label>Select Metal:</label><br />
        <select value={selectedMetal} onChange={e => setSelectedMetal(e.target.value)} required>
          <option value="">--Select Metal--</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
        </select><br />

        <label>Select Ornaments:</label><br />
        <select multiple value={selectedOrnaments} onChange={(e) => {
          const opts = Array.from(e.target.selectedOptions, o => o.value);
          setSelectedOrnaments(opts);
        }}>
          {selectedMetal === 'Gold' && (
            <>
              <option value="Ladies Ring">Ladies Ring</option>
              <option value="Gents Ring">Gents Ring</option>
              <option value="Kandhoni">Kandhoni</option>
            </>
          )}
          {selectedMetal === 'Silver' && (
            <>
              <option value="Payal">Payal</option>
              <option value="Kandhoni">Kandhoni</option>
            </>
          )}
        </select><br />

        <label>Weight (grams):</label><br />
        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} required /><br />
          <label>Interest Rate (% per year):</label><br />
            <input
            type="number"
            step="0.1"
            defaultValue="12"
            {...register("interest_rate", { required: true })}
            /><br />

        <label>Metal Rate (₹/gram):</label><br />
        <input type="number" value={metalRate} readOnly /><br />

        <button type="button" onClick={() => {
          const w = parseFloat(weight);
          const rate = parseFloat(metalRate);
          if (isNaN(w) || isNaN(rate)) {
  alert("Enter valid weight and select metal rate.");
  return;
}

          const calc = w * 0.6 * 0.6 * rate;
          setCalculatedAmount(calc.toFixed(2));
        }}>Calculate Loan Amount</button><br />

        {calculatedAmount && <p>💰 Loan Amount: ₹{calculatedAmount}</p>}

        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={240} /><br />
        <button type="button" onClick={capturePhoto}>Capture Photo</button><br />
        {capturedImage && <img src={capturedImage} alt="Captured" width={320} />}<br />

        <button type="submit">Save & Create PDF</button>
      </form>

      {pdfUrl && (
        <a href={pdfUrl} target="_blank" rel="noreferrer">
          <button>Download Slip PDF</button>
        </a>
      )}
      <button onClick={() => navigate('/customerTabs')}>View All Customers</button>

    </div>
  );
}
