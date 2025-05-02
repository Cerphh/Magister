import { Search, Filter, Download } from 'lucide-react';
import Navbar from '../components/NavBar';

const ResourceHub = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="px-6 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#082C57] mb-4">Resource Hub</h1>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row items-end md:items-center gap-4 mb-4">
          {/* Dropdown Filter */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white text-sm w-full md:w-48">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <select className="bg-transparent outline-none w-full text-gray-600">
              <option value="all">All</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="english">English</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 bg-white w-full md:w-64">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none flex-grow text-sm text-gray-600"
            />
            <Search className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        {/* Share Input */}
        <input
          type="text"
          placeholder="Share learning resources"
          className="w-full border border-gray-300 rounded-full px-5 py-2 mb-6 outline-none bg-white text-sm"
        />

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm flex flex-col justify-between h-40"
            >
              <div>
                <h3 className="font-semibold text-lg mb-1">Elementary Math Lesson Plan</h3>
                <p className="text-sm text-gray-600">
                  A comprehensive lesson plan for teaching elementary school math
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                  See more...
                </span>
                <Download size={16} className="text-gray-500 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>    
    </div>
  );
};

export default ResourceHub;
