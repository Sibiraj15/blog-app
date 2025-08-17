import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // your backend URL

export const getAllPosts = () => axios.get(API_URL);
export const getPostById = (id) => axios.get(`${API_URL}/${id}`);
export const createPost = (postData) => axios.post(API_URL, postData);
export const updatePost = (id, postData) => axios.put(`${API_URL}/${id}`, postData);
export const deletePost = (id) => axios.delete(`${API_URL}/${id}`);
