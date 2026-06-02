import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Download, Github, MapPin, CalendarClock, ShieldCheck, Menu, X, Smartphone, ArrowRight, Activity, Search, CreditCard, Trophy, Users, CheckCircle2, PlayCircle, Dribbble, ChevronDown, QrCode, Server, Code, Star, Zap, Clock, Upload, Eye, UserCircle, Store, Shield } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

// ─── Typewriter Hook ─────────────────────────────────────────────
function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 60, pauseDuration = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

// ─── Animated Counter Hook ───────────────────────────────────────
function useCounter(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }
  }, [startOnView]);

  useEffect(() => {
    if (!startOnView || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

// ─── Main App ────────────────────────────────────────────────────
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('beranda');
  const [activeProblemSlide, setActiveProblemSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProblemSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const typedWord = useTypewriter(['Futsal', 'Badminton', 'Basket', 'Tennis'], 120, 80, 1800);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // ─── Scroll spy for nav ────
  useEffect(() => {
    const sections = ['beranda', 'fitur', 'tentang', 'faq'];
    const handleScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveNav(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { q: "Bagaimana cara melakukan pembayaran di Lapangku?", a: "Setelah memilih jadwal dan mengonfirmasi booking, Anda akan diarahkan ke halaman pembayaran. Lakukan transfer ke rekening yang tertera, lalu upload bukti pembayaran melalui aplikasi. Tim pengelola lapangan (Mitra) akan memverifikasi bukti pembayaran Anda, dan status booking akan berubah menjadi 'Dikonfirmasi' setelah disetujui." },
    { q: "Bagaimana cara membatalkan jadwal lapangan yang sudah dipesan?", a: "Pembatalan dapat dilakukan langsung dari aplikasi. Buka menu 'Pesanan Saya', pilih tiket booking yang aktif, lalu tekan tombol 'Batalkan Pesanan'. Sistem akan otomatis memperbarui status pesanan Anda dan mengembalikan slot jadwal tersebut agar bisa dipesan oleh pengguna lain." },
    { q: "Bagaimana prosedur pengembalian dana (refund) jika saya batal main?", a: "Karena pembayaran dilakukan secara manual via transfer bank, proses refund akan dikoordinasikan langsung antara Anda dan pihak pengelola lapangan (Mitra). Anda bisa menghubungi pengelola melalui fitur 'Hubungi CS' di aplikasi untuk mengatur pengembalian dana." },
    { q: "Apakah jadwal lapangan yang tampil di aplikasi selalu akurat dan real-time?", a: "Ya! Salah satu keunggulan utama Lapangku adalah sinkronisasi jadwal secara real-time melalui Firebase Cloud Firestore. Begitu ada pengguna yang menyelesaikan booking, slot waktu tersebut akan otomatis terkunci untuk mencegah terjadinya double booking atau jadwal bentrok." },
    { q: "Apa perbedaan akun Customer, Mitra, dan Admin di Lapangku?", a: "Lapangku memiliki tiga peran pengguna: Customer dapat mencari dan memesan lapangan; Mitra adalah pengelola lapangan yang bisa mengelola jadwal, memverifikasi pembayaran, serta melihat laporan pendapatan; Admin bertugas mengawasi seluruh sistem termasuk verifikasi akun Mitra dan monitoring aktivitas platform." }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  // ─── Counter stats ────
  const stat1 = useCounter(150, 2000);
  const stat2 = useCounter(50, 2000);
  const stat3 = useCounter(24, 2000);
  const stat4 = useCounter(99, 2000);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'fitur', label: 'Fitur' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden relative">
      
      {/* ═══ Rich Animated Background ═══ */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Animated Mesh Gradient Blobs */}
        <div className="mesh-blob-1 absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-emerald-300/25 rounded-full blur-[130px]"></div>
        <div className="mesh-blob-2 absolute top-[15%] left-[-18%] w-[800px] h-[800px] bg-sky-200/30 rounded-full blur-[150px]"></div>
        <div className="mesh-blob-3 absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-violet-200/20 rounded-full blur-[120px]"></div>
        <div className="mesh-blob-4 absolute top-[60%] left-[20%] w-[400px] h-[400px] bg-teal-200/15 rounded-full blur-[100px]"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 grid-bg opacity-100"></div>
        
        {/* Hero Section Radial Gradient */}
        <div className="absolute inset-0 hero-gradient"></div>

        {/* Top Edge Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[2px] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"></div>
      </div>

      {/* ═══ Navbar ═══ */}
      <motion.div 
        className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8"
        animate={{ paddingTop: isScrolled ? '8px' : '16px' }}
        transition={{ duration: 0.3 }}
      >
        <header className={`max-w-7xl mx-auto backdrop-blur-xl rounded-full px-5 py-3 md:py-3.5 flex justify-between items-center transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/85 shadow-lg shadow-slate-900/[0.04] border border-slate-200/60' 
            : 'bg-white/60 shadow-sm border border-white/50'
        }`}>
          <div className="flex items-center gap-2.5 lg:gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl text-white shadow-md shadow-emerald-500/25 flex-shrink-0">
              <Smartphone className="w-5 h-5 lg:w-5 lg:h-5" />
            </div>
            <span className="font-extrabold text-xl lg:text-[22px] tracking-tight text-slate-900">Lapangku<span className="text-emerald-500">.</span></span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center bg-slate-100/60 rounded-full p-1">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                onClick={(e) => handleScrollTo(e, item.id)} 
                className={`relative text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 ${
                  activeNav === item.id
                    ? 'text-emerald-700 bg-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-slate-100/70">
               <Github className="w-4 h-4" />
               <span>Repositori</span>
            </a>
            <a href="#beranda" onClick={(e) => handleScrollTo(e, 'beranda')} className="text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 rounded-full shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Download
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-full bg-white/80 border border-slate-200/70 text-slate-600 focus:outline-none hover:bg-slate-50 transition-all active:scale-95"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-[72px] left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-3 shadow-2xl shadow-slate-900/10 z-50 lg:hidden flex flex-col gap-0.5"
            >
              {navItems.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  onClick={(e) => handleScrollTo(e, item.id)} 
                  className={`block px-5 py-3.5 rounded-2xl text-[15px] font-semibold transition-colors ${
                    activeNav === item.id 
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-slate-100 my-1"></div>
              <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-[15px] font-semibold text-slate-600 hover:bg-slate-50">
                 <Github className="w-5 h-5"/>
                 Repositori GitHub
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ═══ Main Content ═══ */}
      <main className="max-w-7xl mx-auto w-full pt-32 lg:pt-40 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* ═══ Hero Section ═══ */}
        <div id="beranda" className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mb-28">
           {/* Text Content */}
           <div className="flex-1 max-w-2xl text-center lg:text-left z-10 pt-4">
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5 }}
                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50/80 border border-emerald-200/60 text-emerald-700 text-xs sm:text-sm font-semibold mb-6 sm:mb-8 backdrop-blur-sm"
              >
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
                 Aplikasi Booking Lapangan #1
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-slate-900 mb-6"
              >
                Booking Lapangan{' '}
                <br className="hidden md:block"/>
                <span className="gradient-text">{typedWord}</span>
                <span className="typewriter-cursor text-emerald-500 font-light">|</span>
                <br className="hidden md:block"/>
                <span className="text-slate-400 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">Tanpa Ribet.</span>
              </motion.h1>
              
              <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="text-slate-500 text-base sm:text-lg lg:text-xl md:max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed"
              >
                 Platform berbasis mobile untuk mencari, memesan, dan mengelola jadwal lapangan olahraga secara digital. Dukung gaya hidup aktifmu bersama Lapangku.
              </motion.p>
              
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.3 }}
                 className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
              >
                 <div className="relative w-full sm:w-auto">
                   <button 
                     onMouseEnter={() => setShowQR(true)}
                     onMouseLeave={() => setShowQR(false)}
                     className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                   >
                      <Download className="w-5 h-5" />
                      Download Aplikasi
                   </button>
                   <AnimatePresence>
                     {showQR && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
                         className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white p-5 rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 z-50 flex flex-col items-center gap-3 w-52 pointer-events-none"
                       >
                         <div className="w-36 h-36 bg-gradient-to-br from-slate-50 to-emerald-50 rounded-xl flex items-center justify-center border-2 border-dashed border-emerald-200 text-emerald-400">
                           <QrCode className="w-14 h-14" />
                         </div>
                         <span className="text-[11px] font-bold text-slate-500 text-center uppercase tracking-wider">Scan Untuk Mengunduh</span>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
                 <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold px-8 py-4 rounded-full shadow-sm border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
                    <Github className="w-5 h-5" />
                    Lihat GitHub
                 </a>
              </motion.div>
           </div>

           {/* ═══ Phone Mockup ═══ */}
           <div className="flex-1 w-full max-w-[320px] lg:max-w-[400px] mx-auto lg:ml-auto relative flex justify-center z-10">
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] pt-[110%] bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-sky-100/40 rounded-full blur-3xl -z-10"></div>
              
              <motion.div
                 animate={{ y: [0, -15, 0] }}
                 transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                 style={{ transformStyle: "preserve-3d", transform: "perspective(1000px) rotateX(12deg) rotateY(-18deg) rotateZ(8deg)" }}
                 className="relative w-[260px] lg:w-[290px]"
              >
                {/* Phone frame */}
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-[44px] lg:rounded-[48px] p-[10px] shadow-2xl shadow-slate-900/50">
                 {/* Internal Screen Container */}
                 <div className="w-full h-[530px] lg:h-[580px] bg-white rounded-[34px] lg:rounded-[38px] overflow-hidden relative">
                     {/* Dynamic Island */}
                     <div className="absolute top-3 inset-x-0 h-[26px] bg-slate-900 rounded-full w-[90px] mx-auto z-30 flex items-center justify-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                     </div>
                     
                     {/* UI Mockup Content */}
                     {isLoading ? (
                       <div className="bg-slate-50 h-full w-full p-5 pt-14 animate-pulse absolute inset-0 z-20">
                         <div className="flex items-center gap-2 mb-5">
                            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                            <div className="w-20 h-3.5 bg-slate-200 rounded-full"></div>
                         </div>
                         <div className="w-full h-11 bg-slate-200 rounded-2xl mb-6"></div>
                         <div className="flex gap-2 mb-5">
                           {[1,2,3].map(i => <div key={i} className="w-16 h-7 bg-slate-200 rounded-full"></div>)}
                         </div>
                         <div className="space-y-3.5">
                            {[1, 2, 3].map((item) => (
                              <div key={item} className="w-full h-[88px] bg-slate-200/60 rounded-2xl flex p-3 gap-3">
                                 <div className="w-16 h-full bg-slate-200 rounded-xl"></div>
                                 <div className="flex-1 py-2 flex flex-col justify-center space-y-2.5">
                                    <div className="h-3 bg-slate-300/60 rounded-full w-4/5"></div>
                                    <div className="h-2 bg-slate-200 rounded-full w-3/5"></div>
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
                         {/* App header */}
                         <div className="bg-gradient-to-br from-emerald-500 to-teal-500 h-44 w-full px-5 pt-14">
                            <div className="flex items-center justify-between mb-3">
                               <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                                     <Smartphone className="w-4 h-4" />
                                  </div>
                                  <span className="text-white font-bold text-[15px]">Lapangku</span>
                               </div>
                               <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center text-white/70">
                                  <Star className="w-4 h-4" />
                               </div>
                            </div>
                            <div className="w-full h-10 bg-white/90 rounded-xl shadow-sm flex items-center px-3.5 gap-2.5">
                               <Search className="w-3.5 h-3.5 text-slate-400" />
                               <div className="w-3/4 h-2 rounded-full bg-slate-200"></div>
                            </div>
                         </div>
                         {/* Sport tabs */}
                         <div className="px-4 -mt-5 relative z-10">
                           <div className="flex gap-2 mb-4">
                             {['Futsal', 'Basket', 'Badminton'].map((s, i) => (
                               <div key={s} className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-sm ${i === 0 ? 'bg-emerald-500 text-white' : 'bg-white text-slate-500 border border-slate-100'}`}>{s}</div>
                             ))}
                           </div>
                         </div>
                         {/* Field cards */}
                         <div className="px-4 space-y-3">
                            {[
                              { name: "GOR Pahlawan", type: "Futsal Indoor", price: "150K/jam", rating: "4.8" },
                              { name: "Sport Center", type: "Badminton", price: "80K/jam", rating: "4.5" },
                              { name: "Arena Victory", type: "Basket Outdoor", price: "120K/jam", rating: "4.7" },
                            ].map((field, idx) => (
                              <div key={idx} className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 flex p-3 gap-3">
                                 <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                                   <MapPin className="w-5 h-5" />
                                 </div>
                                 <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[13px] font-bold text-slate-800 truncate">{field.name}</span>
                                      <span className="flex items-center gap-0.5 text-amber-500 text-[11px] font-bold ml-1 flex-shrink-0">
                                        <Star className="w-3 h-3 fill-amber-400" />{field.rating}
                                      </span>
                                    </div>
                                    <span className="text-[11px] text-slate-400 font-medium">{field.type}</span>
                                    <span className="text-[12px] text-emerald-600 font-bold mt-0.5">{field.price}</span>
                                 </div>
                              </div>
                            ))}
                         </div>
                         {/* Bottom nav */}
                         <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-around">
                           {[
                             { icon: Search, label: 'Cari', active: true },
                             { icon: CalendarClock, label: 'Booking', active: false },
                             { icon: Users, label: 'Profil', active: false },
                           ].map((nav, i) => (
                             <div key={i} className="flex flex-col items-center gap-0.5">
                               <nav.icon className={`w-4 h-4 ${nav.active ? 'text-emerald-500' : 'text-slate-300'}`} />
                               <span className={`text-[9px] font-semibold ${nav.active ? 'text-emerald-600' : 'text-slate-400'}`}>{nav.label}</span>
                             </div>
                           ))}
                         </div>
                       </motion.div>
                     )}
                 </div>
                </div>
              </motion.div>

              {/* ═══ Floating Notification Card ═══ */}
              {!isLoading && (
                <motion.div 
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1, y: [0, 8, 0] }} 
                  transition={{ opacity: { duration: 0.5, delay: 0.3 }, x: { duration: 0.5, delay: 0.3 }, scale: { duration: 0.5, delay: 0.3 }, y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.5 } }} 
                  className="absolute bottom-20 -left-4 lg:-left-14 bg-white/95 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-slate-900/[0.08] border border-slate-100/80 z-30 flex items-center gap-3 sm:gap-4 w-max"
                >
                   <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-5 h-5 sm:w-5 sm:h-5"/>
                   </div>
                   <div className="pr-1">
                      <div className="text-[11px] sm:text-[12px] text-slate-400 font-medium mb-0.5">Booking Dikonfirmasi ✓</div>
                      <div className="text-[13px] sm:text-[14px] font-bold text-slate-800">Lapangan Futsal A</div>
                   </div>
                </motion.div>
              )}

              {/* ═══ Floating Stats Card ═══ */}
              {!isLoading && (
                <motion.div 
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1, y: [0, -6, 0] }} 
                  transition={{ opacity: { duration: 0.5, delay: 0.5 }, x: { duration: 0.5, delay: 0.5 }, scale: { duration: 0.5, delay: 0.5 }, y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 2 } }} 
                  className="absolute top-24 -right-4 lg:-right-10 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl shadow-slate-900/[0.08] border border-slate-100/80 z-30 flex items-center gap-3 w-max"
                >
                   <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center text-amber-500">
                      <Star className="w-5 h-5 fill-amber-400"/>
                   </div>
                   <div className="pr-1">
                      <div className="text-[11px] text-slate-400 font-medium mb-0.5">Rating</div>
                      <div className="text-[14px] font-bold text-slate-800">4.8 / 5.0</div>
                   </div>
                </motion.div>
              )}
           </div>
        </div>

        {/* ═══ Stats Counter Section ═══ */}
        <div className="mb-28 relative">
          {/* Decorative dot pattern behind stats */}
          <div className="absolute -inset-x-8 -inset-y-12 dot-pattern rounded-[40px] opacity-60 pointer-events-none"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {[
              { label: "Pengguna Aktif", suffix: "+", icon: Users, ref: stat1 },
              { label: "Lapangan Tersedia", suffix: "+", icon: MapPin, ref: stat2 },
              { label: "Jam Operasional", suffix: "/7", icon: Clock, ref: stat3 },
              { label: "Uptime Sistem", suffix: "%", icon: Zap, ref: stat4 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                ref={stat.ref.ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-6 sm:p-8 text-center hover:shadow-lg hover:bg-white hover:border-slate-200 transition-all duration-500 group"
              >
                <div className="w-12 h-12 mx-auto bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1 tabular-nums">
                  {stat.ref.count}{stat.suffix}
                </div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider mb-20"></div>

        {/* ═══ Latar Belakang Section (Tentang Kami) ═══ */}
        <div id="tentang" className="pb-20 pt-8 -mt-8">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-[36px] sm:rounded-[44px] p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 lg:gap-16 shadow-2xl noise-overlay"
           >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>
              
              <div className="flex-1 relative z-10 w-full">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Activity className="w-3.5 h-3.5" /> Latar Belakang
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">Berawal Dari Sulitnya Mencari Jadwal Kosong.</h2>
                <p className="text-emerald-100/70 text-base md:text-lg leading-relaxed mb-5">
                  Seringkali komunitas olahraga kesulitan menemukan lapangan yang tersedia. Harus menelepon satu per satu, datang langsung hanya untuk mengecek jadwal, hingga risiko terjadinya <span className="font-bold text-white">double booking</span> karena pencatatan manual oleh pengelola.
                </p>
                <p className="text-emerald-100/70 text-base md:text-lg leading-relaxed">
                  Lapangku hadir sebagai solusi digitalisasi melalui aplikasi berbasis Flutter dan Firebase. Mengubah pencarian manual menjadi pencarian real-time dalam genggaman, demi efisiensi waktu pengelola (Mitra) maupun pengguna (Customer).
                </p>
              </div>

              <div className="w-full md:w-2/5 relative z-10 h-[280px]">
                 <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl h-full relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      {activeProblemSlide === 0 ? (
                        <motion.div 
                          key="problem"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-6"
                        >
                          <div className="flex items-center gap-2 mb-5 border-b border-white/10 pb-4">
                             <div className="w-8 h-8 rounded-full bg-rose-500/15 flex items-center justify-center">
                               <X className="w-4 h-4 text-rose-400" />
                             </div>
                             <span className="text-white/90 font-semibold text-sm">Masalah yang Ditemui</span>
                          </div>
                          <ul className="space-y-4">
                            {["Informasi jadwal tidak terpusat", "Risiko bentrok jadwal sangat tinggi", "Metode reservasi masih konvensional"].map((issue, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-rose-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <X className="w-3 h-3 text-rose-400" />
                                </div>
                                <span className="text-emerald-50/80 text-sm leading-relaxed">{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="solution"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-6"
                        >
                          <div className="flex items-center gap-2 mb-5 border-b border-white/10 pb-4">
                             <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
                               <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                             </div>
                             <span className="text-white/90 font-semibold text-sm">Solusi Lapangku</span>
                          </div>
                          <ul className="space-y-4">
                            {["Pencarian jadwal real-time", "Sistem booking otomatis bebas bentrok", "Konfirmasi pembayaran terintegrasi"].map((issue, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                </div>
                                <span className="text-emerald-50/90 text-sm leading-relaxed">{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Slide Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${activeProblemSlide === 0 ? 'w-4 bg-rose-400' : 'w-1.5 bg-white/20'}`}></div>
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${activeProblemSlide === 1 ? 'w-4 bg-emerald-400' : 'w-1.5 bg-white/20'}`}></div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* ═══ Feature Sections ═══ */}
        <div id="fitur" className="pt-10 pb-8">
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="text-center max-w-2xl mx-auto mb-16"
           >
             <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-3 block">Keunggulan Utama</span>
             <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Satu Aplikasi, Ragam Kemudahan</h3>
             <p className="text-slate-500 leading-relaxed">Kami mengintegrasikan setiap tahap pencarian, pemesanan, hingga pembayaran menjadi satu ekosistem yang kohesif.</p>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 max-w-6xl mx-auto">
              {isLoading ? (
                <>
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`${i === 1 || i === 4 ? 'md:col-span-2' : ''} bg-white rounded-[28px] p-8 border border-slate-100 h-[280px] animate-pulse`}>
                       <div className="w-12 h-12 bg-slate-200 rounded-2xl mb-5"></div>
                       <div className="h-5 bg-slate-200 rounded-full w-2/4 mb-4"></div>
                       <div className="h-3.5 bg-slate-200 rounded-full w-full mb-2"></div>
                       <div className="h-3.5 bg-slate-200 rounded-full w-4/5"></div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className="md:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[28px] p-8 md:p-10 text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group"
                  >
                     <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/8 rounded-full blur-3xl group-hover:bg-emerald-500/15 group-hover:scale-125 transition-all duration-700"></div>
                     <div className="relative z-10">
                       <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          <Activity className="w-5 h-5 text-emerald-400" />
                       </div>
                       <h3 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">Platform Overview</h3>
                       <p className="text-slate-400 text-sm md:text-base max-w-lg leading-relaxed">
                         Lapangku adalah aplikasi mobile berbasis Flutter yang menghubungkan Customer dengan Mitra pengelola lapangan. Didukung oleh Firebase untuk autentikasi, database real-time, dan notifikasi push.
                       </p>
                       <div className="mt-8 inline-flex items-center space-x-2 bg-emerald-500/15 px-3.5 py-2 rounded-full border border-emerald-500/20">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                          </span>
                          <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-widest">Versi Rilis 1.0</span>
                       </div>
                     </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-[28px] p-8 border border-emerald-100/80 hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-11 h-11 bg-white text-emerald-600 rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                         <MapPin className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-emerald-950 mb-2.5 tracking-tight">Pencarian Cepat</h3>
                      <p className="text-emerald-800/70 leading-relaxed text-sm">Temukan lapangan terdekat dalam hitungan detik berdasarkan lokasi & kategori olahraga.</p>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
                    className="bg-white rounded-[28px] p-8 border border-slate-100/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-11 h-11 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center mb-5 border border-sky-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                         <CalendarClock className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight">Jadwal Real-time</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">Jadwal tersinkronisasi via Cloud Firestore untuk mencegah double booking. Cek ketersediaan tanpa ragu.</p>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                    className="md:col-span-2 bg-gradient-to-br from-emerald-500 via-emerald-500 to-teal-500 rounded-[28px] p-8 md:p-10 text-white hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition-all duration-500 group overflow-hidden relative"
                  >
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-56 h-56 bg-white/[0.07] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10 flex flex-col justify-center h-full">
                       <div className="w-11 h-11 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                          <Upload className="w-5 h-5" />
                       </div>
                       <h3 className="text-2xl md:text-3xl font-extrabold mb-2.5 tracking-tight">Konfirmasi Pembayaran</h3>
                       <p className="text-emerald-50/90 text-sm md:text-base leading-relaxed max-w-md">Upload bukti pembayaran langsung dari aplikasi. Mitra memverifikasi transaksi Anda dengan cepat dan aman melalui sistem konfirmasi digital.</p>
                    </div>
                  </motion.div>

                  {/* ═══ Role-based Features (Fitur Kita) ═══ */}
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}
                    className="bg-white rounded-[28px] p-8 border border-slate-100/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-11 h-11 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-5 border border-blue-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                         <UserCircle className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight">Untuk Customer</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">Cari lapangan, pilih jadwal kosong, dan kelola riwayat pesanan dengan mudah dari satu dashboard terpusat.</p>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-[28px] p-8 border border-slate-100/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-11 h-11 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mb-5 border border-amber-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                         <Store className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight">Untuk Mitra</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">Kelola operasional lapangan, verifikasi bukti pembayaran, dan pantau laporan pendapatan secara real-time.</p>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.35 }}
                    className="bg-white rounded-[28px] p-8 border border-slate-100/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-11 h-11 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center mb-5 border border-purple-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                         <Shield className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight">Untuk Admin</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">Pusat kendali untuk memverifikasi akun Mitra baru dan mengawasi seluruh aktivitas platform Lapangku.</p>
                    </div>
                  </motion.div>
                </>
              )}
           </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider mb-16"></div>

        {/* ═══ Sports Categories Section ═══ */}
        <div className="pt-4 pb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="text-center max-w-2xl mx-auto mb-12"
           >
             <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-3 block">Kategori</span>
             <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Temukan Lapangan Favoritmu</h3>
           </motion.div>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                { name: "Futsal", icon: PlayCircle, color: "group-hover:bg-emerald-50 group-hover:text-emerald-500 group-hover:border-emerald-200" },
                { name: "Badminton", icon: Trophy, color: "group-hover:bg-sky-50 group-hover:text-sky-500 group-hover:border-sky-200" },
                { name: "Basket", icon: Dribbble, color: "group-hover:bg-orange-50 group-hover:text-orange-500 group-hover:border-orange-200" },
                { name: "Tennis", icon: Activity, color: "group-hover:bg-violet-50 group-hover:text-violet-500 group-hover:border-violet-200" }
              ].map((sport, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl hover:shadow-xl hover:bg-white transition-all duration-500 group cursor-pointer hover:-translate-y-1"
                >
                   <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 transition-all duration-300 ${sport.color}`}>
                      <sport.icon className="w-7 h-7 sm:w-9 sm:h-9" />
                   </div>
                   <span className="font-bold text-slate-700 group-hover:text-slate-900 text-sm sm:text-base">{sport.name}</span>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider mb-16"></div>

        {/* ═══ How It Works Section ═══ */}
        <div className="pt-4 pb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="text-center max-w-2xl mx-auto mb-16"
           >
             <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-3 block">Cara Kerja</span>
             <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Mulai Main Dalam 4 Langkah</h3>
           </motion.div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-14 left-[14%] right-[14%] h-[2px] -z-10">
                <div className="w-full h-full bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 rounded-full"></div>
              </div>
              
              {[
                { title: "Cari Lapangan", desc: "Pilih fasilitas terdekat dan tentukan jenis olahraga.", icon: Search },
                { title: "Pilih Jadwal", desc: "Tentukan hari dan jam sesuai ketersediaan real-time.", icon: CalendarClock },
                { title: "Pembayaran", desc: "Transfer ke rekening Mitra lalu upload bukti bayar di aplikasi.", icon: CreditCard },
                { title: "Mulai Main", desc: "Setelah Mitra konfirmasi, tunjukkan bukti booking dan langsung main!", icon: CheckCircle2 }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center relative group"
                >
                  <div className="w-18 h-18 md:w-24 md:h-24 bg-white border-[5px] border-slate-50 text-emerald-500 shadow-lg shadow-slate-200/60 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:shadow-xl group-hover:shadow-emerald-100/50 transition-all duration-300">
                     <step.icon className="w-6 h-6 md:w-7 md:h-7" />
                     <div className="absolute -top-1.5 -right-1.5 w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-[11px] md:text-sm font-bold border-[3px] border-white shadow-sm">
                       {i + 1}
                     </div>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500 px-4 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* ═══ Tech Showcase Section ═══ */}
        <div className="pt-4 pb-20">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="text-center max-w-3xl mx-auto"
          >
             <p className="text-slate-400 font-bold mb-6 uppercase tracking-widest text-xs">Dibangun Menggunakan Teknologi Modern</p>
             <div className="flex flex-col sm:flex-row justify-center items-center gap-5 border border-slate-200/50 w-fit mx-auto px-8 sm:px-10 py-6 sm:py-7 rounded-3xl bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3">
                   <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 border border-sky-100">
                     <Smartphone className="w-5 h-5" />
                   </div>
                   <div className="text-left">
                     <div className="font-bold text-slate-800 leading-none mb-1">Flutter</div>
                     <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Mobile UI Framework</div>
                   </div>
                </div>
                <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
                <div className="h-px w-full bg-slate-200 block sm:hidden"></div>
                <div className="flex items-center gap-3">
                   <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                     <Server className="w-5 h-5" />
                   </div>
                   <div className="text-left">
                     <div className="font-bold text-slate-800 leading-none mb-1">Firebase</div>
                     <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Backend & Cloud Functions</div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Section Divider */}
        <div className="section-divider mb-10"></div>

        {/* ═══ Team Section ═══ */}
        <div className="py-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="text-center max-w-2xl mx-auto mb-16"
           >
             <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-3 block">Tim Pengembang</span>
             <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Orang-Orang di Balik Lapangku</h3>
             <p className="text-slate-500">Kolaborasi dalam mewujudkan solusi nyata berbasis teknologi dari kerangka Project Based Learning.</p>
           </motion.div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-20">
              {[
                { name: "Maulana Ahmad", role: "Project Manager", initial: "MA", gradient: "from-blue-500 to-indigo-500" },
                { name: "Budi Santoso", role: "Mobile Developer", initial: "BS", gradient: "from-emerald-500 to-teal-500" },
                { name: "Siti Rahma", role: "UI/UX Designer", initial: "SR", gradient: "from-violet-500 to-purple-500" },
                { name: "Andi Saputra", role: "System Analyst", initial: "AS", gradient: "from-amber-500 to-orange-500" }
              ].map((member, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-[28px] p-6 sm:p-7 text-center border border-slate-200/50 hover:shadow-xl hover:bg-white transition-all duration-500 hover:-translate-y-1.5 group"
                >
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-xl font-bold mb-5 text-white shadow-lg group-hover:scale-110 group-hover:rounded-3xl transition-all duration-300`}>
                     {member.initial}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-lg mb-1">{member.name}</h4>
                  <span className="text-emerald-600 text-sm font-semibold">{member.role}</span>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Section Divider */}
        <div className="section-divider mb-10"></div>

        {/* ═══ FAQ Section ═══ */}
        <div id="faq" className="pt-10 pb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="text-center max-w-2xl mx-auto mb-16"
           >
             <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-3 block">Pusat Bantuan</span>
             <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Pertanyaan yang Sering Diajukan</h3>
           </motion.div>

           <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, index) => (
                 <motion.div 
                   key={index}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4, delay: index * 0.08 }}
                   className={`backdrop-blur-sm border rounded-2xl hover:shadow-md transition-all duration-300 overflow-hidden ${
                     activeFaq === index 
                       ? 'bg-white border-emerald-200/60 shadow-md' 
                       : 'bg-white/60 border-slate-200/50 hover:bg-white/80'
                   }`}
                 >
                    <button 
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none gap-4"
                    >
                      <span className={`font-semibold transition-colors duration-300 text-[15px] leading-snug ${activeFaq === index ? 'text-emerald-700' : 'text-slate-700'}`}>
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: activeFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === index ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}
                      >
                         <ChevronDown className="w-4 h-4" />
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
                          <div className="px-6 pb-5 pt-0 text-slate-500 text-sm leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* ═══ CTA Section ═══ */}
        <div className="py-10 mb-10">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[36px] sm:rounded-[44px] p-8 md:p-16 text-center shadow-2xl shadow-slate-900/20 relative overflow-hidden noise-overlay"
           >
              <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/15 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/10 rounded-full blur-[80px]"></div>
              
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 relative z-10 leading-tight">Siap Untuk Berkeringat<br className="hidden sm:block"/> Hari Ini?</h2>
              <p className="text-slate-400 md:text-lg max-w-2xl mx-auto mb-10 relative z-10">Rasakan kemudahan booking lapangan olahraga secara digital. Cari, pesan, bayar, dan main — semua dalam satu aplikasi.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-emerald-500/25 hover:-translate-y-0.5 transition-all duration-300">
                   Download Sekarang
                </button>
                <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full border border-white/15 hover:border-white/25 transition-all duration-300">
                   Pelajari Selengkapnya
                </a>
              </div>
           </motion.div>
        </div>

      </main>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-slate-200/60 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-1.5 rounded-lg text-white">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900">Lapangku<span className="text-emerald-500">.</span></span>
          </div>
          <div className="text-sm font-medium text-slate-400 text-center">
            &copy; {new Date().getFullYear()} Lapangku. Dirancang untuk Project Based Learning.
          </div>
          <div>
            <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-semibold text-sm transition-all bg-slate-50/80 hover:bg-emerald-50 px-5 py-2.5 rounded-full border border-slate-200/60 hover:border-emerald-200">
               <Github className="w-4 h-4" />
               GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
