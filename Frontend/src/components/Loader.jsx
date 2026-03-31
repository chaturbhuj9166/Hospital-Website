const Loader = () => (
  <div className="flex flex-col justify-center items-center h-64 gap-4">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-lg"></div>
    <p className="text-slate-400 font-medium animate-pulse">Fetching medical records...</p>
  </div>
);
export default Loader;