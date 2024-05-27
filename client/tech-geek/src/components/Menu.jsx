import axios from "axios";
import { useEffect, useState } from "react";

const Menu = ({cat}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);


  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Posts You May Like</h1>
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={post.img} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h2 className="text-l font-bold mb-2">{post.title}</h2>
              {/* <p className="text-gray-600 text-xs">Author: {post.author}</p>
              <p className="text-gray-600 text-xs">Date: {post.date}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
