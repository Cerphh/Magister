// src/pages/RolePage.tsx
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

const RolePage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'applicant' | 'employer') => {
    // ✅ Updated: use userType instead of type for consistency
    navigate(`/signup?userType=${role}`);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="px-6 py-6">
  <h1 className="text-5xl font-bold text-[#082C57] mb-8 text-center">Choose Your Role</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh]">
    {/* Applicant Card */}
    <div
      className="relative bg-[#205295] rounded-3xl p-4 text-white shadow-md hover:scale-95 transition-transform duration-300 cursor-pointer overflow-hidden h-[550px]"
      onClick={() => handleRoleSelect('applicant')}
    >
      <h2 className="absolute top-10 right-6 text-7xl font-black">For Applicant</h2>
      <img
        src="/src/assets/applicant.png"
        alt="Applicant"
        className="absolute bottom-[-40px] left-0 w-[600px] h-auto object-contain"
      />
    </div>

    {/* Employer Card */}
    <div
      className="relative bg-[#205295] rounded-3xl p-4 text-white shadow-md hover:scale-95 transition-transform duration-300 cursor-pointer overflow-hidden h-[550px]"
      onClick={() => handleRoleSelect('employer')}
    >
      <h2 className="absolute top-10 left-6 text-7xl font-black">For Employer</h2>
      <img
        src="/src/assets/employer.png"
        alt="Employer"
        className="absolute bottom-[-100px] right-0 w-[600px] h-auto object-contain"
      />
    </div>
  </div>
</div>

    </div>
  );
};

export default RolePage;
