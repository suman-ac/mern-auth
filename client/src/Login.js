import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" }); // type: "success" or "danger"

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", data.token);

      // Show success message
      setMessage({ text: "Login successful! Redirecting...", type: "success" });

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
    } catch (err) {
      // Handle errors like wrong email/password
      setMessage({ text: err.response?.data?.message || "Login failed. Check credentials.", type: "danger" });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Login</h3>
        {message.text && (
          <div className={`alert alert-${message.type} text-center`} role="alert">
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/register" className="text-decoration-none">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
}
