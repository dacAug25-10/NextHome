import React, { useEffect, useState } from "react";

const PendingOwners = () => {
  const [pendingOwners, setPendingOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8082/api/admin/getowners")
      .then((res) => res.json())
      .then((data) => {
        // ✅ ONLY roleId=2 AND status="Inactive"
        const filtered = data.filter(
          (user) =>
            user.roleId === 2 &&
            user.status &&
            user.status.trim().toLowerCase() === "inactive"
        );

        setPendingOwners(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const handleConfirm = (userId) => {
    fetch(`http://localhost:8082/api/admin/approve-owner/${userId}`, {
      method: "PUT",
    }).then(() => {
      setPendingOwners((prev) =>
        prev.filter((owner) => owner.userId !== userId)
      );
    });
  };

  const handleReject = (userId) => {
    fetch(`http://localhost:8082/api/admin/reject-owner/${userId}`, {
      method: "PUT",
    }).then(() => {
      setPendingOwners((prev) =>
        prev.filter((owner) => owner.userId !== userId)
      );
    });
  };

  if (loading) return <p>Loading pending owners...</p>;

  return (
    <div>
      <h2>Pending Owner Requests</h2>

      {pendingOwners.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingOwners.map((owner) => (
              <tr key={owner.userId}>
                <td>{owner.name}</td>
                <td>{owner.email}</td>
                <td>{owner.phone}</td>
                <td>{owner.createdAt}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleConfirm(owner.userId)}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(owner.userId)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingOwners;
