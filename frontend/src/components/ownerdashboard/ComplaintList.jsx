import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/complaintList.css";

const ComplaintsList = ({ ownerId }) => {
  const [pgMap, setPgMap] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!ownerId) {
        console.warn("❌ No ownerId provided to ComplaintsList");
        setError("No owner ID found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("🟢 Owner ID:", ownerId);

        // Fetch all PGs
        const pgRes = await axios.get("http://localhost:5032/api/Tenant/allpgs");
        console.log("📦 All PGs from API:", pgRes.data);

        const ownerPGs = pgRes.data.filter(pg => Number(pg.ownerId) === Number(ownerId));
        console.log("📌 PGs for this owner:", ownerPGs);

        if (!ownerPGs.length) {
          console.warn("⚠️ No PGs found for this owner");
          setComplaints([]);
          setLoading(false);
          return;
        }

        // Map PG id -> PG name
        const map = {};
        ownerPGs.forEach(pg => (map[pg.pgId] = pg.pgName));
        setPgMap(map);

        // Fetch complaints for each PG
        const complaintsList = [];
        for (const pg of ownerPGs) {
          try {
            const compRes = await axios.get(
              `https://localhost:7168/api/Owner/getcomplaints?pgId=${pg.pgId}`
            );
            if (Array.isArray(compRes.data)) {
              compRes.data.forEach(c => (c.pgId = pg.pgId));
              complaintsList.push(...compRes.data);
            } else {
              console.warn(`⚠️ API returned non-array for PG ${pg.pgName}`, compRes.data);
            }
          } catch (err) {
            console.error(`❌ Error fetching complaints for PG ${pg.pgName}:`, err);
          }
        }

        console.log("✅ All complaints fetched:", complaintsList);
        setComplaints(complaintsList);
      } catch (err) {
        console.error("❌ Unexpected error loading complaints:", err);
        setError("Unexpected error occurred. Check console.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [ownerId]);

  return (
    <div className="complaints-container">
      <h2 className="complaints-header">Complaints</h2>

      {loading && <p>Loading complaints...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && complaints.length === 0 && (
        <p className="no-complaints">No complaints found</p>
      )}

      {!loading && !error && complaints.length > 0 && (
        <div className="complaints-table-wrapper">
          <table className="complaints-table">
            <thead>
              <tr>
                <th>PG Name</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c.complaintId}>
                  <td data-label="PG Name">{pgMap[c.pgId]}</td>
                  <td data-label="Message">{c.message}</td>
                  <td data-label="Date">{new Date(c.complaintAt).toLocaleString()}</td>
                  <td data-label="Status">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
