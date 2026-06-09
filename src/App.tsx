import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Play, Download, ChevronRight, Menu, X, Users, CheckCircle2, ChevronDown, Github, QrCode, Database, MapPin, CreditCard, Globe, Zap, Activity, Search, Trophy, Dribbble, Clock, Eye, UserCircle, Store, Shield, ArrowLeft, Heart, Plus, Bell, RefreshCw, Check, TrendingUp, Image } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import MobileAppDemo from './components/MobileAppDemo';
import InteractiveDemo from './components/InteractiveDemo';
import maulanaPhoto from '../image/MAULANA_AHMAD_BUKHORI-removebg-preview.png';
import maksumPhoto from '../image/AHMAD_ALFI_MAKSUM-removebg-preview.png';
import arsyaPhoto from '../image/ARSYA_FIKR_SI-removebg-preview.png';
import logoApp from '../image/logoApp.png';

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
    const sections = ['beranda', 'tentang', 'fitur', 'tim', 'faq'];
    const handleScroll = () => {
      let current = 'beranda';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = id;
          }
        }
      }
      setActiveNav(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { q: "Bagaimana cara melakukan pembayaran di Lapangku?", a: "Setelah memilih jadwal dan mengonfirmasi booking, Anda akan diarahkan ke halaman pembayaran Midtrans. Pilih metode pembayaran yang tersedia, selesaikan transaksi, lalu sistem akan memperbarui status booking secara otomatis setelah pembayaran berhasil." },
    { q: "Bagaimana cara membatalkan jadwal lapangan yang sudah dipesan?", a: "Pembatalan dapat dilakukan langsung dari aplikasi. Buka menu 'Pesanan Saya', pilih tiket booking yang aktif, lalu tekan tombol 'Batalkan Pesanan'. Sistem akan otomatis memperbarui status pesanan Anda dan mengembalikan slot jadwal tersebut agar bisa dipesan oleh pengguna lain." },
    { q: "Bagaimana prosedur pengembalian dana (refund) jika saya batal main?", a: "Refund mengikuti kebijakan pengelola lapangan dan metode pembayaran yang digunakan. Anda bisa menghubungi pengelola melalui fitur 'Hubungi CS' di aplikasi untuk proses bantuan dan tindak lanjut pengembalian dana." },
    { q: "Apakah jadwal lapangan yang tampil di aplikasi selalu akurat dan real-time?", a: "Ya! Salah satu keunggulan utama Lapangku adalah sinkronisasi jadwal secara real-time melalui Firebase Cloud Firestore. Begitu ada pengguna yang menyelesaikan booking, slot waktu tersebut akan otomatis terkunci untuk mencegah terjadinya double booking atau jadwal bentrok." },
    { q: "Apa perbedaan akun Customer, Mitra, dan Admin di Lapangku?", a: "Lapangku memiliki tiga peran pengguna: Customer dapat mencari dan memesan lapangan; Mitra adalah pengelola lapangan yang bisa mengelola jadwal, memantau pesanan masuk, serta melihat laporan pendapatan; Admin bertugas mengawasi seluruh sistem termasuk verifikasi akun Mitra dan monitoring aktivitas platform." }
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
    { id: 'tentang', label: 'Tentang' },
    { id: 'fitur', label: 'Fitur' },
    { id: 'tim', label: 'Tim' },
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
      <div className="fixed top-0 inset-x-0 z-50">
        <header className={`w-full transition-all duration-500 ${
          isScrolled 
            ? 'premium-glass border-b border-slate-200/60 shadow-sm py-3 md:py-3.5' 
            : 'bg-white/40 backdrop-blur-md border-b border-slate-200/20 py-4 md:py-5'
        }`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2.5 lg:gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-xl bg-brand-primary shadow-md shadow-brand-primary/20 ring-1 ring-white/70 flex-shrink-0">
              <img src={logoApp} alt="Logo Lapangku" className="h-full w-full object-cover" />
            </div>
            <span className="font-extrabold text-xl lg:text-[22px] tracking-tight text-slate-900">Lapangku<span className="text-brand-primary">.</span></span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center bg-slate-50 border border-slate-200/60 rounded-full p-1 shadow-sm">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                onClick={(e) => handleScrollTo(e, item.id)} 
                className={`relative text-sm font-bold px-5 py-2 rounded-full transition-all duration-300 ${
                  activeNav === item.id
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
            <a href="#beranda" onClick={(e) => handleScrollTo(e, 'beranda')} className="text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary-dark px-5 py-2.5 rounded-full shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Download
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-full bg-white/80 border border-slate-200/70 text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary hover:bg-slate-50 transition-all active:scale-95"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          </div>
        </header>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-[76px] left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-3 shadow-2xl shadow-slate-900/10 z-50 lg:hidden flex flex-col gap-0.5"
            >
              {navItems.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  onClick={(e) => handleScrollTo(e, item.id)} 
                  className={`block px-5 py-3.5 rounded-2xl text-[15px] font-semibold transition-colors ${
                    activeNav === item.id 
                      ? 'text-white bg-brand-primary shadow-sm'
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
      </div>

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
                className="font-condensed uppercase text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight text-slate-900 mb-6"
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
                     className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                   >
                      <Download className="w-5 h-5" />
                      Download Aplikasi
                   </button>
                 </div>
                 <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold px-8 py-4 rounded-full shadow-sm border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
                    <Github className="w-5 h-5" />
                    Lihat GitHub
                 </a>
              </motion.div>
           </div>

            {/* ═══ Phone Mockup ═══ */}
            <div className="flex-1 w-full max-w-[320px] lg:max-w-[400px] mx-auto lg:ml-auto relative flex flex-col items-center gap-6 z-10" style={{ perspective: "1000px" }}>

              
              <MobileAppDemo />

              {/* ═══ Floating Notification Card ═══ */}
              {false && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1, y: [0, 8, 0] }} 
                  transition={{ opacity: { duration: 0.5, delay: 0.3 }, x: { duration: 0.5, delay: 0.3 }, scale: { duration: 0.5, delay: 0.3 }, y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.5 } }} 
                  className="absolute bottom-16 -left-4 lg:-left-12 bg-white/95 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-slate-900/[0.08] border border-slate-100/80 z-30 flex items-center gap-3 sm:gap-4 w-max pointer-events-none"
                >
                   <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#E8F5EC] rounded-xl flex items-center justify-center text-[#1B6B3A]">
                      <CheckCircle2 className="w-5 h-5 sm:w-5 sm:h-5"/>
                   </div>
                   <div className="pr-1 text-left">
                      <div className="text-[11px] sm:text-[12px] text-slate-400 font-medium mb-0.5">Booking Aktif ✓</div>
                      <div className="text-[13px] sm:text-[14px] font-bold text-slate-800">Lapangan Futsal A</div>
                   </div>
                </motion.div>
              )}

              {/* ═══ Floating Stats Card ═══ */}
              {false && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1, y: [0, -6, 0] }} 
                  transition={{ opacity: { duration: 0.5, delay: 0.5 }, x: { duration: 0.5, delay: 0.5 }, scale: { duration: 0.5, delay: 0.5 }, y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 2 } }} 
                  className="absolute top-24 -right-4 lg:-right-8 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl shadow-slate-900/[0.08] border border-slate-100/80 z-30 flex items-center gap-3 w-max pointer-events-none"
                >
                   <div className="w-10 h-10 bg-[#E8F5EC] rounded-xl flex items-center justify-center text-[#1B6B3A]">
                      <CheckCircle2 className="w-5 h-5 fill-[#1B6B3A] text-[#1B6B3A]"/>
                   </div>
                   <div className="pr-1 text-left">
                      <div className="text-[11px] text-slate-400 font-medium mb-0.5">Rating Aplikasi</div>
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
                className="premium-glass rounded-3xl p-6 sm:p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group"
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
                             <div className="w-8 h-8 rounded-full bg-slate-200/70 flex items-center justify-center">
                               <X className="w-4 h-4 text-slate-500" />
                             </div>
                             <span className="text-white/90 font-semibold text-sm">Masalah yang Ditemui</span>
                          </div>
                          <ul className="space-y-4">
                            {["Informasi jadwal tidak terpusat", "Risiko bentrok jadwal sangat tinggi", "Metode reservasi masih konvensional"].map((issue, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-slate-200/70 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <X className="w-3 h-3 text-slate-500" />
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
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${activeProblemSlide === 0 ? 'w-4 bg-slate-400' : 'w-1.5 bg-white/20'}`}></div>
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
                    className="md:col-span-2 premium-glass-dark rounded-[28px] p-8 md:p-10 text-white hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group"
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
                    className="premium-glass rounded-[28px] p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-11 h-11 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center mb-5 border border-sky-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                         <Clock className="w-5 h-5" />
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
                          <CreditCard className="w-5 h-5" />
                       </div>
                       <h3 className="text-2xl md:text-3xl font-extrabold mb-2.5 tracking-tight">Pembayaran Otomatis</h3>
                       <p className="text-emerald-50/90 text-sm md:text-base leading-relaxed max-w-md">Terhubung dengan Midtrans untuk memproses pembayaran digital. Status booking diperbarui otomatis setelah transaksi berhasil.</p>
                    </div>
                  </motion.div>

                  {/* ═══ Role-based Features (Fitur Kita) ═══ */}
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}
                    className="premium-glass rounded-[28px] p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
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
                    className="premium-glass rounded-[28px] p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-11 h-11 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mb-5 border border-amber-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                         <Store className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight">Untuk Mitra</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">Kelola operasional lapangan, pantau pesanan berbayar, dan lihat laporan pendapatan secara real-time.</p>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.35 }}
                    className="premium-glass rounded-[28px] p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between"
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
                {
                  name: "Futsal",
                  image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=600"
                },
                {
                  name: "Badminton",
                  image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=600"
                },
                {
                  name: "Basket",
                  image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=600"
                },
                {
                  name: "Tennis",
                  image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=600"
                }
              ].map((sport, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group relative min-h-[190px] overflow-hidden rounded-[28px] border border-white/80 bg-slate-900 shadow-sm shadow-slate-200/70 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-100/70"
                >
                   <img
                     src={sport.image}
                     alt={`Lapangan ${sport.name}`}
                     className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/25 to-slate-950/10"></div>
                   <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                     <h4 className="text-lg font-extrabold text-white">{sport.name}</h4>
                   </div>
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
                { title: "Pilih Jadwal", desc: "Tentukan hari dan jam sesuai ketersediaan real-time.", icon: Clock },
                { title: "Pembayaran", desc: "Bayar melalui payment gateway dengan metode yang tersedia.", icon: CreditCard },
                { title: "Mulai Main", desc: "Setelah pembayaran berhasil, tunjukkan e-tiket dan langsung main!", icon: CheckCircle2 }
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
        <div className="pt-8 pb-20">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-center"
          >
             <p className="text-slate-400 font-bold mb-8 uppercase tracking-widest text-xs">DIDUKUNG OLEH EKOSISTEM TEKNOLOGI MODERN</p>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {/* Tech 1 */}
                <div className="premium-glass p-5 rounded-3xl flex flex-col items-center sm:items-start text-center sm:text-left hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
                   <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 border border-sky-100 mb-4 group-hover:scale-110 transition-transform">
                     <Smartphone className="w-6 h-6" />
                   </div>
                   <div className="font-extrabold text-slate-800 text-lg mb-1">Flutter</div>
                   <div className="text-xs text-slate-500 font-medium">Cross-platform UI App</div>
                </div>
                {/* Tech 2 */}
                <div className="premium-glass p-5 rounded-3xl flex flex-col items-center sm:items-start text-center sm:text-left hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
                   <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 mb-4 group-hover:scale-110 transition-transform">
                     <Database className="w-6 h-6" />
                   </div>
                   <div className="font-extrabold text-slate-800 text-lg mb-1">Firebase</div>
                   <div className="text-xs text-slate-500 font-medium">NoSQL & Realtime Auth</div>
                </div>
                {/* Tech 3 */}
                <div className="premium-glass p-5 rounded-3xl flex flex-col items-center sm:items-start text-center sm:text-left hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
                   <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100 mb-4 group-hover:scale-110 transition-transform">
                     <MapPin className="w-6 h-6" />
                   </div>
                   <div className="font-extrabold text-slate-800 text-lg mb-1">Maps API</div>
                   <div className="text-xs text-slate-500 font-medium">Geolokasi & Rute GOR</div>
                </div>
                {/* Tech 4 */}
                <div className="premium-glass p-5 rounded-3xl flex flex-col items-center sm:items-start text-center sm:text-left hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
                   <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100 mb-4 group-hover:scale-110 transition-transform">
                     <CreditCard className="w-6 h-6" />
                   </div>
                   <div className="font-extrabold text-slate-800 text-lg mb-1">Midtrans</div>
                   <div className="text-xs text-slate-500 font-medium">Payment Gateway Lokal</div>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Section Divider */}
        <div className="section-divider mb-10"></div>
        <InteractiveDemo />
        {/* Section Divider */}
        <div className="section-divider mb-10"></div>

        {/* ═══ Team Section ═══ */}
        <div id="tim" className="py-10">
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
                { name: "Maulana Ahmad B.", role: "Customer App Lead", initial: "M", photo: maulanaPhoto, photoClass: "right-[-10px] h-[168px]" },
                { name: "Ahmad Alfi Maksum", role: "Product Designer", initial: "MK", photo: maksumPhoto, photoClass: "right-[-8px] h-[170px]" },
                { name: "Galuh", role: "Admin Panel Dev", initial: "G" },
                { name: "Arsya Fikri F.", role: "Mitra Dashboard Dev", initial: "A", photo: arsyaPhoto, photoClass: "right-[-22px] h-[158px]" }
              ].map((member, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative min-h-[190px] overflow-hidden rounded-[26px] border border-slate-200/70 bg-white p-6 text-left shadow-sm shadow-slate-200/60 transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50"></div>
                  <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50"></div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="relative z-10 flex h-full min-h-[142px] flex-col justify-between">
                    <div className="inline-flex w-fit rounded-full border border-teal-100 bg-white/85 px-3 py-1 text-[11px] font-bold text-teal-700 shadow-sm">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="max-w-[150px]">
                      <h4 className="mb-2 text-[17px] font-extrabold leading-tight text-slate-900">{member.name}</h4>
                      <span className="inline-flex rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-[12px] font-bold leading-tight text-slate-600 shadow-sm">
                        {member.role}
                      </span>
                    </div>
                  </div>
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={`Foto ${member.name}`}
                      className={`absolute bottom-0 z-0 w-auto object-contain object-bottom drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.04] ${member.photoClass}`}
                    />
                  ) : (
                    <div className="absolute bottom-5 right-5 z-0 flex h-24 w-24 items-center justify-center rounded-full border border-emerald-100 bg-white text-3xl font-extrabold text-emerald-600 shadow-lg shadow-slate-200/70">
                      <UserCircle className="absolute h-16 w-16 text-emerald-100" />
                      <span className="relative">{member.initial}</span>
                    </div>
                  )}
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
                      className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl gap-4"
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
      <footer className="border-t border-slate-200/60 bg-white/80 backdrop-blur-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-100/50 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-2.5">
                <div className="h-11 w-11 overflow-hidden rounded-xl bg-emerald-900 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-100">
                  <img src={logoApp} alt="Logo Lapangku" className="h-full w-full object-cover" />
                </div>
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">Lapangku<span className="text-emerald-500">.</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Platform booking lapangan olahraga inovatif. Temukan lapangan favoritmu, pesan jadwal, dan mulai main tanpa ribet. Dirancang khusus untuk kemudahan dan kenyamanan Anda.
              </p>
              <div className="flex items-center gap-3">
                <a href="#/" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
                <a href="#/" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
                </a>
                <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-slate-900 mb-1">Navigasi Utama</h4>
                <a href="#beranda" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">Beranda</a>
                <a href="#tentang" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">Tentang Aplikasi</a>
                <a href="#fitur" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">Fitur Unggulan</a>
              </div>
              
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-slate-900 mb-1">Informasi Lengkap</h4>
                <a href="#tim" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">Tim Pengembang</a>
                <a href="#faq" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">Pusat Bantuan (FAQ)</a>
              </div>
              
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-slate-900 mb-1">Sumber Daya (PBL)</h4>
                <a href="https://github.com/Maulanahb/Lapangku" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">Repositori GitHub</a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} Lapangku. Dirancang untuk Project Based Learning.
            </p>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-sm text-slate-500">
                Dibuat dengan <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> di Indonesia
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
