const FileCard = ({ report, img, index, onClick }) => (
  <div 
    onClick={onClick}
    className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2"
  >
    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
      <img
        src={`http://localhost:5000/${img}`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        alt="Medical Asset"
      />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-blue-600 shadow-sm">
        {report.category}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-slate-800 truncate">{report.patientName}</h3>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs font-medium text-slate-400 italic">Image #{index + 1}</p>
        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <i className="fa-solid fa-arrow-right text-[10px]"></i>
        </div>
      </div>
    </div>
  </div>
);

export default FileCard;