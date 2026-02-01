import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/feedback.css"; // Reuse same CSS for simplicity

const FeedbackList = ({ ownerId }) => {
  const [pgMap, setPgMap] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!ownerId) {
        console.warn("No ownerId provided to FeedbackList");
        setError("No owner ID found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("Owner ID:", ownerId);

        // 1️⃣ Fetch all PGs
        const pgRes = await axios.get("http://localhost:5032/api/Tenant/allpgs");
        console.log("All PGs from API:", pgRes.data);

        // Filter PGs belonging to this owner
        const ownerPGs = pgRes.data.filter(pg => Number(pg.ownerId) === Number(ownerId));
        console.log("Gs for this owner:", ownerPGs);

        if (!ownerPGs.length) {
          console.warn("No PGs found for this owner");
          setFeedbacks([]);
          setLoading(false);
          return;
        }

        // Map PG id -> PG name for display
        const map = {};
        ownerPGs.forEach(pg => (map[pg.pgId] = pg.pgName));
        setPgMap(map);

        // Fetch feedback for each PG
        const feedbackList = [];
        for (const pg of ownerPGs) {
          try {
            const fbRes = await axios.get(
              `https://localhost:7168/api/Owner/getfeedback?pgId=${pg.pgId}`
            );
            console.log(`📋 Feedback for PG ${pg.pgName}:`, fbRes.data);

            if (Array.isArray(fbRes.data)) {
              fbRes.data.forEach(f => (f.pgId = pg.pgId)); // attach PG id
              feedbackList.push(...fbRes.data);
            } else {
              console.warn(`API returned non-array for PG ${pg.pgName}`, fbRes.data);
            }
          } catch (err) {
            console.error(`Error fetching feedback for PG ${pg.pgName}:`, err);
          }
        }

        console.log("All feedback fetched:", feedbackList);
        setFeedbacks(feedbackList);
      } catch (err) {
        console.error("Unexpected error loading feedback:", err);
        setError("Unexpected error occurred. Check console.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [ownerId]);

  return (
    <div className="complaints-container">
      <h2 className="complaints-header">Feedback</h2>

      {loading && <p>Loading feedback...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && feedbacks.length === 0 && (
        <p className="no-complaints">No feedback found</p>
      )}

      {!loading && !error && feedbacks.length > 0 && (
        <div className="complaints-list">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>PG Name</th>
                <th>Tenant ID</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(f => (
                <tr key={f.feedbackId}>
                  <td>{pgMap[f.pgId]}</td>
                  <td>{f.tenantId}</td>
                  <td>{f.rating} / 5</td>
                  <td>{f.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
