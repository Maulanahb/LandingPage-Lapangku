import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, CheckCircle2, Scan, ShoppingBag, Database, Smartphone, ShieldCheck, Cpu } from 'lucide-react';
import MobileAppDemo from './MobileAppDemo';

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<'customer' | 'mitra' | 'scan'>('customer');
  
  // Tracking active screens for bidirectional sync
  const [customerScreen, setCustomerScreen] = useState(0);
  const [mitraScreen, setMitraScreen] = useState(0);
  const [scanScreen, setScanScreen] = useState(0);

  // Expanded detailed content for every step in the user flows
  const customerSteps = [
    {
      title: 'Splash Screen',
      desc: 'Tampilan awal aplikasi saat pertama kali dibuka. Sistem otomatis mengecek sesi login pengguna ke Firebase Auth.',
      tech: ['Flutter App', 'Firebase Auth']
    },
    {
      title: 'Katalog & Pencarian',
      desc: 'Halaman beranda yang menampilkan daftar lapangan olahraga, kategori cabang olahraga, pencarian nama, dan info jarak.',
      tech: ['Firestore Query', 'Geolocator']
    },
    {
      title: 'Detail Venue Lapangan',
      desc: 'Melihat rincian fasilitas (Wi-Fi, kantin, loker), jam buka operasional, harga sewa per jam, dan rating ulasan customer.',
      tech: ['Real-time Updates', 'Framer Rating']
    },
    {
      title: 'Pilih Tanggal & Jam',
      desc: 'Pilih tanggal bermain dan slot jam yang masih tersedia. Durasi dan total biaya akan dihitung secara otomatis secara instan.',
      tech: ['Dynamic Pricing', 'State Management']
    },
    {
      title: 'Metode Pembayaran',
      desc: 'Menampilkan detail tagihan dan pilihan metode pembayaran digital melalui Midtrans dengan status transaksi otomatis.',
      tech: ['Midtrans API', 'Payment Callback']
    },
    {
      title: 'E-Tiket Sukses',
      desc: 'E-Tiket digital diterbitkan secara otomatis dengan status konfirmasi dan QR Code unik untuk check-in di lapangan.',
      tech: ['QR Code Generator', 'Firebase Cloud Messaging']
    },
    {
      title: 'Riwayat Pesanan Saya',
      desc: 'Layar untuk melacak semua pemesanan aktif maupun riwayat masa lalu (Menunggu Pembayaran, Lunas, Selesai).',
      tech: ['Firestore Snapshot', 'Status Tracker']
    }
  ];

  const mitraSteps = [
    {
      title: 'Dasbor Utama Mitra',
      desc: 'Halaman ringkasan pendapatan bulanan, pesanan aktif yang harus dilayani, dan status transaksi yang masuk dari payment gateway.',
      tech: ['Firestore Aggregates', 'Flutter Charts']
    },
    {
      title: 'Kelola Lapangan',
      desc: 'Menampilkan daftar lapangan olahraga milik mitra yang disewakan ke publik, lengkap dengan tarif sewa per jam.',
      tech: ['CRUD Operations', 'Firestore Collection']
    },
    {
      title: 'Tambah Lapangan Baru',
      desc: 'Formulir interaktif untuk mendaftarkan lapangan baru dengan menginput nama, tipe lantai, harga sewa, dan memilih fasilitas.',
      tech: ['Firestore Write Transaction', 'Success Toast Alert']
    },
    {
      title: 'Pesanan Berbayar',
      desc: 'Pengelola melihat detail booking yang sudah lunas dan siap dilayani tanpa proses konfirmasi pembayaran manual.',
      tech: ['Payment Webhook', 'FCM Notification Trigger']
    },
    {
      title: 'Scanner QR Tiket',
      desc: 'Fitur pemindai kamera untuk membaca QR Code e-tiket customer saat datang ke venue untuk check-in instan otomatis.',
      tech: ['Mobile Camera SDK', 'Real-time Ticket Validator']
    },
    {
      title: 'Laporan Keuangan',
      desc: 'Grafik okupansi jadwal harian dan total saldo pendapatan yang siap dicairkan secara berkala oleh pengelola.',
      tech: ['Data Analytics', 'Occupancy Rates Chart']
    }
  ];

  const scanSteps = [
    {
      title: 'Tunjukkan E-Tiket',
      desc: 'Customer membuka aplikasi Lapangku dan menunjukkan QR Code unik pada E-Tiket mereka di pintu masuk GOR/lapangan.',
      tech: ['Customer Mobile App']
    },
    {
      title: 'Pindai QR Code Tiket',
      desc: 'Pengelola GOR membuka Scanner QR di aplikasi Mitra dan mengarahkan kamera ke QR Code e-tiket customer tersebut.',
      tech: ['QR Scanner Barcode Reader']
    },
    {
      title: 'Validasi Real-time Sukses',
      desc: 'Sistem memverifikasi ID Booking di database Firestore. Status tiket berubah menjadi Selesai dan waktu kedatangan dicatat.',
      tech: ['Firestore Real-time Verification', 'Attendance Tracker']
    }
  ];

  // Callback triggers when screen inside simulator changes
  const handleCustomerScreenChange = (screenIndex: number) => {
    setCustomerScreen(screenIndex);
  };

  const handleMitraScreenChange = (screenIndex: number) => {
    setMitraScreen(screenIndex);
  };

  // Determine active list and active screen index based on active tab
  const getTimelineSteps = () => {
    if (activeTab === 'customer') return customerSteps;
    if (activeTab === 'mitra') return mitraSteps;
    return scanSteps;
  };

  const getActiveScreenIndex = () => {
    if (activeTab === 'customer') return customerScreen;
    if (activeTab === 'mitra') return mitraScreen;
    return scanScreen;
  };

  const handleStepClick = (idx: number) => {
    if (activeTab === 'customer') {
      setCustomerScreen(idx);
    } else if (activeTab === 'mitra') {
      setMitraScreen(idx);
    } else {
      setScanScreen(idx);
    }
  };

  const getTechBadges = () => {
    if (activeTab === 'customer') {
      return ['Flutter SDK', 'Firebase Auth', 'Cloud Firestore', 'Midtrans API', 'Google Maps API'];
    }
    if (activeTab === 'mitra') {
      return ['Flutter SDK', 'Cloud Firestore', 'Firestore Transactions', 'Revenue Analytics Charts'];
    }
    return ['Mobile Camera SDK', 'QR Code Barcode Scan', 'Real-time Validation', 'Firestore Security Rules'];
  };

  return (
    <div className="py-20 relative bg-white" id="fitur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-3 block">Simulasi Interaktif</span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Coba Langsung Aplikasi Lapangku</h3>
          <p className="text-slate-500 leading-relaxed">Pilih peran di bawah dan jalankan simulasinya langsung di mockup handphone untuk mencoba berbagai fitur utama.</p>
        </div>

        {/* Top Tabs */}
        <div className="flex justify-center mb-12 relative z-20">
          <div className="inline-flex bg-slate-50 p-1.5 rounded-full border border-slate-200 shadow-sm overflow-x-auto max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => {
                setActiveTab('customer');
              }}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeTab === 'customer' ? 'bg-[#1B6B3A] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <ShoppingBag className="w-4 h-4" />
              Customer App
            </button>
            <button
              onClick={() => {
                setActiveTab('mitra');
              }}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeTab === 'mitra' ? 'bg-[#1B6B3A] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <Calendar className="w-4 h-4" />
              Manajemen Mitra
            </button>
            <button
              onClick={() => {
                setActiveTab('scan');
              }}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeTab === 'scan' ? 'bg-[#1B6B3A] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <Scan className="w-4 h-4" />
              Scanner QR Check-in
            </button>
          </div>
        </div>

        {/* Content & Mockup Grid: 3-column layout on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: App Info & Tech Stack (span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="premium-glass rounded-[28px] p-6 lg:p-8 text-left">
              <div className="w-12 h-12 bg-[#E8F5EC] text-[#1B6B3A] rounded-2xl flex items-center justify-center mb-5 border border-emerald-100">
                {activeTab === 'customer' ? <ShoppingBag className="w-5 h-5" /> : activeTab === 'mitra' ? <Calendar className="w-5 h-5" /> : <Scan className="w-5 h-5" />}
              </div>
              <h4 className="text-xl font-extrabold text-slate-800 tracking-tight mb-3">
                {activeTab === 'customer' ? 'Alur Booking Customer' : activeTab === 'mitra' ? 'Dasbor Bisnis Mitra' : 'Teknologi Validasi QR'}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {activeTab === 'customer' 
                  ? 'Simulasi alur pengguna mulai dari mencari lapangan, memilih jadwal, membayar via payment gateway, hingga mendapatkan e-tiket digital.' 
                  : activeTab === 'mitra' 
                    ? 'Dasbor bisnis pengelola untuk mengatur daftar lapangan, memantau pesanan berbayar, dan melihat diagram okupansi harian.' 
                    : 'Fitur penghubung yang mempercepat check-in customer di lapangan olahraga dengan memanfaatkan validasi kamera real-time.'}
              </p>

              {/* Tech Badges List */}
              <div className="border-t border-slate-200/60 pt-5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" /> Teknologi Terintegrasi
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {getTechBadges().map((techName) => (
                    <span 
                      key={techName} 
                      className="bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg text-[9px] font-bold shadow-sm"
                    >
                      {techName}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interaction Tip Box */}
            <div className="bg-[#E8F5EC]/70 border border-emerald-150 rounded-2xl p-5 flex gap-3 items-start shadow-sm text-left">
              <div className="flex-shrink-0 text-lg">💡</div>
              <div>
                <h4 className="font-bold text-[#1B6B3A] text-xs mb-1">Coba Interaksi:</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {activeTab === 'customer' 
                    ? 'Klik layar handphone simulasi untuk melanjutkan langkah, geser layar ke samping, atau klik salah satu langkah alur di samping kanan.' 
                    : activeTab === 'mitra' 
                      ? 'Gunakan form tambah lapangan atau buka pesanan berbayar pada simulator, dan perhatikan data pada dashboard terupdate secara real-time.' 
                      : 'Mockup terkunci pada layar scanner. Pindahkan tab untuk melihat bagaimana e-tiket diterbitkan.'}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Vertical Steps Timeline (span 5) */}
          <div className="lg:col-span-5 text-left">
            <div className="premium-glass rounded-[28px] p-6 lg:p-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">ALUR LANGKAH APLIKASI</h4>
              
              <div className="relative border-l border-slate-200 ml-3.5 space-y-6">
                {getTimelineSteps().map((step, idx) => {
                  const isActive = getActiveScreenIndex() === idx;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleStepClick(idx)}
                      className={`relative pl-7 cursor-pointer group transition-all duration-300`}
                    >
                      {/* Timeline dot */}
                      <span className={`absolute left-[-6px] top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#1B6B3A] border-[#1B6B3A] scale-125 shadow-sm shadow-[#1B6B3A]/30' 
                          : 'bg-white border-slate-300 group-hover:border-slate-400'
                      }`}>
                        {isActive && (
                          <span className="absolute inset-0 bg-[#1B6B3A] rounded-full animate-ping opacity-60"></span>
                        )}
                      </span>

                      {/* Step Card Content */}
                      <div className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                        isActive 
                          ? 'bg-white border-slate-200 shadow-md translate-x-1' 
                          : 'border-transparent hover:bg-slate-100/50'
                      }`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <h5 className={`font-bold text-sm transition-colors ${
                            isActive ? 'text-[#1B6B3A]' : 'text-slate-700 group-hover:text-slate-900'
                          }`}>
                            {idx + 1}. {step.title}
                          </h5>
                          {isActive && (
                            <span className="bg-[#E8F5EC] text-[#1B6B3A] font-extrabold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider">Layar Aktif</span>
                          )}
                        </div>
                        <p className={`text-xs leading-relaxed transition-colors ${
                          isActive ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {step.desc}
                        </p>
                        
                        {/* Internal technology indicators */}
                        {isActive && step.tech && (
                          <div className="flex gap-1.5 mt-2.5">
                            {step.tech.map((t) => (
                              <span key={t} className="bg-slate-50 border border-slate-150 text-slate-500 font-bold px-1.5 py-0.5 rounded text-[8px] tracking-wide">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 3: Flat Mockup Simulator (span 3) */}
          <div className="lg:col-span-3 flex justify-center relative pointer-events-auto z-10">
            {/* Decorative glow behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] pt-[120%] bg-gradient-to-tr from-[#1B6B3A]/10 via-[#1B6B3A]/5 to-sky-400/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
            
            <div className="relative z-10 w-full flex justify-center">
              <MobileAppDemo 
                tab={activeTab} 
                hideToggle={true} 
                autoplay={false} 
                variant="demo" // renders the FLAT mockup version
                customerScreenOverride={activeTab === 'customer' ? customerScreen : undefined}
                mitraScreenOverride={activeTab === 'mitra' ? mitraScreen : undefined}
                scanScreenOverride={activeTab === 'scan' ? scanScreen : undefined}
                onCustomerScreenChange={handleCustomerScreenChange}
                onMitraScreenChange={handleMitraScreenChange}
                onScanScreenChange={setScanScreen}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
