import React, { useState, useEffect } from 'react';
import { Download, Github, MapPin, CalendarClock, ShieldCheck, Menu, X, Smartphone, ArrowRight, Activity, Search, CreditCard, Trophy, Users, CheckCircle2, PlayCircle, Dribbble, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { q: "Apa saja metode pembayaran yang didukung oleh Lapangku?", a: "Lapangku mendukung berbagai metode pembayaran cashless yang aman dan praktis. Saat ini, sistem kami terintegrasi dengan pembayaran via QRIS, Transfer Bank (Virtual Account untuk berbagai bank besar), serta e-Wallet (GoPay, OVO, DANA, dan ShopeePay). Semua transaksi diproses secara real-time." },
    { q: "Bagaimana cara membatalkan jadwal lapangan yang sudah dipesan?", a: "Pembatalan sangat mudah dilakukan langsung dari aplikasi. Buka menu \"Pesanan Saya\", pilih tiket booking yang aktif, lalu tekan tombol \"Batalkan Pesanan\". Sistem akan otomatis memverifikasi status pesanan Anda. Pastikan untuk membaca batas waktu maksimal pembatalan (misalnya 24 jam sebelum jadwal) agar memenuhi syarat pengembalian dana." },
    { q: "Bagaimana prosedur pengembalian dana (refund) jika saya batal main?", a: "Jika pembatalan dilakukan sebelum batas waktu yang ditentukan oleh pihak lapangan, dana Anda bisa dikembalikan. Setelah Anda menekan tombol batal, sistem akan memproses refund secara otomatis. Dana akan masuk kembali ke rekening atau e-Wallet yang Anda gunakan dalam estimasi waktu 1-3 hari kerja (tergantung metode pembayaran yang dipilih)." },
    { q: "Apakah jadwal lapangan yang tampil di aplikasi selalu akurat dan real-time?", a: "Ya! Salah satu keunggulan utama Lapangku adalah sinkronisasi jadwal yang real-time (langsung terhubung dengan sistem pengelola lapangan). Begitu ada pengguna yang menyelesaikan pembayaran, slot waktu tersebut akan otomatis terkunci untuk mencegah terjadinya double booking atau jadwal bentrok." },
    { q: "Apakah saya bisa mengubah jadwal (reschedule) pesanan yang sudah dibayar?", a: "Untuk saat ini, fitur ubah jadwal (reschedule) secara langsung masih dalam tahap pengembangan. Sebagai alternatif, Anda dapat membatalkan pesanan yang lama (meminta refund) dan membuat pesanan baru dengan jadwal yang sesuai, selama masih memenuhi syarat batas waktu pembatalan." }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500/20 overflow-x-hidden relative">
      
      {/* Optimized Ambient Background Blobs (No heavy mix-blend modes) */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-emerald-200/40 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Navbar */}
      <div className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
        <header className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md border border-white/80 rounded-full px-5 py-3 md:py-4 flex justify-between items-center shadow-sm transition-all">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-sm flex-shrink-0">
              <Smartphone className="w-5 h-5 lg:w-6 lg:h-6" />
            </div>
            <span className="font-extrabold text-xl lg:text-2xl tracking-tight text-slate-900">Lapangku.</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 lg:space-x-2">
             <a href="#beranda" onClick={(e) => handleScroll(e, 'beranda')} className="text-sm font-bold text-emerald-700 bg-emerald-50 px-5 py-2 rounded-full transition-colors">Beranda</a>
             <a href="#fitur" onClick={(e) => handleScroll(e, 'fitur')} className="text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-5 py-2 rounded-full transition-colors">Fitur</a>
             <a href="#tentang" onClick={(e) => handleScroll(e, 'tentang')} className="text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-5 py-2 rounded-full transition-colors">Tentang Kami</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2">
               <Github className="w-5 h-5" />
               <span>Repositori</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-full bg-white border border-slate-200 text-slate-700 focus:outline-none hover:bg-slate-50 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[80px] left-4 right-4 bg-white border border-slate-100 rounded-3xl p-4 shadow-xl z-50 lg:hidden flex flex-col gap-1"
            >
              <a href="#beranda" onClick={(e) => handleScroll(e, 'beranda')} className="block px-5 py-3.5 rounded-2xl text-base font-bold text-emerald-700 bg-emerald-50">Beranda</a>
              <a href="#fitur" onClick={(e) => handleScroll(e, 'fitur')} className="block px-5 py-3.5 rounded-2xl text-base font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50">Fitur</a>
              <a href="#tentang" onClick={(e) => handleScroll(e, 'tentang')} className="block px-5 py-3.5 rounded-2xl text-base font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50">Tentang Kami</a>
              <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="block px-5 py-3.5 rounded-2xl text-base font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-2">
                 <Github className="w-5 h-5"/> Repositori GitHub
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full pt-32 lg:pt-40 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div id="beranda" className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mb-24">
           {/* Text Content */}
           <div className="flex-1 max-w-2xl text-center lg:text-left z-10 pt-4">
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5 }}
                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-semibold mb-6 sm:mb-8"
              >
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 Aplikasi Booking Instan Tanpa Ribet
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-6"
              >
                Cara Termudah <br className="hidden md:block"/> Booking <span className="text-emerald-500">Lapangan</span> Favoritmu
              </motion.h1>
              
              <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="text-slate-600 text-base sm:text-lg lg:text-xl md:max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed font-medium"
              >
                 Platform praktis untuk mencari dan memesan jadwal lapangan olahraga kapan saja dan di mana saja. Temukan teman, sehat bersama dengan Lapangku.
              </motion.p>
              
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.3 }}
                 className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                 <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all duration-300">
                    <Download className="w-5 h-5" />
                    Download App
                 </button>
                 <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold px-8 py-4 rounded-full shadow-sm border border-slate-200 hover:shadow hover:-translate-y-0.5 transition-all duration-300">
                    <Github className="w-5 h-5" />
                    Lihat GitHub
                 </a>
              </motion.div>
           </div>

           {/* Optimized Mockup Display */}
           <div className="flex-1 w-full max-w-[320px] lg:max-w-[400px] mx-auto lg:ml-auto relative flex justify-center z-10">
              {/* Simple background decorative circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pt-[100%] bg-gradient-to-tr from-emerald-100 to-slate-100 rounded-full blur-2xl opacity-60 -z-10"></div>
              
              <motion.div
                 animate={{ y: [0, -15, 0] }}
                 transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                 className="relative rotate-[12deg] w-[260px] lg:w-[300px] bg-slate-900 rounded-[44px] lg:rounded-[52px] p-2 sm:p-2.5 shadow-2xl shadow-slate-900/40 border-[8px] border-slate-800"
              >
                 {/* Internal Screen Container (Simplified) */}
                 <div className="w-full h-[540px] lg:h-[600px] bg-white rounded-[32px] lg:rounded-[36px] overflow-hidden relative">
                     {/* Dynamic Island */}
                     <div className="absolute top-3 inset-x-0 h-6 bg-slate-900 rounded-full w-24 mx-auto z-30"></div>
                     
                     {/* UI Mockup Content */}
                     {isLoading ? (
                       <div className="bg-slate-50 h-[540px] lg:h-[600px] w-full p-5 pt-14 rounded-b-[32px] animate-pulse absolute top-0 left-0 right-0 bottom-0 z-20">
                         <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                            <div className="w-24 h-4 bg-slate-200 rounded-full"></div>
                         </div>
                         <div className="w-full h-12 bg-slate-200 rounded-2xl mb-8"></div>
                         <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                              <div key={item} className="w-full h-24 bg-slate-200/50 rounded-[20px] flex p-3 gap-3">
                                 <div className="w-20 h-full bg-slate-200 rounded-xl"></div>
                                 <div className="flex-1 py-2 flex flex-col justify-center space-y-3">
                                    <div className="h-3 bg-slate-300 rounded-full w-4/5"></div>
                                    <div className="h-2 bg-slate-200 rounded-full w-1/2"></div>
                                 </div>
                              </div>
                            ))}
                         </div>
                       </div>
                     ) : (
                       <motion.div 
                         initial={{ opacity: 0 }} 
                         animate={{ opacity: 1 }} 
                         transition={{ duration: 0.5 }}
                         className="relative z-10 w-full h-full"
                       >
                         <div className="bg-emerald-500 h-48 w-full px-5 pt-14 rounded-b-[32px] shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                               <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                                  <Smartphone className="w-4 h-4" />
                               </div>
                               <span className="text-white font-bold">Lapangku</span>
                            </div>
                            <div className="w-full h-12 bg-white/90 rounded-2xl shadow-sm flex items-center px-4">
                               <div className="w-4 h-4 rounded-full bg-emerald-100"></div>
                               <div className="w-3/4 h-2 rounded-full bg-slate-100 ml-3"></div>
                            </div>
                         </div>
                         <div className="px-4 py-5 space-y-4 -mt-8 relative z-10">
                            {/* Simulating cards */}
                            {[1, 2, 3].map((item) => (
                              <div key={item} className="w-full h-24 bg-white rounded-[20px] shadow-sm border border-slate-100 flex p-3 gap-3">
                                 <div className="w-20 h-full bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                                   <MapPin className="w-6 h-6" />
                                 </div>
                                 <div className="flex-1 py-2 flex flex-col justify-center space-y-2">
                                    <div className="h-3 bg-slate-200 rounded-full w-4/5"></div>
                                    <div className="h-2 bg-slate-100 rounded-full w-1/2"></div>
                                 </div>
                              </div>
                            ))}
                         </div>
                       </motion.div>
                     )}
                 </div>
              </motion.div>

              {/* Floating Element - Keeps interactivity feeling alive but cleaner */}
              {!isLoading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }} 
                  transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.4 }, y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 } }} 
                  className="absolute bottom-16 -left-6 lg:-left-16 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-[20px] shadow-xl shadow-slate-200/50 border border-slate-100 z-30 flex items-center gap-3 sm:gap-4 w-max"
                >
                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-emerald-600">
                      <CalendarClock className="w-5 h-5 sm:w-6 sm:h-6"/>
                   </div>
                   <div className="pr-2">
                      <div className="text-[11px] sm:text-[12px] text-slate-500 font-medium mb-0.5">Berhasil Re-schedule</div>
                      <div className="text-[13px] sm:text-[15px] font-bold text-slate-900">Futsal Senayan</div>
                   </div>
                </motion.div>
              )}
           </div>
        </div>

        {/* Feature Sections */}
        <div id="fitur" className="pt-20">
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="text-center max-w-2xl mx-auto mb-16"
           >
             <h2 className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-3">Keunggulan Utama</h2>
             <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Satu Aplikasi, Ragam Kemudahan</h3>
             <p className="text-slate-600">Kami mengintegrasikan setiap tahap pencarian, pemesanan, hingga pembayaran menjadi satu ekosistem yang kohesif.</p>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {isLoading ? (
                <>
                  {[...Array(4)].map((_, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between h-[300px] sm:h-[320px] animate-pulse"
                    >
                      <div>
                        <div className="w-14 h-14 bg-slate-200 rounded-2xl mb-6"></div>
                        <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-4"></div>
                        <div className="h-4 bg-slate-200 rounded-full w-full mb-2"></div>
                        <div className="h-4 bg-slate-200 rounded-full w-5/6 mb-2"></div>
                        <div className="h-4 bg-slate-200 rounded-full w-4/6 mt-6"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {/* Clean Consistent Cards mapped via structure */}
                  {[
                    {
                      id: "tentang",
                      title: "Platform Overview",
                      desc: "Lapangku merupakan manifestasi modern standar universal untuk menyederhanakan mobilitas dan aksesibilitas fasilitas olahraga harian.",
                      icon: Activity,
                      isHighlight: true,
                      badge: "Versi 1.0"
                    },
                    {
                      id: "pencarian",
                      title: "Pencarian Lapangan",
                      desc: "Eksplorasi cerdas secara spesifik berdasarkan kategori fasilitas, rating, jarak radius, maupun ketersediaan jam terdekat.",
                      icon: MapPin,
                    },
                    {
                      id: "jadwal",
                      title: "Reservasi Real-time",
                      desc: "Sinkronisasi eksklusif untuk mencegah jadwal ganda. Lakukan inspeksi slot waktu jam kosong secara transparan.",
                      icon: CalendarClock,
                    },
                    {
                      id: "bayar",
                      title: "Pembayaran Aman",
                      desc: "Integrasi mutakhir yang menerima berbagai gerbang pembayaran digital secara otomatis dan terverifikasi di tempat.",
                      icon: ShieldCheck,
                    }
                  ].map((card, idx) => (
                    <motion.div 
                      key={card.id}
                      id={card.id === 'tentang' ? 'tentang' : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className={`bg-white rounded-3xl p-8 border ${card.isHighlight ? 'border-emerald-200/60 shadow-emerald-500/5' : 'border-slate-100 shadow-slate-200/20'} shadow-xl hover:-translate-y-1.5 transition-transform duration-300 flex flex-col justify-between`}
                    >
                      <div>
                        {card.isHighlight ? (
                          <div className="inline-flex items-center space-x-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest">{card.badge}</span>
                          </div>
                        ) : (
                          <div className="w-14 h-14 bg-slate-50 text-emerald-500 border border-slate-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <card.icon className="w-6 h-6" />
                          </div>
                        )}
                        <h4 className="font-extrabold text-lg sm:text-xl text-slate-900 mb-3 leading-snug">{card.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                      {card.isHighlight && (
                         <div className="mt-8 flex items-center gap-2 text-emerald-500 font-bold text-sm cursor-pointer hover:text-emerald-600 group">
                           Jelajahi Sejarah PBL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                         </div>
                      )}
                    </motion.div>
                  ))}
                </>
              )}
           </div>
        </div>

        {/* Sports Categories Section */}
        <div className="pt-10 pb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="text-center max-w-2xl mx-auto mb-12"
           >
             <h2 className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-3">Kategori</h2>
             <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Temukan Lapangan Favoritmu</h3>
           </motion.div>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { name: "Futsal", icon: PlayCircle },
                { name: "Badminton", icon: Trophy },
                { name: "Basket", icon: Dribbble },
                { name: "Tennis", icon: Activity }
              ].map((sport, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group cursor-pointer"
                >
                   <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                      <sport.icon className="w-8 h-8 sm:w-10 sm:h-10" />
                   </div>
                   <span className="font-bold text-slate-700 group-hover:text-slate-900">{sport.name}</span>
                </motion.div>
              ))}
           </div>
        </div>

        {/* How It Works Section */}
        <div className="pt-10 pb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="text-center max-w-2xl mx-auto mb-16"
           >
             <h2 className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-3">Cara Kerja</h2>
             <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Mulai Main Dalam 4 Langkah</h3>
           </motion.div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10"></div>
              
              {[
                { title: "Cari Lapangan", desc: "Pilih fasilitas terdekat dan tentukan jenis olahraga.", icon: Search },
                { title: "Pilih Jadwal", desc: "Tentukan hari dan jam sesuai ketersediaan real-time.", icon: CalendarClock },
                { title: "Pembayaran", desc: "Bayar menggunakan e-wallet atau transfer bank aman.", icon: CreditCard },
                { title: "Mulai Main", desc: "Tunjukkan bukti booking dan langsung main tanpa antri!", icon: CheckCircle2 }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white border-[6px] border-slate-50 text-emerald-500 shadow-xl shadow-slate-200/50 rounded-full flex items-center justify-center mb-6 relative z-10">
                     <step.icon className="w-6 h-6 md:w-8 md:h-8" />
                     <div className="absolute -top-1 -right-1 w-6 h-6 md:w-8 md:h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] md:text-sm font-bold border-2 border-white">
                       {i + 1}
                     </div>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-sm md:text-base text-slate-600 px-4">{step.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-10 pb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="text-center max-w-2xl mx-auto mb-16"
           >
             <h2 className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-3">Pusat Bantuan</h2>
             <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h3>
           </motion.div>

           <div className="max-w-3xl mx-auto px-4 sm:px-0 space-y-4">
              {faqs.map((faq, index) => (
                 <motion.div 
                   key={index}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4, delay: index * 0.1 }}
                   className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl hover:shadow-md transition-all duration-300 overflow-hidden"
                 >
                    <button 
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                    >
                      <span className={`font-bold pr-4 transition-colors duration-300 ${activeFaq === index ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: activeFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${activeFaq === index ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}
                      >
                         <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-5 pt-0 text-slate-600 text-sm md:text-base leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* CTA Section */}
        <div className="py-10 mb-10">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="bg-slate-900 rounded-[40px] p-8 md:p-16 text-center shadow-2xl shadow-slate-900/20 relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
              
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10">Siap Untuk Berkeringat Hari Ini?</h2>
              <p className="text-slate-300 md:text-lg max-w-2xl mx-auto mb-10 relative z-10">Bergabunglah dengan ribuan orang yang sudah merasakan kemudahan booking lapangan olahraga dengan Lapangku.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-emerald-500/30 hover:-translate-y-1 transition-all">
                   Download Sekarang
                </button>
                <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-full border border-slate-700 hover:border-slate-600 transition-all">
                   Pelajari Selengkapnya
                </a>
              </div>
           </motion.div>
        </div>

      </main>

      {/* Clean Modern Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-500" />
            <span className="font-extrabold text-lg tracking-tight text-slate-900">Lapangku.</span>
          </div>
          <div className="text-sm font-medium text-slate-500 text-center">
            &copy; {new Date().getFullYear()} Lapangku. Dirancang untuk Project Based Learning.
          </div>
          <div>
            <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-bold text-sm transition-colors bg-slate-50 hover:bg-emerald-50 px-5 py-2.5 rounded-full border border-slate-100">
               <Github className="w-4 h-4" />
               GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
