import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import heroImage from "/src/assets/landingpage.png";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import type { ReactElement } from "react";
import { Icon } from "@iconify/react";
import searchIcon from "@iconify-icons/fa-solid/search";
import bullseyeIcon from "@iconify-icons/fa-solid/bullseye";
import fileAltIcon from "@iconify-icons/fa-solid/file-alt";
import bookOpenIcon from "@iconify-icons/fa-solid/book-open";
import calendarAltIcon from "@iconify-icons/fa-solid/calendar-alt";
import clipboardCheckIcon from "@iconify-icons/fa-solid/clipboard-check";

const features: { icon: ReactElement; label: string }[] = [
  { icon: <Icon icon={searchIcon} width="60" />, label: "Job Board Access" },
  { icon: <Icon icon={bullseyeIcon} width="60" />, label: "Personalized Recommendations" },
  { icon: <Icon icon={fileAltIcon} width="60" />, label: "Resume and Profile" },
  { icon: <Icon icon={bookOpenIcon} width="60" />, label: "Skill Development Resources" },
  { icon: <Icon icon={calendarAltIcon} width="60" />, label: "Events" },
  { icon: <Icon icon={clipboardCheckIcon} width="60" />, label: "Application Tracker" },
];

const helpData: { question: string; answer: string }[] = [
  { question: "Create an account", answer: "To create an account, click on 'Sign Up' and fill in your personal and professional details." },
  { question: "Applying for jobs", answer: "Go to the Job Board, browse roles, and click 'Apply' on listings that match your interests." },
  { question: "Completing your profile", answer: "Visit your profile page and complete all sections, including experience, education, and skills." },
  { question: "How do I sign up as a teacher?", answer: "Use the 'Sign Up' button, choose the 'Applicant' role if you want to apply a job and 'Employer' if you want to hire an applicant, and fill out your details accordingly." },
  { question: "Is Magister free to use?", answer: "Yes, Magister is free for educators." },
  { question: "Can I apply to multiple jobs?", answer: "Absolutely! You can apply to as many job postings as you qualify for." },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalQuestion, setModalQuestion] = useState("");
  const [modalAnswer, setModalAnswer] = useState("");

  const openModal = (question: string, answer: string) => {
    setModalQuestion(question);
    setModalAnswer(answer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalQuestion("");
    setModalAnswer("");
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] text-[#001F3F] font-sans">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-20 py-28 bg-white">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Kickstart Your Career with <span className="text-blue-600"> Magister</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore hundreds of job opportunities tailored just for you.
            </p>
            <button
              onClick={() => navigate("/roles")}
              className="bg-[#144272] text-white px-8 py-4 text-lg rounded-md hover:bg-[#0A2647]"
            >
              Get Started
            </button>
          </div>
          <div className="mt-12 md:mt-0">
            <img src={heroImage} alt="Hero" className="w-[600px] h-auto md:w-[1000px]" />
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#0A2647] text-white px-80 py-20">
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

        {/* Empowering Section */}
        <section className="px-10 py-16 text-center bg-white">
          <h2 className="text-xl font-bold mb-4">Empowering Educators Through Opportunity</h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-6">
            Magister connects passionate educators with meaningful opportunities in schools, universities,
            and learning platforms around the world. From job listings to career resources, our platform is
            designed to support your journey, celebrate your impact, and elevate the teaching profession.
          </p>
          <img src="/src/assets/educators.png" alt="Educators illustration" className="w-full max-w-md mx-auto" />
        </section>

        {/* Help Section */}
        <section className="bg-[#144272] text-white px-10 py-12 text-center">
          <h3 className="text-xl font-semibold mb-4">How can we help?</h3>
          <div className="flex justify-center mb-10">
            <input type="text" placeholder="Search..." className="w-full max-w-md px-4 py-2 rounded-l-md text-black" />
            <button className="bg-[#0A2647] px-4 rounded-r-md">
              <FaSearch />
            </button>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-left text-white">
              <div>
                <h4 className="font-bold mb-2">Getting Started Guides</h4>
                <ul className="space-y-1">
                  {helpData.slice(0, 3).map(({ question, answer }) => (
                    <li key={question}>
                      <button onClick={() => openModal(question, answer)} className="hover:underline text-left w-full">
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">FAQs</h4>
                <ul className="space-y-1">
                  {helpData.slice(3).map(({ question, answer }) => (
                    <li key={question}>
                      <button onClick={() => openModal(question, answer)} className="hover:underline text-left w-full">
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Contact Support</h4>
                <p>You can contact us at:</p>
                <ul className="space-y-1 mt-2">
                  <li>support@magister.io</li>
                  <li>22-0554-9845</li>
                  <li>22-0548-8616</li>
                  <li>22-0453-9898</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg max-w-md w-full shadow-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-lg font-bold mb-4 pr-6">{modalQuestion}</h2>
              <p className="text-gray-700">{modalAnswer}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-[#F0F5F9] text-[#0A2647] px-10 py-4 text-right text-sm">
          © 2025 Magister. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
