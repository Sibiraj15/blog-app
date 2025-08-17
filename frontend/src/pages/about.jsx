import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <Link
          className="navbar-brand fw-bold fs-4"
          to="/home"
          style={{
            background: "linear-gradient(90deg, #000000, #4f4f4f, #8f8e8eff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Thought Journal..🪶
        </Link>
        <div className="ms-auto">
          <Link
            to="/home"
            className="btn btn-outline-secondary mx-2"
          >
            Home
          </Link>
         
        </div>
      </nav>

      {/* About Section */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center text-center px-4">
        <div style={{ maxWidth: "800px" }}>
          <h1
            className="display-5 fw-bold mb-4"
            style={{
              background: "linear-gradient(90deg, #8f8e8eff, #4f4f4f, #000000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About Thought Journal
          </h1>
          <p className="lead text-muted mb-4" style={{ fontSize: "1.1rem" }}>
            Thought Journal is a platform where you can share your stories, 
            insights, and creative ideas with the world. Whether you’re 
            an experienced writer or just starting, our goal is to give you 
            the space to express yourself freely.
          </p>
          <p className="text-muted">
            We believe that every voice matters. By reading and sharing 
            each other's thoughts, we can inspire, connect, and grow together.
            Here, you’re not just writing a blog post — you’re contributing 
            to a community of thinkers and storytellers.
          </p>
          <Link
            to="/allpost"
            className="btn btn-lg text-white mt-3"
            style={{
              background: "linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)",
              border: "none",
              borderRadius: "30px",
              padding: "10px 25px",
              fontWeight: "500",
            }}
          >
            Start Reading →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center py-3 border-top">
        <small className="text-muted">
          © {new Date().getFullYear()} Thought Journal. All rights reserved.
        </small>
      </footer>
    </div>
  );
}
