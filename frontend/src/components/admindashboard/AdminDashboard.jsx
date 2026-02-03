import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "../../css/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalOwners: 0,
    totalPg: 0,
    totalTenants: 0,
    pendingRequests: 0,
  });

  const [showNotification, setShowNotification] = useState(false);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  // Fetch dashboard data
  useEffect(() => {
    fetch("http://localhost:8082/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="admin-dashboard">
      {/* ===== NAVBAR ===== */}
      <nav className="admin-navbar">
        <div className="admin-nav-left">
          <h2 className="company-name">NextHome</h2>
        </div>

        <div className="admin-nav-right">
          {/* 🔔 Bell Icon */}
          <div className="notification-wrapper">
            <button
              className="icon-btn notification-btn"
              onClick={() => setShowNotification(!showNotification)}
            >
              🔔
              {dashboardData.pendingRequests > 0 && (
                <span className="notification-badge">
                  {dashboardData.pendingRequests}
                </span>
              )}
            </button>

            {/* 🔽 Notification Dropdown */}
            {showNotification && (
              <div className="notification-dropdown">
                {dashboardData.pendingRequests > 0 ? (
                  <>
                    <p>
                      You have{" "}
                      <strong>{dashboardData.pendingRequests}</strong>{" "}
                      owner request(s)
                    </p>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setShowNotification(false);
                        navigate("/admin/pending-owners");
                      }}
                    >
                      View Request
                    </button>
                  </>
                ) : (
                  <p>No new notifications</p>
                )}
              </div>
            )}
          </div>

          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main className="admin-content">
        <h1>Admin Dashboard</h1>

        {/* ===== DASHBOARD CARDS ===== */}
        <div className="admin-card-grid">
          <div className="admin-card" onClick={() => navigate("/admin/owners")}>
            <h3>Total Owners</h3>
            <p>{dashboardData.totalOwners}</p>
          </div>

          <div className="admin-card" onClick={() => navigate("/admin/pgs")}>
            <h3>Total PGs</h3>
            <p>{dashboardData.totalPg}</p>
          </div>

          <div className="admin-card" onClick={() => navigate("/admin/tenants")}>
            <h3>Total Tenants</h3>
            <p>{dashboardData.totalTenants}</p>
          </div>

          <div
            className="admin-card"
            onClick={() => navigate("/admin/pending-owners")}
          >
            <h3>Pending Requests</h3>
            <p>{dashboardData.pendingRequests}</p>
          </div>
        </div>

        {/* Child routes */}
        <div className="admin-child-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
