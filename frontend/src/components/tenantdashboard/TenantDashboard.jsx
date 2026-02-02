import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/TenantDashboard.css";

export default function TenantDashboard() {
  const [pgList, setPgList] = useState([]);
  const [selectedPG, setSelectedPG] = useState(null);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  // ====================== Extract tenant ID from localStorage ======================
  const storedUser = localStorage.getItem("user");
  let tenantId = null;
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      tenantId = user.tenantId || user.id; // adjust according to your backend
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }

  // ====================== Fetch PG list ======================
  useEffect(() => {
    fetch("http://localhost:5032/api/Tenant/allpgs")
      .then(res => res.json())
      .then(data => setPgList(data))
      .catch(err => console.error(err));
  }, []);

  // ====================== Filter PGs by search ======================
  const filteredPGs = pgList.filter(pg =>
    pg.pgName.toLowerCase().includes(search.toLowerCase()) ||
    pg.areaName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tenant-dashboard">

      {/* ================= NAVBAR (UNCHANGED) ================= */}
      <div className="tenant-navbar">
        <div className="tenant-nav-left">🏠 NextHome</div>

        <div className="tenant-nav-center">
          <input
            className="search-box"
            placeholder="Search PG or City"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="tenant-nav-right">
          {/* Redirect to notifications page dynamically */}
          <button
            onClick={() => {
              if (tenantId) navigate(`/notifications/${tenantId}`);
              else alert("Tenant not logged in!");
            }}
          >
            🔔
          </button>
          <button onClick={() => setShowProfile(!showProfile)}>👤</button>
        </div>

        {showProfile && (
          <div className="dropdown profile">
            <p>My Profile</p>
            <p>Bookings</p>
            <p
              className="tenant-logout"
              onClick={() => navigate("/")} // Redirect to logout page
              style={{ cursor: "pointer" }}
            >
              Logout
            </p>
          </div>
        )}
      </div>

      {/* ================= DASHBOARD CONTENT ================= */}
      <div className="dashboard-content">

        {/* PG CARDS */}
        <div className="tenant-card-container">
          {filteredPGs.map(pg => (
            <div
              key={pg.pgId}
              className="pg-card"
              onClick={() => setSelectedPG(pg)}
            >
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                alt={pg.pgName}
              />

              <div className="pg-info">
                <h3>{pg.pgName}</h3>
                <p className="pg-location">📍 {pg.areaName}</p>
                <p className="pg-rent">₹{pg.rent} / month</p>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedPG && (
          <div className="modal-overlay" onClick={() => setSelectedPG(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>

              <div className="modal-header">
                <h2>{selectedPG.pgName}</h2>
              </div>

              <div className="modal-summary">
                <p>📍 {selectedPG.areaName}</p>
                <p>💰 ₹{selectedPG.rent} / month</p>
                <p>🛠 {selectedPG.facility}</p>
              </div>

              <h3 className="room-heading">🏠 Available Rooms</h3>

              {selectedPG.rooms && selectedPG.rooms.length > 0 ? (
                <div className="room-grid">
                  {selectedPG.rooms.map(room => (
                    <div key={room.roomId} className="room-card">
                      <div className="room-top">
                        <span>Room {room.roomNo}</span>
                        <span className="room-type">{room.roomType}</span>
                      </div>
                      <p>👥 Sharing: {room.sharing}</p>
                      <p>🛏 Available Beds: {room.availableBed}</p>
                      <p>🔐 Deposit: ₹{room.securityDeposit}</p>
                      <button className="book-room">Book This Room</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-room">No rooms available</p>
              )}

              <button className="close" onClick={() => setSelectedPG(null)}>
                Close
              </button>
            </div>
          </div>
        )}

      </div> {/* End of dashboard-content */}
    </div>
  );
}
