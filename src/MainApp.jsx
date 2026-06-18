import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Komponen Login
function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Login Klinik Cerdas</h1>
      <button 
        onClick={() => navigate('/dashboard')}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Masuk ke Sistem
      </button>
    </div>
  );
}

// Komponen Dashboard (Data Pasien)
function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Data Pasien</h1>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <p>Daftar Rekam Medis akan tampil di sini...</p>
      </div>
    </div>
  );
}

// Pengatur Rute
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}