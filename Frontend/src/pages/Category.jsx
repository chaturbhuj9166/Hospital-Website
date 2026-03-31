import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import { Tag, Plus, Trash2, FolderPlus, Hash } from "lucide-react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await API.get("/category");
    setCategories(data);
  };

  const handleAdd = async () => {
    if (!name) return toast.error("Please enter a category name");

    setIsAdding(true);
    try {
      await API.post("/category", { name });
      setName("");
      fetchCategories();
      toast.success("Category added successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add category");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure? This might affect existing reports.")) return;

    try {
      await API.delete(`/category/${id}`);
      fetchCategories();
      toast.success("Category deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Tag className="text-blue-600" size={32} />
            Category Management
          </h2>
          <p className="text-slate-500 font-medium mt-1">Organize medical reports into logical departments.</p>
        </div>

        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-28">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <FolderPlus size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Create New</h3>
              <p className="text-xs text-slate-400 font-medium mb-6 uppercase tracking-wider">Department Details</p>

              <div className="space-y-4">
                <div className="relative group">
                  <input
                    className="w-full pl-4 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700"
                    placeholder="e.g. Cardiology"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleAdd}
                  disabled={isAdding}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isAdding ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Plus size={20} /> Add Department
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-[2px]">System Categories</h4>
                <span className="bg-white px-3 py-1 rounded-full border border-slate-200 text-[10px] font-bold text-slate-500">
                  {categories.length} Total
                </span>
              </div>

              <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto custom-scrollbar">
                {categories.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <Hash size={32} />
                    </div>
                    <p className="text-slate-400 font-medium">No categories found.</p>
                  </div>
                ) : (
                  categories.map((cat) => (
                    <div
                      key={cat._id}
                      className="group flex justify-between items-center p-5 px-8 hover:bg-blue-50/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-600 transition-all border border-transparent group-hover:border-slate-200 shadow-sm">
                          <Hash size={14} />
                        </div>
                        <p className="font-bold text-slate-700 group-hover:text-blue-900 transition-colors">
                          {cat.name}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 border border-transparent hover:border-red-100 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
