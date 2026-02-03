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
import Notifications from './components/tenantdashboard/Notification.jsx';
import OwnerList from './components/admindashboard/OwnerListPage.jsx';
import TenantList from './components/admindashboard/TenantListPage.jsx';
import PendingOwners from './components/admindashboard/PendingOwnerpage.jsx';
import PgList from './components/admindashboard/PgListPage.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Owner Dashboard */}
        <Route path="/owner/*" element={<OwnerDashboard />} />

        {/* Tenant Dashboard */}
        <Route path="/tenant/*" element={<TenantDashboard />} />
        <Route path="/tenant/notifications/:tenantId" element={<Notifications />} />

        {/* ✅ ADMIN ROUTES (THIS IS THE FIX) */}
        <Route path="/admin/*" element={<AdminDashboard />}>
          <Route path="owners" element={<OwnerList />} />
          <Route path="tenants" element={<TenantList />} />
          <Route path="pgs" element={<PgList />} />
          <Route path="pending-owners" element={<PendingOwners />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
