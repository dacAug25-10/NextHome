import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "../../css/OwnerDashBoard.css";
import AddPgForm from "./AddPg";

const OwnerDashboard = ({ ownerId }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  return (

    
      <div className="dashboard-container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-left">
            <h2 className="logo">NextHome</h2>
          </div>

          <div className="nav-center">
           Hi, {user?.name || 'Owner'}
          </div>

          <div className="nav-right">
            <Link to="add-pg"><button>Add PG</button></Link>
            <Link to="/requests"><button>Requests</button></Link>
            <Link to="/complaints"><button>Complaints</button></Link>
            <Link to="/ratings"><button>Ratings</button></Link>
            <button className="logout" onClick={handleLogout}>
            Logout
          </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="content">
          <Routes>
            {/* Add PG Route */}
            <Route path="/add-pg" element={<AddPgForm ownerId={ownerId} />} />

            {/* Default Dashboard Home */}
            <Route path="/" element={
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
            } />
          </Routes>
        </div>
      </div>
  );
};

export default OwnerDashboard;
