import { Link } from "react-router-dom";

export default function Post({ post, userEmail, onDelete }) {
  const API = import.meta.env.VITE_API_URL;
  return (
    <div
      className="card shadow-lg border-0 mx-auto"
      style={{
        width: "70%",
        height: "70vh",
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      <img
        src={post.image?.startsWith("http") ? post.image : `${API}${post.image}`}   
     alt={post.title}
        className="card-img-top"
        style={{
          height: "45%",
          objectFit: "cover",
        }}
      />
      <div className="card-body d-flex flex-column">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-text flex-grow-1">
          {post.content?.substr(0, 150)}...
        </p>
        <div className="d-flex gap-2 mt-2">
          <Link
            to={`/post/${post._id}`}
            className="btn btn-primary"
          >
            Read More
          </Link>

          {/* Show Delete button only if logged-in user is the author */}
          {post.author === userEmail && (
            <button
              className="btn btn-danger"
              onClick={() => onDelete(post._id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
