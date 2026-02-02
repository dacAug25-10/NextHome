import { useState, useEffect } from "react";
import "../../css/addpg.css";

export default function AddPgForm({ ownerId }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const [form, setForm] = useState({
    pgName: "",
    description: "",
    stateId: "",
    cityId: "",
    areaId: "",
    type: "",
    rent: "",
    facility: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ================= Load States =================
  useEffect(() => {
    fetch("https://localhost:7168/api/Owner/state")
      .then(res => res.json())
      .then(data => setStates(data))
      .catch(err => console.error("States API error:", err));
  }, []);

  // ================= Load Cities =================
  useEffect(() => {
    if (!form.stateId) {
      setCities([]);
      return;
    }

    setCities([]);
    setAreas([]);
    setForm(prev => ({ ...prev, cityId: "", areaId: "" }));

    fetch(`https://localhost:7168/api/Owner/cities?stateId=${form.stateId}`)
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(err => console.error("Cities API error:", err));
  }, [form.stateId]);

  // ================= Load Areas =================
  useEffect(() => {
    if (!form.cityId) {
      setAreas([]);
      return;
    }

    setAreas([]);

    fetch(`https://localhost:7168/api/Owner/areas?cityId=${form.cityId}`)
      .then(res => res.json())
      .then(data => setAreas(data))
      .catch(err => console.error("Areas API error:", err));
  }, [form.cityId]);

  // ================= Handle Change =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]:
        name === "stateId" || name === "cityId" || name === "areaId"
          ? Number(value)
          : value
    }));

    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // ================= Handle Submit =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(form).forEach(key => {
      if (!form[key]) newErrors[key] = "This field is required";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const payload = { ...form, ownerId };

    try {
      const res = await fetch(
        "https://localhost:7168/api/Owner/addpgproperty",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      await res.json();
      alert("PG added successfully!");

      setForm({
        pgName: "",
        description: "",
        stateId: "",
        cityId: "",
        areaId: "",
        type: "",
        rent: "",
        facility: "",
      });

      setCities([]);
      setAreas([]);
    } catch (err) {
      console.error("Add PG API error:", err);
      alert("Error adding PG");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Add PG</h2>

        <form className="register-form" onSubmit={handleSubmit}>

          {/* PG Name */}
          <div className="form-field">
            <input
              name="pgName"
              value={form.pgName}
              onChange={handleChange}
              placeholder=" "
              className={errors.pgName ? "error-input" : ""}
            />
            <label>PG Name</label>
            {errors.pgName && <span className="error-text">{errors.pgName}</span>}
          </div>

          {/* Description */}
          <div className="form-field">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder=" "
              className={errors.description ? "error-input" : ""}
            />
            <label>Description</label>
            {errors.description && (
              <span className="error-text">{errors.description}</span>
            )}
          </div>

          {/* State & City */}
          <div className="form-row">
            <div className="form-field">
              <select
                name="stateId"
                value={form.stateId}
                onChange={handleChange}
                className={errors.stateId ? "error-input" : ""}
              >
                <option value=""> </option>
                {states.map(s => (
                  <option key={s.sid} value={s.sid}>
                    {s.sname}
                  </option>
                ))}
              </select>
              <label>State</label>
              {errors.stateId && <span className="error-text">{errors.stateId}</span>}
            </div>

            <div className="form-field">
              <select
                name="cityId"
                value={form.cityId}
                onChange={handleChange}
                disabled={!cities.length}
                className={errors.cityId ? "error-input" : ""}
              >
                <option value=""> </option>
                {cities.map(c => (
                  <option key={c.cityId} value={c.cityId}>
                    {c.cityName}
                  </option>
                ))}
              </select>
              <label>City</label>
              {errors.cityId && <span className="error-text">{errors.cityId}</span>}
            </div>
          </div>

          {/* Area */}
          <div className="form-field">
            <select
              name="areaId"
              value={form.areaId}
              onChange={handleChange}
              disabled={!areas.length}
              className={errors.areaId ? "error-input" : ""}
            >
              <option value=""> </option>
              {areas.map(a => (
                <option key={a.areaId} value={a.areaId}>
                  {a.areaName}
                </option>
              ))}
            </select>
            <label>Area</label>
            {errors.areaId && <span className="error-text">{errors.areaId}</span>}
          </div>

          {/* Type & Rent */}
          <div className="form-row">
            <div className="form-field">
              <input
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder=" "
                className={errors.type ? "error-input" : ""}
              />
              <label>Type</label>
              {errors.type && <span className="error-text">{errors.type}</span>}
            </div>

            <div className="form-field">
              <input
                type="number"
                name="rent"
                value={form.rent}
                onChange={handleChange}
                placeholder=" "
                className={errors.rent ? "error-input" : ""}
              />
              <label>Rent</label>
              {errors.rent && <span className="error-text">{errors.rent}</span>}
            </div>
          </div>

          {/* Facility */}
          <div className="form-field">
            <input
              name="facility"
              value={form.facility}
              onChange={handleChange}
              placeholder=" "
            />
            <label>Facility</label>
          </div>

          <button className="register-button" disabled={loading}>
            {loading ? "Adding PG..." : "Add PG"}
          </button>
        </form>
      </div>
    </div>
  );
}
