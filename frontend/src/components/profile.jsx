import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function ProfileDrawer({ open, onClose }) {
  const [user, setUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    setUser({
      name: localStorage.getItem("name") || "User",
      email: localStorage.getItem("email") || "No Email",
      role: localStorage.getItem("role") || "user"
    });
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <Drawer
      title="My Profile"
      placement="right"
      onClose={onClose}
      open={open}
    >
      {/* Default profile icon */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#ddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
            margin: "auto"
          }}
        >
          <UserOutlined />
        </div>
      </div>

      {/* User info */}
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <Button
        type="primary"
        danger
        onClick={handleLogout}
        style={{ marginTop: "20px", width: "100%" }}
      >
        Logout
      </Button>
    </Drawer>
  );
}
