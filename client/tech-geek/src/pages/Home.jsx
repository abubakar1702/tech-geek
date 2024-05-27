import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([])

  const cat = useLocation().search



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts${cat}`)
        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [cat])


  return (
    <div className="flex flex-wrap gap-4 p-4">
      {posts.map(post => {
        return (
          <div className="flex w-full max-w-lg rounded-lg shadow-lg overflow-hidden" key={post.id}>
            <div className="w-1/3 h-32 overflow-hidden">
              <img className="object-cover h-full w-full" src={post.img} alt={post.title} />
            </div>
            <div className="w-2/3 p-4 flex items-center">
              <Link to={`/post/${post.id}`}>
                <h1 className="text-xl font-semibold text-gray-900 hover:text-blue-500">{post.title}</h1>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );


};

export default Home;
