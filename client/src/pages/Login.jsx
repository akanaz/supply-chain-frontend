import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/login_logo.png"; // Replace with your asset

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      // ✅ Save login & reload context
      window.location.href = "/"; // Forces full reload so AuthContext re-initializes
    } else {
      setMessage("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="auth-box">
      <img src={logo} alt="Supply Chain" className="auth-logo" />
      <div className="auth-title">Sign In</div>

      <form onSubmit={handleSubmit} className="login-form">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. owner"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
        />

        <button type="submit" className="btn-submit">Login</button>

        {message && <div className="auth-error">{message}</div>}
      </form>
    </div>
  );
}

export default Login;
