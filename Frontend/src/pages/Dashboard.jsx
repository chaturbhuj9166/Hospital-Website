import Sidebar from "../components/Sidebar";
import { FileText, Grid, Edit3, Trash2, User, ChevronRight, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res1 = await API.get("/reports");
    const res2 = await API.get("/category");
    setReports(res1.data);
    setCategories(res2.data);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    await API.delete(`/reports/${id}`);
    fetchData(); 
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans">
      <Sidebar />

      <div className="flex-1 p-10 overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Manage patient reports and system assets</p>
          </div>
          <div className="bg-white p-2 px-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Live System</span>
          </div>
        </div>

        {/* --- 1. PREMIUM STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Files Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FileText size={24} />
              </div>
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase">Total</span>
            </div>
            <h3 className="text-4xl font-black text-slate-800">{reports.length}</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">Medical Files</p>
          </div>

          {/* Categories Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Grid size={24} />
              </div>
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg uppercase">Active</span>
            </div>
            <h3 className="text-4xl font-black text-slate-800">{categories.length}</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">Report Categories</p>
          </div>

          {/* Activity Card */}
          <div className="bg-[#0F172A] p-6 rounded-3xl shadow-xl shadow-slate-200 text-white group cursor-pointer overflow-hidden relative">
             <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                  <Activity size={24} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold">Quick Report</h3>
                <p className="text-slate-400 text-xs mt-1">Generate clinical summary</p>
             </div>
             <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <FileText size={120} />
             </div>
          </div>
        </div>

        {/* --- 2. PROFESSIONAL DATA TABLE --- */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
             <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
               Recent Patients <ChevronRight size={16} className="text-slate-400" />
             </h2>
             <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
               View All Records
             </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 text-[10px] font-black uppercase tracking-[2px] border-b border-slate-50">
                  <th className="px-8 py-5">Patient Details</th>
                  <th className="px-8 py-5">Department</th>
                  <th className="px-8 py-5">Assets Count</th>
                  <th className="px-8 py-5 text-right">Management</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {reports.map((report) => (
                  <tr key={report._id} className="group hover:bg-blue-50/30 transition-all duration-200">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-blue-600 transition-all border border-transparent group-hover:border-slate-200">
                          <User size={18} />
                        </div>
                        <span className="font-bold text-slate-700 text-sm">{report.patientName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-full uppercase tracking-tighter group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        {report.category}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-700">{report.images?.length || 0}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Files</span>
                      </div>
                    </td>

                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        {/* EDIT */}
                        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-white hover:text-blue-600 border border-transparent hover:border-slate-200 transition-all shadow-sm">
                          <Edit3 size={16} />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(report._id)}
                          className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-white hover:text-red-500 border border-transparent hover:border-slate-200 transition-all shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div className="p-5 bg-slate-50/30 text-center border-t border-slate-50">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               Showing {reports.length} Clinical Records
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;