import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom'; // Remove this if not using React Router

const Navbar = () => {
  return (
    <nav className="w-full bg-[#082C57] px-4 py-5 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Magister Logo" className="w-6 h-6" /> {/* Replace with actual path */}
        <span className="text-white font-bold text-lg">magister</span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-8 text-white text-sm font-medium">
        <Link to="/jobs" className="hover:underline underline-offset-4">Job Board</Link>
        <Link to="/resources" className="hover:underline underline-offset-4">Resource Hub</Link>
        <Link to="/events" className="hover:underline underline-offset-4">Events</Link>

        {/* User Dropdown Placeholder */}
        <div className="flex items-center gap-1 cursor-pointer hover:opacity-90">
          <span>Juan Dela Cruz</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
