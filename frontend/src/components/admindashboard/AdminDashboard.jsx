import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      <nav className="admin-navbar">
        <div className="admin-nav-left">
          <h2 className="company-name">NextHome</h2>
        </div>

        <div className="admin-nav-right">
          <button className="icon-btn" title="Notifications">
            🔔
          </button>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="admin-content">
        <h1>Admin Dashboard</h1>

        <div className="admin-card-grid">
          <div className="admin-card">
            <h3>Total Owners</h3>
            <p>128</p>
          </div>

          <div className="admin-card">
            <h3>Total PGs</h3>
            <p>342</p>
          </div>

          <div className="admin-card">
            <h3>Total Tenants</h3>
            <p>1,254</p>
          </div>

          <div className="admin-card">
            <h3>Pending Complaints</h3>
            <p>18</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
