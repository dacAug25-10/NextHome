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
      tenantId = user.tenantId || user.id;
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

  // ====================== Feedback form state ======================
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // ====================== Booking handler ======================
  const handleBookRoom = (room) => {
    const confirmed = window.confirm(
      `Are you sure you want to book Room ${room.roomNo} in ${selectedPG.pgName}?`
    );
    if (!confirmed) {
      console.log("Booking cancelled by tenant");
      return;
    }

    const bookingData = {
      roomId: room.roomId,
      tenantId,
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), // example 1-month booking
      rentAmount: selectedPG.rent,
      notes: ""
    };

    console.log("Booking Data:", bookingData);

    fetch("http://localhost:5032/api/Tenant/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    })
      .then(res => {
        if (res.ok) {
          alert("Booking request sent successfully!");
        } else {
          alert("Failed to book room.");
        }
      })
      .catch(err => console.error(err));
  };

  // ====================== Feedback handler ======================
  const submitFeedback = () => {
    if (!rating || rating < 1 || rating > 5) {
      alert("Please provide a valid rating between 1 and 5.");
      return;
    }
    if (!comment.trim()) {
      alert("Please provide a comment.");
      return;
    }

    const feedbackData = {
      tenantId,
      pgId: selectedPG.pgId,
      rating,
      comment
    };

    console.log("Submitting Feedback:", feedbackData);

    fetch("http://localhost:5032/api/Tenant/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedbackData)
    })
      .then(res => {
        if (res.ok) {
          alert("Feedback submitted successfully!");
          setRating(0);
          setComment("");
        } else {
          alert("Failed to submit feedback.");
        }
      })
      .catch(err => console.error(err));
  };

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
            <p className="tenant-logout" onClick={() => navigate("/")}>Logout</p>
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
                      <button className="book-room" onClick={() => handleBookRoom(room)}>
                        Book This Room
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-room">No rooms available</p>
              )}

              {/* ================= FEEDBACK FORM ================= */}
              <div className="feedback-form">
                <h3>Leave Feedback ⭐</h3>
                <label>Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
                <label>Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="submit-feedback" onClick={submitFeedback}>
                  Submit Feedback
                </button>
              </div>

              <button className="close" onClick={() => setSelectedPG(null)}>Close</button>
            </div>
          </div>
        )}

      </div> {/* End of dashboard-content */}
    </div>
  );
}
