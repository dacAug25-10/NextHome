import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/pglist.css"; // create this new CSS file

const PgListPage = () => {
  const navigate = useNavigate();
  const [pgList, setPgList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8082/api/admin/getAllpg")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch PG list");
        return res.json();
      })
      .then((data) => {
        setPgList(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load PG data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Loading PGs...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="pg-list-wrapper">
      <div className="pg-list-header">
        <button className="btn-back" onClick={() => navigate("/admin")}>
          &larr; Back
        </button>
        <h2>All PG Properties</h2>
      </div>

      {pgList.length === 0 ? (
        <p className="no-data">No PGs found</p>
      ) : (
        <div className="table-container">
          <table className="pg-table">
            <thead>
              <tr>
                <th>PG Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>Rent</th>
                <th>Facilities</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pgList.map((pg, index) => (
                <tr key={index}>
                  <td>{pg.pgName}</td>
                  <td>{pg.description}</td>
                  <td className="text-capitalize">{pg.type}</td>
                  <td>₹ {pg.rent}</td>
                  <td>{pg.facility}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        pg.status === "Available" ? "available" : "unavailable"
                      }`}
                    >
                      {pg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PgListPage;
