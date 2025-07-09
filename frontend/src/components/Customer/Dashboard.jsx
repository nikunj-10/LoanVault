import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Loan Management Dashboard</h1>
      <div style={styles.buttonContainer}>
        <button onClick={() => navigate('/customer')} style={styles.button}>
          📝 Customer Form
        </button>
        <button onClick={() => navigate('/customerTabs')} style={styles.button}>
          📋 Customer Details
        </button>
        <button onClick={() => navigate('/visualization')} style={styles.button}>
          📋 View Customer Insights
        </button>
        <button onClick={() => navigate('/release')} style={styles.button}>
          📋 Release Items
        </button>
      </div>
      <button onClick={() => {
  localStorage.removeItem('loggedIn');
  window.location.href = '/login';
}}>Logout</button>
      
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '50px',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
  },
  button: {
    fontSize: '1rem',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    transition: '0.2s ease',
  },
};

export default Dashboard;
