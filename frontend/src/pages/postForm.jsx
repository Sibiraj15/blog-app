import React, { useState, useEffect } from "react";
import { createPost } from "../services/postServices";
import { Input, Select, Button, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

export default function PostForm() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const loggedInUserEmail = localStorage.getItem("email");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Fetch categories
  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("content", formData.content);
      form.append("category", formData.category);
      form.append("author", loggedInUserEmail);
      if (formData.image) form.append("image", formData.image);

      await createPost(form); // send FormData to backend

      // Redirect to home after successful post
      navigate("/home");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "#f2f2f2",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create New Post</h2>

        <Input
          size="large"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{ marginBottom: "15px" }}
          required
        />

        <TextArea
          size="large"
          placeholder="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={6}
          style={{ marginBottom: "15px" }}
          required
        />

        <Select
          size="large"
          placeholder="Select Category"
          value={formData.category}
          onChange={handleCategoryChange}
          style={{ marginBottom: "15px", width: "100%" }}
          required
        >
          {categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>
              {cat.name}
            </Option>
          ))}
        </Select>

        <Upload
          name="image"
          listType="picture"
          beforeUpload={(file) => {
            setFormData({ ...formData, image: file });
            return false; // prevent default upload
          }}
        >
          <Button icon={<UploadOutlined />} size="large" style={{ marginBottom: "15px" }}>
            Select Image
          </Button>
        </Upload>

        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="preview"
            style={{ maxWidth: "200px", marginBottom: "15px" }}
          />
        )}

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          block
          style={{
            fontWeight: "600",
            borderRadius: "50px",
            background: "linear-gradient(90deg, #a0522d, #5c4033)",
            border: "none",
          }}
        >
          Create Post
        </Button>
      </form>
    </div>
  );
}
