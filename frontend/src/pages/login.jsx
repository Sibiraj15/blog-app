import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const clientId = "693196848199-f51d1htfra7bpe1itnm6namk0vr71g33.apps.googleusercontent.com"; // Replace with your Google Client ID

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate(); // if not already defined
const API = import.meta.env.VITE_API_URL;

 const handleLogin = (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please enter both email and password");
    return;
  }

  // ✅ Call backend login API
  axios.post(`${API}/api/auth/login`, { email, password })
    .then(res => {
      // You can save JWT token if needed
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);
      navigate("/home"); // Redirect after login
    })
    .catch(err => {
      setError(err.response?.data?.message || "Login failed");
    });
};

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Credential:", credentialResponse);
    alert("Google login successful!");
    useNavigate("/home");
    // Send credentialResponse.credential to backend for verification
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
    alert("Google login failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ background: "#f8f9fa" }}
      >
        <div className="card shadow-lg p-4" style={{ width: "350px", borderRadius: "15px" }}>
          <h3 className="text-center mb-3">Welcome Back</h3>
          <p className="text-center text-muted mb-4">Login to MyBlog Admin</p>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <button type="submit" className="btn btn-dark w-100 mb-3" >Login</button>
          </form>

          <div className="text-center mb-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

           <div className="text-center">
            <small className="text-muted">Don't have an account? <a href="/register">SignUp</a></small>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;
