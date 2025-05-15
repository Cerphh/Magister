import { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNotifications } from '../hooks/useNotifications';
import { useClickOutside } from '../hooks/useClickOutside';


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const displayName = userData?.displayName || 'User';
  const userType = userData?.userType || '';

  const { notifications, loading } = useNotifications();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));
  useClickOutside(notifRef, () => setIsNotifOpen(false));

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
  <nav className="w-full bg-[#0A2647] px-6 py-2 flex justify-end items-center shadow-md relative z-50">
    <div className="flex items-center gap-2 mr-auto">
      <img src="/src/assets/logo.png" alt="Magister Logo" className="w-36 h-auto" />
    </div>
    {isLoggedIn && (
      <div className="order-1 md:order-1 relative px-3 py-2 md:py-2">
        <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative text-white" aria-label="Toggle notifications">
          <Bell size={20} />
          {notifications.filter(n => n.role === userType).length > 0 && (
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full" />
          )}
        </button>
        {isNotifOpen && (
          <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-50 text-sm text-gray-800">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : notifications.filter(n => n.role === userType).length === 0 ? (
              <div className="p-4 text-center">No new notifications</div>
            ) : (
              <ul>
                {notifications.filter(n => n.role === userType).map((notif, idx) => (
                  <li key={idx} className="px-4 py-2 border-b hover:bg-gray-100">
                    <div className="font-medium">{notif.message}</div>
                    <div className="text-xs text-gray-500">{notif.timestamp}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    )}
    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
    </button>

    <div className={`flex-col md:flex md:flex-row md:items-center md:justify-between md:static absolute top-full left-0 w-full md:w-auto bg-[#0A2647] text-white text-xl font-medium font-sans transition-all duration-300 ease-in-out ${isMenuOpen ? 'flex' : 'hidden'}`}>
      <div className="order-2 md:order-3 px-4 py-2 md:py-0 relative" ref={dropdownRef}>
        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-90" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <span>{displayName}</span>
              <ChevronDown size={16} />
            </div>
            {isDropdownOpen && (
              <div className="relative mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-gray-800 md:absolute md:top-full md:left-0">
                <ul className="py-2 text-sm">
                  <li>
                    <li>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          if (userType === 'employer') {
                            navigate('/employer-profile');
                          } else {
                            navigate('/profile');
                          }
                          }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                        Profile
                        </button>
                  </li>

                  </li>
                  <li>
                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link to="/help" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                      Help
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <button onClick={() => { setIsMenuOpen(false); navigate('/signup'); }} className="bg-white text-[#0A2647] px-4 py-1 rounded hover:bg-gray-100">
              Sign Up
            </button>
            <button onClick={() => { setIsMenuOpen(false); navigate('/login'); }} className="bg-[#144272] text-white px-4 py-1 rounded hover:bg-[#0d3b66]">
              Log In
            </button>
          </div>
        )}
      </div>

      <div className="order-3 md:order-2 flex flex-col md:flex-row gap-4 md:gap-10 px-4 py-2 md:py-0">
        
        {userType === 'applicant' && (
          <>
            <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="hover:underline underline-offset-4">Job Board</Link>
            <Link to="/events" onClick={() => setIsMenuOpen(false)} className="hover:underline underline-offset-4">Events</Link>
            <Link to="/myjobs" onClick={() => setIsMenuOpen(false)} className="hover:underline underline-offset-4">My Jobs</Link>
          </>
        )}
        <Link to="/resources" onClick={() => setIsMenuOpen(false)} className="hover:underline underline-offset-4">Resource Hub</Link>
        {userType === 'employer' && (
          <Link to="/employer-dashboard" onClick={() => setIsMenuOpen(false)} className="hover:underline underline-offset-4">Dashboard</Link>
        )}{userType === 'admin' && (
          <Link to="/admin-dashboard" onClick={() => setIsMenuOpen(false)} className="hover:underline underline-offset-4">Admin Dashboard</Link>
          )}
      </div>
    </div>
  </nav>
);
};

export default Navbar;
