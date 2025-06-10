import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, setUser } = useUserContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    toast.success("Logged out successfully.");
    navigate("/auth");
  };

  const UserMenu = () => (
    <>
      <span className="text-sm text-white font-medium px-2">
        👋 Hi, <span className="font-bold">{user.username}</span>
      </span>
      <Link
        to="/admin"
        className="px-5 py-2 rounded-md bg-red-800 hover:bg-red-900 transition-shadow shadow-sm hover:shadow-md"
      >
        Admin
      </Link>
      <button
        onClick={handleLogout}
        className="px-5 py-2 rounded-md bg-red-300 text-red-900 font-semibold hover:bg-red-400 transition-shadow shadow-sm hover:shadow-md"
      >
        Logout
      </button>
    </>
  );

  const GuestMenu = () => (
    <>
      <Link
        to="/auth"
        className="px-5 py-2 rounded-md bg-red-800 hover:bg-red-900 transition-shadow shadow-sm hover:shadow-md"
      >
        Sign In
      </Link>
      <Link
        to="/auth"
        className="px-5 py-2 rounded-md bg-red-300 text-red-900 font-semibold hover:bg-red-400 transition-shadow shadow-sm hover:shadow-md"
      >
        Sign Up
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-md text-white font-inter">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to={user ? "/" : "/auth"}
          className="flex items-center space-x-2 cursor-pointer select-none px-4"
        >
          
          <span className="text-xl sm:text-2xl font-semibold tracking-wide ">
           Video <span className="hidden sm:inline ">Insight</span> <span className="text-red-300 ">Summarizer</span>
          </span>
        </Link>

        <div className="hidden md:flex space-x-4 font-semibold items-center">
          {user ? <UserMenu /> : <GuestMenu />}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-red-700 px-6 py-4 space-y-4 font-semibold">
          {user ? (
            <>
              <span className="block text-white">👋 Hi, {user.username}</span>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-5 py-2 rounded-md bg-red-800 hover:bg-red-900 transition"
              >
                Admin
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-5 py-2 rounded-md bg-red-300 text-red-900 font-semibold hover:bg-red-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block px-5 py-2 rounded-md bg-red-800 hover:bg-red-900 transition"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block px-5 py-2 rounded-md bg-red-300 text-red-900 font-semibold hover:bg-red-400 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
