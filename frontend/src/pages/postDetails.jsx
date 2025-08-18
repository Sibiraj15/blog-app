import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function PostDetails() {

    const [post, setPost] = useState([null]);
    const {id} = useParams();
    const API = import.meta.env.VITE_API_URL;
   
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${API}/api/posts/${id}`)
                setPost(response.data);
            } catch (error) {
                console.log("Error fetching post:", error);
                
            }
        }
         useEffect(()=>{
            fetchPost();
         } ,[]);

         if(!post){
            return <h4>Loading...</h4>
         }

        //  Change the date format
        const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return  <main class="container my-4">
        <div class="row">
            <article class="col-lg-8">
                <h2 class="blog-post-title">{post.title}</h2>
                <p class="blog-post-meta">{formattedDate} by <a href="#">{post.author}</a></p>

            <img
              className="mb-3"
                src={post.image?.startsWith("http") ? post.image : `${API}${post.image}`}        
                            alt={post.title}
                      style={{
                    width: "100%",        // full width of the container
                    maxHeight: "400px",   // limit height
                    objectFit: "cover",   // crop without distortion
                   borderRadius: "10px", // optional rounded corners
              }}
            />

                <div class="blog-post-content">
                    <p>{post.content}</p>
                </div>
            </article>

          
        </div>
    </main>

}
