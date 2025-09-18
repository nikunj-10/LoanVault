import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerForm from './components/Customer/CustomerForm';
import CustomerDetails from './components/Customer/CustomerDetails';
import Dashboard from './components/Customer/Dashboard';
import Visualization from './components/Customer/Visualization';
import Home from './components/Customer/Home';
import Login from './components/Customer/Login';
import Signup from './components/Customer/Signup';
import { Navigate } from 'react-router-dom';
import Release from './components/Customer/Release';
import ReleaseDetails from './components/Customer/ReleaseDetails';
import CustomerTabs from './components/Customer/CustomerTabs';
function App() {
   const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />        <Route path="/customer" element={<CustomerForm />} />
        <Route path="/customerTabs" element={<CustomerTabs />} />
        <Route path="/visualization" element={<Visualization />} />
        <Route path="/release" element={<Release />} />
        <Route path="/release/:id" element={<ReleaseDetails />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
