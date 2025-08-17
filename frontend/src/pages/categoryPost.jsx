import { useEffect, useState } from "react";
import Post from "../components/posts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CategoryPost() {

   const [posts, setPosts] = useState([]);
   const [category, setCategory] = useState(null);
   const {id} = useParams();
   const API = import.meta.env.VITE_API_URL;

   const fetchPosts = async () => {
		const response = await axios.get(`${API}/api/posts/category/${id}`)
		setPosts(response.data);
   }
	const fetchCategory = async () => {
		const response = await axios.get(`${API}/api/categories/${id}`)
		setCategory(response.data);
	
   }

   useEffect(()=>{
	fetchPosts();
	fetchCategory();
   } ,[]);

    if(!category){
            return <h4>Loading...</h4>
         }

    return (
        <div>

	 <main>
      <div className="container mt-4">
  <div className="row">
    <div className="col-12">
      <h1 className="mb-4">{category.name}</h1>

      <div className="row g-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <img
               src={post.image ? `${API}/${post.image}` : "placeholder.jpg"}           
                      className="card-img-top"
                  alt={post.title}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content?.substr(0, 100)}...</p>
                  <Link to={`/post/${post._id}`} className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4>No posts available</h4>
        )}
      </div>
    </div>
  </div>
</div>

    </main>



        </div>
    );
}