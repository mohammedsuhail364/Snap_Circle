import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);  // Track login state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        {/* Navbar Title */}
        <h1 className="text-lg font-bold">SnapCircle Admin</h1>

        {/* Conditional Rendering of Login or Burger Menu */}
        {loggedIn ? (
          // Burger Menu Button when logged in
          <button onClick={toggleSidebar} className="text-xl">
            <FaBars />
          </button>
        ) : (
          // Login Button when not logged in
          <button onClick={() => navigate("/login")} className="bg-black text-white px-6 py-2 rounded-full font-semibold">
            Login
          </button>
        )}
      </div>

      {/* Sidebar */}
      {loggedIn && (
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 shadow-lg transform transition-transform duration-300 z-40 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">SnapCircle Admin</h2>
            <button onClick={toggleSidebar}>
              <FaTimes className="text-white" />
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <a href="/allphotographer" className="block text-sm font-medium hover:text-blue-400">All Photographers</a>
            </li>
            <li>
              <a href="/appointment" className="block text-sm font-medium hover:text-blue-400">Today's Appointments</a>
            </li>
          </ul>
        </div>
      )}

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
