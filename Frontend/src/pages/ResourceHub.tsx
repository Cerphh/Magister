import { useState, useEffect } from "react";
import { Search, Filter, Download, X } from "lucide-react";
import Navbar from "../components/NavBar";
import { useResources } from "../hooks/useResources";

const ResourceHub = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<{
    displayName: string;
    description: string;
    originalName: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("");

  const [uploadDisplayName, setUploadDisplayName] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadSubject, setUploadSubject] = useState("");
  const [uploadLevel, setUploadLevel] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const {
    resources,
    fetchResources,
    filterResources,
    uploadResource,
    downloadResource,
  } = useResources();

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const hasFilters =
        searchQuery || selectedSubject || selectedLevel || selectedFileType;

      if (hasFilters) {
        filterResources({
          displayName: searchQuery,
          subject: selectedSubject,
          level: selectedLevel,
          fileType: selectedFileType,
        });
      } else {
        fetchResources();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedSubject, selectedLevel, selectedFileType]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadFile) return alert("Please upload a file.");

    try {
      await uploadResource(
        uploadFile,
        uploadDisplayName,
        uploadDescription,
        uploadSubject,
        uploadLevel
      );
      setShowModal(false);
      setUploadDisplayName("");
      setUploadDescription("");
      setUploadSubject("");
      setUploadLevel("");
      setUploadFile(null);
      fetchResources();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-[#082C57] mb-4">Resource Hub</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-end md:items-center gap-4 mb-4">
          {/* Subject Filter */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white text-sm w-full md:w-48">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <select
              className="bg-transparent outline-none w-full text-gray-600"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="english">English</option>
            </select>
          </div>

          {/* Level Filter */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white text-sm w-full md:w-48">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <select
              className="bg-transparent outline-none w-full text-gray-600"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="beginner">Elementary</option>
              <option value="intermediate">High School</option>
              <option value="advanced">College</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>

          {/* File Type Filter */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white text-sm w-full md:w-48">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <select
              className="bg-transparent outline-none w-full text-gray-600"
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="pptx">PPTX</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 bg-white w-full md:w-64">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none flex-grow text-sm text-gray-600"
            />
            <Search className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-left text-gray-600 hover:bg-gray-100 mb-4"
        >
          Share learning resources
        </button>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm flex flex-col justify-between h-40"
            >
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  {item.displayName}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                  onClick={() => setSelectedResource(item)}
                >
                  See more...
                </span>
                <Download
                  size={16}
                  className="text-gray-500 cursor-pointer"
                  onClick={() => downloadResource(item.originalName)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative bg-white border border-gray-200 rounded-md shadow-lg w-full max-w-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <div className="p-6">
              <form className="space-y-6" onSubmit={handleUpload}>
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={uploadDisplayName}
                    onChange={(e) => setUploadDisplayName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={uploadSubject}
                      onChange={(e) => setUploadSubject(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">Select Subject</option>
                      <option value="math">Math</option>
                      <option value="science">Science</option>
                      <option value="english">English</option>
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level
                    </label>
                    <select
                      value={uploadLevel}
                      onChange={(e) => setUploadLevel(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">Select Level</option>
                      <option value="beginner">Elementary</option>
                      <option value="intermediate">High School</option>
                      <option value="advanced">College</option>
                      <option value="graduate">Graduate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="upload"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Upload File
                  </label>
                  <input
                    id="upload"
                    type="file"
                    accept=".pdf,.docx,.pptx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadFile(e.target.files[0]);
                      }
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-[#205295] hover:bg-[#144272] text-white font-semibold px-6 py-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* See More Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative bg-white border border-gray-200 rounded-md shadow-lg w-full max-w-md p-6">
            <button
              onClick={() => setSelectedResource(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold text-[#082C57] mb-2">
              {selectedResource.displayName}
            </h2>
            <p className="text-sm text-gray-700">{selectedResource.description}</p>

            <div className="mt-4 text-right">
              <button
                onClick={() => downloadResource(selectedResource.originalName)}
                className="bg-[#144272] hover:bg-[#2C74B3] text-white font-medium px-4 py-2 rounded"
              >
                Download Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceHub;
