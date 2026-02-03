import React, { useEffect, useState } from "react";

const TenantList = () => {
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

  if (loading) return <p>Loading tenants...</p>;

  return (
    <div>
      <h2>All Tenants</h2>

      <table className="table table-bordered mt-3">
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
  );
};

export default TenantList;
