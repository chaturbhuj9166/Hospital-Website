import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { Edit3, Trash2, Eye, FileSearch, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await API.get("/reports");
      setReports(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this record?")) return;
    await API.delete(`/reports/${id}`);
    fetchReports();
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans">
      <Sidebar />

      <div className="flex-1 p-10">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <FileSearch className="text-blue-600" size={32} />
              Manage Clinical Records
            </h1>
            <p className="text-slate-500 font-medium mt-1">Audit, edit, or remove patient diagnostic files.</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database Status</span>
            <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {reports.length} Records Synced
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Visual Asset</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Department</th>
                <th className="px-8 py-5 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">Files</th>
                <th className="px-8 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Quick Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {reports.map((report) => (
                <tr key={report._id} className="group hover:bg-blue-50/40 transition-all duration-300">
                  
                  {/* PREVIEW IMAGE */}
                  <td className="px-8 py-5">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-500 bg-slate-100 flex items-center justify-center">
                      {report.images?.[0] ? (
                        <img
                          src={`http://localhost:5000/${report.images[0]}`}
                          className="w-full h-full object-cover"
                          alt="Thumbnail"
                        />
                      ) : (
                        <ImageIcon className="text-slate-300" size={20} />
                      )}
                    </div>
                  </td>

                  {/* PATIENT INFO */}
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-base group-hover:text-blue-700 transition-colors">
                        {report.patientName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified Patient</span>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-tighter border border-slate-200 group-hover:bg-white group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                      {report.category}
                    </span>
                  </td>

                  {/* COUNT */}
                  <td className="px-8 py-5 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-black text-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                      {report.images?.length || 0}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-8 py-5">
                    <div className="flex justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                      
                      {/* VIEW */}
                      <button
                        onClick={() => navigate(`/report/${report._id}`)}
                        className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-white hover:text-green-500 border border-transparent hover:border-slate-200 transition-all shadow-sm active:scale-90"
                        title="View Full Report"
                      >
                        <Eye size={18} />
                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(report._id)}
                        className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-white hover:text-blue-500 border border-transparent hover:border-slate-200 transition-all shadow-sm active:scale-90"
                        title="Edit Entry"
                      >
                        <Edit3 size={18} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(report._id)}
                        className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-white hover:text-red-500 border border-transparent hover:border-slate-200 transition-all shadow-sm active:scale-90"
                        title="Delete Record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {reports.length === 0 && !loading && (
            <div className="p-20 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4 border border-dashed border-slate-200">
                <FileSearch size={40} />
              </div>
              <h3 className="text-slate-800 font-bold text-lg">No records found</h3>
              <p className="text-slate-400 text-sm mt-1">Try uploading a new report to see it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageReports;