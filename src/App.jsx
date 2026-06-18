import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, ShieldCheck, Activity, Users, 
  MessageSquare, DollarSign, UserPlus, Bell, LogOut, 
  HeartPulse, Building2, Clock, ArrowRight, ChevronDown, 
  ChevronUp, FileText, PlusCircle, MinusCircle, 
  Trash2, Edit, Calendar, ClipboardList, Stethoscope, Database, Download, X, Settings
} from 'lucide-react';
import { supabase } from './supabaseClient';
// --- DATABASE MOCKUP ---
const initialUsers = [
  { id: 1, nama: "Dr. Tirta (Pemilik)", email: "owner@klinik.com", role: "pemilik" },
  { id: 2, nama: "Admin Rara", email: "admin@klinik.com", role: "admin_klinik" },
  { id: 3, nama: "CS Siska", email: "cs@klinik.com", role: "cs" },
  { id: 4, nama: "Finance Budi", email: "finance@klinik.com", role: "keuangan" },
];

// --- KOMPONEN LANDING PAGE & LOGIN ---
const LandingPage = ({ onLogin }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState(''); // Tambahan state password
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // Meminta Supabase mencari data user yang email dan password-nya cocok
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', emailInput)
      .eq('password', passwordInput)
      .single(); // Harus cocok persis 1 data

    if (error || !data) {
      // Jika tidak ketemu atau salah ketik
      setErrorMsg('Login gagal: Email atau Password salah.');
      setIsLoading(false);
    } else {
      // Siapkan data ringkas untuk disimpan
      const userAktif = {
        nama: data.nama,
        email: data.email,
        role: data.role
      };
      
      // 1. Simpan ke saku browser (localStorage) agar tidak hilang saat F5
      localStorage.setItem('sesiKlinik', JSON.stringify(userAktif));
      
      // 2. Izinkan masuk ke Dashboard!
      onLogin(userAktif);
      navigate('/dashboard');
    }
  }; //
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-8 w-8 text-teal-600" />
              <span className="font-bold text-2xl text-teal-800">Klinik<span className="text-amber-500">Cerdas</span></span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#fitur" className="hidden md:block text-sm font-bold text-slate-600 hover:text-teal-600">Fitur</a>
              <a href="#harga" className="hidden md:block text-sm font-bold text-slate-600 hover:text-teal-600">Harga</a>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="bg-amber-400 text-slate-900 px-6 py-2 rounded-full font-bold hover:bg-amber-500 transition flex items-center gap-2 shadow-sm"
              >
                Login Sistem <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border-t-4 border-teal-500 animate-in fade-in zoom-in duration-200">
            <h3 className="text-2xl font-bold text-teal-900 mb-2">Masuk ke Dashboard</h3>
            <p className="text-sm text-slate-500 mb-6">Masukkan email dan password yang terdaftar di sistem.</p>
            
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="contoh: dokter@klinik.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>

              {/* Tambahan Kolom Password */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="Masukkan password..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>
              
              {errorMsg && (
                <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
                  <ShieldCheck size={16} /> {errorMsg}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition mb-4 shadow-md text-lg flex justify-center items-center gap-2"
              >
                {isLoading ? 'Mengecek...' : 'Masuk Dashboard'}
              </button>
            </form>

            <button onClick={() => setShowLoginModal(false)} className="w-full text-center text-slate-500 hover:text-slate-800 font-bold p-2">
              Batal & Kembali
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gradient-to-b from-teal-50 to-white text-center px-4 relative overflow-hidden">
        <div className="absolute top-20 left-10 text-teal-100 opacity-50"><HeartPulse size={120} /></div>
        <div className="absolute bottom-10 right-10 text-amber-100 opacity-50"><Activity size={150} /></div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 max-w-4xl mx-auto leading-tight tracking-tight relative z-10">
          Ubah Klinik Anda Jadi Lebih <span className="text-teal-600 block mt-2">Modern, Profesional, dan Efisien</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed relative z-10">
          Dari manajemen antrian, rekam medis elektronik, pembukuan keuangan, hingga laporan otomatis. Semua terselesaikan dalam satu platform yang praktis.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 relative z-10">
          <button onClick={() => setShowLoginModal(true)} className="bg-teal-600 text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-teal-700 transition shadow-xl hover:shadow-teal-600/20 flex items-center justify-center gap-2">
            <Calendar size={20} /> Coba Demo Sekarang
          </button>
          <a href="#harga" className="bg-white text-teal-800 border-2 border-teal-100 px-8 py-3.5 rounded-full font-bold text-lg hover:bg-teal-50 hover:border-teal-200 transition shadow-sm flex items-center justify-center gap-2">
            <DollarSign size={20} /> Lihat Paket Harga
          </a>
        </div>
      </div>
      {/* --- KODE FITUR & HARGA YANG HILANG --- */}
      {/* Bagian Fitur */}
      <div id="fitur" className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Fitur Unggulan Kami</h2>
            <p className="mt-4 text-slate-500">Semua yang Anda butuhkan untuk menjalankan klinik modern.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center text-teal-600 mb-4">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Antrian Real-time</h3>
              <p className="text-slate-600">Pantau pergerakan antrian pasien secara langsung. Bebas penumpukan di ruang tunggu.</p>
            </div>
            {/* Card 2 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition">
              <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center text-amber-600 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Rekam Medis (RM)</h3>
              <p className="text-slate-600">Pencatatan riwayat penyakit, alergi, dan diagnosa yang aman, rapi, dan mudah dicari.</p>
            </div>
            {/* Card 3 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition">
              <div className="bg-rose-100 w-12 h-12 rounded-lg flex items-center justify-center text-rose-600 mb-4">
                <DollarSign size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Laporan Keuangan</h3>
              <p className="text-slate-600">Otomatis mencatat pemasukan harian dan bulanan. Mudah untuk evaluasi klinik.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Harga */}
      <div id="harga" className="py-20 bg-slate-50 px-4 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Pilih Paket Sesuai Kebutuhan</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Paket Gratis */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800">Starter</h3>
              <div className="text-4xl font-extrabold text-teal-600 my-4">Gratis</div>
              <ul className="text-left text-slate-600 space-y-3 mb-8">
                <li>✓ Maksimal 50 pasien / bulan</li>
                <li>✓ Fitur Antrian Dasar</li>
                <li>✓ 1 Akun Dokter</li>
              </ul>
              <button className="w-full py-3 rounded-full border-2 border-teal-600 text-teal-600 font-bold hover:bg-teal-50">Mulai Gratis</button>
            </div>
            {/* Paket Pro */}
            <div className="bg-teal-600 p-8 rounded-3xl shadow-xl text-white transform md:-translate-y-4 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">POPULER</div>
              <h3 className="text-xl font-bold">Premium</h3>
              <div className="text-4xl font-extrabold my-4">Rp 199k<span className="text-sm font-normal opacity-80">/bln</span></div>
              <ul className="text-left space-y-3 mb-8 opacity-90">
                <li>✓ Pasien Tanpa Batas</li>
                <li>✓ Semua Fitur Laporan</li>
                <li>✓ Unlimited Akun Karyawan</li>
                <li>✓ Prioritas Bantuan</li>
              </ul>
              <button className="w-full py-3 rounded-full bg-white text-teal-600 font-bold hover:bg-slate-50">Pilih Premium</button>
            </div>
          </div>
        </div>
      </div>
      {/* --- BATAS AKHIR KODE FITUR & HARGA --- */}
      {/* Footer / Info Singkat */}
      <footer className="bg-white py-6 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} KlinikCerdas. All rights reserved.</p>
      </footer>
    </div>
  );
}; 

// --- KOMPONEN DASHBOARD (SISTEM KLINIK) ---
const Dashboard = ({ 
  user, usersData, setUsersData, onLogout,
  pasienData, setPasienData,
  antrianData, setAntrianData,
  karyawanData, setKaryawanData,
  financeTransactions, setFinanceTransactions,
  reminderData, setReminderData,
  laporanData, setLaporanData
}) => {
// State untuk Pop-up Tambah Akun
  const [showAddUserModal, setShowAddUserModal] = useState(false);
const [hrdTab, setHrdTab] = useState('data_karyawan');
const [absensiData, setAbsensiData] = useState([]);
const [showAbsensiModal, setShowAbsensiModal] = useState(false);
const [penggajianData, setPenggajianData] = useState([]);
const [showPenggajianModal, setShowPenggajianModal] = useState(false);
const [klinikId, setKlinikId] = useState(null);
// State untuk Fitur Ganti Password
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Fungsi menyimpan akun baru ke Supabase
  const handleSimpanAkun = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newAkun = {
      id_user: `U-${Date.now()}`,
      nama: formData.get('nama'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      klinik_id: 'klinik_pusat'
    };

    const { error } = await supabase.from('users').insert([newAkun]);

    if (error) {
      alert("Gagal membuat akun: " + error.message);
    } else {
      setUsersData([...usersData, newAkun]); // Update tampilan tabel
      setShowAddUserModal(false); // Tutup pop-up
    }
    // Fungsi menghapus akun dari Supabase
  const handleDeleteAkses = async (idUser) => {
    // 1. Munculkan kotak konfirmasi (agar tidak terhapus tidak sengaja)
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus akun ini?");
    
    if (konfirmasi) {
      // 2. Perintah hapus data ke Supabase berdasarkan ID
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id_user', idUser);

      if (error) {
        alert("Gagal menghapus akun: " + error.message);
      } else {
        // 3. Jika berhasil di database, hapus juga dari tampilan tabel di layar
        const sisaAkun = usersData.filter(k => k.id_user !== idUser);
        setUsersData(sisaAkun);
      }
    }
  };
  };


 const bolehAkses = (menuId) => {
    if (!user) return false;
    
    // Ubah role jadi huruf kecil agar cocok dengan catatan
    const userRole = user.role.toLowerCase();

    // Pemilik memegang kunci Master (Bisa lihat Pengaturan Akses)
    if (userRole === 'pemilik') return true; 

    // Jabatan lain dibatasi sesuai porsinya
    if (userRole === 'cs') return ['antrian', 'pasien', 'komunikasi', 'laporan', 'lap_anc', 'lap_partus', 'lap_bidan', 'lap_shk', 'lap_imunisasi', 'lap_kb'].includes(menuId);
    if (userRole === 'admin') return ['antrian', 'karyawan', 'laporan', 'lap_anc', 'lap_partus', 'lap_bidan', 'lap_shk', 'lap_imunisasi', 'lap_kb'].includes(menuId);
    if (userRole === 'finance') return ['antrian', 'keuangan'].includes(menuId);
    
    // Jika tidak ada di daftar, blokir total!
    return false;
  };
 // 1. Ambil ingatan dari browser
  const [activeMenu, setActiveMenu] = useState(() => {
    return localStorage.getItem('menuTerakhir') || 'antrian';
  });

  // 2. Catat otomatis setiap pindah menu
  useEffect(() => {
    localStorage.setItem('menuTerakhir', activeMenu);
  }, [activeMenu]);
  const [expandedMenu, setExpandedMenu] = useState('');
  const navigate = useNavigate();
  
  const [showPasienModal, setShowPasienModal] = useState(false); 
  const [showInputDatabaseModal, setShowInputDatabaseModal] = useState(false); 
  const [showPasienLamaModal, setShowPasienLamaModal] = useState(false); 
  const [editPasienModal, setEditPasienModal] = useState({ isOpen: false, data: null });
  
  const [showFinanceModal, setShowFinanceModal] = useState(null); 
  const [kategoriKeuangan, setKategoriKeuangan] = useState(''); 

  const [showPeriksaModal, setShowPeriksaModal] = useState({ isOpen: false, data: null, source: 'antrian' });
  const [showKaryawanModal, setShowKaryawanModal] = useState(false);
  const [showAbsensiSusulanModal, setShowAbsensiSusulanModal] = useState(false);
  const [aksesModal, setAksesModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [editReminderModal, setEditReminderModal] = useState({ isOpen: false, data: null });
  const [showInputLaporanModal, setShowInputLaporanModal] = useState(false);
  const [editFinanceModal, setEditFinanceModal] = useState({ isOpen: false, data: null });

  const [dobInput, setDobInput] = useState('');
  const [calculatedAge, setCalculatedAge] = useState('');

  // Periksa apakah user sudah login, jika belum kembalikan ke landing page
  useEffect(() => {
      if(!user) {
          navigate('/');
      }
  }, [user, navigate])

  useEffect(() => {
    if (dobInput) {
      const diffMs = Date.now() - new Date(dobInput).getTime();
      const ageDt = new Date(diffMs); 
      setCalculatedAge(Math.abs(ageDt.getUTCFullYear() - 1970) + " Tahun");
    } else {
      setCalculatedAge('');
    }
  }, [dobInput]);

  const allMenuItems = [
    { id: 'antrian', label: 'Antrian Hari Ini', icon: ClipboardList },
    { id: 'pasien', label: 'Data Pasien (RM)', icon: Users },
    { id: 'keuangan', label: 'Keuangan Klinik', icon: DollarSign },
    { id: 'komunikasi', label: 'Reminder Pasien', icon: MessageSquare },
    { id: 'hrd', label: 'Karyawan & HRD', icon: Clock },
   { id: 'karyawan', label: 'Karyawan & HRD', icon: Users },
{ id: 'pengaturan', label: 'Pengaturan Akses', icon: Settings },
    { 
      id: 'laporan', 
      label: 'Laporan-laporan', 
      icon: FileText,
      subItems: [
        { id: 'lap_anc', label: 'Laporan ANC' },
        { id: 'lap_partus', label: 'Laporan Partus' },
        { id: 'lap_bidan', label: 'Laporan Bidan' },    
        { id: 'lap_shk', label: 'Laporan SHK' },            
        { id: 'lap_imunisasi', label: 'Laporan Imunisasi' },
        { id: 'lap_kb', label: 'Laporan KB' },              
      ]
    },
    { id: 'hak_akses', label: 'Pengaturan Akses', icon: ShieldCheck },
  ];

 const rolePermissions = {
    pemilik: ['antrian', 'pasien', 'keuangan', 'komunikasi', 'karyawan', 'laporan', 'lap_anc', 'lap_partus', 'lap_bidan', 'lap_shk', 'lap_imunisasi', 'lap_kb', 'hak_akses'],
    cs: ['antrian', 'pasien', 'komunikasi', 'laporan', 'lap_anc', 'lap_partus', 'lap_bidan', 'lap_shk', 'lap_imunisasi', 'lap_kb'],
    admin: ['antrian', 'karyawan', 'laporan', 'lap_anc', 'lap_partus', 'lap_bidan', 'lap_shk', 'lap_imunisasi', 'lap_kb'],
    finance: ['antrian', 'keuangan']
  };

  // 1. Ubah role jadi huruf kecil semua agar tidak meleset (misal 'Cs' atau 'CS' tetap terbaca 'cs')
  const roleAktif = user?.role?.toLowerCase() || '';
  
  // 2. Ambil daftar izin sesuai role tersebut
  const allowedMenuIds = rolePermissions[roleAktif] || [];
  
  // 3. Filter menu utama
  const menuItems = allMenuItems.filter(menu => allowedMenuIds.includes(menu.id));

 React.useEffect(() => {
  // Mengecek dari daftar 'allowedMenuIds' agar anak menu (submenu laporan) tidak ikut tertendang
  if (menuItems.length > 0 && !allowedMenuIds.includes(activeMenu)) {
    setActiveMenu(menuItems[0].id);
  }
}, [activeMenu, allowedMenuIds, menuItems]);

// (Baris 401) ], [user, allowedMenuIds, activeMenu, menuItems]); 
  
  // --- FUNGSI SIMPAN LAPORAN ANC ---
  const handleSimpanANC = async (e) => {
      // ... (isi kode ANC) ...
  };

  // (Baris 403) const handleSimpanPasienBaru = async (e) => {


    // --- FUNGSI AMBIL DATA KARYAWAN ---
  // --- FUNGSI PENGGAJIAN ---
const fetchPenggajian = async () => {
  const { data, error } = await supabase.from('penggajian').select('*').order('id', { ascending: false });
  if (!error && data) setPenggajianData(data);
};

const handleSimpanPenggajian = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const karyawanId = formData.get('karyawan_id');
  const karyawanTerpilih = karyawanData.find(k => k.id == karyawanId);

  const gapok = parseFloat(formData.get('gaji_pokok')) || 0;
  const tunj = parseFloat(formData.get('tunjangan')) || 0;
  const potong = parseFloat(formData.get('potongan')) || 0;
  const total = gapok + tunj - potong;

  const newGaji = {
    karyawan_id: karyawanId,
    nama_karyawan: karyawanTerpilih ? karyawanTerpilih.nama : 'Tidak Diketahui',
    periode_bulan: formData.get('periode_bulan'),
    gaji_pokok: gapok, tunjangan: tunj, potongan: potong, total_gaji: total,
    status_bayar: formData.get('status_bayar')
  };

  const { data, error } = await supabase.from('penggajian').insert([newGaji]).select();
  if (error) alert("Gagal menyimpan gaji: " + error.message);
  else {
    setPenggajianData([data[0], ...penggajianData]);
    setShowPenggajianModal(false);
    alert("Data Gaji berhasil disimpan!");
  }
};
    // --- FUNGSI ABSENSI ---
  const fetchAbsensi = async () => {
  const { data, error } = await supabase.from('absensi').select('*').order('tanggal', { ascending: false });
  if (!error && data) setAbsensiData(data);
};

const handleSimpanAbsensi = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  // Cari nama karyawan berdasarkan ID yang dipilih
  const karyawanId = formData.get('karyawan_id');
  const karyawanTerpilih = karyawanData.find(k => k.id == karyawanId);

  const newAbsensi = {
    karyawan_id: karyawanId,
    nama_karyawan: karyawanTerpilih ? karyawanTerpilih.nama : 'Tidak Diketahui',
    tanggal: formData.get('tanggal'),
    status_hadir: formData.get('status_hadir'),
    jam_lembur: parseInt(formData.get('jam_lembur')) || 0,
    keterangan: formData.get('keterangan')
  };

  const { data, error } = await supabase.from('absensi').insert([newAbsensi]).select();
  if (error) {
    alert("Gagal menyimpan absensi: " + error.message);
  } else {
    setAbsensiData([data[0], ...absensiData]);
    setShowAbsensiModal(false);
    alert("Absensi berhasil disimpan!");
  }
};
 const fetchKaryawan = async () => {
    if (!klinikId) return; // <--- PASTIKAN KLINIK ID ADA
    const { data, error } = await supabase.from('karyawan').select('*').eq('klinik_id', klinikId);
    if (!error && data) setKaryawanData(data);
  };

  // --- FUNGSI SIMPAN KARYAWAN BARU ---
  const handleSimpanKaryawan = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newKaryawan = {
      klinik_id: klinikId, // <--- SUNTIKAN KLINIK DINAMIS
      nama: formData.get('nama'),
      jabatan: formData.get('jabatan'),
      nip: formData.get('nip'),
      tanggal_masuk: formData.get('tanggal_masuk'),
      status: formData.get('status')
    };

    const { data, error } = await supabase.from('karyawan').insert([newKaryawan]).select();
    if (error) {
      alert("Gagal menyimpan: " + error.message);
    } else {
      setKaryawanData([...karyawanData, data[0]]);
      setShowKaryawanModal(false);
      alert("Data Karyawan berhasil ditambahkan!");
    }
  };

  const handleSimpanPasienBaru = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const isBpjs = formData.get('cara_bayar') === 'BPJS';
    const waktuSekarang = Date.now(); // Kunci ID Unik Anti-Kembar
    const newId = `RM-${waktuSekarang}`; 
    const tanggalSekarang = new Date().toLocaleDateString('id-ID');
    
    // 1. Siapkan data Pasien
    const newPasienDB = {
      id: newId, 
      nama: formData.get('nama'), 
      nik: formData.get('nik'), 
      hp: formData.get('hp'),
      no_bpjs: isBpjs ? "Terdaftar" : "-", 
      bpjs: isBpjs, 
      satu_sehat: true, 
      last_visit: tanggalSekarang,
      klinik_id: klinikId // <--- MENGGANTI 'klinik_pusat' MENJADI DINAMIS
    };

    // 2. Tembakkan ke tabel Pasien Supabase
    const { error: errorPasien } = await supabase.from('pasien').insert([newPasienDB]);
    if (errorPasien) {
      alert("Error Simpan Pasien: " + errorPasien.message);
      return;
    }

    // 3. Siapkan data Antrian
    const newAntrianDB = {
      id_antrian: `A-${waktuSekarang}`,
      pasien_id: newId,
      nama: formData.get('nama'),
      layanan: formData.get('layanan'),
      status: "Menunggu",
      klinik_id: klinikId // <--- MENGGANTI 'klinik_pusat' MENJADI DINAMIS
    };

    // 4. Tembakkan ke tabel Antrian Supabase
    const { error: errorAntrian } = await supabase.from('antrian').insert([newAntrianDB]);
    if (errorAntrian) {
      alert("Error Simpan Antrian: " + errorAntrian.message);
    }

    // 5. Perbarui tampilan di layar (UI)
    const newPasienUI = { ...newPasienDB, noBpjs: newPasienDB.no_bpjs, lastVisit: newPasienDB.last_visit };
    setPasienData([newPasienUI, ...pasienData]);
    
    const newAntrianUI = { ...newAntrianDB, idAntrian: newAntrianDB.id_antrian, pasienId: newAntrianDB.pasien_id };
    setAntrianData([...antrianData, newAntrianUI]);

    setShowPasienModal(false); 
    setDobInput(''); 
    setActiveMenu('antrian'); 
  };

  const handleSimpanDatabaseLama = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const isBpjs = !!formData.get('bpjs');
    const newId = `RM00${pasienData.length + 1}`;
    
    const newPasien = {
      id: newId, nama: formData.get('nama'), nik: formData.get('nik'), hp: formData.get('hp'),
      noBpjs: formData.get('bpjs') || "-", bpjs: isBpjs, satuSehat: true, lastVisit: formData.get('last_visit') || "Data Lama"
    };

    setPasienData([...pasienData, newPasien]);
    setShowInputDatabaseModal(false);
  };

  const handleUpdatePasien = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setPasienData(pasienData.map(p => p.id === editPasienModal.data.id ? {
      ...p, nama: formData.get('nama'), nik: formData.get('nik'), hp: formData.get('hp'), noBpjs: formData.get('bpjs') || "-",
    } : p));
    setEditPasienModal({isOpen: false, data: null});
  };

  const handleSimpanPasienLama = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedId = formData.get('pasien_id');
    const pasien = pasienData.find(p => p.id === selectedId);
    
    if(pasien) {
      const newAntrian = {
        idAntrian: `A-00${antrianData.length + 1}`, pasienId: pasien.id, nama: pasien.nama,
        layanan: formData.get('layanan'), status: "Menunggu", diagnosa: "", analisa: ""
      };
      setAntrianData([...antrianData, newAntrian]);
      setPasienData(pasienData.map(p => p.id === pasien.id ? {...p, lastVisit: new Date().toLocaleDateString('id-ID')} : p));
      setShowPasienLamaModal(false); setActiveMenu('antrian');
    }
  };

 const handleSimpanDiagnosa = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tglKembali = formData.get('tgl_kembali');
    const keperluan = formData.get('keperluan');
    const diagnosaBaru = formData.get('diagnosa') || '';
    const analisaBaru = formData.get('analisa') || '';

    if (showPeriksaModal.source === 'antrian') {
      
      // 1. UPDATE STATUS DI DATABASE SUPABASE
      const { error } = await supabase
        .from('antrian')
        .update({ 
          status: 'Selesai', 
          diagnosa: diagnosaBaru,
          analisa: analisaBaru
        })
        .eq('id_antrian', showPeriksaModal.data.idAntrian);

      if (error) {
        alert("Gagal menyimpan hasil pemeriksaan ke database.");
        console.error(error);
        return;
      }

      // 2. PERBARUI TAMPILAN LOKAL (Agar langsung hilang dari daftar)
      setAntrianData(antrianData.map(a => {
        if(a.idAntrian === showPeriksaModal.data.idAntrian) {
          return { ...a, status: "Selesai", diagnosa: diagnosaBaru, analisa: analisaBaru };
        }
        return a;
      }));

    } else {
      // Logika untuk edit pasien lama di rekam medis
      setPasienData(pasienData.map(p => p.id === showPeriksaModal.data.id ? { ...p } : p));
    }

    // 3. LOGIKA PENGINGAT / REMINDER KONTROL (TERHUBUNG KE SUPABASE)
    if (tglKembali && keperluan) {
      const pasien = pasienData.find(p => p.nama === showPeriksaModal.data.nama);
      const noHpPasien = pasien?.hp ? pasien.hp : "-";

      const newReminderDB = {
        id_reminder: `REM-${Date.now()}`, 
        nama: showPeriksaModal.data.nama,
        waktu: tglKembali, 
        nowa: noHpPasien, 
        status: "Belum Dihubungi",
        jenis: keperluan,
        klinik_id: 'klinik_pusat'
      };

      const simpanReminderKeDatabase = async () => {
        const { error } = await supabase.from('reminder').insert([newReminderDB]);
        // INI YANG BARU: Memunculkan pop-up kalau Supabase menolak data
        if (error) {
          alert("Error Supabase Reminder: " + error.message);
        }
      };
      simpanReminderKeDatabase();

      const newReminderUI = { ...newReminderDB, id: newReminderDB.id_reminder };
      setReminderData([...reminderData, newReminderUI]);
    }

    // 4. TUTUP POP-UP MODAL
    setShowPeriksaModal({ isOpen: false, data: null, source: '' });
  };

const handleUpdateReminder = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // 1. Kumpulkan data baru yang diketik di pop-up
    const updatedData = {
      nama: formData.get('nama'),
      waktu: formData.get('waktu'),
      jenis: formData.get('jenis'),
      nowa: formData.get('nowa'),
      status: formData.get('status')
    };

    // 2. Tembakkan perintah UPDATE ke Supabase berdasarkan ID Reminder
    const { error } = await supabase
      .from('reminder')
      .update(updatedData)
      .eq('id_reminder', editReminderModal.data.id);

    if (error) {
      alert("Gagal mengupdate status di database: " + error.message);
      return;
    }

    // 3. Perbarui tampilan layar agar selaras dengan database
    setReminderData(reminderData.map(r => 
      r.id === editReminderModal.data.id ? { ...r, ...updatedData } : r
    ));
    
    setEditReminderModal({ isOpen: false, data: null });
  };

  const handleKirimWA = (reminder) => {
    let phone = reminder.noWa.replace(/\D/g, '');
    if (phone.startsWith('0')) phone = '62' + phone.substring(1);
    const message = `Halo Bapak/Ibu ${reminder.nama}, ini dari KlinikCerdas. Kami mengingatkan jadwal Anda untuk *${reminder.jenis}* pada tanggal: *${reminder.waktu}*. Mohon konfirmasi kehadirannya ya. Terima kasih!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    setReminderData(reminderData.map(r => r.id === reminder.id ? { ...r, status: "Sudah Dihubungi" } : r));
  };

  const handleSaveAkses = (e) => { 
    e.preventDefault(); 
    const formData = new FormData(e.target); 
    const newData = { nama: formData.get('nama'), email: formData.get('email').toLowerCase(), role: formData.get('role') }; 
    if (aksesModal.mode === 'add') { 
      const newId = usersData.length > 0 ? Math.max(...usersData.map(u => u.id)) + 1 : 1; 
      setUsersData([...usersData, { id: newId, ...newData }]); 
    } else { 
      setUsersData(usersData.map(u => u.id === aksesModal.data.id ? { ...u, ...newData } : u)); 
    } 
    setAksesModal({ isOpen: false, mode: 'add', data: null }); 
  };
  
  const handleDeleteAkses = (id) => { 
    if (window.confirm('Yakin ingin menghapus akses akun ini?')) { 
      setUsersData(usersData.filter(u => u.id !== id)); 
    } 
  };
  
    
  const handleSimpanAbsensiSusulan = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const karyId = parseInt(formData.get('karyawan_id'));
    const status = formData.get('status');
    const lembur = parseInt(formData.get('lembur')) || 0;

    setKaryawanData(karyawanData.map(k => {
      if (k.id === karyId) {
        let addHadir = 0; let addCuti = 0; let addLibur = 0;
        if (status === 'Hadir') addHadir = 1;
        else if (['Cuti', 'Sakit', 'Izin'].includes(status)) addCuti = 1;
        else if (status === 'Libur') addLibur = 1;

        return {
          ...k,
          hadirTotal: (k.hadirTotal || 0) + addHadir,
          cutiTotal: (k.cutiTotal || 0) + addCuti,
          liburTotal: (k.liburTotal || 0) + addLibur,
          lemburJam: (k.lemburJam || 0) + lembur
        };
      }
      return k;
    }));
    setShowAbsensiSusulanModal(false);
  };

  const handleExportAbsensi = () => {
    const headers = ["ID", "Nama Karyawan", "Posisi", "Total Hadir (Hari)", "Total Cuti/Sakit/Izin (Hari)", "Total Libur (Hari)", "Total Jam Lembur"];
    const csvRows = karyawanData.map(k => 
      `${k.id},"${k.nama}","${k.posisi}",${k.hadirTotal||0},${k.cutiTotal||0},${k.liburTotal||0},${k.lemburJam||0}`
    );
    const csvContent = [headers.join(","), ...csvRows].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan_Absensi_Klinik_${new Date().toLocaleDateString('id-ID')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSimpanKeuangan = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const kat = kategoriKeuangan || formData.get('kategori');
    const namaPasien = formData.get('pasien_periksa');
    const descTambahan = namaPasien && kat === 'Pasien Periksa' ? ` - ${namaPasien}` : '';

    // 1. Siapkan data untuk dikirim ke Database Supabase
    const newId = `TRX-${Date.now()}`; // Kita buat ID unik berdasarkan waktu
    const newTransactionDB = {
      id_transaksi: newId,
      tanggal: formData.get('tanggal'),
      jenis: showFinanceModal === 'in' ? 'Masuk' : 'Keluar',
      kategori: kat,
      nominal: parseInt(formData.get('nominal')),
      keterangan: formData.get('keterangan') + descTambahan,
      klinik_id: 'klinik_pusat'
    };

    // 2. Tembakkan ke tabel 'transaksi' di Supabase
    const { error } = await supabase.from('transaksi').insert([newTransactionDB]);
    
    if (error) {
      alert("Gagal menyimpan transaksi ke database.");
      console.error(error);
      return;
    }

    // 3. Perbarui tampilan di layar (UI) agar langsung muncul tanpa F5
    const newTransactionUI = {
      id: newTransactionDB.id_transaksi,
      tanggal: newTransactionDB.tanggal,
      jenis: newTransactionDB.jenis,
      kategori: newTransactionDB.kategori,
      nominal: newTransactionDB.nominal,
      desc: newTransactionDB.keterangan // Di layar UI, namanya masih 'desc'
    };

    // Masukkan ke posisi paling atas daftar (terbaru)
    setFinanceTransactions([newTransactionUI, ...financeTransactions]);
    setShowFinanceModal(null);
    setKategoriKeuangan('');
  };

  const handleUpdateFinance = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setFinanceTransactions(financeTransactions.map(t => t.id === editFinanceModal.data.id ? {
      ...t,
      tanggal: formData.get('tanggal'),
      kategori: formData.get('kategori'),
      nominal: parseInt(formData.get('nominal')),
      desc: formData.get('keterangan')
    } : t));
    setEditFinanceModal({ isOpen: false, data: null });
  };

 
  const fetchLaporanData = async () => {
    const tables = ['laporan_anc', 'laporan_partus', 'laporan_shk', 'laporan_imunisasi', 'laporan_kb', 'laporan_bidan'];
    
    let allData = {};
    for (const table of tables) {
      const { data, error } = await supabase.from(table).select('*');
      if (error) {
        console.error(`Error ambil data ${table}:`, error);
      } else {
        // Karena menu di kodinganmu tidak pakai kata "laporan_", kita hapus awalan itu
        // Contoh: 'laporan_anc' di database akan disimpan sebagai 'lap_anc' di layar
        const menuKey = table.replace('laporan_', 'lap_'); 
        allData[menuKey] = data;
      }
    }
    setLaporanData(allData); 
  };

  // --- TAHAP 1: CARI KLINIK ID SAAT USER LOGIN ---
  React.useEffect(() => {
    const fetchUserKlinik = async () => {
      if (user) {
        // Asumsi tabel profilmu bernama 'users'
        const { data, error } = await supabase
          .from('users') 
          .select('klinik_id')
          .eq('id', user.id)
          .single();

        if (data && data.klinik_id) {
          setKlinikId(data.klinik_id); // Simpan ke ingatan aplikasi
        }
      }
    };
    fetchUserKlinik();
  }, [user]);

  // --- TAHAP 2: TARIK DATA HANYA SETELAH KLINIK ID DITEMUKAN ---
  React.useEffect(() => {
    if (klinikId) {
      fetchLaporanData();
      fetchKaryawan();
      fetchAbsensi();
      fetchPenggajian();
    }
  }, [klinikId]);

  // -----------------------------------------------------------

  const handleSimpanLaporan = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    
    // --- 1. PROSES TEMBAK KE DATABASE SUPABASE (KE 6 TABEL) ---
    try {
      if (activeMenu === 'lap_anc') {
        const { error } = await supabase.from('laporan_anc').insert([{
          id: `ANC-${Date.now()}`,
          klinik_id: klinikId, // <--- INI SUNTIKAN KLINIKNYA
          nama_pasien: formDataObj.pasien,
          tanggal_periksa: formDataObj.tanggal || null,
          hpht: formDataObj.hpht || null,
          tp_uk: formDataObj.tp_uk,
          diagnosa: formDataObj.diagnosa,
          kspr: formDataObj.kspr,
          bb_tb: formDataObj.bb_tb,
          lila: formDataObj.lila,
          hb: formDataObj.hb,
          golongan_darah: formDataObj.gol_darah,
          albumin: formDataObj.albumin,
          hiv: formDataObj.hiv,
          hepatitis_b: formDataObj.hepatitis_b,
          sifilis: formDataObj.sifilis,
          buku_kia: formDataObj.buku_kia === 'on',
          keterangan_tambahan: formDataObj.keterangan
        }]);
        if (error) throw error;

      } else if (activeMenu === 'lap_partus') {
        const { error } = await supabase.from('laporan_partus').insert([{
          id: `PRT-${Date.now()}`,
          klinik_id: klinikId, // <--- INI SUNTIKAN KLINIKNYA
          nama_pasien: formDataObj.pasien,
          tanggal_partus: formDataObj.tanggal || null,
          gpa: formDataObj.gpa,
          uk: formDataObj.uk,
          bbl: formDataObj.bbl,
          pbl: formDataObj.pbl,
          jenis_kelamin: formDataObj.jk_bayi,
          keadaan_umum_ibu: formDataObj.ku_ibu,
          vitamin_k: formDataObj.vitamin_k,
          hb_0: formDataObj.hb0,
          imd: formDataObj.imd,
          vitamin_a: formDataObj.vitamin_a,
          kb_pasca_salin: formDataObj.kb_pasca_salin,
          keterangan_tambahan: formDataObj.keterangan
        }]);
        if (error) throw error;

      } else if (activeMenu === 'lap_shk') {
        const { error } = await supabase.from('laporan_shk').insert([{
          id: `SHK-${Date.now()}`,
          klinik_id: klinikId, // <--- INI SUNTIKAN KLINIKNYA
          nama_ibu: formDataObj.pasien,
          tanggal_kunjungan: formDataObj.tanggal || null,
          nama_bayi: formDataObj.nama_bayi,
          tanggal_lahir_bayi: formDataObj.tgl_lahir_bayi || null,
          faskes_bayi_lahir: formDataObj.faskes_lahir,
          jenis_kelamin: formDataObj.jenis_kelamin,
          kembar: formDataObj.kembar,
          berat_badan: formDataObj.bb_bayi,
          panjang_badan: formDataObj.pb_bayi,
          umur_kehamilan: formDataObj.umur_kehamilan,
          kelainan_bawaan: formDataObj.kelainan_bawaan,
          bayi_mendapat_pengobatan: formDataObj.pengobatan_bayi,
          ibu_konsumsi_obat_tiroid: formDataObj.obat_tiroid_ibu,
          faskes_pengambil_sampel: formDataObj.faskes_sampel,
          tanggal_pengambilan_sampel: formDataObj.tgl_sampel || null,
          lokasi_darah: formDataObj.lokasi_darah,
          transfusi_darah: formDataObj.transfusi,
          tanggal_transfusi: formDataObj.tgl_transfusi || null,
          keterangan_tambahan: formDataObj.keterangan
        }]);
        if (error) throw error;

      } else if (activeMenu === 'lap_imunisasi') {
        const { error } = await supabase.from('laporan_imunisasi').insert([{
          id: `IMN-${Date.now()}`,
          klinik_id: klinikId, // <--- INI SUNTIKAN KLINIKNYA
          no_rm: formDataObj.no_rm_bayi,
          nama_bayi: formDataObj.nama_bayi,
          nik_bayi: formDataObj.nik_bayi,
          jenis_kelamin: formDataObj.jk_bayi,
          tgl_lahir_bayi: formDataObj.tgl_lahir_bayi || null,
          nama_ibu: formDataObj.nama_ibu,
          nik_ibu: formDataObj.nik_ibu,
          no_hp: formDataObj.hp_ibu,
          alamat_lengkap: formDataObj.alamat_ibu,
          hb0: formDataObj.v_hb0 || null, bcg: formDataObj.v_bcg || null, polio1: formDataObj.v_polio1 || null,
          dpt1: formDataObj.v_dpt1 || null, pcv1: formDataObj.v_pcv1 || null, polio2: formDataObj.v_polio2 || null,
          dpt2: formDataObj.v_dpt2 || null, pcv2: formDataObj.v_pcv2 || null, polio3: formDataObj.v_polio3 || null,
          dpt3: formDataObj.v_dpt3 || null, polio4: formDataObj.v_polio4 || null, ipv: formDataObj.v_ipv || null,
          campak: formDataObj.v_campak || null, je: formDataObj.v_je || null, pcv3: formDataObj.v_pcv3 || null,
          dpt_baduta: formDataObj.v_dpt_baduta || null, campak_baduta: formDataObj.v_campak_baduta || null,
          ipv2: formDataObj.v_ipv2 || null, ipv3: formDataObj.v_ipv3 || null, pcv4: formDataObj.v_pcv4 || null,
          ipv4: formDataObj.v_ipv4 || null, rotavirus1: formDataObj.v_rotavirus1 || null,
          rotavirus2: formDataObj.v_rotavirus2 || null, rotavirus3: formDataObj.v_rotavirus3 || null
        }]);
        if (error) throw error;

      } else if (activeMenu === 'lap_kb') {
        const { error } = await supabase.from('laporan_kb').insert([{
           id: `KBA-${Date.now()}`,
           klinik_id: klinikId, // <--- INI SUNTIKAN KLINIKNYA
           nama_pasien: formDataObj.pasien,
           tanggal_kunjungan: formDataObj.tanggal || null,
           metode_kontrasepsi: formDataObj.metode,
           jumlah_anak_hidup: formDataObj.jml_anak,
           usia_anak_terakhir: formDataObj.usia_anak,
           keadaan_anemia: formDataObj.anemia,
           lila: formDataObj.lila,
           penyakit_kronis: formDataObj.kronis,
           ims: formDataObj.ims,
           keterangan_tambahan: formDataObj.keterangan
        }]);
        if (error) throw error;

      } else if (activeMenu === 'lap_bidan') {
        const { error } = await supabase.from('laporan_bidan').insert([{
          id: `BDN-${Date.now()}`,
          klinik_id: klinikId, // <--- INI SUNTIKAN KLINIKNYA
          tanggal: formDataObj.tanggal || null,
          nama_pasien: formDataObj.pasien,
          keterangan_hasil: formDataObj.keterangan
        }]);
        if (error) throw error;
      }
    } catch (err) {
      alert("Gagal menyimpan Laporan ke Database: " + err.message);
      return; 
    }

    // --- 2. LOGIKA LAMA: TAMPILKAN DI TABEL LAYAR ---
    let keteranganVal = formDataObj.keterangan || '';
    
    if (activeMenu === 'lap_kb') {
      keteranganVal = `Metode: ${formDataObj.metode}${keteranganVal ? ` | Ket: ${keteranganVal}` : ''}`;
    } else if (activeMenu === 'lap_anc') {
      keteranganVal = `UK: ${formDataObj.tp_uk} | Dx: ${formDataObj.diagnosa}${keteranganVal ? ` | Ket: ${keteranganVal}` : ''}`;
    } else if (activeMenu === 'lap_shk') {
      keteranganVal = `Bayi: ${formDataObj.nama_bayi} | BB: ${formDataObj.bb_bayi || '-'}g${keteranganVal ? ` | Ket: ${keteranganVal}` : ''}`;
    } else if (activeMenu === 'lap_partus') {
      keteranganVal = `GPA: ${formDataObj.gpa} | Bayi: ${formDataObj.jk_bayi} (${formDataObj.bbl}g, ${formDataObj.pbl}cm)${keteranganVal ? ` | Ket: ${keteranganVal}` : ''}`;
    } else if (activeMenu === 'lap_imunisasi') {
      keteranganVal = `Bayi: ${formDataObj.nama_bayi} | Ibu: ${formDataObj.nama_ibu}${keteranganVal ? ` | Ket: ${keteranganVal}` : ''}`;
      formDataObj.pasien = formDataObj.nama_bayi; 
      formDataObj.tanggal = new Date().toLocaleDateString('id-ID'); 
    }

    const newData = {
      id: Date.now(),
      ...formDataObj, 
      tanggal: formDataObj.tanggal || new Date().toLocaleDateString('id-ID'),
      pasien: formDataObj.pasien,
      keterangan: keteranganVal
    };
    
    setLaporanData({
      ...laporanData,
      [activeMenu]: [...(laporanData[activeMenu] || []), newData]
    });
    
    alert("Data berhasil disimpan ke Database & Tampil di Laporan!");
    setShowInputLaporanModal(false);
  };

  const handleExportLaporan = (format) => {
    const dataToExport = laporanData[activeMenu] || [];
    if (dataToExport.length === 0) return; 
    
    const allKeys = Array.from(dataToExport.reduce((keys, obj) => {
       Object.keys(obj).forEach(k => { if(k !== 'id') keys.add(k); });
       return keys;
    }, new Set(['tanggal', 'pasien', 'keterangan'])));
    
    const csvRows = dataToExport.map(row => {
       return allKeys.map(k => {
         const val = row[k] === 'on' ? 'Ya' : (row[k] || ''); 
         return `"${val.toString().replace(/"/g, '""')}"`;
       }).join(',');
    });
    const csvContent = [allKeys.join(','), ...csvRows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan_${activeMenu}_${new Date().toLocaleDateString('id-ID')}.${format === 'excel' ? 'xls' : 'csv'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    // Validasi 1: Apakah password dan konfirmasinya sama?
    if (newPassword !== confirmPassword) {
      alert("Password baru dan konfirmasi password tidak cocok!");
      return;
    }

    // Validasi 2: Apakah password terlalu pendek? (Supabase minimal 6 karakter)
    if (newPassword.length < 6) {
      alert("Password minimal harus 6 karakter!");
      return;
    }

    // Eksekusi ganti password ke Supabase Auth
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      alert("Gagal memperbarui password: " + error.message);
    } else {
      alert("🔐 Password berhasil diperbarui! Sekarang akun Anda sepenuhnya aman.");
      setShowChangePasswordModal(false);
      setNewPassword('');
      setConfirmPassword('');
    }
  };

 

  const handleLogout = () => {
    onLogout();
    navigate('/');
  }

  const listPemasukan = ["Pasien Periksa", "Endorsement", "Kerjasama Brand", "Penjualan Obat", "Lain-lain"];
  const listPengeluaran = ["Beli Obat / Farmasi", "Alat Medis", "Perbaikan Klinik", "Gaji & Operasional", "Lain-lain"];

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      
     {/* SIDEBAR */}
          <div className="w-64 bg-teal-900 text-white shadow-md flex flex-col z-20">
            <div className="p-6 flex items-center gap-2 border-b border-teal-800 bg-teal-950">
              <HeartPulse className="h-6 w-6 text-amber-400" />
              <span className="font-bold text-xl text-white">Klinik<span className="text-amber-400">Cerdas</span></span>
            </div>
            
            <div className="flex-1 py-4 overflow-y-auto custom-scrollbar">
              {menuItems
                .filter((item) => bolehAkses(item.id))
                .map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        if (item.subItems) {
                          setExpandedMenu(expandedMenu === item.id ? '' : item.id);
                        } else {
                          setActiveMenu(item.id);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-6 py-3 text-left transition ${
                        (activeMenu === item.id || (item.subItems && expandedMenu === item.id))
                          ? 'bg-teal-800 text-amber-400 border-l-4 border-amber-400 font-semibold'
                          : 'text-teal-100 hover:bg-teal-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={20} className={activeMenu === item.id ? "text-amber-400" : "text-teal-300"} />
                        {item.label}
                      </div>
                      {item.subItems && (
                        expandedMenu === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </button>

                    {item.subItems && expandedMenu === item.id && (
                      <div className="bg-teal-950 py-2">
                        {item.subItems
                          .filter((sub) => bolehAkses(sub.id))
                          .map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => setActiveMenu(sub.id)}
                              className={`w-full text-left pl-14 pr-6 py-2 text-sm transition ${
                                activeMenu === sub.id ? 'text-amber-400 font-bold' : 'text-teal-300 hover:text-white'
                              }`}
                            >
                              {sub.label}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>

            <div className="p-4 border-t border-teal-800 bg-teal-950">
              <button 
            type="button"
            onClick={() => setShowChangePasswordModal(true)}
            className="flex items-center gap-2 text-teal-200 hover:text-white mb-4 w-full transition-colors"
          >
            <span className="text-lg">🔑</span> Ganti Password
          </button>
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 w-full px-2 py-2 font-medium transition">
                <LogOut size={20} /> Keluar Aplikasi
              </button>
            </div>
          </div>
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        {/* Topbar */}
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-8 z-10 border-b border-slate-200">
          <h1 className="text-xl font-bold text-teal-800 capitalize">
            {activeMenu.startsWith('lap_') 
              ? allMenuItems.find(m => m.id === 'laporan').subItems.find(s => s.id === activeMenu).label 
              : allMenuItems.find(m => m.id === activeMenu)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold uppercase border border-teal-200">
                {user?.nama?.charAt(0) || 'U'}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-sm text-slate-700 leading-none">{user?.nama}</span>
                <span className="text-xs text-teal-600 font-medium capitalize mt-1">{user?.role.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8 relative">
          
          {/* ========================================================= */}
          {/* TAMPILAN ANTRIAN HARI INI */}
          {activeMenu === 'antrian' && (
            <div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm flex flex-col">
                  <span className="text-slate-500 text-sm font-bold uppercase">Total Antrian</span>
                  <span className="text-2xl font-extrabold text-blue-700">{antrianData.length} Orang</span>
                </div>
                <div className="bg-white p-4 rounded-xl border-l-4 border-amber-500 shadow-sm flex flex-col">
                  <span className="text-slate-500 text-sm font-bold uppercase">Menunggu Diperiksa</span>
                  <span className="text-2xl font-extrabold text-amber-600">{antrianData.filter(a => a.status === 'Menunggu').length} Orang</span>
                </div>
                <div className="bg-white p-4 rounded-xl border-l-4 border-teal-500 shadow-sm flex flex-col">
                  <span className="text-slate-500 text-sm font-bold uppercase">Selesai / Pulang</span>
                  <span className="text-2xl font-extrabold text-teal-600">{antrianData.filter(a => a.status === 'Selesai').length} Orang</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Daftar Antrian Hari Ini</h2>
                    <p className="text-sm text-slate-500">Pasien yang terdaftar untuk layanan hari ini.</p>
                  </div>
                  <button 
                    onClick={() => setActiveMenu('pasien')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
                  >
                    <Users size={16}/> Lihat Database (RM)
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-teal-50 text-teal-800 text-sm border-b border-teal-100">
                        <th className="p-4 font-bold">No Antrian</th>
                        <th className="p-4 font-bold">No RM</th>
                        <th className="p-4 font-bold">Nama Pasien</th>
                        <th className="p-4 font-bold">Layanan</th>
                        <th className="p-4 font-bold">Status</th>
                        <th className="p-4 font-bold">Aksi Medis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {antrianData.length === 0 ? (
                        <tr><td colSpan="6" className="p-4 text-center text-slate-500 py-8">Belum ada antrian pasien hari ini.</td></tr>
                      ) : (
                        antrianData.map((a, i) => (
                          <tr key={i} className="border-b hover:bg-slate-50 transition">
                            <td className="p-4 text-teal-700 font-extrabold">{a.idAntrian}</td>
                            <td className="p-4 text-slate-600">{a.pasienId}</td>
                            <td className="p-4 text-slate-800 font-bold">{a.nama}</td>
                            <td className="p-4 text-slate-600 font-medium">{a.layanan}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${a.status === 'Selesai' ? 'bg-teal-100 text-teal-700' : 'bg-amber-100 text-amber-700'}`}>
                                {a.status}
                              </span>
                            </td>
                            <td className="p-4">
                              {user?.role === 'pemilik' || user?.role === 'medis' ? (
                                <button 
                                  onClick={() => setShowPeriksaModal({ isOpen: true, data: a, source: 'antrian' })}
                                  className={`${a.status === 'Selesai' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-teal-500 text-white hover:bg-teal-600 shadow-sm'} px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition`}
                                >
                                  <Stethoscope size={16}/> {a.status === 'Selesai' ? 'Lihat Medis' : 'Periksa Pasien'}
                                </button>
                              ) : (
                                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">Hak Akses Medis</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAMPILAN DATA PASIEN (RM) */}
          {activeMenu === 'pasien' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold text-teal-800">Database Rekam Medis (RM)</h2>
                  <p className="text-sm text-slate-500 mt-1">Kelola data pasien, input database lama, atau daftarkan kunjungan antrian.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setShowInputDatabaseModal(true)}
                    className="bg-amber-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-500 flex items-center gap-2 shadow-sm transition"
                    title="Hanya menambah data ke sistem tanpa masuk antrian hari ini"
                  >
                    <Database size={16} /> + Input Pasien Lama (Database)
                  </button>
                  <button 
                    onClick={() => setShowPasienLamaModal(true)}
                    className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 flex items-center gap-2 transition"
                  >
                    <ClipboardList size={16} /> Kunjungan Antrian
                  </button>
                  <button 
                    onClick={() => setShowPasienModal(true)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-700 flex items-center gap-2 shadow-sm transition"
                  >
                    <UserPlus size={16} /> Daftar Pasien Baru
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-sm border-b">
                      <th className="p-4 font-bold">No. RM</th>
                      <th className="p-4 font-bold">Nama Pasien</th>
                      <th className="p-4 font-bold">Kontak / WA</th>
                      <th className="p-4 font-bold">Status BPJS</th>
                      <th className="p-4 font-bold">Kunjungan Terakhir</th>
                      <th className="p-4 font-bold text-right">Aksi & Medis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pasienData.map((p, i) => (
                      <tr key={i} className="border-b hover:bg-slate-50 transition text-sm">
                        <td className="p-4 text-teal-700 font-bold">{p.id}</td>
                        <td className="p-4 text-slate-800 font-bold">{p.nama}<br/><span className="text-xs text-slate-400 font-normal">NIK: {p.nik}</span></td>
                        <td className="p-4 text-slate-600">{p.hp || '-'}</td>
                        <td className="p-4 text-slate-600">{p.noBpjs}</td>
                        <td className="p-4 text-slate-600">{p.lastVisit}</td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          {(user?.role === 'pemilik' || user?.role === 'medis') && (
                            <button 
                              onClick={() => setShowPeriksaModal({ isOpen: true, data: p, source: 'rm' })}
                              className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition border border-teal-100 flex items-center gap-1" 
                              title="Diagnosa Langsung (RM)"
                            >
                              <Stethoscope size={16} /> <span className="text-xs font-bold hidden sm:inline">Diagnosa</span>
                            </button>
                          )}
                          <button 
                            onClick={() => setEditPasienModal({isOpen: true, data: p})}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition border border-blue-100 flex items-center gap-1" 
                            title="Edit Data Pasien"
                          >
                            <Edit size={16} /> <span className="text-xs font-bold hidden sm:inline">Edit</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAMPILAN KEUANGAN */}
          {activeMenu === 'keuangan' && (
            <div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-teal-500 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-500 font-bold">Total Pemasukan</p>
                    <h3 className="text-3xl font-extrabold text-teal-800 mt-1">
                      Rp {financeTransactions.filter(t => t.jenis === 'Masuk').reduce((acc, curr) => acc + curr.nominal, 0).toLocaleString('id-ID')}
                    </h3>
                  </div>
                  <button onClick={() => setShowFinanceModal('in')} className="bg-teal-100 text-teal-700 p-4 rounded-full hover:bg-teal-200 transition shadow-sm">
                    <PlusCircle size={32} />
                  </button>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-amber-500 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-500 font-bold">Total Pengeluaran</p>
                    <h3 className="text-3xl font-extrabold text-slate-800 mt-1">
                      Rp {financeTransactions.filter(t => t.jenis === 'Keluar').reduce((acc, curr) => acc + curr.nominal, 0).toLocaleString('id-ID')}
                    </h3>
                  </div>
                  <button onClick={() => setShowFinanceModal('out')} className="bg-amber-100 text-amber-600 p-4 rounded-full hover:bg-amber-200 transition shadow-sm">
                    <MinusCircle size={32} />
                  </button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Riwayat Transaksi Keuangan</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 text-sm border-b">
                        <th className="p-4 font-bold">Tanggal</th>
                        <th className="p-4 font-bold">Kategori</th>
                        <th className="p-4 font-bold">Keterangan</th>
                        <th className="p-4 font-bold">Jenis</th>
                        <th className="p-4 font-bold">Nominal</th>
                        <th className="p-4 font-bold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financeTransactions.map((t) => (
                        <tr key={t.id} className="border-b hover:bg-slate-50 transition text-sm">
                          <td className="p-4 text-slate-600">{t.tanggal}</td>
                          <td className="p-4 font-bold text-slate-800">{t.kategori}</td>
                          <td className="p-4 text-slate-500">{t.desc}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.jenis === 'Masuk' ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-700'}`}>
                              {t.jenis}
                            </span>
                          </td>
                          <td className={`p-4 font-bold text-lg ${t.jenis === 'Masuk' ? 'text-teal-600' : 'text-red-500'}`}>
                            {t.jenis === 'Masuk' ? '+' : '-'} Rp {t.nominal.toLocaleString('id-ID')}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setEditFinanceModal({ isOpen: true, data: t })}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition" title="Edit Transaksi"
                            >
                              <Edit size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAMPILAN LAPORAN */}
          {activeMenu.startsWith('lap_') && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[400px]">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-teal-800">{allMenuItems.find(m => m.id === 'laporan').subItems.find(s => s.id === activeMenu).label}</h2>
                  <p className="text-sm text-slate-500 mt-1">Data rekapitulasi untuk pelaporan klinik dan instansi.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleExportLaporan('csv')}
                    className="bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 transition shadow-sm flex items-center gap-2"
                  >
                    <Download size={16}/> CSV
                  </button>
                  <button 
                    onClick={() => handleExportLaporan('excel')}
                    className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition shadow-sm flex items-center gap-2"
                  >
                    <Download size={16}/> Excel
                  </button>
                  <button 
                    onClick={() => setShowInputLaporanModal(true)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-700 transition shadow-sm flex items-center gap-2"
                  >
                    <PlusCircle size={16}/> Input Data {allMenuItems.find(m => m.id === 'laporan').subItems.find(s => s.id === activeMenu).label.replace('Laporan ', '')}
                  </button>
                </div>
              </div>
              
              {activeMenu === 'lap_imunisasi' ? (
                /* --- TABEL KHUSUS REKAP IMUNISASI (LEBAR) --- */
                <div className="overflow-x-auto pb-4">
                  <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                    <thead>
                      <tr className="bg-purple-50 text-purple-900 border-b border-purple-200">
                        <th className="p-3 font-bold border-r border-purple-100">No</th>
                        <th className="p-3 font-bold border-r border-purple-100">Nama Bayi</th>
                        <th className="p-3 font-bold border-r border-purple-100">No RM</th>
                        <th className="p-3 font-bold border-r border-purple-100">Tgl Lahir</th>
                        <th className="p-3 font-bold border-r border-purple-100">Nama Ibu</th>
                        <th className="p-3 font-bold border-r border-purple-100">HB0</th>
                        <th className="p-3 font-bold border-r border-purple-100">BCG</th>
                        <th className="p-3 font-bold border-r border-purple-100">Polio 1</th>
                        <th className="p-3 font-bold border-r border-purple-100">DPT 1</th>
                        <th className="p-3 font-bold border-r border-purple-100">Polio 2</th>
                        <th className="p-3 font-bold border-r border-purple-100">DPT 2</th>
                        <th className="p-3 font-bold border-r border-purple-100">Polio 3</th>
                        <th className="p-3 font-bold border-r border-purple-100">DPT 3</th>
                        <th className="p-3 font-bold border-r border-purple-100">Polio 4</th>
                        <th className="p-3 font-bold border-r border-purple-100">IPV</th>
                        <th className="p-3 font-bold border-r border-purple-100">Campak</th>
                        <th className="p-3 font-bold border-r border-purple-100">DPT Baduta</th>
                        <th className="p-3 font-bold">Campak Baduta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(laporanData[activeMenu] || []).length === 0 ? (
                        <tr><td colSpan="18" className="p-8 text-center text-slate-400 text-sm">Belum ada data imunisasi. Silakan input data baru.</td></tr>
                      ) : (
                        (laporanData[activeMenu] || []).map((l, i) => (
                          <tr key={i} className="border-b hover:bg-slate-50 transition">
                            <td className="p-3 border-r border-slate-100">{i+1}</td>
                            <td className="p-3 font-bold text-slate-800 border-r border-slate-100">{l.nama_bayi}</td>
                            <td className="p-3 border-r border-slate-100">{l.no_rm_bayi}</td>
                            <td className="p-3 border-r border-slate-100">{l.tgl_lahir_bayi}</td>
                            <td className="p-3 border-r border-slate-100">{l.nama_ibu}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_hb0 || '-'}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_bcg || '-'}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_polio1 || '-'}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_dpt1 || '-'}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_polio2 || '-'}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_dpt2 || '-'}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_polio3 || '-'}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_dpt3 || '-'}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_polio4 || '-'}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_ipv || '-'}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_campak || '-'}</td>
                            <td className="p-3 border-r border-slate-100 text-teal-600 font-bold">{l.v_dpt_baduta || '-'}</td>
                            <td className="p-3 text-teal-600 font-bold">{l.v_campak_baduta || '-'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* --- TABEL PINTAR UNTUK SEMUA LAPORAN --- */
                <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-slate-200">
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 text-sm border-b">
                        <th className="p-4 font-bold">Tanggal</th>
                        <th className="p-4 font-bold">
                          {activeMenu === 'lap_shk' || activeMenu === 'lap_imunisasi' ? 'Nama Bayi' : 'Nama Pasien'}
                        </th>
                        
                        {/* Tambahan Kolom Khusus Ibu untuk SHK & Imunisasi */}
                        {(activeMenu === 'lap_shk' || activeMenu === 'lap_imunisasi') && (
                          <th className="p-4 font-bold">Nama Ibu</th>
                        )}

                        {/* Kolom Khusus ANC */}
                        {activeMenu === 'lap_anc' && (
                          <>
                            <th className="p-4 font-bold">UK / TP</th>
                            <th className="p-4 font-bold">Diagnosa</th>
                            <th className="p-4 font-bold">BB/TB & LILA</th>
                            <th className="p-4 font-bold">HB & Gol. Darah</th>
                          </>
                        )}

                        {/* Kolom Khusus Partus */}
                        {activeMenu === 'lap_partus' && (
                          <>
                            <th className="p-4 font-bold">GPA & UK</th>
                            <th className="p-4 font-bold">Data Bayi</th>
                            <th className="p-4 font-bold">Tindakan/Kondisi</th>
                          </>
                        )}

                        {/* Kolom Khusus KB */}
                        {activeMenu === 'lap_kb' && (
                          <>
                            <th className="p-4 font-bold">Metode KB</th>
                            <th className="p-4 font-bold">Anak Hidup</th>
                          </>
                        )}

                        {/* Kolom Khusus SHK */}
                        {activeMenu === 'lap_shk' && (
                          <>
                            <th className="p-4 font-bold">BB/PB Bayi</th>
                            <th className="p-4 font-bold">Tgl Sampel</th>
                          </>
                        )}

                        <th className="p-4 font-bold">Keterangan Tambahan</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      {(laporanData[activeMenu] || []).length === 0 ? (
                        <tr>
                          <td colSpan="10" className="p-8 text-center text-slate-400 italic">
                            Belum ada data di laporan ini. Silakan input data baru.
                          </td>
                        </tr>
                      ) : (
                        (laporanData[activeMenu] || []).map((l, i) => (
                          <tr key={i} className="border-b hover:bg-teal-50 transition text-sm">
                            
                            {/* Tanggal */}
                            <td className="p-4 text-slate-600">{l.tanggal || l.tanggal_periksa || l.tanggal_partus || l.tanggal_kunjungan || '-'}</td>
                            
                            {/* Nama Utama */}
                            <td className="p-4 font-bold text-slate-800">
                              {activeMenu === 'lap_imunisasi' || activeMenu === 'lap_shk' ? (l.nama_bayi || l.pasien) : (l.nama_pasien || l.pasien || '-')}
                            </td>
                            
                            {/* Nama Ibu Khusus SHK & Imunisasi */}
                            {(activeMenu === 'lap_shk' || activeMenu === 'lap_imunisasi') && (
                              <td className="p-4 text-slate-600">{l.nama_ibu || l.pasien || '-'}</td>
                            )}

                            {/* Isi Khusus ANC */}
                            {activeMenu === 'lap_anc' && (
                              <>
                                <td className="p-4 text-slate-600 font-medium text-teal-700">{l.tp_uk || '-'}</td>
                                <td className="p-4 text-slate-600">{l.diagnosa || '-'}</td>
                                <td className="p-4 text-slate-600">{l.bb_tb || '-'} <span className="text-xs text-slate-400">| LILA: {l.lila || '-'}</span></td>
                                <td className="p-4 text-slate-600">{l.hb || '-'} <span className="text-xs text-slate-400">| Gol: {l.golongan_darah || l.gol_darah || '-'}</span></td>
                              </>
                            )}

                            {/* Isi Khusus Partus */}
                            {activeMenu === 'lap_partus' && (
                              <>
                                <td className="p-4 text-slate-600">{l.gpa || '-'} <br/><span className="text-xs text-slate-400">UK: {l.uk || '-'}</span></td>
                                <td className="p-4 text-slate-600">{l.jenis_kelamin || l.jk_bayi || '-'} <br/><span className="text-xs text-slate-400">{l.bbl || '-'}g / {l.pbl || '-'}cm</span></td>
                                <td className="p-4 text-slate-600">KU: {l.keadaan_umum_ibu || l.ku_ibu || '-'} <br/><span className="text-xs text-slate-400">IMD: {l.imd || '-'}</span></td>
                              </>
                            )}

                            {/* Isi Khusus KB */}
                            {activeMenu === 'lap_kb' && (
                              <>
                                <td className="p-4 font-bold text-teal-600">{l.metode_kontrasepsi || l.metode || '-'}</td>
                                <td className="p-4 text-slate-600">{l.jumlah_anak_hidup || l.jml_anak || '-'}</td>
                              </>
                            )}

                            {/* Isi Khusus SHK */}
                            {activeMenu === 'lap_shk' && (
                              <>
                                <td className="p-4 text-slate-600">{l.berat_badan || l.bb_bayi || '-'}g / {l.panjang_badan || l.pb_bayi || '-'}cm</td>
                                <td className="p-4 text-slate-600">{l.tanggal_pengambilan_sampel || l.tgl_sampel || '-'}</td>
                              </>
                            )}

                            {/* Kolom Keterangan */}
                            <td className="p-4 text-slate-500 max-w-xs truncate" title={l.keterangan_tambahan || l.keterangan}>
                              {l.keterangan_tambahan || l.keterangan || '-'}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAMPILAN HRD & KARYAWAN */}
          {activeMenu === 'hrd' && (
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Statistik Kehadiran (Hari Ini)</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Users size={28}/></div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Total Karyawan</p>
                    <h3 className="text-2xl font-extrabold text-slate-800">{karyawanData.length} Orang</h3>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="bg-teal-100 p-3 rounded-xl text-teal-600"><CheckCircle2 size={28}/></div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Hadir Hari Ini</p>
                    <h3 className="text-2xl font-extrabold text-teal-700">{karyawanData.filter(k => k.statusAbsen === 'Hadir').length} Orang</h3>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-xl text-amber-600"><Clock size={28}/></div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Cuti / Izin</p>
                    <h3 className="text-2xl font-extrabold text-amber-700">{karyawanData.filter(k => k.statusAbsen !== 'Hadir').length} Orang</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mt-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-teal-800">Daftar Karyawan & Absensi</h2>
                    <p className="text-sm text-slate-500">Kelola pendaftaran karyawan, jadwal jaga, dan kehadiran harian.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user?.role === 'pemilik' && (
                      <>
                        <button 
                          onClick={handleExportAbsensi}
                          className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 flex items-center gap-2 transition"
                          title="Download Laporan Excel/CSV"
                        >
                          <Download size={16}/> Export Absensi
                        </button>
                        <button 
                          onClick={() => setShowAbsensiSusulanModal(true)}
                          className="bg-amber-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-500 flex items-center gap-2 shadow-sm transition"
                        >
                          <Calendar size={16}/> Input Susulan / Rekap
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => setShowKaryawanModal(true)}
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-700 flex items-center gap-2 shadow-sm transition"
                    >
                      <UserPlus size={16} /> Tambah Karyawan
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 text-sm border-b">
                        <th className="p-4 font-bold">ID</th>
                        <th className="p-4 font-bold">Nama Karyawan</th>
                        <th className="p-4 font-bold">Jabatan / Posisi</th>
                        <th className="p-4 font-bold">Jadwal Jaga</th>
                        <th className="p-4 font-bold">Status Kehadiran</th>
                        {user?.role === 'pemilik' && (
                          <th className="p-4 font-bold border-l border-slate-200">Laporan Presensi & Lembur (Bulan Ini)</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {karyawanData.map((k, i) => (
                        <tr key={i} className="border-b hover:bg-slate-50 transition">
                          <td className="p-4 text-slate-500 font-bold">K-{k.id}</td>
                          <td className="p-4 text-slate-800 font-bold">{k.nama}<br/><span className="text-xs text-slate-500 font-normal">{k.kontak}</span></td>
                          <td className="p-4 text-slate-600">{k.posisi}</td>
                          <td className="p-4 text-slate-600">{k.jadwal}</td>
                          <td className="p-4">
                            <select 
                              className={`text-sm font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer transition ${k.statusAbsen === 'Hadir' ? 'bg-teal-100 text-teal-700 hover:bg-teal-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
                              defaultValue={k.statusAbsen}
                              onChange={(e) => {
                                const newStatus = e.target.value;
                                setKaryawanData(karyawanData.map(item => item.id === k.id ? { ...item, statusAbsen: newStatus } : item));
                              }}
                            >
                              <option value="Hadir">Hadir</option>
                              <option value="Cuti">Cuti</option>
                              <option value="Sakit">Sakit</option>
                              <option value="Izin">Izin</option>
                            </select>
                          </td>
                          {user?.role === 'pemilik' && (
                            <td className="p-4 border-l border-slate-100 bg-slate-50/50">
                              <div className="grid grid-cols-2 gap-2 min-w-[220px]">
                                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm" title="Total Hari Kehadiran">
                                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm">H</div>
                                  <div className="flex flex-col leading-none">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Hadir</span>
                                    <span className="text-base font-extrabold text-slate-700 mt-0.5">{k.hadirTotal || 0} <span className="font-normal text-xs text-slate-500">hr</span></span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm" title="Total Hari Cuti/Izin/Sakit">
                                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">C</div>
                                  <div className="flex flex-col leading-none">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Cuti/Izin</span>
                                    <span className="text-base font-extrabold text-slate-700 mt-0.5">{k.cutiTotal || 0} <span className="font-normal text-xs text-slate-500">hr</span></span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm col-span-2" title="Total Akumulasi Jam Lembur">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold"><Clock size={16}/></div>
                                  <div className="flex flex-col leading-none">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Akumulasi Lembur</span>
                                    <span className="text-base font-extrabold text-slate-700 mt-0.5">{k.lemburJam || 0} <span className="font-normal text-xs text-slate-500">Jam bulan ini</span></span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAMPILAN KOMUNIKASI & REMINDER */}
          {activeMenu === 'komunikasi' && (
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-teal-800 mb-2">Notifikasi & Reminder Pasien</h2>
              <p className="text-sm text-slate-500 mb-6 border-b pb-4">Daftar jadwal kontrol pasien (Terhubung otomatis dari form Periksa Dokter). Anda bisa edit jadwal atau langsung hubungi via WA.</p>
              
              <div className="space-y-4">
                {reminderData.map((reminder) => (
                  <div key={reminder.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 border rounded-xl border-slate-200 hover:border-teal-300 transition bg-slate-50">
                    <div className="flex gap-4 items-center mb-4 md:mb-0">
                      <div className="bg-teal-100 p-3 rounded-full text-teal-600 hidden md:block">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">{reminder.nama} <span className="text-sm text-slate-500 font-normal">({reminder.noWa})</span></h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-slate-700">{reminder.jenis}</span>
                          <span className="text-xs px-2.5 py-1 bg-amber-100 text-amber-800 font-bold rounded-full border border-amber-200">{reminder.waktu}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${reminder.status === 'Sudah Dihubungi' ? 'bg-teal-100 text-teal-700' : 'bg-slate-200 text-slate-600'}`}>
                        {reminder.status}
                      </span>
                      <button 
                        onClick={() => setEditReminderModal({isOpen: true, data: reminder})}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition" title="Edit/Update Jadwal"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                       onClick={() => {
    let phone = reminder.nowa;
    if (!phone || phone === '-' || phone === '') {
      alert('Nomor WA pasien tidak tersedia!');
      return;
    }
    // Ubah format angka 0 di depan menjadi 62 agar dikenali WhatsApp
    if (phone.startsWith('0')) phone = '62' + phone.substring(1);
    window.open(`https://wa.me/${phone}`, '_blank');
  }}
                        className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition flex items-center gap-2 shadow-sm"
                      >
                        <MessageSquare size={16} /> Hubungi via WA
                      </button>
                    </div>
                  </div>
                ))}
                {reminderData.length === 0 && (
                  <div className="text-center py-8 text-slate-400">Belum ada jadwal reminder saat ini.</div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
      {/* TAMPILAN KARYAWAN & HRD */}
      
      {/* ========================================================================= */}
      {/* TAMPILAN KARYAWAN & HRD (SISTEM TAB) */}
      {activeMenu === 'karyawan' && (
        <div className="space-y-6">
          {/* HEADER & NAVIGASI TAB */}
          <div className="bg-white px-6 pt-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Manajemen HRD</h2>
            <p className="text-sm text-slate-500 mb-6">Kelola data staf, absensi, dan perhitungan gaji klinik.</p>
            
            <div className="flex gap-6 border-b border-slate-200">
              <button onClick={() => setHrdTab('data_karyawan')} className={`pb-3 text-sm font-bold transition-all ${hrdTab === 'data_karyawan' ? 'border-b-2 border-teal-600 text-teal-700' : 'text-slate-400 hover:text-teal-600'}`}>Data Karyawan</button>
              <button onClick={() => setHrdTab('absensi')} className={`pb-3 text-sm font-bold transition-all ${hrdTab === 'absensi' ? 'border-b-2 border-teal-600 text-teal-700' : 'text-slate-400 hover:text-teal-600'}`}>Absensi & Lembur</button>
              <button onClick={() => setHrdTab('penggajian')} className={`pb-3 text-sm font-bold transition-all ${hrdTab === 'penggajian' ? 'border-b-2 border-teal-600 text-teal-700' : 'text-slate-400 hover:text-teal-600'}`}>Data Penggajian</button>
            </div>
          </div>

          {/* ISI TAB 1: DATA KARYAWAN (Tabel yang tadi kita buat) */}
          {hrdTab === 'data_karyawan' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b flex justify-end bg-slate-50">
                <button onClick={() => setShowKaryawanModal(true)} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-sm transition text-sm">
                  <PlusCircle size={18} /> Tambah Karyawan
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white text-slate-500 text-sm border-b">
                      <th className="p-4 font-bold">Nama Lengkap</th>
                      <th className="p-4 font-bold">NIP / ID</th>
                      <th className="p-4 font-bold">Jabatan</th>
                      <th className="p-4 font-bold">Tanggal Masuk</th>
                      <th className="p-4 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {karyawanData.length === 0 ? (
                      <tr><td colSpan="5" className="p-8 text-center text-slate-400">Belum ada data karyawan.</td></tr>
                    ) : (
                      karyawanData.map((k, i) => (
                        <tr key={i} className="border-b hover:bg-slate-50 text-sm transition">
                          <td className="p-4 font-bold text-slate-800">{k.nama}</td>
                          <td className="p-4 text-slate-500">{k.nip || '-'}</td>
                          <td className="p-4 text-teal-700 font-medium">{k.jabatan || '-'}</td>
                          <td className="p-4 text-slate-500">{k.tanggal_masuk || '-'}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${k.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {k.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ISI TAB 2: ABSENSI (TABEL SUNGGUHAN) */}
          {hrdTab === 'absensi' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-700">Data Absensi & Lembur</h3>
                <button onClick={() => setShowAbsensiModal(true)} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-sm transition text-sm">
                  <Calendar size={18} /> Input Absensi
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white text-slate-500 text-sm border-b">
                      <th className="p-4 font-bold">Tanggal</th>
                      <th className="p-4 font-bold">Nama Karyawan</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold">Lembur (Jam)</th>
                      <th className="p-4 font-bold">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {absensiData && absensiData.length > 0 ? (
                      absensiData.map((a, i) => (
                        <tr key={i} className="border-b hover:bg-slate-50 text-sm transition">
                          <td className="p-4 text-slate-600">{a.tanggal}</td>
                          <td className="p-4 font-bold text-slate-800">{a.nama_karyawan}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${a.status_hadir === 'Hadir' ? 'bg-green-100 text-green-700' : a.status_hadir === 'Cuti' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                              {a.status_hadir}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600">{a.jam_lembur > 0 ? `${a.jam_lembur} Jam` : '-'}</td>
                          <td className="p-4 text-slate-500">{a.keterangan || '-'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5" className="p-8 text-center text-slate-400">Belum ada data absensi.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ISI TAB 3: PENGGAJIAN (Kerangka) */}
         {/* ISI TAB 3: PENGGAJIAN */}
          {hrdTab === 'penggajian' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-700">Rekapitulasi Gaji Karyawan</h3>
                <button onClick={() => setShowPenggajianModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-sm transition text-sm">
                  <PlusCircle size={18} /> Buat Slip Gaji
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white text-slate-500 text-sm border-b">
                      <th className="p-4 font-bold">Periode</th>
                      <th className="p-4 font-bold">Nama Karyawan</th>
                      <th className="p-4 font-bold">Gaji Bersih</th>
                      <th className="p-4 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {penggajianData && penggajianData.length > 0 ? (
                      penggajianData.map((g, i) => (
                        <tr key={i} className="border-b hover:bg-slate-50 text-sm transition">
                          <td className="p-4 text-slate-600 font-medium">{g.periode_bulan}</td>
                          <td className="p-4 font-bold text-slate-800">{g.nama_karyawan}</td>
                          <td className="p-4 text-slate-800 font-bold">Rp {g.total_gaji.toLocaleString('id-ID')}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${g.status_bayar === 'Lunas' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {g.status_bayar}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4" className="p-8 text-center text-slate-400">Belum ada rekap gaji.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* ========================================================= */}
          {/* TAMPILAN HAK AKSES */}
          {activeMenu === 'hak_akses' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold text-teal-800">Pengaturan Hak Akses Karyawan</h2>
                  <p className="text-sm text-slate-500 mt-1">Kelola daftar akun dan hak akses masuk ke dalam sistem KlinikCerdas.</p>
                </div>
                <button 
                  onClick={() => setShowAddUserModal(true)}
                  className="bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-teal-700 flex items-center gap-2 shadow-sm transition"
                >
                  <UserPlus size={18} /> Tambah Akun
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-sm border-b">
                      <th className="p-4 font-bold">Nama Akun</th>
                      <th className="p-4 font-bold">Email Login</th>
                      <th className="p-4 font-bold">Role / Hak Akses</th>
                      <th className="p-4 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.map((k) => (
                      <tr key={k.id} className="border-b hover:bg-slate-50 transition">
                        <td className="p-4 text-slate-800 font-bold">{k.nama}</td>
                        <td className="p-4 text-blue-600">{k.email}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full capitalize border border-amber-200">
                            {k.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => setAksesModal({ isOpen: true, mode: 'edit', data: k })}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition" title="Edit Akun"
                            >
                              <Edit size={16} />
                            </button>
                            {k.role !== 'pemilik' && (
                              <button 
                                onClick={() => handleDeleteAkses(k.id)}
                                className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition" title="Hapus Akun"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
            </table>
          </div>
{/* ========================================================= */}
      {/* MODAL INPUT ABSENSI */}
      {showAbsensiModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-amber-600">Input Absensi Harian</h3>
              <button onClick={() => setShowAbsensiModal(false)} className="text-slate-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSimpanAbsensi} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal</label>
                <input name="tanggal" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Karyawan</label>
                <select name="karyawan_id" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                  <option value="">-- Pilih Karyawan --</option>
                  {karyawanData.map(k => (
                    <option key={k.id} value={k.id}>{k.nama} ({k.jabatan})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Status Kehadiran</label>
                <select name="status_hadir" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                  <option value="Hadir">Hadir</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Izin">Izin</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Alpha">Alpha (Tanpa Keterangan)</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Lembur (Jam)</label>
                  <input name="jam_lembur" type="number" min="0" placeholder="0" defaultValue="0" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Keterangan</label>
                  <input name="keterangan" type="text" placeholder="(Opsional)" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAbsensiModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition">Batal</button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-amber-500 rounded-lg hover:bg-amber-600 font-bold shadow-sm transition">Simpan Absensi</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
{/* ========================================================================= */}
      {/* MODAL TAMBAH KARYAWAN */}
      {showKaryawanModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-teal-900">Tambah Data Karyawan</h3>
              <button onClick={() => setShowKaryawanModal(false)} className="text-slate-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSimpanKaryawan} className="p-6 space-y-4">
              {/* Nama Wajib Diisi */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                <input name="nama" type="text" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Masukkan nama..." />
              </div>
              
              {/* NIP Tidak Wajib */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">NIP / ID Karyawan</label>
                <input name="nip" type="text" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="(Opsional)" />
              </div>
              
              {/* Jabatan Tidak Wajib */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Jabatan</label>
                <select name="jabatan" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                  <option value="">Pilih Jabatan (Opsional)</option>
                  <option value="Bidan">Bidan</option>
                  <option value="Perawat">Perawat</option>
                  <option value="Dokter Umum">Dokter Umum</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Finance & Admin">Finance & Admin</option>
                  <option value="Apoteker">Apoteker</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Tanggal Masuk Tidak Wajib */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Masuk</label>
                  <input name="tanggal_masuk" type="date" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                </div>
                
                {/* Status Otomatis Terisi 'Aktif' */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                  <select name="status" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                    <option value="Aktif">Aktif</option>
                    <option value="Non-Aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowKaryawanModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition">Batal</button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 font-bold shadow-sm transition">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}

          {/* MODAL TAMBAH AKUN */}
          {showAddUserModal && (
            <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-teal-50">
                  <h3 className="font-bold text-lg text-teal-900">Buat Akun Baru</h3>
                  <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-red-500">
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleSimpanAkun} className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                      <input name="nama" type="text" required className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Misal: Siska / Budi" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Email Login</label>
                      <input name="email" type="email" required className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Misal: cs@klinik.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                      <input name="password" type="password" required className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Minimal 6 karakter" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Role / Hak Akses</label>
                      <select name="role" required className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
                        <option value="">-- Pilih Hak Akses --</option>
                        <option value="pemilik">Owner / Pemilik</option>
                        <option value="cs">CS / Resepsionis</option>
                        <option value="finance">Keuangan / Finance</option>
                        <option value="admin">Admin HRD</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex gap-3 justify-end">
                    <button type="button" onClick={() => setShowAddUserModal(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200">
                      Batal
                    </button>
                    <button type="submit" className="px-5 py-2.5 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
                      <UserPlus size={18} /> Simpan Akun
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

   
        </main>

        {/* ========================================================= */}
        {/* MODAL INPUT LAPORAN */}
        {showInputLaporanModal && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <div className={`bg-white rounded-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar ${['lap_kb', 'lap_anc', 'lap_shk', 'lap_partus'].includes(activeMenu) ? 'max-w-4xl' : activeMenu === 'lap_imunisasi' ? 'max-w-6xl' : 'max-w-md'} shadow-2xl overflow-hidden border-t-4 border-teal-500 my-8`}>
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">Input Data {allMenuItems.find(m => m.id === 'laporan').subItems.find(s => s.id === activeMenu).label}</h3>
                <button onClick={() => setShowInputLaporanModal(false)} className="text-slate-400 hover:text-red-500 text-xl font-bold">&times;</button>
              </div>
              <form onSubmit={handleSimpanLaporan} className="p-6">
                
                {activeMenu === 'lap_anc' ? (
                  /* --- FORM KHUSUS LAPORAN ANC --- */
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-800">Formulir Pemeriksaan ANC</h4>
                      <p className="text-sm text-slate-500">Masukkan data pemeriksaan pasien.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Cari Pasien</label>
                      <input name="pasien" required placeholder="Masukkan Nama atau NIK..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Periksa <span className="text-red-500">*</span></label>
                        <input name="tanggal" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">HPHT <span className="text-red-500">*</span></label>
                        <input name="hpht" type="date" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">TP / UK <span className="text-red-500">*</span></label>
                        <input name="tp_uk" required placeholder="Contoh: 28 Minggu" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Diagnosa (Dx) <span className="text-red-500">*</span></label>
                        <input name="diagnosa" required placeholder="Diagnosa medis..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">KSPR</label>
                        <input name="kspr" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">BB / TB</label>
                        <input name="bb_tb" placeholder="Contoh: 60kg / 155cm" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">LILA</label>
                        <input name="lila" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">HB</label>
                        <input name="hb" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Golongan Darah</label>
                         <select name="gol_darah" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih</option><option value="A">A</option><option value="B">B</option><option value="AB">AB</option><option value="O">O</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Albumin (ALB)</label>
                         <select name="albumin" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih</option><option value="Negatif">Negatif</option><option value="Positif">Positif</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">HIV</label>
                         <select name="hiv" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih</option><option value="Non-Reaktif">Non-Reaktif</option><option value="Reaktif">Reaktif</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Hepatitis B</label>
                         <select name="hepatitis_b" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih</option><option value="Non-Reaktif">Non-Reaktif</option><option value="Reaktif">Reaktif</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Sifilis</label>
                         <select name="sifilis" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih</option><option value="Non-Reaktif">Non-Reaktif</option><option value="Reaktif">Reaktif</option>
                         </select>
                      </div>
                      <div className="flex items-center pt-6">
                         <label className="flex items-center gap-2 cursor-pointer">
                           <input type="checkbox" name="buku_kia" className="w-5 h-5 accent-teal-600 cursor-pointer" />
                           <span className="text-sm font-bold text-slate-700">Menerima Buku KIA?</span>
                         </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Keterangan Tambahan</label>
                      <textarea name="keterangan" rows="3" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"></textarea>
                    </div>
                  </div>
                ) : activeMenu === 'lap_partus' ? (
                  /* --- FORM KHUSUS LAPORAN PARTUS --- */
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-800">Formulir Persalinan</h4>
                      <p className="text-sm text-slate-500">Masukkan data persalinan pasien.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Cari Pasien (Ibu Bersalin)</label>
                      <input name="pasien" required placeholder="Masukkan Nama atau NIK..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Partus <span className="text-red-500">*</span></label>
                        <input name="tanggal" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">GPA (Gravida-Partus-Abortus) <span className="text-red-500">*</span></label>
                        <input name="gpa" required placeholder="Contoh: G1P0A0" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">UK (Usia Kehamilan - Minggu) <span className="text-red-500">*</span></label>
                        <input name="uk" required placeholder="Contoh: 39" type="number" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">BBL (Berat Badan Lahir - Gram) <span className="text-red-500">*</span></label>
                        <input name="bbl" required placeholder="Contoh: 3200" type="number" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">PBL (Panjang Badan Lahir - Cm) <span className="text-red-500">*</span></label>
                        <input name="pbl" required placeholder="Contoh: 49" type="number" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Jenis Kelamin Bayi <span className="text-red-500">*</span></label>
                         <select name="jk_bayi" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih Jenis Kelamin</option>
                           <option value="Laki-laki">Laki-laki</option>
                           <option value="Perempuan">Perempuan</option>
                         </select>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Kondisi & Tindakan</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Keadaan Umum (K/U) Ibu</label>
                          <input name="ku_ibu" placeholder="Contoh: Baik" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Vitamin K</label>
                           <select name="vitamin_k" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                             <option value="Tidak">Tidak</option>
                             <option value="Ya">Ya</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">HB 0</label>
                           <select name="hb0" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                             <option value="Tidak">Tidak</option>
                             <option value="Ya">Ya</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">IMD (Inisiasi Menyusui Dini)</label>
                           <select name="imd" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                             <option value="Tidak">Tidak</option>
                             <option value="Ya">Ya</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Vitamin A</label>
                           <select name="vitamin_a" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                             <option value="Tidak">Tidak</option>
                             <option value="Ya">Ya</option>
                           </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">KB Pasca Salin</label>
                          <input name="kb_pasca_salin" placeholder="Contoh: IUD" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Keterangan Tambahan</label>
                      <textarea name="keterangan" rows="3" placeholder="Keterangan kondisi ibu atau bayi..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"></textarea>
                    </div>
                  </div>
                ) : activeMenu === 'lap_shk' ? (
                  /* --- FORM KHUSUS LAPORAN SHK --- */
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-800">Formulir Skrining Bayi</h4>
                      <p className="text-sm text-slate-500">Masukkan data skrining hipotiroid kongenital bayi.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Cari Data Ibu (Pasien)</label>
                      <input name="pasien" required placeholder="Masukkan Nama atau NIK Ibu..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Kunjungan <span className="text-red-500">*</span></label>
                        <input name="tanggal" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Nama Bayi <span className="text-red-500">*</span></label>
                        <input name="nama_bayi" required placeholder="Nama lengkap bayi" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Lahir Bayi <span className="text-red-500">*</span></label>
                        <input name="tgl_lahir_bayi" type="date" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Faskes Bayi Lahir</label>
                        <input name="faskes_lahir" placeholder="Tempat bayi dilahirkan" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Jenis Kelamin <span className="text-red-500">*</span></label>
                         <select name="jenis_kelamin" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih</option>
                           <option value="Laki-laki">Laki-laki</option>
                           <option value="Perempuan">Perempuan</option>
                           <option value="Tidak Jelas">Tidak Jelas</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Kembar (Tunggal/Kembar)</label>
                         <select name="kembar" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih</option>
                           <option value="Tunggal">Tunggal</option>
                           <option value="Kembar 1">Kembar 1</option>
                           <option value="Kembar 2">Kembar 2</option>
                         </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Berat Badan Bayi (Gram)</label>
                        <input name="bb_bayi" type="number" placeholder="Contoh: 3000" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Panjang Badan Bayi (cm)</label>
                        <input name="pb_bayi" type="number" placeholder="Contoh: 49" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Umur Kehamilan (Minggu)</label>
                        <input name="umur_kehamilan" type="number" placeholder="Contoh: 39" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Kelainan Bawaan</label>
                         <select name="kelainan_bawaan" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih</option>
                           <option value="Tidak Ada">Tidak Ada</option>
                           <option value="Ada">Ada</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Bayi Mendapat Pengobatan?</label>
                         <select name="pengobatan_bayi" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih</option>
                           <option value="Tidak">Tidak</option>
                           <option value="Ya">Ya</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Ibu Konsumsi Obat Tiroid?</label>
                         <select name="obat_tiroid_ibu" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih</option>
                           <option value="Tidak">Tidak</option>
                           <option value="Ya">Ya</option>
                         </select>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Data Sampel</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Faskes Pengambil Sampel</label>
                          <input name="faskes_sampel" placeholder="Klinik / RS..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Pengambilan Sampel <span className="text-red-500">*</span></label>
                          <input name="tgl_sampel" type="date" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Lokasi Darah</label>
                           <select name="lokasi_darah" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                             <option value="">Pilih (Tu/Ve)</option>
                             <option value="Tumit (Tu)">Tumit (Tu)</option>
                             <option value="Vena (Ve)">Vena (Ve)</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Transfusi Darah?</label>
                           <select name="transfusi" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                             <option value="">Pilih</option>
                             <option value="Tidak">Tidak</option>
                             <option value="Ya">Ya</option>
                           </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Transfusi (Bila Ada)</label>
                          <input name="tgl_transfusi" type="date" className="w-full md:w-1/2 border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Keterangan Tambahan</label>
                      <textarea name="keterangan" rows="3" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"></textarea>
                    </div>
                  </div>
                ) : activeMenu === 'lap_imunisasi' ? (
                  /* --- FORM KHUSUS LAPORAN IMUNISASI --- */
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-800">Input Data Imunisasi Baru</h4>
                      <p className="text-sm text-slate-500">Silakan isi data bayi dan ibu, kemudian isi tanggal vaksin yang telah diberikan.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {/* Kiri: Identitas Bayi */}
                       <div className="space-y-4">
                          <h5 className="font-bold text-teal-700 border-b pb-2 flex items-center gap-2"><Users size={16}/> Identitas Bayi</h5>
                          <div className="grid grid-cols-2 gap-4">
                              <div className="col-span-2"><label className="block text-xs font-bold text-slate-700 mb-1">No RM (📋)</label><input name="no_rm_bayi" placeholder="Nomor rekam medis" className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500" /></div>
                              <div className="col-span-2"><label className="block text-xs font-bold text-slate-700 mb-1">Nama Bayi (👶) *</label><input name="nama_bayi" required placeholder="Nama lengkap bayi" className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500" /></div>
                              <div className="col-span-2"><label className="block text-xs font-bold text-slate-700 mb-1">NIK Bayi (🆔)</label><input name="nik_bayi" placeholder="Nomor identitas bayi" className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500" /></div>
                              <div>
                                 <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin *</label>
                                 <select name="jk_bayi" required className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                 </select>
                              </div>
                              <div><label className="block text-xs font-bold text-slate-700 mb-1">Tgl Lahir Bayi *</label><input type="date" name="tgl_lahir_bayi" required className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500" /></div>
                          </div>
                       </div>
                       
                       {/* Kanan: Identitas Ibu */}
                       <div className="space-y-4">
                          <h5 className="font-bold text-teal-700 border-b pb-2 flex items-center gap-2"><Users size={16}/> Identitas Ibu & Keluarga</h5>
                          <div className="grid grid-cols-1 gap-4">
                              <div><label className="block text-xs font-bold text-slate-700 mb-1">Nama Ibu (👩) *</label><input name="nama_ibu" required placeholder="Nama lengkap ibu" className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500" /></div>
                              <div><label className="block text-xs font-bold text-slate-700 mb-1">NIK Ibu (🆔)</label><input name="nik_ibu" placeholder="Nomor identitas ibu" className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500" /></div>
                              <div><label className="block text-xs font-bold text-slate-700 mb-1">No HP (📱)</label><input name="hp_ibu" placeholder="08xxxxxxxxxx" className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500" /></div>
                              <div><label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap (🏠)</label><textarea name="alamat_ibu" rows="2" placeholder="Alamat lengkap keluarga" className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"></textarea></div>
                          </div>
                       </div>
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-800 border-b pb-2 mb-4 mt-2">Jadwal & Tanggal Pemberian Vaksin</h5>
                      
                      <div className="bg-blue-50 p-5 rounded-lg mb-4 border border-blue-100">
                         <h6 className="text-xs font-extrabold text-blue-800 mb-4 uppercase flex items-center gap-2"><span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center">1</span> IMUNISASI DASAR</h6>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['v_hb0', 'v_bcg', 'v_polio1', 'v_dpt1', 'v_pcv1', 'v_polio2', 'v_dpt2', 'v_pcv2', 'v_polio3', 'v_dpt3', 'v_polio4', 'v_ipv', 'v_campak', 'v_je', 'v_pcv3', 'v_dpt_baduta', 'v_campak_baduta'].map(name => (
                               <div key={name}>
                                 <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase">{name.replace('v_', '').replace('_', ' ')}</label>
                                 <input type="date" name={name} className="w-full border border-blue-200 rounded p-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white" />
                               </div>
                            ))}
                         </div>
                      </div>

                      <div className="bg-purple-50 p-5 rounded-lg mb-4 border border-purple-100">
                         <h6 className="text-xs font-extrabold text-purple-800 mb-4 uppercase flex items-center gap-2"><span className="bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center">2</span> IMUNISASI LANJUTAN</h6>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['v_ipv2', 'v_ipv3', 'v_pcv4', 'v_ipv4'].map(name => (
                               <div key={name}>
                                 <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase">{name.replace('v_', '').replace('_', ' ')}</label>
                                 <input type="date" name={name} className="w-full border border-purple-200 rounded p-2 text-xs focus:ring-2 focus:ring-purple-500 outline-none bg-white" />
                               </div>
                            ))}
                         </div>
                      </div>

                      <div className="bg-orange-50 p-5 rounded-lg border border-orange-100">
                         <h6 className="text-xs font-extrabold text-orange-800 mb-4 uppercase flex items-center gap-2"><span className="bg-orange-600 text-white w-5 h-5 rounded-full flex items-center justify-center">3</span> IMUNISASI ROTAVIRUS</h6>
                         <div className="grid grid-cols-3 gap-4">
                            {['v_rotavirus1', 'v_rotavirus2', 'v_rotavirus3'].map(name => (
                               <div key={name}>
                                 <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase">{name.replace('v_', '').replace('_', ' ')}</label>
                                 <input type="date" name={name} className="w-full border border-orange-200 rounded p-2 text-xs focus:ring-2 focus:ring-orange-500 outline-none bg-white" />
                               </div>
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>
                ) : activeMenu === 'lap_kb' ? (
                  /* --- FORM KHUSUS LAPORAN KB --- */
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-800">Formulir Pelayanan KB</h4>
                      <p className="text-sm text-slate-500">Masukkan data pelayanan akseptor KB.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Cari Pasien (Istri)</label>
                      <input name="pasien" required placeholder="Masukkan Nama atau NIK..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Kunjungan <span className="text-red-500">*</span></label>
                        <input name="tanggal" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Metode Kontrasepsi <span className="text-red-500">*</span></label>
                         <select name="metode" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                           <option value="">Pilih Metode</option>
                           <option value="IUD">IUD</option>
                           <option value="Implan">Implan</option>
                           <option value="Suntik">Suntik</option>
                           <option value="Pil">Pil</option>
                           <option value="Kondom">Kondom</option>
                         </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Jumlah Anak Hidup</label>
                        <input name="jml_anak" type="number" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Usia Anak Terakhir</label>
                        <input name="usia_anak" placeholder="Contoh: 2 Tahun 5 Bulan" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Kondisi Kesehatan</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Keadaan Anemia</label>
                          <input name="anemia" placeholder="Keterangan anemia..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">LILA &lt; 23.5 cm</label>
                          <input name="lila" placeholder="Keterangan LILA..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Penyakit Kronis</label>
                          <input name="kronis" placeholder="Riwayat penyakit..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Infeksi Menular Seksual (IMS)</label>
                          <input name="ims" placeholder="Riwayat IMS..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Keterangan Tambahan</label>
                      <textarea name="keterangan" rows="3" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"></textarea>
                    </div>
                  </div>
                ) : (
                  /* --- FORM STANDAR UNTUK LAPORAN LAINNYA --- */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal</label>
                      <input name="tanggal" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Nama Pasien / Klien</label>
                      <input name="pasien" required placeholder="Nama Pasien" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Keterangan / Hasil</label>
                      <textarea name="keterangan" rows="3" required placeholder="Catatan hasil pelaporan..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"></textarea>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-8 border-t pt-4">
                  <button type="button" onClick={() => setShowInputLaporanModal(false)} className="px-5 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button>
                  <button type="submit" className="px-5 py-2 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 font-bold shadow-sm">Simpan Laporan</button>
                </div>
              </form>
            </div>
          </div>
        )}

 {/* ========================================================= */}
 {/* ========================================================= */}
      {/* MODAL INPUT GAJI */}
      {showPenggajianModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-blue-800">Buat Data Gaji Baru</h3>
              <button onClick={() => setShowPenggajianModal(false)} className="text-slate-400 hover:text-red-500"><X size={24} /></button>
            </div>
            <form onSubmit={handleSimpanPenggajian} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Periode (Bulan)</label>
                  <input name="periode_bulan" required placeholder="Contoh: Jan 2024" className="w-full border rounded-lg p-2.5 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Status Bayar</label>
                  <select name="status_bayar" className="w-full border rounded-lg p-2.5 text-sm bg-white outline-none">
                    <option value="Belum Dibayar">Belum Dibayar</option>
                    <option value="Lunas">Lunas</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Karyawan</label>
                <select name="karyawan_id" required className="w-full border rounded-lg p-2.5 text-sm outline-none bg-white">
                  <option value="">-- Pilih Karyawan --</option>
                  {karyawanData.map(k => <option key={k.id} value={k.id}>{k.nama} ({k.jabatan})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Gaji Pokok (Rp)</label>
                <input name="gaji_pokok" type="number" required placeholder="0" className="w-full border rounded-lg p-2.5 text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tunjangan/Bonus</label>
                  <input name="tunjangan" type="number" defaultValue="0" className="w-full border rounded-lg p-2.5 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Potongan</label>
                  <input name="potongan" type="number" defaultValue="0" className="w-full border rounded-lg p-2.5 text-sm outline-none text-red-600" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowPenggajianModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg">Batal</button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg font-bold">Simpan Gaji</button>
              </div>
            </form>
          </div>
        </div>
      )}
 {/* ========================================================= */}
      {/* MODAL INPUT ABSENSI */}
      {showAbsensiModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-amber-600">Input Absensi Harian</h3>
              <button onClick={() => setShowAbsensiModal(false)} className="text-slate-400 hover:text-red-500"><X size={24} /></button>
            </div>
            <form onSubmit={handleSimpanAbsensi} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal</label>
                <input name="tanggal" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Karyawan</label>
                <select name="karyawan_id" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                  <option value="">-- Pilih Karyawan --</option>
                  {karyawanData.map(k => <option key={k.id} value={k.id}>{k.nama} ({k.jabatan})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Status Kehadiran</label>
                <select name="status_hadir" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                  <option value="Hadir">Hadir</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Izin">Izin</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Alpha">Alpha (Tanpa Keterangan)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Lembur (Jam)</label>
                  <input name="jam_lembur" type="number" min="0" defaultValue="0" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Keterangan</label>
                  <input name="keterangan" type="text" placeholder="(Opsional)" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAbsensiModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-amber-500 rounded-lg hover:bg-amber-600 font-bold shadow-sm">Simpan Absensi</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL TAMBAH KARYAWAN (VERSI KHUSUS KLINIK BIDAN - FINAL) */}
      {showKaryawanModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-teal-900">Tambah Data Karyawan</h3>
              <button onClick={() => setShowKaryawanModal(false)} className="text-slate-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSimpanKaryawan} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                <input name="nama" type="text" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Masukkan nama..." />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">NIP / ID Karyawan</label>
                <input name="nip" type="text" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="(Opsional)" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Jabatan</label>
                <select name="jabatan" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                  <option value="">Pilih Jabatan (Opsional)</option>
                  <option value="Bidan">Bidan</option>
                  <option value="Asisten Bidan">Asisten Bidan</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Finance">Finance</option>
                  <option value="Admin">Admin</option>
                  <option value="Apoteker">Apoteker</option>
                  <option value="Pegawai Magang">Pegawai Magang</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Masuk</label>
                  <input name="tanggal_masuk" type="date" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                  <select name="status" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                    <option value="Aktif">Aktif</option>
                    <option value="Non-Aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowKaryawanModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition">Batal</button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 font-bold shadow-sm transition">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
        {/* ========================================================= */}
        {/* MODAL ABSENSI SUSULAN */}
        {showAbsensiSusulanModal && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border-t-4 border-amber-400">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><Calendar size={20} className="text-amber-500"/> Input Absensi Susulan</h3>
                <button onClick={() => setShowAbsensiSusulanModal(false)} className="text-slate-400 hover:text-red-500 text-xl font-bold">&times;</button>
              </div>
              <form onSubmit={handleSimpanAbsensiSusulan} className="p-6">
                <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-sm mb-5 border border-amber-200">
                  Gunakan form ini jika Anda lupa menginput absensi harian, atau ingin merubah rekap bulanan karyawan tertentu.
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Absensi</label>
                    <input type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Pilih Karyawan</label>
                    <select name="karyawan_id" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none bg-white">
                      <option value="">-- Pilih Karyawan --</option>
                      {karyawanData.map(k => (
                        <option key={k.id} value={k.id}>{k.nama} ({k.posisi})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Status Kehadiran</label>
                    <select name="status" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none bg-white">
                      <option value="Hadir">Hadir</option>
                      <option value="Cuti">Cuti</option>
                      <option value="Sakit">Sakit</option>
                      <option value="Izin">Izin</option>
                      <option value="Libur">Libur Off</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Tambahan Jam Lembur (Opsional)</label>
                    <input name="lembur" type="number" min="0" placeholder="0" defaultValue="0" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-8 border-t pt-4">
                  <button type="button" onClick={() => setShowAbsensiSusulanModal(false)} className="px-5 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button>
                  <button type="submit" className="px-5 py-2 text-sm text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-500 font-bold shadow-sm">Simpan Rekap</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL KEUANGAN */}
        {showFinanceModal && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border-t-4 border-slate-500">
              <div className={`p-5 flex justify-between items-center ${showFinanceModal === 'in' ? 'bg-teal-600' : 'bg-red-500'} text-white`}>
                <h3 className="font-bold text-lg flex items-center gap-2">Catat {showFinanceModal === 'in' ? 'Pemasukan' : 'Pengeluaran'} Baru</h3>
                <button onClick={() => setShowFinanceModal(null)} className="text-white/80 hover:text-white text-xl font-bold">&times;</button>
              </div>
              <form onSubmit={handleSimpanKeuangan} className="p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Transaksi</label>
                    <input name="tanggal" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-slate-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Kategori Transaksi</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {(showFinanceModal === 'in' ? listPemasukan : listPengeluaran).map(cat => (
                        <label key={cat} className={`border rounded-lg p-2 text-center text-xs font-bold cursor-pointer transition ${kategoriKeuangan === cat ? (showFinanceModal === 'in' ? 'bg-teal-100 border-teal-500 text-teal-800' : 'bg-red-50 border-red-500 text-red-800') : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                          <input type="radio" name="kategori_radio" value={cat} className="hidden" onChange={(e) => setKategoriKeuangan(e.target.value)} required />
                          {cat}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* UPDATE DROPDOWN FINANCE: Menampilkan status antrian */}
                  {showFinanceModal === 'in' && kategoriKeuangan === 'Pasien Periksa' && (
                    <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                      <label className="block text-sm font-bold text-teal-800 mb-1">Pilih Pasien Hari Ini (Antrian)</label>
                      <div className="mb-4 bg-teal-50 p-4 rounded-xl border border-teal-100">
              <label className="block text-sm font-semibold text-teal-800 mb-2">Pilih Dari Data Pasien (RM)</label>
              <select name="pasien_periksa" className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white">
                <option value="">-- Cari Nama Pasien --</option>
                {pasienData.map((pasien, index) => (
                  <option key={index} value={pasien.nama}>
                    {pasien.nama} ({pasien.id})
                  </option>
                ))}
              </select>
            </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nominal (Rp)</label>
                    <input name="nominal" type="number" required placeholder="Contoh: 150000" className="w-full border rounded-lg p-3 text-lg font-bold focus:ring-2 focus:ring-slate-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Keterangan Singkat</label>
                    <input name="keterangan" placeholder="Catatan transaksi..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-slate-400 outline-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-8 border-t pt-5">
                  <button type="button" onClick={() => setShowFinanceModal(null)} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button>
                  <button type="submit" className={`px-6 py-2.5 text-sm text-white rounded-lg font-bold shadow-sm ${showFinanceModal === 'in' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-red-600 hover:bg-red-700'}`}>
                    Simpan Transaksi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL EDIT KEUANGAN */}
        {editFinanceModal.isOpen && editFinanceModal.data && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border-t-4 border-blue-500">
              <div className="p-5 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><Edit size={20} className="text-blue-500"/> Edit Transaksi</h3>
                <button onClick={() => setEditFinanceModal({isOpen: false, data: null})} className="text-slate-400 hover:text-red-500 text-xl font-bold">&times;</button>
              </div>
              <form onSubmit={handleUpdateFinance} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal</label>
                    <input name="tanggal" type="date" required defaultValue={editFinanceModal.data.tanggal} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Kategori</label>
                    <input name="kategori" required defaultValue={editFinanceModal.data.kategori} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nominal (Rp)</label>
                    <input name="nominal" type="number" required defaultValue={editFinanceModal.data.nominal} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Keterangan</label>
                    <input name="keterangan" required defaultValue={editFinanceModal.data.desc} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-8 border-t pt-4">
                  <button type="button" onClick={() => setEditFinanceModal({isOpen: false, data: null})} className="px-5 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button>
                  <button type="submit" className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-bold shadow-sm">Simpan Update</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL INPUT DATABASE LAMA (Tanpa Masuk Antrian) */}
        {showInputDatabaseModal && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border-t-4 border-amber-400">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><Database size={20} className="text-amber-500"/> Input Data Pasien Lama</h3>
                <button onClick={() => setShowInputDatabaseModal(false)} className="text-slate-400 hover:text-red-500 text-xl font-bold">&times;</button>
              </div>
              <form onSubmit={handleSimpanDatabaseLama} className="p-6">
                <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-sm mb-6 border border-amber-200 flex items-start gap-2">
                  <Database size={16} className="mt-0.5 shrink-0" />
                  <p><strong>Catatan:</strong> Form ini digunakan untuk menyalin buku pasien lama ke dalam database. Pasien yang diinput lewat sini <strong>tidak</strong> akan masuk ke daftar Antrian Hari Ini.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nama Pasien</label>
                    <input name="nama" required className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">NIK KTP</label>
                    <input name="nik" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nomor WA / HP</label>
                    <input name="hp" placeholder="08xxxxxxxxxx" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nomor BPJS (Jika ada)</label>
                    <input name="bpjs" placeholder="Kosongkan jika tidak ada" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">Kunjungan Terakhir (Buku Manual)</label>
                    <input name="last_visit" type="text" placeholder="Contoh: 10 Jan 2023 atau Data Lama" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-8 border-t pt-4">
                  <button type="button" onClick={() => setShowInputDatabaseModal(false)} className="px-5 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button>
                  <button type="submit" className="px-5 py-2 text-sm text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-500 font-bold shadow-sm">Simpan ke Database</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL EDIT DATA PASIEN (RM) */}
        {editPasienModal.isOpen && editPasienModal.data && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden border-t-4 border-blue-500">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><Edit size={20} className="text-blue-500"/> Update Data Pasien (RM)</h3>
                <button onClick={() => setEditPasienModal({isOpen: false, data: null})} className="text-slate-400 hover:text-red-500 text-xl font-bold">&times;</button>
              </div>
              <form onSubmit={handleUpdatePasien} className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">No. RM (Tidak bisa diubah)</label>
                    <input readOnly value={editPasienModal.data.id} className="w-full border bg-slate-100 text-slate-500 rounded-lg p-2.5 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nama Pasien</label>
                    <input name="nama" required defaultValue={editPasienModal.data.nama} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">NIK KTP</label>
                    <input name="nik" defaultValue={editPasienModal.data.nik} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nomor WA / HP</label>
                    <input name="hp" defaultValue={editPasienModal.data.hp} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nomor BPJS</label>
                    <input name="bpjs" defaultValue={editPasienModal.data.noBpjs !== '-' ? editPasienModal.data.noBpjs : ''} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-8 border-t pt-4">
                  <button type="button" onClick={() => setEditPasienModal({isOpen: false, data: null})} className="px-5 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button>
                  <button type="submit" className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-bold shadow-sm">Simpan Perubahan</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL PERIKSA / DIAGNOSA OWNER + INTEGRASI REMINDER */}
        {showPeriksaModal.isOpen && showPeriksaModal.data && (
           <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden border-t-4 border-teal-500">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-teal-600 text-white">
                <h3 className="font-bold text-lg flex items-center gap-2"><Stethoscope size={20}/> Pemeriksaan Medis</h3>
                <button onClick={() => setShowPeriksaModal({ isOpen: false, data: null, source: 'antrian' })} className="text-white/80 hover:text-white text-2xl font-bold">&times;</button>
              </div>
              <div className="p-4 bg-teal-50 text-teal-900 text-sm flex justify-between font-medium border-b border-teal-100">
                <span>Pasien: <strong className="font-extrabold">{showPeriksaModal.data.nama}</strong> ({showPeriksaModal.data.pasienId || showPeriksaModal.data.id})</span>
                {showPeriksaModal.source === 'antrian' && <span>Layanan: <strong className="font-extrabold">{showPeriksaModal.data.layanan}</strong></span>}
              </div>
              <form onSubmit={handleSimpanDiagnosa} className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Hasil Analisa / Pemeriksaan</label>
                    <textarea 
                      name="analisa" 
                      rows="3" 
                      defaultValue={showPeriksaModal.data.analisa || ''}
                      placeholder="Catat keluhan, tensi darah, suhu, dan hasil observasi di sini..." 
                      className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Diagnosa & Tindakan Medis</label>
                    <textarea 
                      name="diagnosa" 
                      rows="3" 
                      defaultValue={showPeriksaModal.data.diagnosa || ''}
                      placeholder="ICD-10, tindakan yang diberikan, serta resep obat..." 
                      className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    ></textarea>
                  </div>
                  
                  {/* Integrasi Reminder Kontrol */}
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mt-6">
                    <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2 border-b border-amber-200 pb-2">
                      <Calendar size={18}/> Penjadwalan Kontrol (Otomatis Masuk Reminder CS)
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-amber-900 mb-1">Tanggal Kontrol Berikutnya</label>
                        <input name="tgl_kembali" type="date" className="w-full border border-amber-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-amber-900 mb-1">Keperluan Kontrol</label>
                        <input name="keperluan" placeholder="Misal: Periksa Jahitan / Ambil Obat" className="w-full border border-amber-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white" />
                      </div>
                    </div>
                  </div>

                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <button type="button" onClick={() => setShowPeriksaModal({ isOpen: false, data: null, source: 'antrian' })} className="px-5 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Tutup / Batal</button>
                  <button type="submit" className="px-6 py-2 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 font-bold shadow-sm">Simpan Rekam Medis</button>
                </div>
              </form>
            </div>
           </div>
        )}

        {/* ========================================================= */}
        {/* MODAL EDIT REMINDER PASIEN */}
        {editReminderModal.isOpen && editReminderModal.data && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden border-t-4 border-amber-400">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><Edit size={20} className="text-amber-500"/> Update Reminder Pasien</h3>
                <button onClick={() => setEditReminderModal({isOpen: false, data: null})} className="text-slate-400 hover:text-red-500 text-xl font-bold">&times;</button>
              </div>
              <form onSubmit={handleUpdateReminder} className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nama Pasien</label>
                    <input name="nama" required defaultValue={editReminderModal.data.nama} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal/Waktu Kontrol</label>
                    <input name="waktu" required defaultValue={editReminderModal.data.waktu} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Keperluan / Layanan</label>
                    <input name="jenis" required defaultValue={editReminderModal.data.jenis} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nomor WA Pasien</label>
                    <input name="noWa"  defaultValue={editReminderModal.data.noWa} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Status Reminder</label>
                    <select name="status" defaultValue={editReminderModal.data.status} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none bg-white">
                      <option value="Belum Dihubungi">Belum Dihubungi</option>
                      <option value="Sudah Dihubungi">Sudah Dihubungi</option>
                      <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-8 border-t pt-4">
                  <button type="button" onClick={() => setEditReminderModal({isOpen: false, data: null})} className="px-5 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button>
                  <button type="submit" className="px-5 py-2 text-sm text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-500 font-bold shadow-sm">Simpan Update</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL PASIEN LAMA (Masuk Antrian Hari Ini) */}
        {showPasienLamaModal && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border-t-4 border-blue-500">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-blue-50">
                <h3 className="font-bold text-lg text-blue-800 flex items-center gap-2"><ClipboardList size={20}/> Kunjungan Pasien Lama</h3>
                <button onClick={() => setShowPasienLamaModal(false)} className="text-slate-400 hover:text-red-500 text-xl font-bold">&times;</button>
              </div>
              <form onSubmit={handleSimpanPasienLama} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Cari Pasien dari Database</label>
                    <select name="pasien_id" required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                      <option value="">-- Pilih Pasien --</option>
                      {pasienData.map(p => (
                        <option key={p.id} value={p.id}>{p.id} - {p.nama} (WA: {p.hp})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Layanan Tujuan Hari Ini</label>
                    <select name="layanan" required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                        <option value="Pemeriksaan Umum">Pemeriksaan Umum</option>
                        <option value="Pemeriksaan Kehamilan (ANC)">Pemeriksaan Kehamilan (ANC)</option>
                        <option value="Persalinan (Partus)">Persalinan (Partus)</option>
                        <option value="Nifas (PNC)">Nifas (PNC)</option>
                        <option value="Keluarga Berencana (KB)">Keluarga Berencana (KB)</option>
                        <option value="Imunisasi / Anak">Imunisasi / Anak</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <button type="button" onClick={() => setShowPasienLamaModal(false)} className="px-5 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button>
                  <button type="submit" className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-bold shadow-sm">Masukkan ke Antrian</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL PASIEN BARU */}
        {showPasienModal && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden my-8 border-t-4 border-teal-500">
              <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
                <div>
                  <h2 className="text-2xl font-extrabold text-teal-800">Pendaftaran Pasien Baru</h2>
                  <p className="text-slate-500 text-sm mt-1">Isi formulir pendaftaran. Data otomatis masuk ke Database & Antrian Hari Ini.</p>
                </div>
                <button onClick={() => setShowPasienModal(false)} className="text-slate-400 hover:text-red-500 text-2xl font-bold">&times;</button>
              </div>

              <form onSubmit={handleSimpanPasienBaru}>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* KOLOM KIRI: Identitas Pasien */}
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 font-bold text-teal-700 text-lg border-b border-teal-100 pb-2 mb-4">
                      <Users size={20} /> Identitas Pasien
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">NIK / Nomor KTP <span className="text-red-500">*</span></label>
                      <input name="nik" required placeholder="Nomor identitas (16 digit)" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap Pasien <span className="text-red-500">*</span></label>
                      <input name="nama" required placeholder="Nama lengkap pasien" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Nama Suami / Kepala Keluarga <span className="text-red-500">*</span></label>
                      <input name="kk" required placeholder="Nama suami atau kepala keluarga" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Lahir</label>
                        <input type="date" name="tgl_lahir" value={dobInput} onChange={(e) => setDobInput(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Usia (Otomatis)</label>
                        <input readOnly value={calculatedAge} placeholder="Hitung otomatis" className="w-full border border-slate-200 bg-slate-50 text-slate-500 rounded-lg p-2.5 text-sm outline-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Nomor HP / WhatsApp</label>
                      <input name="hp" placeholder="08xxxxxxxxxx" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Alamat Lengkap</label>
                      <textarea name="alamat" rows="2" placeholder="Alamat lengkap pasien" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"></textarea>
                    </div>
                  </div>

                  {/* KOLOM KANAN: Data Kunjungan */}
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 font-bold text-teal-700 text-lg border-b border-teal-100 pb-2 mb-4">
                      <FileText size={20} /> Data Kunjungan
                    </h3>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Layanan Tujuan <span className="text-red-500">*</span></label>
                      <select name="layanan" required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                        <option value="">Pilih Layanan</option>
                        <option value="Pemeriksaan Umum">Pemeriksaan Umum</option>
                        <option value="Pemeriksaan Kehamilan (ANC)">Pemeriksaan Kehamilan (ANC)</option>
                        <option value="Persalinan (Partus)">Persalinan (Partus)</option>
                        <option value="Nifas (PNC)">Nifas (PNC)</option>
                        <option value="Keluarga Berencana (KB)">Keluarga Berencana (KB)</option>
                        <option value="Imunisasi / Anak">Imunisasi / Anak</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Cara Bayar</label>
                      <select name="cara_bayar" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                        <option value="Umum / Mandiri">Pilih Cara Bayar</option>
                        <option value="Umum / Mandiri">Umum / Mandiri</option>
                        <option value="BPJS">BPJS</option>
                        <option value="Jampersal">Jampersal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Keluhan Utama</label>
                      <textarea name="keluhan" rows="2" placeholder="Keluhan atau alasan kunjungan" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"></textarea>
                    </div>

                    <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 mt-2">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-teal-800 mb-3">
                        <Activity size={16} /> Pemeriksaan Awal (Opsional)
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Berat Badan (Kg)</label>
                          <input name="bb" placeholder="Contoh: 65" className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Tekanan Darah</label>
                          <input name="tensi" placeholder="Contoh: 120/80" className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowPasienModal(false)} className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition">Batal</button>
                  <button type="submit" className="px-8 py-2.5 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 font-bold flex items-center gap-2 shadow-sm transition">
                    Simpan & Masuk Antrian
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
      </div>
      {/* ================= MODAL GANTI PASSWORD ================= */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">Keamanan Akun</h3>
              <button 
                onClick={() => { setShowChangePasswordModal(false); setNewPassword(''); setConfirmPassword(''); }}
                className="text-slate-400 hover:text-red-500 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleUpdatePassword} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Password Baru</label>
                <input 
                  type="password" 
                  required 
                  placeholder="Minimal 6 karakter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Konfirmasi Password Baru</label>
                <input 
                  type="password" 
                  required 
                  placeholder="Ulangi password baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => { setShowChangePasswordModal(false); setNewPassword(''); setConfirmPassword(''); }}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
                >
                  Simpan Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
};

export default function App() {
// 1. Cek langsung ke saku browser (localStorage) saat web pertama kali dimuat
  const [user, setUser] = useState(() => {
    const sesiTersimpan = localStorage.getItem('sesiKlinik');
    return sesiTersimpan ? JSON.parse(sesiTersimpan) : null;
  });

  // 2. Karena cek saku browser itu sangat cepat (instan), loadingnya langsung kita matikan
  const [isAuthChecking, setIsAuthChecking] = useState(false);
  const [usersData, setUsersData] = useState([]);

  //
  // LIFTED STATE: Memori sementara dipindah ke sini agar tidak hilang saat berganti akun login (logout/login)
  const [pasienData, setPasienData] = useState([]); //
  const [antrianData, setAntrianData] = useState([]);
  const [karyawanData, setKaryawanData] = useState([]);
    const [showKaryawanModal, setShowKaryawanModal] = useState(false);
const [financeTransactions, setFinanceTransactions] = useState([]);

  const [reminderData, setReminderData] = useState([]);

  const [laporanData, setLaporanData] = useState({
    lap_anc: [], lap_partus: [], lap_bidan: [], lap_dokter: [], lap_kecantikan: [], lap_shk: [], lap_imunisasi: [], lap_kb: []
  });
// Tarik data akun asli dari Supabase
  useEffect(() => {
    const fetchAkun = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (data) {
        setUsersData(data);
      }
    };
    fetchAkun();
  }, []);

useEffect(() => {
    const ambilDataPasien = async () => {
      const { data, error } = await supabase.from('pasien').select('*');
      if (data) {
        // Kita sesuaikan nama kolom Supabase (snake_case) ke format aplikasi (camelCase)
        const formatData = data.map(p => ({
          ...p,
          noBpjs: p.no_bpjs,
          lastVisit: p.last_visit,
          satuSehat: p.satu_sehat
        }));
        // Masukkan data asli dari database ke layar!
        setPasienData(formatData);
      }
    };
    const ambilDataAntrian = async () => {
    const { data } = await supabase
      .from('antrian')
      .select('*')
      .neq('status', 'Selesai');

    if (data) {
      const formatAntrian = data.map(a => ({
        ...a, idAntrian: a.id_antrian, pasienId: a.pasien_id
      }));
      setAntrianData(formatAntrian);
    }
  };
const ambilDataTransaksi = async () => {
      const { data } = await supabase.from('transaksi').select('*');
      if (data) {
        const formatTransaksi = data.map(t => ({
          ...t, 
          id: t.id_transaksi,
          desc: t.keterangan // <--- INI KUNCI YANG HILANG! Kita terjemahkan untuk layar React
        }));
        setFinanceTransactions(formatTransaksi);
      }
    };
  const ambilDataReminder = async () => {
      const { data } = await supabase.from('reminder').select('*');
      if (data) {
        // Sesuaikan id_reminder dari database menjadi id untuk layar React
        const formatReminder = data.map(r => ({
          ...r, id: r.id_reminder
        }));
        setReminderData(formatReminder);
      }
    };

    ambilDataPasien();
    ambilDataAntrian();
    ambilDataTransaksi();
    ambilDataReminder();
  }, []);


if (isAuthChecking) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <p className="text-teal-600 font-bold text-xl animate-pulse">Memuat Dashboard...</p>
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <LandingPage onLogin={(userData) => setUser(userData)} users={usersData} />
        } />
        <Route path="/dashboard" element={
          <Dashboard 
            user={user} 
            usersData={usersData} 
            setUsersData={setUsersData} 
            onLogout={() => setUser(null)}
            
            pasienData={pasienData} setPasienData={setPasienData}
            antrianData={antrianData} setAntrianData={setAntrianData}
            karyawanData={karyawanData} setKaryawanData={setKaryawanData}
            financeTransactions={financeTransactions} setFinanceTransactions={setFinanceTransactions}
            reminderData={reminderData} setReminderData={setReminderData}
            laporanData={laporanData} setLaporanData={setLaporanData}
          />
        } />
      </Routes>
    </Router>
  );
}