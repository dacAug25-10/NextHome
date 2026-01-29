import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "../../css/OwnerDashBoard.css";
import AddPgForm from "./AddPg";

const OwnerDashboard = ({ ownerId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ SAFE localStorage access
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.warn("localStorage blocked");
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
    } catch (e) {
      console.warn("Cannot clear localStorage");
    }
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <h2 className="logo">NextHome</h2>
        </div>

        <div className="nav-center">
          Hi, {user?.name || "Owner"}
        </div>

        <div className="nav-right">
          {/* ✅ relative path */}
          <Link to="add-pg"><button>Add PG</button></Link>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        <Routes>
          {/* ✅ Add PG */}
          <Route path="add-pg" element={<AddPgForm ownerId={ownerId} />} />

          {/* ✅ Default dashboard */}
          <Route
            index
            element={
              <div>
                <h2>Tenants Currently Living in Your PG</h2>

                <table className="tenant-table">
                  <thead>
                    <tr>
                      <th>Tenant Name</th>
                      <th>Room No</th>
                      <th>Contact</th>
                      <th>Move-in Date</th>
                      <th>Rent Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Rahul Sharma</td>
                      <td>101</td>
                      <td>9876543210</td>
                      <td>12-Jan-2025</td>
                      <td className="paid">Paid</td>
                    </tr>

                    <tr>
                      <td>Anjali Verma</td>
                      <td>203</td>
                      <td>9123456780</td>
                      <td>05-Feb-2025</td>
                      <td className="pending">Pending</td>
                    </tr>

                    <tr>
                      <td>Amit Singh</td>
                      <td>305</td>
                      <td>9988776655</td>
                      <td>20-Dec-2024</td>
                      <td className="paid">Paid</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default OwnerDashboard;
