import React, { useState } from 'react';
import { Download, Github, MapPin, CalendarClock, ShieldCheck, Menu, X, Smartphone, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#111315] text-[#0F172A] font-sans selection:bg-[#10B981]/30 p-2 sm:p-4 lg:p-6 xl:p-8 flex items-center justify-center overflow-x-hidden">
      
      {/* App Container */}
      <div className="w-full max-w-[1300px] flex flex-col relative bg-gradient-to-br from-[#e0fced] via-[#f8fafc] to-[#e6e4fe] rounded-[32px] lg:rounded-[48px] shadow-[0_0_80px_rgba(255,255,255,0.05)] overflow-hidden min-h-[90vh] border border-white/40">
        
        {/* Background Ambient Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#c7d2fe] rounded-full mix-blend-multiply filter blur-[80px] md:blur-[100px] opacity-70 pointer-events-none"></div>
        <div className="absolute top-[20%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#bbf7d0] rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-60 pointer-events-none"></div>

        {/* Navbar */}
        <div className="px-4 md:px-8 lg:px-10 pt-6 md:pt-8 relative z-50">
          <header className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-full px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2">
              <div className="bg-[#10B981] p-1.5 sm:p-2 rounded-xl text-white shadow-sm">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-extrabold text-[20px] sm:text-[24px] tracking-tight text-[#0F172A]">Lapangku.</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 bg-white/40 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/50 shadow-sm">
               <a href="#beranda" onClick={(e) => handleScroll(e, 'beranda')} className="text-[14px] font-bold text-[#0F172A] bg-white/60 shadow-sm px-6 py-2.5 rounded-full transition-all">Beranda</a>
               <a href="#fitur" onClick={(e) => handleScroll(e, 'fitur')} className="text-[14px] font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-white/50 px-6 py-2.5 rounded-full transition-all">Fitur</a>
               <a href="#tentang" onClick={(e) => handleScroll(e, 'tentang')} className="text-[14px] font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-white/50 px-6 py-2.5 rounded-full transition-all">Tentang Kami</a>
               <a href="https://github.com/Maulanahb/Lapangku/tree/develop" target="_blank" rel="noopener noreferrer" className="text-[14px] font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-white/50 px-6 py-2.5 rounded-full transition-all">Repositori</a>
            </nav>

            <div className="hidden lg:block">
              <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/60 hover:bg-white border border-white/80 rounded-full flex items-center justify-center transition-all shadow-sm text-[#0F172A]">
                 <Github className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-full bg-white/50 border border-white/60 text-[#0F172A] focus:outline-none"
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
                className="absolute top-[80px] left-4 right-4 sm:left-8 sm:right-8 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl p-4 shadow-2xl z-50 lg:hidden flex flex-col gap-2"
              >
                <a href="#beranda" onClick={(e) => handleScroll(e, 'beranda')} className="block px-5 py-3.5 rounded-2xl text-base font-bold text-[#0F172A] bg-white/60">Beranda</a>
                <a href="#fitur" onClick={(e) => handleScroll(e, 'fitur')} className="block px-5 py-3.5 rounded-2xl text-base font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-white/40">Fitur</a>
                <a href="#tentang" onClick={(e) => handleScroll(e, 'tentang')} className="block px-5 py-3.5 rounded-2xl text-base font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-white/40">Tentang Kami</a>
                <a href="https://github.com/Maulanahb/Lapangku/tree/develop" target="_blank" rel="noopener noreferrer" className="block px-5 py-3.5 rounded-2xl text-base font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-white/40">Repositori</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hero Section */}
        <main id="beranda" className="flex-1 px-6 md:px-10 lg:px-16 pt-16 md:pt-20 lg:pt-24 pb-12 flex flex-col lg:flex-row justify-between relative z-10 gap-16 lg:gap-8">
           
           {/* Text Content */}
           <div className="flex-1 max-w-[640px] flex flex-col justify-center relative z-20 mx-auto lg:mx-0 text-center lg:text-left">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-[44px] sm:text-[56px] lg:text-[72px] font-[800] leading-[1.05] tracking-[-0.03em] text-[#0F172A] mb-8"
              >
                Cara Termudah<br/>Booking <br className="lg:hidden" />
                <span className="inline-block relative">
                   <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#16A34A] to-[#10B981]">Lapangan Olahraga</span>
                   <span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-[12px] sm:h-[18px] bg-[#10B981]/20 -rotate-1 rounded-sm z-0"></span>
                </span><br/>Favoritmu
              </motion.h1>
              <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.15 }}
                 className="text-[#475569] text-[16px] sm:text-[18px] lg:text-[20px] max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              >
                 Aplikasi praktis untuk mencari dan memesan jadwal lapangan olahraga kapan saja dan di mana saja.
              </motion.p>
              
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.3 }}
                 className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5"
              >
                 <button className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-[#0F172A] font-[800] px-8 sm:px-10 py-4 sm:py-4.5 rounded-full border border-black/5 shadow-[0_8px_24px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all duration-300">
                    <Download className="w-5 h-5" />
                    Download App
                 </button>
                 <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-[800] px-8 sm:px-10 py-4 sm:py-4.5 rounded-full shadow-[0_8px_24px_rgba(15,23,42,0.2)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all duration-300">
                    <Github className="w-5 h-5" />
                    Lihat GitHub
                 </a>
              </motion.div>
           </div>

           {/* 3D Phone Mockup */}
           <div className="relative w-full max-w-[340px] h-[400px] lg:w-[480px] lg:h-[auto] mx-auto lg:mx-0 flex justify-center items-center">
              <motion.div
                 animate={{ y: [0, -15, 0] }}
                 transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                 className="absolute lg:right-[-20px] top-4 lg:top-[-40px] xl:top-[-80px] rotate-[18deg] w-[280px] lg:w-[320px] h-[580px] lg:h-[640px] bg-[#1e293b] border-[12px] border-[#334155] rounded-[48px] lg:rounded-[56px] shadow-[10px_40px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden z-20"
              >
                 <div className="w-full h-full bg-[#f8fafc] relative">
                     {/* Dynamic Island */}
                     <div className="absolute top-2.5 inset-x-0 h-7 bg-black rounded-full w-28 mx-auto z-30"></div>
                     <div className="absolute top-4 right-16 w-2 h-2 rounded-full bg-green-500 z-40"></div>
                     
                     {/* App Header */}
                     <div className="bg-[#10B981] h-64 w-full rounded-b-[40px] px-6 pt-16 shadow-inner relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="flex items-center gap-2 mb-6">
                           <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                              <Smartphone className="w-5 h-5" />
                           </div>
                           <span className="text-white font-bold text-lg">Lapangku</span>
                        </div>
                        <div className="w-full h-14 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center px-4">
                           <div className="w-5 h-5 rounded-full bg-white/40"></div>
                           <div className="w-24 h-2 rounded-full bg-white/20 ml-3"></div>
                        </div>
                     </div>
                     {/* App Content */}
                     <div className="px-5 py-6 space-y-4 -mt-10 relative z-10">
                        <div className="w-full h-32 bg-white rounded-[24px] shadow-[0_8px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex p-3 gap-3">
                           <div className="w-24 h-full bg-[#e2e8f0] rounded-xl flex items-center justify-center text-[#94a3b8]">
                             <MapPin className="w-6 h-6" />
                           </div>
                           <div className="flex-1 py-3 space-y-3">
                              <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                              <div className="h-3 bg-gray-100 rounded-full w-1/2"></div>
                           </div>
                        </div>
                        <div className="w-full h-32 bg-white rounded-[24px] shadow-[0_8px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex p-3 gap-3">
                           <div className="w-24 h-full bg-[#e2e8f0] rounded-xl"></div>
                           <div className="flex-1 py-3 space-y-3">
                              <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                              <div className="h-3 bg-gray-100 rounded-full w-1/2"></div>
                           </div>
                        </div>
                     </div>
                 </div>
              </motion.div>
              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }} 
                className="absolute bottom-10 -left-6 sm:left-4 lg:-left-20 bg-white/80 backdrop-blur-xl p-4 lg:p-5 rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-white/80 z-30 flex items-center gap-4"
              >
                 <div className="w-12 h-12 bg-[#10B981]/10 rounded-2xl flex items-center justify-center text-[#10B981]">
                    <CalendarClock className="w-6 h-6"/>
                 </div>
                 <div>
                    <div className="text-[12px] text-gray-500 font-medium mb-0.5">Baru dipesan:</div>
                    <div className="text-[15px] font-bold text-[#0F172A]">Futsal Senayan</div>
                 </div>
              </motion.div>
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }} 
                className="absolute top-20 right-0 sm:-right-10 lg:-right-8 bg-white/80 backdrop-blur-xl py-3 px-5 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-white/80 z-30 flex items-center gap-2"
              >
                 <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                 <span className="text-[13px] font-semibold text-[#0F172A]">Aktif & Real-time</span>
              </motion.div>
           </div>
        </main>

        {/* Bottom Info & Feature Cards */}
        <div id="fitur" className="px-6 md:px-10 lg:px-16 pt-8 pb-10 z-20 relative">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.7, delay: 0.2 }}
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
           >
              {/* Card 1: Overview */}
              <div id="tentang" className="bg-white/50 backdrop-blur-xl rounded-[32px] p-6 lg:p-8 border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:-translate-y-2 transition-all duration-300 group hover:bg-white/80">
                <h3 className="font-[800] text-[18px] lg:text-[20px] text-[#0F172A] mb-3 group-hover:text-[#10B981] transition-colors leading-tight">Transformasi Akses Olahraga</h3>
                <p className="text-[14px] text-[#475569] leading-relaxed mb-6">
                   Lapangku adalah platform booking lapangan olahraga komprehensif. Dirancang dengan standar universal untuk menyederhanakan akses fasilitas bagi ribuan orang.
                </p>
                <div className="inline-flex items-center space-x-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                   <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                   <span className="text-[12px] font-[700] text-emerald-700">Versi Rilis 1.0</span>
                </div>
              </div>

              {/* Card 2: Location */}
              <div className="bg-white/50 backdrop-blur-xl rounded-[32px] p-6 lg:p-8 border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:-translate-y-2 transition-all duration-300 group hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] hover:bg-white/80">
                <div className="w-14 h-14 bg-blue-100/80 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                   <MapPin className="w-7 h-7" />
                </div>
                <h3 className="font-[800] text-[18px] lg:text-[20px] text-[#0F172A] mb-3">Pencarian Lapangan</h3>
                <p className="text-[14px] text-[#475569] leading-relaxed">
                   Eksplorasi dan temukan lapangan olahraga yang sesuai tipe, lokasi terdekat, atau rekomendasi fasilitas spesifik.
                </p>
              </div>

              {/* Card 3: Booking */}
              <div className="bg-white/50 backdrop-blur-xl rounded-[32px] p-6 lg:p-8 border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:-translate-y-2 transition-all duration-300 group hover:shadow-[0_20px_40px_rgba(168,85,247,0.1)] hover:bg-white/80">
                <div className="w-14 h-14 bg-purple-100/80 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                   <CalendarClock className="w-7 h-7" />
                </div>
                <h3 className="font-[800] text-[18px] lg:text-[20px] text-[#0F172A] mb-3">Jadwal Real-time</h3>
                <p className="text-[14px] text-[#475569] leading-relaxed">
                   Ucapkan selamat tinggal pada jadwal ganda. Cek ketersediaan slot waktu secara sinkron untuk memudahkan booking.
                </p>
              </div>

              {/* Card 4: Payments */}
              <div className="bg-white/50 backdrop-blur-xl rounded-[32px] p-6 lg:p-8 border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:-translate-y-2 transition-all duration-300 group hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] hover:bg-white/80">
                <div className="w-14 h-14 bg-teal-100/80 text-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                   <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-[800] text-[18px] lg:text-[20px] text-[#0F172A] mb-3">Pembayaran Aman</h3>
                <p className="text-[14px] text-[#475569] leading-relaxed">
                   Selesaikan proses booking secara instan melalui sistem terintegrasi yang mendukung berbagai macam metode aman.
                </p>
              </div>
           </motion.div>

           {/* Inner Footer */}
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.5, duration: 0.5 }}
             className="flex flex-col sm:flex-row items-center justify-between mt-12 mb-2 px-2"
           >
             <p className="text-[13px] text-[#64748B] mb-4 sm:mb-0 font-medium">
               &copy; {new Date().getFullYear()} Lapangku. All rights reserved.
             </p>
             <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#0F172A] font-bold text-[13px] hover:text-[#10B981] transition-colors rounded-full px-4 py-2 hover:bg-white/50">
                <Github className="w-4 h-4" />
                GitHub Repo
             </a>
           </motion.div>
        </div>

      </div>
    </div>
  );
}
