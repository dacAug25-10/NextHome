import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/notifications.css";

export default function Notifications() {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [pgList, setPgList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map status to CSS classes
  const statusClass = (status) => {
    if (!status) return "unknown";
    const s = status.toLowerCase().trim();
    if (s === "confirmed") return "confirmed";
    if (s === "pending") return "pending";
    if (s === "cancelled") return "cancelled";
    return "unknown";
  };

  // Fetch all PGs for mapping roomId -> pgName
  useEffect(() => {
    fetch("http://localhost:5032/api/Tenant/allpgs")
      .then((res) => res.json())
      .then((data) => setPgList(data))
      .catch((err) => console.error("Error fetching PGs:", err));
  }, []);

  // Fetch notifications for tenant
  useEffect(() => {
    if (tenantId) {
      setLoading(true);
      fetch(`http://localhost:5032/api/Tenant/notifications/${tenantId}`)
        .then((res) => res.json())
        .then((data) => setNotifications(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [tenantId]);

  // Helper: get PG Name using roomId
  const getPGName = (notif) => {
    if (!pgList || pgList.length === 0) return "-";
    const pg = pgList.find(
      (p) => p.rooms && p.rooms.some((r) => r.roomId === notif.roomId)
    );
    return pg ? pg.pgName : "-";
  };

  return (
    <div className="notifications-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/tenant")}>
        ← Back to Dashboard
      </button>

      {/* Heading */}
      <h2 className="notif-heading">🔔 Your Notifications</h2>

      {loading && <p className="loading">Loading notifications...</p>}

      {notifications.length === 0 && !loading ? (
        <p className="no-notif">No notifications available</p>
      ) : (
        <div className="notif-container">
          {notifications.map((notif) => (
            <div
              key={notif.bookingId}
              className={`notif-card ${statusClass(notif.bookingStatus)}`}
            >
              <p><b>PG:</b> {getPGName(notif)}</p>
              <p><b>Date:</b> {new Date(notif.bookDate).toLocaleDateString()}</p>
              <p><b>Message:</b> {notif.message || "-"}</p>
              <p>
                <b>Status:</b>{" "}
                {notif.bookingStatus ? notif.bookingStatus.trim() : "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
