import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "../../css/TenantDashboard.css";

export default function TenantDashboard() {
  const [pgList, setPgList] = useState([]);
  const [selectedPG, setSelectedPG] = useState(null);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  // NEW: notification count
  const [notificationCount, setNotificationCount] = useState(0);

  const navigate = useNavigate();

  // ====================== Extract tenant ID ======================
  const storedUser = localStorage.getItem("user");
  let tenantId = null;

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      tenantId = user.tenantId || user.id;
    } catch (error) {
      console.error(error);
    }
  }

  // ====================== Fetch PG list ======================
  useEffect(() => {
    fetch("http://localhost:5032/api/Tenant/allpgs")
      .then(res => res.json())
      .then(data => setPgList(data))
      .catch(err => console.error(err));
  }, []);

  // ====================== Fetch notification count ======================
  useEffect(() => {
    if (!tenantId) return;

    fetch(`http://localhost:5032/api/Tenant/notifications/${tenantId}`)
      .then(res => res.json())
      .then(data => setNotificationCount(data.length))
      .catch(err => console.error(err));
  }, [tenantId]);

  // ====================== Filter PGs ======================
  const filteredPGs = pgList.filter(pg =>
    pg.pgName.toLowerCase().includes(search.toLowerCase()) ||
    pg.areaName.toLowerCase().includes(search.toLowerCase())
  );

  // ====================== Feedback ======================
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // ====================== Booking ======================
  const handleBookRoom = (room) => {
    if (!window.confirm(`Book Room ${room.roomNo}?`)) return;

    fetch("http://localhost:5032/api/Tenant/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId: room.roomId,
        tenantId,
        startDate: new Date().toISOString(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        rentAmount: selectedPG.rent,
        notes: ""
      })
    })
      .then(res => res.ok ? alert("Booking request sent!") : alert("Booking failed"))
      .catch(console.error);
  };

  // ====================== Feedback ======================
  const submitFeedback = () => {
    if (!rating || !comment.trim()) {
      alert("Please fill all fields");
      return;
    }

    fetch("http://localhost:5032/api/Tenant/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tenantId,
        pgId: selectedPG.pgId,
        rating,
        comment
      })
    })
      .then(res => res.ok ? alert("Feedback submitted!") : alert("Failed"))
      .catch(console.error);
  };

  return (
    <div className="tenant-dashboard">

      {/* ================= NAVBAR ================= */}
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
          {/* Bell with auto-clear */}
          <button
            style={{ position: "relative" }}
            onClick={() => {
              if (!tenantId) {
                alert("Tenant not logged in!");
                return;
              }

              setNotificationCount(0); // NEW: clear count
              navigate(`/tenant/notifications/${tenantId}`);
            }}
          >
            🔔
            {notificationCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "11px",
                  fontWeight: "800"
                }}
              >
                {notificationCount}
              </span>
            )}
          </button>

          <button onClick={() => setShowProfile(!showProfile)}>👤</button>
        </div>

        {showProfile && (
          <div className="dropdown profile">
            <p>My Profile</p>
            <p>Bookings</p>
            <p className="tenant-logout" onClick={() => navigate("/")}>Logout</p>
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="dashboard-content">
        <div className="tenant-card-container">
          {filteredPGs.map(pg => (
            <div
              key={pg.pgId}
              className="pg-card"
              onClick={() => setSelectedPG(pg)}
            >
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                alt=""
              />
              <div className="pg-info">
                <h3>{pg.pgName}</h3>
                <p className="pg-location">📍 {pg.areaName}</p>
                <p className="pg-rent">₹{pg.rent} / month</p>
              </div>
            </div>
          ))}
        </div>

        {selectedPG && (
          <div className="modal-overlay" onClick={() => setSelectedPG(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h2>{selectedPG.pgName}</h2>

              <h3>🏠 Available Rooms</h3>
              <div className="room-grid">
                {selectedPG.rooms?.map(room => (
                  <div key={room.roomId} className="room-card">
                    <p>Room {room.roomNo}</p>
                    <p>Sharing: {room.sharing}</p>
                    <p>Available Beds: {room.availableBed}</p>
                    <p>Deposit: ₹{room.securityDeposit}</p>
                    <button onClick={() => handleBookRoom(room)}>
                      Book This Room
                    </button>
                  </div>
                ))}
              </div>

              <div className="feedback-form">
                <h3>Leave Feedback ⭐</h3>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={e => setRating(+e.target.value)}
                />
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <button onClick={submitFeedback}>Submit Feedback</button>
              </div>

              <button className="close" onClick={() => setSelectedPG(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <Outlet />
    </div>
  );
}
