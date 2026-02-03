import React, { useEffect, useState } from "react";

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Normalize status
  const normalizeStatus = (status) => {
    if (status.toLowerCase() === "active") return "Active";
    return "Inactive";
  };

  useEffect(() => {
    fetch("http://localhost:8082/api/admin/getowners")
      .then((res) => res.json())
      .then((data) => {
        // ❌ REMOVE null status owners
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

  if (loading) return <p>Loading owners...</p>;

  return (
    <div>
      <h2>All Owners</h2>

      {owners.length === 0 ? (
        <p>No owners available</p>
      ) : (
        <table className="table table-bordered mt-3">
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
                    className={`badge ${
                      owner.status === "Active"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {owner.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnerList;
