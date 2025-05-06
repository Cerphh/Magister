import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from "../../config/firebase";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const displayName = userData?.displayName || "User";
  const userType = userData?.role || "";

  return (
    <nav className="w-full bg-[#0A2647] px-6 py-1 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/src/assets/logo.png" alt="Magister Logo" className="w-50 h-16" />
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-10 text-white text-xl font-medium">
        <Link to="/" className="hover:underline underline-offset-4">Home</Link>
        <Link to="/jobs" className="hover:underline underline-offset-4">Job Board</Link>
        <Link to="/resources" className="hover:underline underline-offset-4">Resource Hub</Link>
        <Link to="/events" className="hover:underline underline-offset-4">Events</Link>

        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-1 cursor-pointer hover:opacity-90"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{displayName}</span>
              <ChevronDown size={16} />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-gray-800">
                <ul className="py-2 text-sm">
                  {userType === "applicant" && (
                    <li>
                      <Link
                        to="/myjobs"
                        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Jobs
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/help"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Help
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-[#0A2647] px-4 py-1 rounded hover:bg-gray-100"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#144272] text-white px-4 py-1 rounded hover:bg-[#0d3b66]"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
