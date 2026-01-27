import React, { useState, useEffect } from 'react';
import "../css/register.css";


function Register() {
  const [formData, setFormData] = useState({
    id: '',
    roleId: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    createdAt: ''
  });

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({}); 

  useEffect(() => {
    fetch('http://localhost:5012/api/Nexthome/roles')
      .then(res => res.json())
      .then(data => {
        const mappedRoles = data.map(role => ({
          id: role.roleId,
          name: role.roleName
        }));
        setRoles(mappedRoles);
      })
      .catch(err => console.error('Error fetching roles:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
     if (!formData.phone) {
    newErrors.phone = "Phone is required";
  } else if (!/^\d{10}$/.test(formData.phone)) {
    newErrors.phone = "Phone must be exactly 10 digits";
  }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.roleId) newErrors.roleId = "Role is required";
      if (!formData.createdAt) {
    newErrors.createdAt = "Created date is required";
  } else if (new Date(formData.createdAt) > new Date("2015-12-31")) {
    newErrors.createdAt = "Created date must be in 2015 or earlier";
  }


    setErrors(newErrors);

  
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return; 

    const payload = { ...formData, roleId: Number(formData.roleId) };

    fetch('http://localhost:5012/api/Nexthome/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.text())
    .then(data => {
      console.log('Data added successfully:', data); 

      setFormData({
        id: '', roleId: '', name: '', email: '', password: '', phone: '', gender: '', createdAt: ''
      });
      setErrors({});
    })
    .catch(err => console.error('Error registering user:', err));
  };

  return (
   <>
   
    <div className="register-wrapper">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">

          
         <span className="error-text">{errors.name}</span>
                    <input type="text"  name="name" placeholder="Name" value={formData.name} onChange={handleChange}
                      className={errors.name ? "error-input" : ""}
                    />

                    <span className="error-text">{errors.email}</span>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                      className={errors.email ? "error-input" : ""}
                    />

                    <span className="error-text">{errors.password}</span>
                    <input type="password" name="password" placeholder="Password"  value={formData.password}  onChange={handleChange}
                      className={errors.password ? "error-input" : ""}
                    />

                    <span className="error-text">{errors.phone}</span>
                    <input  type="tel"  name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange}
                      className={errors.phone ? "error-input" : ""}
                    />

                    <span className="error-text">{errors.gender}</span>
                    <select name="gender"  value={formData.gender} onChange={handleChange}
                      className={errors.gender ? "error-input" : ""}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>

                    <span className="error-text">{errors.roleId}</span>
                    <select name="roleId" value={formData.roleId} onChange={handleChange}
                      className={errors.roleId ? "error-input" : ""}>
                      <option value="">Select Role</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>

                    <span className="error-text">{errors.createdAt}</span>
                    <input type="date" name="createdAt"  value={formData.createdAt}
                      onChange={handleChange}
                      className={errors.createdAt ? "error-input" : ""}
                    />


          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
   </>
  );
}

export default Register;
