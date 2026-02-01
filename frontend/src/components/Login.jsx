import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    fetch(
      `http://localhost:5012/api/Nexthome/login?username=${encodeURIComponent(
        formData.username
      )}&password=${encodeURIComponent(formData.password)}`,
      { method: 'POST' }
    )
      .then(res => res.json())
      .then((data) => {
  console.log('Login response:', data);

  const role = data.role?.toUpperCase(); // normalize role

  // save only required info
          localStorage.setItem(
            'user',
            JSON.stringify({
               id: data.userId,
              username: data.username || formData.username,
               name: data.name,   
              role: role
            })
          );

          // ROLE BASED REDIRECT
          if (role === 'ADMIN') {
            navigate('/admin');
          } 
          else if (role === 'OWNER') {
            navigate('/owner');
          } 
          else if (role === 'TENANT') {
            navigate('/tenant');
          } 
          else {
            alert('Unknown role');
          }
        })

      .catch((err) => {
        console.error('Error logging in:', err);
        alert('Invalid username or password');
      });
  };

  return (
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
  );
}
