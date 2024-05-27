import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import Menu from "../components/Menu.jsx";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext.jsx";

const Single = () => {
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async ()=>{
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  console.log(post.username)
  console.log(post.author)

  return (
    <div className="flex p-4">
      <div className="w-[90%] mx-auto p-5">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
          <img
            className="w-full h-full object-cover"
            src={post?.postImg}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="mr-3">
              <img
                className="w-10 h-10 rounded-full"
                src={post?.userImg}
                alt={post?.username}
              />
            </div>
            <div>
              <p className="text-sm font-semibold">{post.author}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          </div>
          {currentUser.username === post.username && (
            <div className="flex">
              <div className="mr-4">
                <Link to={`/write?edit=2`} state={post}><BiEdit className="text-gray-500 cursor-pointer hover:text-gray-700" /></Link>
              </div>
              <div>
                <MdDeleteOutline onClick={handleDelete} className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </div>
            </div>
          )}
        </div>
        <p className="text-lg">{post.desc}</p>
      </div>
      <div className="w-80 px-4">
        <Menu cat={post.cat}/>
      </div>
    </div>
  );
};

export default Single;
