import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ownerlist.css";

const OwnerList = () => {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeStatus = (status) => {
    if (status.toLowerCase() === "active") return "Active";
    return "Inactive";
  };

  useEffect(() => {
    fetch("http://localhost:8082/api/admin/getowners")
      .then((res) => res.json())
      .then((data) => {
        const filteredOwners = data
          .filter((owner) => owner.status !== null)
          .map((owner) => ({
            name: owner.name,
            email: owner.email,
            phone: owner.phone,
            status: normalizeStatus(owner.status),
          }));

        setOwners(filteredOwners);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching owners:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Loading owners...</p>;

  return (
    <div className="owner-list-wrapper">
      <div className="owner-list-header">
        <button className="btn-back" onClick={() => navigate("/admin")}>
          &larr; Back
        </button>
        <h2>All Owners</h2>
      </div>

      {owners.length === 0 ? (
        <p className="no-data">No owners available</p>
      ) : (
        <div className="table-container">
          <table className="owner-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner, index) => (
                <tr key={index}>
                  <td>{owner.name}</td>
                  <td>{owner.email}</td>
                  <td>{owner.phone}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        owner.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {owner.status}
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

export default OwnerList;
