import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/posts";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container my-4">
      <h2>All Posts</h2>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="col-md-6 mb-4">
              <Post post={post} />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}
