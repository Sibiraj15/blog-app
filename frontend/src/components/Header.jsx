import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileDrawer from "./profile";

export default function Header() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // store token on login/signup
    if (token) {
      fetch("http://localhost:8000/api/auth/get-role", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setRole(data.role);
          setName(data.name);
        })
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/home">
            Thought Journal..🪶
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/allpost">
                  Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

               <li className="nav-item">
                <Link className="nav-link" to="/mypost">
                  My Posts📝
                </Link>
              </li>

              {/* Profile Button inside li */}
              <li className="nav-item ms-3">
                <button
                  className="btn btn-primary"
                  style={{
                    background: "linear-gradient(90deg, #ff6a00 0%, #ee0979 100%)",
                    border: "none",
                    fontWeight: 500
                  }}
                  onClick={() => setDrawerOpen(true)}
                >
                  {role === "admin" ? "👑 Admin" : `👤 ${name || "User"}`}
                </button>
              </li>
            </ul>
          </div>

          {/* Profile drawer outside of ul */}
          <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </div>
      </nav>
    </header>
  );
}
