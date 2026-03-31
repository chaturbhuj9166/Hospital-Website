import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import { UploadCloud, User, FileText, Tags, Loader2, PlusCircle } from "lucide-react";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/category").then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) return toast.error("Please select at least one file");
    if (!category) return toast.error("Category is required");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("patientName", patientName);
    formData.append("description", description);
    formData.append("category", category);

    try {
      setLoading(true);
      await API.post("/reports/upload", formData);
      toast.success("Report archived successfully! 🔥");
      setFiles([]); setPatientName(""); setDescription(""); setCategory("");
    } catch (err) {
      toast.error("Process failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar />
      <div className="flex-1 p-10">
        <div className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <UploadCloud size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">New Asset Upload</h2>
            <p className="text-slate-500 font-medium italic">Securely ingest clinical diagnostic data.</p>
          </div>
        </div>

        <div className="max-w-4xl bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col md:flex-row">
          {/* Form Side */}
          <form onSubmit={handleSubmit} className="flex-1 p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Patient Identity</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input required value={patientName} placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700" onChange={(e) => setPatientName(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Department</label>
                <div className="relative group">
                  <Tags className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <select required value={category} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map((cat) => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Clinical Observations</label>
              <div className="relative group">
                <FileText className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <textarea rows="3" value={description} placeholder="Type report findings here..." className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700" onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>

            <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl hover:border-blue-400 hover:bg-blue-50/30 transition-all text-center relative group">
              <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => setFiles([...e.target.files])} />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                  <PlusCircle size={24} />
                </div>
                <p className="text-sm font-bold text-slate-700">{files.length > 0 ? `${files.length} Files Selected` : "Select Clinical Media"}</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">PDF, JPG, PNG Supported</p>
              </div>
            </div>

            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Archive Asset"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;