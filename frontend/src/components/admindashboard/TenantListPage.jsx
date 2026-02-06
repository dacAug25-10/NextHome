import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/tenantlist.css"; // new CSS file

const TenantList = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  useEffect(() => {
    fetch("http://localhost:8082/api/admin/gettenants")
      .then((res) => res.json())
      .then((data) => {
        const formattedTenants = data.map((tenant) => ({
          name: tenant.name,
          email: tenant.email,
          phone: tenant.phone,
          createdAt: formatDate(tenant.createdAt),
        }));

        setTenants(formattedTenants);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tenants:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Loading tenants...</p>;
  if (tenants.length === 0) return <p className="no-data">No tenants found</p>;

  return (
    <div className="tenant-list-wrapper">
      <div className="tenant-list-header">
        <button className="btn-back" onClick={() => navigate("/admin")}>
          &larr; Back
        </button>
        <h2>All Tenants</h2>
      </div>

      <div className="table-container">
        <table className="tenant-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Register Date</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, index) => (
              <tr key={index}>
                <td>{tenant.name}</td>
                <td>{tenant.email}</td>
                <td>{tenant.phone}</td>
                <td>{tenant.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantList;
