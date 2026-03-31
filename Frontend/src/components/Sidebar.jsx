import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// Icons के लिए (Lucide-react बेस्ट है, वरना FontAwesome भी चलेगा)
import { 
  LayoutDashboard, 
  UploadCloud, 
  FolderTree, 
  Tags, 
  LogOut, 
  ShieldCheck,
  ChevronRight 
} from "lucide-react";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Active Link Helper
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-72 h-screen bg-[#0F172A] text-slate-400 flex flex-col border-r border-slate-800 shadow-[20px_0_50px_rgba(0,0,0,0.2)] sticky top-0">
      
      {/* 1. Header Area: Branding */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            <ShieldCheck size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight leading-none">MED-VAULT</h2>
            <p className="text-[10px] text-blue-400 font-bold tracking-[2px] uppercase mt-1">Admin Pro</p>
          </div>
        </div>
      </div>

      {/* 2. Navigation Section */}
      <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[11px] font-black text-slate-500 uppercase tracking-[3px] mb-6 mt-4">Main Menu</p>
        
        {/* Dashboard Link */}
        <SidebarLink 
          to="/admin/dashboard" 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          active={isActive('/admin/dashboard')} 
        />

        {/* Upload Assets Link */}
        <SidebarLink 
          to="/admin/upload" 
          icon={<UploadCloud size={20} />} 
          label="Upload Assets" 
          active={isActive('/admin/upload')} 
        />

        {/* Manage Files Link */}
        <SidebarLink 
          to="/admin/reports" 
          icon={<FolderTree size={20} />} 
          label="Manage Files" 
          active={isActive('/admin/reports')} 
        />
  
        {/* Category Link (Ab Premium style mein) */}
        <SidebarLink 
          to="/admin/category" 
          icon={<Tags size={20} />} 
          label="Category Management" 
          active={isActive('/admin/category')} 
        />
      </nav>

      {/* 3. Footer: User & Logout */}
      <div className="p-6 mt-auto">
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 text-xs font-bold">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-slate-500 truncate">System Active</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-5 py-4 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-2xl transition-all duration-300 group border border-transparent hover:border-red-500/20"
        >
          <div className="flex items-center gap-3">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold tracking-wide">Logout</span>
          </div>
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
        </button>
      </div>
    </div>
  );
};

// Reusable Nav Link Component for Clean Code
const SidebarLink = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
        : 'hover:bg-slate-800/80 text-slate-400 hover:text-slate-100'
    }`}
  >
    <div className="flex items-center gap-4">
      <span className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors duration-300`}>
        {icon}
      </span>
      <span className="text-sm font-bold tracking-wide">{label}</span>
    </div>
    {active && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]"></div>}
  </Link>
);

export default Sidebar;