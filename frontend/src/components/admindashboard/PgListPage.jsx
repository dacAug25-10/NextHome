import React, { useEffect, useState } from "react";
import "../../css/AdminDashboard.css";

const PgListPage = () => {
  const [pgList, setPgList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8082/api/admin/getAllpg")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch PG list");
        }
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

  if (loading) return <p>Loading PGs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-list-page">
      <h2>All PG Properties</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
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
            {pgList.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No PGs found
                </td>
              </tr>
            ) : (
              pgList.map((pg, index) => (
                <tr key={index}>
                  <td>{pg.pgName}</td>
                  <td>{pg.description}</td>
                  <td className="text-capitalize">{pg.type}</td>
                  <td>₹ {pg.rent}</td>
                  <td>{pg.facility}</td>
                  <td>
                    <span
                      className={
                        pg.status === "Available"
                          ? "badge bg-success"
                          : "badge bg-danger"
                      }
                    >
                      {pg.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PgListPage;
