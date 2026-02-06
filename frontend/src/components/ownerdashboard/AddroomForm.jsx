import { useState, useEffect } from "react";
import "../../css/addroom.css";

export default function AddRoomForm({ ownerId }) {
  const [pgs, setPgs] = useState([]);
  const [loadingPgs, setLoadingPgs] = useState(true);

  const [form, setForm] = useState({
    pgId: "",
    roomNo: "",
    roomType: "",
    totalBed: "",
    availableBed: "",
    sharing: "",
    securityDeposit: "",
    status: "Available",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ================= Load PGs for this owner =================
  useEffect(() => {
    fetch(`https://localhost:7168/api/Owner/getpgs?ownerId=${ownerId}`)
      .then(res => res.json())
      .then(data => setPgs(data.filter(pg => pg.ownerId === ownerId)))
      .catch(err => console.error("PGs API error:", err))
      .finally(() => setLoadingPgs(false));
  }, [ownerId]);

  // ================= Handle Change =================
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ["pgId", "totalBed", "availableBed", "sharing", "securityDeposit"].includes(name)
        ? Number(value)
        : value
    }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // ================= Handle Submit =================
  const handleSubmit = async e => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(form).forEach(key => {
      if (form[key] === "" || form[key] === 0) newErrors[key] = "This field is required";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://localhost:7168/api/Owner/addroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add room");
      await res.json();

      alert("Room added successfully!");
      setForm({
        pgId: "",
        roomNo: "",
        roomType: "",
        totalBed: "",
        availableBed: "",
        sharing: "",
        securityDeposit: "",
        status: "Available",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding room. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingPgs) return <p>Loading PGs...</p>;
  if (pgs.length === 0) return <p>No PGs found. Please add a PG first.</p>;

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Add Room</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* PG Select */}
          <div className="form-field">
            <select name="pgId" value={form.pgId} onChange={handleChange}>
              <option value="">Select PG</option>
              {pgs.map(pg => (
                <option key={pg.pgId} value={pg.pgId}>
                  {pg.pgName}
                </option>
              ))}
            </select>
            <label>PG</label>
            {errors.pgId && <span className="error-text">{errors.pgId}</span>}
          </div>

          {/* Room No */}
          <div className="form-field">
            <input
              type="text"
              name="roomNo"
              value={form.roomNo}
              onChange={handleChange}
              placeholder=" "
            />
            <label>Room Number</label>
            {errors.roomNo && <span className="error-text">{errors.roomNo}</span>}
          </div>

          {/* Room Type */}
          <div className="form-field">
            <input
              type="text"
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              placeholder=" "
            />
            <label>Room Type</label>
            {errors.roomType && <span className="error-text">{errors.roomType}</span>}
          </div>

          {/* Total Bed & Available Bed */}
          <div className="form-row">
            <div className="form-field">
              <input
                type="number"
                name="totalBed"
                value={form.totalBed}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Total Bed</label>
              {errors.totalBed && <span className="error-text">{errors.totalBed}</span>}
            </div>

            <div className="form-field">
              <input
                type="number"
                name="availableBed"
                value={form.availableBed}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Available Bed</label>
              {errors.availableBed && <span className="error-text">{errors.availableBed}</span>}
            </div>
          </div>

          {/* Sharing */}
          <div className="form-field">
            <input
              type="number"
              name="sharing"
              value={form.sharing}
              onChange={handleChange}
              placeholder=" "
            />
            <label>Sharing</label>
            {errors.sharing && <span className="error-text">{errors.sharing}</span>}
          </div>

          {/* Security Deposit */}
          <div className="form-field">
            <input
              type="number"
              name="securityDeposit"
              value={form.securityDeposit}
              onChange={handleChange}
              placeholder=" "
            />
            <label>Security Deposit</label>
            {errors.securityDeposit && (
              <span className="error-text">{errors.securityDeposit}</span>
            )}
          </div>

          {/* Status */}
          <div className="form-field">
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
            <label>Status</label>
          </div>

          <button className="register-button" disabled={loading}>
            {loading ? "Adding Room..." : "Add Room"}
          </button>
        </form>
      </div>
    </div>
  );
}
