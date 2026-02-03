import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/notifications.css";

export default function Notifications() {
  const { tenantId } = useParams();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [pgList, setPgList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Payment modal state
  const [payBooking, setPayBooking] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");

  // Map status to CSS classes
  const statusClass = (status) => {
    if (!status) return "unknown";
    const s = status.toLowerCase().trim();
    if (s === "confirmed") return "confirmed";
    if (s === "pending") return "pending";
    if (s === "cancelled") return "cancelled";
    return "unknown";
  };

  // Fetch PGs
  useEffect(() => {
    fetch("http://localhost:5032/api/Tenant/allpgs")
      .then(res => res.json())
      .then(data => setPgList(data))
      .catch(err => console.error("Error fetching PGs:", err));
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (tenantId) {
      setLoading(true);
      fetch(`http://localhost:5032/api/Tenant/notifications/${tenantId}`)
        .then(res => res.json())
        .then(data => setNotifications(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [tenantId]);

  const getPGName = (notif) => {
    if (!pgList || pgList.length === 0) return "-";
    const pg = pgList.find(p =>
      p.rooms && p.rooms.some(r => r.roomId === notif.roomId)
    );
    return pg ? pg.pgName : "-";
  };

  // Handle payment submission
  const submitPayment = () => {
    if (!paymentAmount || paymentAmount <= 0) {
      alert("Enter a valid amount");
      return;
    }
    if (!paymentMode.trim()) {
      alert("Select a payment mode");
      return;
    }

    const payload = {
      bookingId: payBooking.bookingId,
      amount: paymentAmount,
      paymentMode
    };

    console.log("Pay Deposit Payload:", payload);

    fetch("http://localhost:5032/api/Tenant/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (res.ok) {
          alert("Payment successful!");
          setPayBooking(null);
        } else {
          alert("Payment failed!");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="notifications-page">
      <button className="back-button" onClick={() => navigate("/tenant")}>
        ← Back to Dashboard
      </button>

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
              <p><b>Status:</b> {notif.bookingStatus ? notif.bookingStatus.trim() : "Unknown"}</p>

              {notif.bookingStatus && notif.bookingStatus.toLowerCase() === "confirmed" && (
                <button
                  className="pay-deposit-btn"
                  onClick={() => {
                    setPayBooking(notif);
                    setPaymentAmount(0);
                    setPaymentMode("");
                  }}
                >
                  Pay Deposit
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      {payBooking && (
        <div className="modal-overlay" onClick={() => setPayBooking(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3>Pay Deposit for {getPGName(payBooking)}</h3>

            <label>Amount</label>
            <input
              type="number"
              value={paymentAmount}
              onChange={e => setPaymentAmount(Number(e.target.value))}
            />

            <label>Payment Mode</label>
            <select
              value={paymentMode}
              onChange={e => setPaymentMode(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>

            <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
              <button onClick={submitPayment} className="submit-feedback">
                Pay Now
              </button>
              <button onClick={() => setPayBooking(null)} className="close">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
