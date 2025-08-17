import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const clientId = "693196848199-f51d1htfra7bpe1itnm6namk0vr71g33.apps.googleusercontent.com"; // your Google Client ID

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSignup = async(e) => {
    e.preventDefault();
    setError("");
    // setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // ✅ Send data to backend signup API
   try {
      const res = await axios.post(`${API}/api/auth/signup`, {
        name,
        email,
        password
      });

      // ✅ Redirect to login, no alert
      navigate("/login");
    } catch (err) {
        console.log("eeeeeeeeeeeeee",err);
        
      // Only set error if backend returns error
      setError(err.response?.data?.message || "Signup failed");
    }
  };


  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Credential:", credentialResponse);
    alert("Google signup/login successful!");
    // send credentialResponse.credential to backend to create/login user
  };

  const handleGoogleError = () => {
    console.log("Google signup/login failed");
    alert("Google signup/login failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#f8f9fa" }}>
        <div className="card shadow-lg p-4" style={{ width: "350px", borderRadius: "15px" }}>
          <h3 className="text-center mb-3">Create Account</h3>
          
          <form onSubmit={handleSignup}>
         <div className="mb-3">
              <label>Name</label>
              <input type="name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            {error && <div className="alert alert-danger text-center">{error}</div>}
            {success && <div className="alert alert-success text-center">{success}</div>}

            <button type="submit" className="btn btn-dark w-100 mb-3" onClick={handleSignup}>Sign Up</button>
          </form>

          <div className="text-center mb-3">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
          </div>

          <div className="text-center">
            <small className="text-muted">Already have an account? <a href="/login">Login</a></small>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignupForm;
