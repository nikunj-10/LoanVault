import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Welcome to the Loan Management System</h1>
      <button onClick={() => navigate('/login')} style={styles.button}>
        🔐 Login / Signup
      </button>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', marginTop: '100px' },
  button: { padding: '10px 30px', fontSize: '16px', cursor: 'pointer' }
};

export default Home;
