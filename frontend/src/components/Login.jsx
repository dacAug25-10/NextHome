import React, { useState } from 'react';
import '../css/login.css';


export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate login fields
  const validateLogin = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Run validation first
    if (!validateLogin()) return; // Stop if validation fails

    fetch(
      `http://localhost:5012/api/Nexthome/login?username=${encodeURIComponent(
        formData.username
      )}&password=${encodeURIComponent(formData.password)}`,
      { method: 'POST' }
    )
      .then(async (res) => {
        const text = await res.text();
        console.log('Raw response:', text);

        if (!res.ok) {
          throw new Error(text || 'Login failed');
        }

        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      })
      .then((data) => {
        console.log('Login response:', data);
        alert('Login successful!');
      })
      .catch((err) => {
        console.error('Error logging in:', err);
        alert(err.message);
      });
  };

  return (
   <>
   
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
   </>
  );
}
