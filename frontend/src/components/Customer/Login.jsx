import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });


// useEffect(() => {
//   if (localStorage.getItem('loggedIn') === 'true') {
//     navigate('/dashboard');
//   }
// }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/login', form);
      localStorage.setItem('loggedIn', 'true');
      alert('Welcome, ' + res.data.name);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: '10px' }}>
        <Link to="/">Forgot Password?</Link><br />
        <Link to="/signup">Don't have an account? Sign up</Link>
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', marginTop: '80px' }
};

export default Login;
