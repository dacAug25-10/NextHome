import React from "react";
import "../../css/OwnerDashBoard.css"

const OwnerDashboard = () => {
  return (
    <div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <h2 className="logo">NextHome</h2>
        </div>

        <div className="nav-center">
          <span className="greeting">Hi, Raj</span>
        </div>

        <div className="nav-right">
          <button>Add PG</button>
          <button>Requests</button>
          <button>Complaints</button>
          <button>Ratings</button>
          <button className="logout">Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
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

    </div>
  );
};

export default OwnerDashboard;
