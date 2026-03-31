import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import API from "../services/api";

const Gallery = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await API.get("/reports");
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Patient Asset Gallery
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Secure access to diagnostic imaging and reports.
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reports.map((report) => (
              <div
                key={report._id}
                onClick={() => navigate(`/report/${report._id}`)}
                className="shadow rounded p-3 cursor-pointer hover:scale-105 transition bg-white"
              >
                {/* 🔥 only first image */}
                <img
                  src={`http://localhost:5000/${report.images?.[0]}`}
                  className="h-40 w-full object-cover mb-2 rounded"
                />

                <h3 className="font-bold">{report.patientName}</h3>
                <p className="text-sm text-gray-500">{report.category}</p>

                {/* optional */}
                <p className="text-xs text-gray-400 mt-1">
                  {report.images?.length || 0} images
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;