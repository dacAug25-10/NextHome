// src/components/ownerdashboard/OwnerDashBoard.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "../../css/OwnerDashBoard.css";
import AddPgForm from "./AddPg";
import ComplaintsList from "./ComplaintList";
import FeedbackList from "./FeedbackList";
import UpdatePgForm from "./UpdatePgForm";
import AddRoomForm from "./AddroomForm";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [pendingBookings, setPendingBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  // Fetch pending bookings for this owner
  useEffect(() => {
    if (user?.id) {
      setLoadingBookings(true);
      fetch(`https://localhost:7168/api/Owner/bookings/pending/${user.id}`)
        .then(res => res.json())
        .then(data => {
          console.log("Pending bookings API response:", data);
          setPendingBookings(Array.isArray(data) ? data : []);
        })
        .catch(err => console.error("Error fetching pending bookings:", err))
        .finally(() => setLoadingBookings(false));
    }
  }, [user]);

  // Update booking status
  const updateBookingStatus = (bookingId, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this booking?`)) return;

    const payload = { NewStatus: status };
    console.log("Updating booking:", bookingId, payload);

    fetch(`https://localhost:7168/api/Owner/bookings/${bookingId}/update-status?ownerId=${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Update response:", data);
        // Remove booking from pending list
        setPendingBookings(prev => prev.filter(b => b.bookingId !== bookingId));
      })
      .catch(err => console.error("Error updating booking:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loadingUser) return <p>Loading user information...</p>;
  if (!user) return <p>No user found. Please log in again.</p>;

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="owner-navbar">
        <div className="owner-nav-left">
          <h2 className="owner-logo">NextHome</h2>
        </div>

        <div className="owner-nav-center">
          Welcome to NextHome Mr. {user.name || "Owner"}
        </div>

        <div className="owner-nav-right">
          <Link to="/owner/add-pg"><button>Add PG</button></Link>
           <Link to="/owner/add-room"><button>Add Room</button></Link>
          <Link to="/owner/update-pg"><button>Update PG</button></Link>
          <Link to="/owner/complaints"><button>Complaints</button></Link>
          <Link to="/owner/feedback"><button>Feedback</button></Link>
          <button className="owner-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="owner-content">
        {user?.id ? (
          <Routes>
            <Route path="add-pg" element={<AddPgForm ownerId={user.id} />} />
            <Route path="add-room" element={<AddRoomForm ownerId={user.id} />} />
            <Route path="update-pg" element={<UpdatePgForm ownerId={user.id} />} />
            <Route path="complaints" element={<ComplaintsList ownerId={user.id} />} />
            <Route path="feedback" element={<FeedbackList ownerId={user.id} />} />

            {/* Default Dashboard: Pending Booking Requests */}
            <Route
              index
              element={
                <div>
                  <h2>Pending Booking Requests</h2>

                  {loadingBookings && <p>Loading requests...</p>}

                  {pendingBookings.length === 0 && !loadingBookings ? (
                    <p>No pending booking requests</p>
                  ) : (
                    <table className="tenant-table">
                      <thead>
                        <tr>
                          <th>Tenant Name</th>
                          <th>PG Name</th>
                          <th>Room No</th>
                          <th>Booking Date</th>
                          <th>Rent Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingBookings.map(b => (
                          <tr key={b.bookingId}>
                            <td>{b.tenantName}</td>
                            <td>{b.pgName}</td>
                            <td>{b.roomNo}</td>
                            <td>{new Date(b.bookDate).toLocaleDateString()}</td>
                            <td>₹{b.rentAmount || 0}</td>
                            <td>
                              <button
                                onClick={() => updateBookingStatus(b.bookingId, "Approved")}
                                style={{ marginRight: "8px" }}
                              >
                                ✅ Confirm
                              </button>
                              <button
                                onClick={() => updateBookingStatus(b.bookingId, "Rejected")}
                              >
                                ❌ Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              }
            />
          </Routes>
        ) : (
          <p>Error: Owner ID missing. Cannot load components.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
