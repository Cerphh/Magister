import Navbar from '../components/NavBar';

const JobBoard = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="px-6 py-6">
        <h1 className="text-6xl font-bold  text-[#082C57] mb-4">Job Board</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Applicant Card */}
          <div className="relative bg-[#205295] rounded-3xl p-4 text-white shadow-md hover:scale-75 transition-transform duration-300 cursor-pointer overflow-hidden h-[700px]">
            <h2 className="absolute top-10 right-6 text-6xl font-black">For Applicant</h2>
            <img
              src="/src/assets/applicant.png"
              alt="Applicant"
              className="absolute bottom-[-120px] left-[-20px] w-[700px] h-full object-contain"
            />
          </div>

          {/* Employer Card */}
          <div className="relative bg-[#205295] rounded-3xl p-4 text-white shadow-md hover:scale-75 transition-transform duration-300 cursor-pointer overflow-hidden h-[700px]">
            <h2 className="absolute top-10 left-4 text-6xl font-black">For Employer</h2>
            <img
              src="/src/assets/employer.png"
              alt="Employer"
              className="absolute bottom-[-100px] right-4 w-[700px] h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
