import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/posts";
export default function MyPosts({ userEmail }) {
  const [posts, setPosts] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(`${API}/api/posts/my-posts/${userEmail}`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyPosts();
  }, [userEmail]);

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`${API}/api/posts/${postId}`, {
          data: { email: userEmail },
        });
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Error deleting post");
      }
    }
  };

  return (
    <div className="container my-4">
      <h2>My Posts</h2>
      {posts.length === 0 ? (
        <p>You have not created any posts yet.</p>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post._id} className="col-md-6 mb-4">
              <Post post={post} userEmail={userEmail} onDelete={handleDeletePost} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
