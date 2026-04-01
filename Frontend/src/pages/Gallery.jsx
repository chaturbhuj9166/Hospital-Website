import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import API from "../services/api";

const Gallery = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 Backend URL
  const baseURL = "https://hospital-website-backend-6kmw.onrender.com";

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await API.get("/reports");
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900">
            Patient Asset Gallery
          </h1>
          <p className="text-slate-500 mt-2">
            Secure access to diagnostic imaging and reports.
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reports.map((report) => {
              // 🔥 FILE PATH FIX
              const imagePath = report.images?.[0];
              const pdfPath = report.pdf;

              const imageUrl = imagePath
                ? `${baseURL}/${imagePath.replace(/\\/g, "/")}`
                : null;

              const pdfUrl = pdfPath
                ? `${baseURL}/${pdfPath.replace(/\\/g, "/")}`
                : null;

              return (
                <div
                  key={report._id}
                  onClick={() => navigate(`/report/${report._id}`)}
                  className="shadow rounded p-4 cursor-pointer hover:scale-105 transition bg-white"
                >
                  {/* 🔥 FILE DISPLAY (ICON STYLE) */}
                  <div className="h-40 flex flex-col items-center justify-center bg-gray-100 rounded">

                    {imageUrl ? (
                      <>
                        <span className="text-5xl">📄</span>
                        <a
                          href={imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 text-sm mt-2 font-semibold"
                        >
                          View Image
                        </a>
                      </>
                    ) : pdfUrl ? (
                      <>
                        <span className="text-5xl">📄</span>
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 text-sm mt-2 font-semibold"
                        >
                          View PDF
                        </a>
                      </>
                    ) : (
                      <span className="text-gray-500">No File</span>
                    )}

                  </div>

                  {/* 🔥 DETAILS */}
                  <h3 className="font-bold mt-2">{report.patientName}</h3>
                  <p className="text-sm text-gray-500">{report.category}</p>

                  <p className="text-xs text-gray-400 mt-1">
                    {report.images?.length > 0
                      ? `${report.images.length} images`
                      : report.pdf
                      ? "1 PDF"
                      : "No files"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;