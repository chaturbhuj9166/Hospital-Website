import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import API from "../services/api";

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await API.get(`/reports/${id}`);
        setReport(data);
        setActiveImage(data?.images?.[0] || "");
      } catch (error) {
        console.error("Failed to fetch report:", error);
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!report) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800">Report not found</h2>
            <p className="text-slate-500 mt-2">The requested diagnostic record could not be loaded.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-3/5 p-8 bg-slate-50 border-r border-slate-100">
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-black h-[500px] flex items-center justify-center">
              {activeImage ? (
                <img
                  src={`http://localhost:5000/${activeImage}`}
                  className="max-h-full max-w-full object-contain"
                  alt="Active Diagnostic"
                />
              ) : (
                <p className="text-slate-300 font-medium">No preview image available</p>
              )}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-widest">
                Full View Mode
              </div>
            </div>

            {!!report.images?.length && (
              <div className="flex gap-4 mt-8 overflow-x-auto pb-2 scrollbar-hide">
                {report.images.map((img, i) => (
                  <button
                    key={img || i}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative min-w-[80px] h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                      activeImage === img ? "border-blue-600 scale-105 shadow-lg shadow-blue-100" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={`http://localhost:5000/${img}`}
                      className="w-full h-full object-cover"
                      alt={`Diagnostic thumbnail ${i + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-2/5 p-12 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                {report.category || "Uncategorized"}
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-2">
                {report.patientName || "Unnamed Patient"}
              </h2>
              <p className="text-slate-400 font-medium text-sm mb-8 flex items-center gap-2">
                <i className="fa-solid fa-calendar-day"></i> Record Updated: March 2026
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Clinical Description</h4>
                  <p className="text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
                    "{report.description || "No clinical description provided for this asset."}"
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-4">
              {report.pdf && (
                <a
                  href={`http://localhost:5000/${report.pdf}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <i className="fa-solid fa-file-pdf text-lg"></i> Download Clinical Report
                </a>
              )}
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
              >
                <i className="fa-solid fa-print"></i> Print Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
