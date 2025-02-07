import  { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assests';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import { Appcontext } from '../context/Appcontext';

const Navbar = () => {
  const navigate = useNavigate();
  
  const [showMenu, setShowMenu] = useState(false);
  const { token,setToken,logout } = useContext(Appcontext);
  useEffect(()=>{
    
    if(sessionStorage.getItem('token')){
      setToken(true)
    }
  },[])
  return (
    <div className="border-b-4">
      {/* Navbar Container */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <NavLink to="/">
          <img onClick={() => navigate("/")} className="w-32" src={assets.logo_icon} alt="Logo" />
        </NavLink>

        {/* Large Screen Links */}
        <ul className="hidden lg:flex items-center gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-black font-bold' : 'text-gray-700'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                isActive ? 'text-black font-bold' : 'text-gray-700'
              }
            >
              Community
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'text-black font-bold' : 'text-gray-700'
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-black font-bold' : 'text-gray-700'
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Profile Section */}
          {token ? (
            <div className="relative group flex items-center">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-10 drop-shadow cursor-pointer"
              />
              {/* Dropdown Menu */}
              <div className="absolute hidden group-hover:block top-full right-0 z-10 rounded bg-gray-600 text-white pt-2">
                <ul className="list-none m-0 p-2 rounded-md text-sm">
                  {/* Profile Link */}
                  <li
                    className="py-1 px-2 cursor-pointer pr-10 font-bold"
                    onClick={() => navigate("/myprofile")}
                  >
                    Profile
                  </li>
                  {/* My Bookings */}
                  <li
                    className="py-1 px-2 cursor-pointer pr-10 font-bold"
                    onClick={() => navigate("/mybookings")}
                  >
                    Bookings
                  </li>
                  {/* Logout */}
                  <li
                    className="py-1 px-2 cursor-pointer pr-10 font-bold"
                    onClick={()=>{
                      logout()
                      navigate('/login')
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate('/login');
              }}
              className="hidden lg:flex bg-black text-white px-6 py-2 rounded-full font-semibold"
            >
              Login
            </button>
          )}

          {/* Menu Icon for Small Screens */}
          <button
            className="lg:hidden block text-black"
            onClick={() => setShowMenu(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-full h-full z-20 bg-blue-100 transform transition-transform ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b-2">
          <img className="w-32" src={assets.logo_icon} alt="Logo" />
          <X
            className="cursor-pointer"
            size={24}
            onClick={() => setShowMenu(false)}
          />
        </div>

        {/* Mobile Links */}
        <ul className="flex flex-col items-center gap-4 mt-6">
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/"
            className="text-lg font-medium"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/community"
            className="text-lg font-medium"
          >
            Community
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/contact"
            className="text-lg font-medium"
          >
            Contact
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/about"
            className="text-lg font-medium"
          >
            About
          </NavLink>
          {token ? (
            <>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/myprofile"
                className="text-lg font-medium"
              >
                Profile
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/mybookings"
                className="text-lg font-medium"
              >
                Bookings
              </NavLink>
              <button
                onClick={() => {
                  setShowMenu(false);
                  logout();
                  navigate('/login')
                }}
                className="bg-black text-white px-6 py-2 rounded-full font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate('/login');
              }}
              className="bg-black text-white px-6 py-2 rounded-full font-semibold"
            >
              Login
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
