import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import { Edit3, User, FileText, Tags, AlertCircle, Save, ArrowLeft } from "lucide-react";

const EditReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchReport();
    fetchCategories();
  }, []);

  const fetchReport = async () => {
    const { data } = await API.get(`/reports/${id}`);
    setPatientName(data.patientName);
    setDescription(data.description);
    setCategory(data.category);
  };

  const fetchCategories = async () => {
    const { data } = await API.get("/category");
    setCategories(data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("patientName", patientName);
    formData.append("description", description);
    formData.append("category", category);
    files.forEach((file) => formData.append("files", file));

    try {
      await API.put(`/reports/${id}`, formData);
      toast.success("Database entry updated!");
      navigate("/admin/reports");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar />
      <div className="flex-1 p-10">
        {/* Back Button & Header */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Records
        </button>

        <div className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Edit3 size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Edit Entry</h2>
            <p className="text-slate-500 font-medium italic italic">Modify patient metadata or update media vault.</p>
          </div>
        </div>

        <div className="max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-12 relative overflow-hidden">
          {/* Subtle Background Badge */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Edit3 size={200} />
          </div>

          <form onSubmit={handleUpdate} className="space-y-8 relative z-10">
            {/* Warning Note */}
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 p-4 rounded-2xl text-amber-700">
              <AlertCircle size={20} />
              <p className="text-xs font-bold uppercase tracking-tight">Warning: New file uploads will override existing media assets for this entry.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 ml-1">Patient ID</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <input value={patientName} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-bold text-slate-700 shadow-inner" onChange={(e) => setPatientName(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 ml-1">Department</label>
                <div className="relative">
                  <Tags className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <select value={category} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-bold text-slate-700 appearance-none shadow-inner" onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((cat) => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 ml-1">Notes Archive</label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 text-slate-300" size={18} />
                <textarea rows="4" value={description} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-semibold text-slate-700 shadow-inner" onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 ml-1">New Asset Selection</label>
              <input type="file" multiple className="w-full p-4 border border-dashed border-slate-300 rounded-2xl bg-slate-50 font-bold text-slate-400 cursor-pointer hover:bg-slate-100 transition-colors" onChange={(e) => setFiles([...e.target.files])} />
            </div>

            <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-5 rounded-3xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3">
              <Save size={20} /> Commit Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditReport;