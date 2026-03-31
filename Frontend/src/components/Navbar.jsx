import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Active link check करने के लिए छोटा सा लॉजिक (सिर्फ स्टाइलिंग के लिए)
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          <i className="fa-solid fa-plus text-xs"></i>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">
          Medical<span className="text-blue-600">Gallery</span>
        </h1>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-8">
        <Link 
          to="/" 
          className={`text-sm font-semibold transition-all duration-300 hover:text-blue-600 ${
            isActive('/') ? 'text-blue-600' : 'text-slate-600'
          }`}
        >
          Gallery
        </Link>
        
        <Link 
          to="/login" 
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-200 active:scale-95"
        >
          Admin Portal
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;