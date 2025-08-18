import axios from "axios";

const API = import.meta.env.VITE_API_URL; // backend base URL

// Post-related requests
export const getAllPosts = () => axios.get(`${API}/api/posts`);
export const getPostById = (id) => axios.get(`${API}/api/posts/${id}`);
export const createPost = (postData) => 
  axios.post(`${API}/api/posts`, postData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const deletePost = (id) => axios.delete(`${API}/api/posts/${id}`);
