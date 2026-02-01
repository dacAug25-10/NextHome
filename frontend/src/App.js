import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import OwnerDashboard from './components/ownerdashboard/OwnerDashBoard.jsx';
import TenantDashboard from './components/tenantdashboard/TenantDashboard.jsx';
import AdminDashboard from './components/admindashboard/AdminDashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Owner Dashboard */}
        <Route path="/owner/*" element={<OwnerDashboard />} />
           {/* <Route path="complaints" element={<ComplaintsList/>} /> */}

        {/* Tenant Dashboard */}
        <Route path="/tenant" element={<TenantDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
