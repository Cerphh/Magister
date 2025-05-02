import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Placeholder logic for actual logout (e.g., clearing tokens)
    navigate('/');
  };

  return (
    <nav className="w-full bg-[#082C57] px-4 py-5 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Magister Logo" className="w-6 h-6" />
        <span className="text-white font-bold text-lg">magister</span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-8 text-white text-sm font-medium">
        <Link to="/jobs" className="hover:underline underline-offset-4">Job Board</Link>
        <Link to="/resources" className="hover:underline underline-offset-4">Resource Hub</Link>
        <Link to="/events" className="hover:underline underline-offset-4">Events</Link>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-1 cursor-pointer hover:opacity-90"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>Juan Dela Cruz</span>
            <ChevronDown size={16} />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-gray-800">
              <ul className="py-2 text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help</li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
