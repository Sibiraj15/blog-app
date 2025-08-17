import { useEffect, useState } from "react";
import Post from "../components/posts";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";


export default function PostList() {
  const API = import.meta.env.VITE_API_URL;
   const [posts, setPosts] = useState([]);
   const [categories, setCategories] = useState([]);

   const fetchPosts = async () => {
		const response = await axios.get(`${API}/api/posts`)
		setPosts(response.data);
   }
	const fetchCategories = async () => {
		const response = await axios.get(`${API}/api/categories`)
		setCategories(response.data);
	
   }

   useEffect(()=>{
	fetchPosts();
	fetchCategories();
   } ,[]);


    return (
        <div>

	<main>
		<div class="container mt-4">
			<div class="row">


			<div className="col-lg-8 p-0" style={{ height: "100vh" }}>
  <h1 className="mb-4 text-center">Discover</h1>

 {posts.length > 0 ? (
  <Slider
    dots={true}
    infinite={true}
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
    autoplay={true}
    autoplaySpeed={2000}
    arrows={true}
  >
    {posts.slice(0, 5).map((post) => (   // ✅ take only first 5 posts
      <div
        key={post._id}
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8f9fa",
          overflow: "hidden",
        }}
      >
        <Post post={post} />
      </div>
    ))}
  </Slider>
) : (
  <h4>No posts available</h4>
)}

				</div>


				<div class="col-lg-4">
			
			<div
	 className="card mb-4 shadow-sm border-0"
  style={{
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    textAlign: "center"
	 }}
	>
  {/* Link styled as Button */}
  <Link
    to="/postForm"
    style={{
      display: "inline-block",
      borderRadius: "50px",
      padding: "12px 35px",
      fontWeight: "600",
      fontSize: "1rem",
      color: "#fff",
      textDecoration: "none",
      background: "linear-gradient(90deg, #11998e, #38ef7d)", // blue gradient
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    }}
  >
    Start Blog
  </Link>

  {/* Small description */}
  <p
    style={{
      color: "#495057",
      fontSize: "0.95rem",
      lineHeight: "1.5",
      marginTop: "15px"
    }}
  >
    Share your thoughts, ideas, and experiences with the world. Blogging is a great way to express yourself and connect with like-minded readers.
  </p>
		</div>




		<div className="card mb-4 shadow-sm border-0">
  <div className="card-body p-3 text-center" style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
    <h4 className="card-title mb-3" style={{ fontWeight: "700", color: "#343a40" }}>Categories</h4>
    <ul className="list-group list-group-flush">
      {categories.map((category) => (
        <li
          key={category._id}
          className="list-group-item mb-2 rounded"
          style={{
            backgroundColor: "#ffffff",
            transition: "all 0.3s",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#e9ecef"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ffffff"}
        >
          <Link
            to={`/post/category/${category._id}`}
            className="text-dark fw-semibold text-decoration-none"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
		</div>


				</div>
			</div>
        </div>
	</main>


        </div>
    );
}