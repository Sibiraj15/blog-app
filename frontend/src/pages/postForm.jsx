import React, { useState, useEffect } from "react";
import { createPost, updatePost, getPostById } from "../services/postServices";
import { notification, Input, Select, Button, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import 'antd/dist/reset.css';
import { UploadOutlined } from "@ant-design/icons";


const { TextArea } = Input;
const { Option } = Select;

export default function PostForm({ postId }) {
  const [categories, setCategories] = useState([]);
  const loggedInUserEmail = localStorage.getItem("email");
  const navigate = useNavigate();
const API = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    image: ""
  });

  useEffect(() => {
    if (postId) {
      getPostById(postId).then(res => setFormData(res.data));
    }
  }, [postId]);

  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Create FormData object for file upload
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("category", formData.category);
    form.append("author", loggedInUserEmail);

    // Append image if exists
    if (formData.image) {
      form.append("image", formData.image); // this should be the File object from Upload/Input
    }

    if (postId) {
      await updatePost(postId, form); // send FormData
      notification.success({
        message: "Post Updated ✅",
        description: "Your post has been updated successfully!",
        placement: "topRight",
        duration: 2,
      });
    } else {
      await createPost(form); // send FormData
      notification.success({
        message: "Post Created ✅",
        description: "Your post has been created successfully!",
        placement: "topRight",
        duration: 2,
      });
    }

    setTimeout(() => navigate("/home"), 300);
  } catch (err) {
    console.error(err);
    notification.error({
      message: "Error ❌",
      description: "Something went wrong. Please try again.",
      placement: "topRight",
      duration: 3,
    });
  }
};


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundImage: `url('https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1920&auto=format&fit=crop&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px"
      }}
    >
      {/* Overlay for better readability */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 0
      }}></div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "600px",
          padding: "30px",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#343a40" }}>
          {postId ? "Update Post" : "Create New Post"}
        </h2>

        <Input
          size="large"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{ marginBottom: "20px" }}
          required
        />

        <TextArea
          size="large"
          placeholder="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={6}
          style={{ marginBottom: "20px" }}
          required
        />

        <Select
          size="large"
          placeholder="Select Category"
          value={formData.category}
          onChange={handleCategoryChange}
          style={{ marginBottom: "20px", width: "100%" }}
          required
        >
          {categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>
              {cat.name}
            </Option>
          ))}
        </Select>

        <Input
          size="large"
          placeholder="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          style={{ marginBottom: "20px" }}
        />

          <Upload
  name="image"
  listType="picture"
  beforeUpload={(file) => {
    // prevent auto upload
    setFormData({ ...formData, image: file });
    return false; // prevent default upload
  }}
>
  <Button icon={<UploadOutlined />} size="large" style={{ marginBottom: "30px" }}>
    Select Image
  </Button>
        </Upload>

{/* Optional preview */}
{formData.image && (
  <img
    src={URL.createObjectURL(formData.image)}
    alt="preview"
    style={{ maxWidth: "200px", marginBottom: "10px" }}
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
            transition: "0.3s"
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
          onMouseLeave={e => e.currentTarget.style.opacity = 1}
        >
          {postId ? "Update Post" : "Create Post"}
        </Button>
      </form>
    </div>
  );
}
