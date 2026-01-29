import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import OwnerDashboard from './components/ownerdashboard/OwnerDashBoard.jsx';
import AddPgForm from './components/ownerdashboard/AddPg.jsx';

function App() {
  return (
   <BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    {/* OWNER */}
    <Route path="/owner/*" element={<OwnerDashboard />}>
      <Route index element={<OwnerDashboard />} />
      <Route path="add-pg" element={<AddPgForm ownerId={1} />} />
    </Route>

    {/* ADMIN */}
    {/* <Route path="/admin" element={<AdminDashboard />} /> */}

    {/* TENANT */}
    {/* <Route path="/tenant" element={<TenantDashboard />} /> */}
  </Routes>
</BrowserRouter>

  );
}

export default App;
