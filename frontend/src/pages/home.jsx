import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
   const navigate = useNavigate();

  const handleClick = () => {
    const isLoggedIn = localStorage.getItem("token"); // Or however you store login state
    if (isLoggedIn) {
      
      navigate("/home");
    } else {
      navigate("/login");
    }
  };  

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <a className="navbar-brand fw-bold fs-4" href=""   style={{
                  background: "linear-gradient(90deg, #000000, #4f4f4f, #8f8e8eff )",
               WebkitBackgroundClip: "text",
               WebkitTextFillColor: "transparent",
          }}>
          Thought Journal..🪶
        </a>
        <div className="ms-auto">
          <Link
            to="/login"
            className="btn btn-primary"
            style={{
              background: "linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)",
              border: "none",
              fontWeight: "500",
            }}
          >
            Login
          </Link>

           <a
            href="/register"
            className="btn btn-secondary mx-3 "
            
          >
            Sign Up
          </a>

        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center text-center px-3">
        <div>
         <h1
            className="display-4 fw-bold mb-3"
            style={{
                  background: "linear-gradient(90deg, #8f8e8eff, #4f4f4f, #000000)",
               WebkitBackgroundClip: "text",
               WebkitTextFillColor: "transparent",
          }}
          >
                Welcome to MyBlog
          </h1>

          <p className="lead text-muted mb-4" style={{ fontSize: "1.2rem" }}>
            Share your thoughts, read inspiring stories, and connect with
            writers around the world.
          </p>
           <button
      onClick={handleClick}
      className="btn btn-lg text-white"
      style={{
        background: "linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)",
        border: "none",
        borderRadius: "30px",
        padding: "10px 25px",
        fontWeight: "500",
      }}
    >
      Get Started →
    </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center py-3 border-top">
        <small className="text-muted">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </small>
      </footer>
    </div>
  );
}
