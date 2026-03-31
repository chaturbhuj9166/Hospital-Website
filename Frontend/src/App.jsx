import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Gallery from "./pages/Gallery";
import ReportDetail from "./pages/ReportDetail";
import Category from "./pages/Category";
import ManageReports from "./pages/ManageReports";
import EditReport from "./pages/EditReport";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/report/:id" element={<ReportDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/upload" element={<Upload />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/reports" element={<ManageReports />} />
          <Route path="/admin/edit/:id" element={<EditReport />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;