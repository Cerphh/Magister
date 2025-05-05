import { FaSearch, FaBullseye, FaFileAlt, FaBookOpen, FaCalendarAlt, FaClipboardCheck } from "react-icons/fa";
import heroImage from "/src/assets/landingpage.png";
import Navbar from "../components/NavBar";
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: <FaSearch size={28} />, label: "Job Board Access" },
  { icon: <FaBullseye size={28} />, label: "Personalized Recommendations" },
  { icon: <FaFileAlt size={28} />, label: "Resume and Profile" },
  { icon: <FaBookOpen size={28} />, label: "Skill Development Resources" },
  { icon: <FaCalendarAlt size={28} />, label: "Events" },
  { icon: <FaClipboardCheck size={28} />, label: "Application Tracker" },
];

const LandingPage = () => {

    const navigate = useNavigate();

    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#001F3F] font-sans">
        <Navbar />
  
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-white">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4">
              Kickstart Your Career with <span className="text-blue-600">Magister</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Explore hundreds of job opportunities tailored just for you.
            </p>
            <button
      onClick={() => navigate('/roles')}
      className="bg-[#144272] text-white px-6 py-3 rounded-md hover:bg-[#0A2647]"
    >
      Get Started
    </button>
          </div>
          <div className="mt-10 md:mt-0">
            <img src={heroImage} alt="Hero" className="w-[400px] h-auto" />
          </div>
        </section>
  
        {/* Features Section */}
        <section className="bg-[#0A2647] text-white px-10 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#001F3F] rounded-lg p-6 flex flex-col items-center text-center gap-4 border border-white/20 hover:bg-[#144272] transition"
              >
                <div>{item.icon}</div>
                <div className="text-lg font-semibold">{item.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };
  

export default LandingPage;
