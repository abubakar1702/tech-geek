import Logo from "../assets/newlogo2.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiAlignRight, FiEdit3, FiUser } from "react-icons/fi";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavToggle = () => {
    setNav(!nav);
  };

  const handleDropdownToggle = () => {
    setDropdown(!dropdown);
  };

  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    if (location.pathname === '/write') {
      navigate('/');
    }
  };

  return (
    <nav className="bg-transparent w-full">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <img src={Logo} alt="tech geek" className="h-20 w-auto" />
        </div>
        <div className="hidden md:flex items-center space-x-5">
          <Link to="/" className="text-black text-xl hover:text-gray-300">
            <h5>Home</h5>
          </Link>
          <Link to="/?tech=phone" className="text-black text-xl hover:text-gray-300">
            <h5>Phone</h5>
          </Link>
          <Link to="/?tech=pc" className="text-black text-xl hover:text-gray-300">
            <h5>PC</h5>
          </Link>
          <Link to="/?tech=gaming" className="text-black text-xl hover:text-gray-300">
            <h5>Gaming</h5>
          </Link>
          <Link to="/?tech=ai" className="text-black text-xl hover:text-gray-300">
            <h5>AI</h5>
          </Link>
          <Link to="/?tech=others" className="text-black text-xl hover:text-gray-300">
            <h5>Others</h5>
          </Link>

          {currentUser ? (
            <div className="relative flex space-x-4 bg-[#1984b1] text-white rounded px-4 py-2">
              <Link to="/write" className="text-2xl cursor-pointer">
                <FiEdit3 />
              </Link>
              <FiUser
                className="text-2xl cursor-pointer"
                onClick={handleDropdownToggle}
              />
              {dropdown && (
                <div className="absolute top-6 right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2">
                  <div className="p-2 border-b text-black">
                    <div className="text-lg font-semibold">{currentUser.name}</div>
                    <div className="text-sm text-gray-600">{currentUser.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="bg-[#1984b1] text-white rounded px-4 py-2" to="/login">
              Log in
            </Link>
          )}
        </div>
        <div className="md:hidden text-4xl p-4 cursor-pointer" onClick={handleNavToggle}>
          <FiAlignRight />
        </div>
      </div>
      {nav && (
        <div className="md:hidden flex flex-col justify-center items-center space-y-5 px-6 py-4 shadow-md">
          <Link to="/" className="text-black text-xl hover:text-gray-300">
            <h5>Home</h5>
          </Link>
          <Link to="/?tech=phone" className="text-black text-xl hover:text-gray-300" onClick={handleNavToggle}>
            <h5>Phone</h5>
          </Link>
          <Link to="/?tech=pc" className="text-black text-xl hover:text-gray-300" onClick={handleNavToggle}>
            <h5>PC</h5>
          </Link>
          <Link to="/?tech=gaming" className="text-black text-xl hover:text-gray-300" onClick={handleNavToggle}>
            <h5>Gaming</h5>
          </Link>
          <Link to="/?tech=ai" className="text-black text-xl hover:text-gray-300" onClick={handleNavToggle}>
            <h5>AI</h5>
          </Link>
          <Link to="/?tech=others" className="text-black text-xl hover:text-gray-300" onClick={handleNavToggle}>
            <h5>Others</h5>
          </Link>
          {currentUser ? (
            <div className="relative flex space-x-4 bg-white text-white rounded px-4 py-2">
              <Link to="/write" className="text-2xl cursor-pointer">
                <FiEdit3 />
              </Link>
              <FiUser
                className="text-2xl cursor-pointer"
                onClick={handleDropdownToggle}
              />
              {dropdown && (
                <div className="absolute top-6 right-0 mt-2 w-48 bg-[#1984b1] shadow-lg rounded-md p-2">
                  <div className="p-2 border-b text-black">
                    <div className="text-lg font-semibold">{currentUser.name}</div>
                    <div className="text-sm text-gray-600">{currentUser.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="bg-[#1984b1] text-white rounded px-4 py-2" to="/login">
              Log in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
