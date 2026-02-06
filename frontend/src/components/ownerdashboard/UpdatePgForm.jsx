import React, { useState, useEffect } from "react";
import "../../css/addpg.css"; // Reuse your CSS
import "../../css/updateform.css"

export default function UpdatePgTable({ ownerId }) {
  const [pgList, setPgList] = useState([]);
  const [selectedPg, setSelectedPg] = useState(null); // PG to update
  const [form, setForm] = useState({
    pgName: "",
    description: "",
    type: "",
    rent: "",
    facility: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ================= Load Owner's PGs =================
  useEffect(() => {
    const loadPGs = async () => {
      try {
        const res = await fetch(`https://localhost:7168/api/Owner/getpgs`);
        const data = await res.json();
        const ownerPGs = data.filter(pg => Number(pg.ownerId) === Number(ownerId));
        setPgList(ownerPGs);
      } catch (err) {
        console.error("Error fetching owner's PGs:", err);
      }
    };
    if (ownerId) loadPGs();
  }, [ownerId]);

  // ================= Handle Update Button =================
  const openUpdateForm = (pg) => {
    setSelectedPg(pg);
    setForm({
      pgName: pg.pgName || "",
      description: pg.description || "",
      type: pg.type || "",
      rent: pg.rent || "",
      facility: pg.facility || "",
      status: pg.status || "Available",
    });
  };

  const closeUpdateForm = () => {
    setSelectedPg(null);
    setForm({
      pgName: "",
      description: "",
      type: "",
      rent: "",
      facility: "",
      status: "",
    });
    setErrors({});
  };

  // ================= Handle Input Change =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "rent" ? Number(value) : value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // ================= Handle Submit =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    ["pgName", "description", "type", "rent", "facility", "status"].forEach(key => {
      if (!form[key] && form[key] !== 0) newErrors[key] = "This field is required";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form, id: selectedPg.pgId };
      const res = await fetch(`https://localhost:7168/api/Owner/updatepg?id=${selectedPg.pgId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Update failed");
      alert("PG updated successfully!");
      closeUpdateForm();
      // Refresh table
      const refreshed = await fetch(`https://localhost:7168/api/Owner/getpgs`);
      const data = await refreshed.json();
      setPgList(data.filter(pg => Number(pg.ownerId) === Number(ownerId)));
    } catch (err) {
      console.error("Update PG error:", err);
      alert("Error updating PG");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      {/* ================= PG Table ================= */}
      <table className={`pg-table ${selectedPg ? "blurred" : ""}`}>
        <thead>
          <tr>
            <th>PG Name</th>
            <th>Description</th>
            {/* <th>Type</th> */}
            <th>Rent</th>
            <th>Facility</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pgList.map(pg => (
            <tr key={pg.pgId}>
              <td>{pg.pgName}</td>
              <td>{pg.description}</td>
              {/* <td>{pg.type}</td> */}
              <td>{pg.rent}</td>
              <td>{pg.facility}</td>
              <td>{pg.status}</td>
              <td>
                <button onClick={() => openUpdateForm(pg)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= Update Form Modal ================= */}
      {selectedPg && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Update PG</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <input name="pgName" value={form.pgName} onChange={handleChange} />
                <label>PG Name</label>
                {errors.pgName && <span className="error-text">{errors.pgName}</span>}
              </div>
              <div className="form-field">
                <textarea name="description" value={form.description} onChange={handleChange} />
                <label>Description</label>
                {errors.description && <span className="error-text">{errors.description}</span>}
              </div>
              <div className="form-row">
                <div className="form-field">
                  <input name="type" value={form.type} onChange={handleChange} />
                  <label>Type</label>
                  {errors.type && <span className="error-text">{errors.type}</span>}
                </div>
                <div className="form-field">
                  <input name="rent" type="number" value={form.rent} onChange={handleChange} />
                  <label>Rent</label>
                  {errors.rent && <span className="error-text">{errors.rent}</span>}
                </div>
              </div>
              <div className="form-field">
                <input name="facility" value={form.facility} onChange={handleChange} />
                <label>Facility</label>
              </div>
              <div className="form-field">
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
                <label>Status</label>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="register-button" disabled={loading}>
                  {loading ? "Updating..." : "Update PG"}
                </button>
                <button type="button" onClick={closeUpdateForm} className="cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
