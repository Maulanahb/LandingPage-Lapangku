import React, { useState, useEffect } from 'react';
import { Download, Github, MapPin, CalendarClock, ShieldCheck, Menu, X, Smartphone, ArrowRight, Activity, Search, CreditCard, Trophy, Users, CheckCircle2, PlayCircle, Dribbble, ChevronDown, QrCode, Server, Code, Star, Zap, Clock, Upload, Eye, UserCircle, Store, Shield, ArrowLeft, Heart, Plus, Bell, RefreshCw, Check, TrendingUp, Image, Monitor, BarChart3, Settings, FileText, ChevronRight, Globe, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MobileAppDemo({ tab = 'customer', hideToggle = false }: { tab?: 'customer' | 'mitra' | 'scan', hideToggle?: boolean }) {
  // ─── Simulator State Hooks ─────────────────────────────────────
  const [demoRole, setDemoRole] = useState<'customer' | 'mitra'>('customer');
  const [customerScreen, setCustomerScreen] = useState(0); // 0: Splash, 1: Home, 2: Detail, 3: Payment, 4: Success
  const [mitraScreen, setMitraScreen] = useState(0); // 0: Dashboard, 1: Manage, 2: Verification, 3: QR Scanner
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      if (demoRole === 'customer') {
        setCustomerScreen((prev) => (prev + 1) % 5);
      } else {
        setMitraScreen((prev) => (prev + 1) % 4);
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [demoRole, isAutoplay]);

  useEffect(() => {
    if (isAutoplay) return;
    const timer = setTimeout(() => {
      setIsAutoplay(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [isAutoplay, lastInteraction]);

  const selectCustomerScreen = (screen: number) => {
    setIsAutoplay(false);
    setLastInteraction(Date.now());
    setCustomerScreen(screen);
  };

  const selectMitraScreen = (screen: number) => {
    setIsAutoplay(false);
    setLastInteraction(Date.now());
    setMitraScreen(screen);
  };

  const changeDemoRole = (role: 'customer' | 'mitra') => {
    setIsAutoplay(true);
    setDemoRole(role);
    if (role === 'customer') setCustomerScreen(0);
    else setMitraScreen(0);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: { offset: { x: number, y: number }, velocity: { x: number, y: number } }) => {
    const swipePower = Math.abs(offset.x) * velocity.x;
    const swipeConfidenceThreshold = 10000;
    
    if (swipePower < -swipeConfidenceThreshold || offset.x < -40) {
      // Swipe left -> Next screen
      setIsAutoplay(false);
      setLastInteraction(Date.now());
      if (demoRole === 'customer') setCustomerScreen(c => (c + 1) % 5);
      else setMitraScreen(m => (m + 1) % 4);
    } else if (swipePower > swipeConfidenceThreshold || offset.x > 40) {
      // Swipe right -> Prev screen
      setIsAutoplay(false);
      setLastInteraction(Date.now());
      if (demoRole === 'customer') setCustomerScreen(c => (c - 1 + 5) % 5);
      else setMitraScreen(m => (m - 1 + 4) % 4);
    }
  };

  useEffect(() => {
    if (tab === 'customer') {
      setDemoRole('customer');
      setCustomerScreen(0);
      setIsAutoplay(true);
    } else if (tab === 'mitra') {
      setDemoRole('mitra');
      setMitraScreen(0);
      setIsAutoplay(true);
    } else if (tab === 'scan') {
      setDemoRole('mitra');
      setMitraScreen(3);
      setIsAutoplay(false);
    }
  }, [tab]);
  return (
    <div className="relative w-full flex flex-col items-center gap-6 z-10">
              {!hideToggle && (
              <div className="flex w-full justify-center">
              {/* Role Toggle Selector */}
              <div className="flex bg-white/80 backdrop-blur-md p-1 rounded-full border border-slate-200 shadow-md z-30 pointer-events-auto">
                <button 
                  onClick={() => changeDemoRole('customer')}
                  className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    demoRole === 'customer' 
                      ? 'bg-[#1B6B3A] text-white shadow-sm shadow-[#1B6B3A]/20' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Customer App
                </button>
                <button 
                  onClick={() => changeDemoRole('mitra')}
                  className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    demoRole === 'mitra' 
                      ? 'bg-[#1B6B3A] text-white shadow-sm shadow-[#1B6B3A]/20' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  Mitra App
                </button>
              </div>

                            </div>
              )}
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] pt-[110%] bg-gradient-to-tr from-[#1B6B3A]/20 via-[#E8F5EC]/10 to-sky-100/20 rounded-full blur-3xl -z-10"></div>
              
              <motion.div
                 animate={{ 
                   y: [0, -15, 0],
                   rotateX: 12,
                   rotateY: -16,
                   rotateZ: 6
                 }}
                 whileHover={{ 
                   rotateX: 0, 
                   rotateY: 0, 
                   rotateZ: 0,
                   scale: 1.03
                 }}
                 transition={{ 
                   y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                   default: { duration: 0.5, ease: "easeOut" }
                 }}
                 style={{ transformStyle: "preserve-3d" }}
                 className="relative w-[260px] lg:w-[290px] z-10 pointer-events-auto"
              >
                 {/* Phone frame */}
                 <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-[44px] lg:rounded-[48px] p-[10px] shadow-2xl shadow-slate-900/50 border border-slate-700/50 relative">
                  
                  {/* Phone Buttons */}
                  <div className="absolute top-[100px] -left-[2px] w-[3px] h-[30px] bg-slate-700/80 rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]"></div>
                  <div className="absolute top-[150px] -left-[2px] w-[3px] h-[50px] bg-slate-700/80 rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]"></div>
                  <div className="absolute top-[210px] -left-[2px] w-[3px] h-[50px] bg-slate-700/80 rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]"></div>
                  <div className="absolute top-[130px] -right-[2px] w-[3px] h-[70px] bg-slate-700/80 rounded-r-md shadow-[inset_-1px_0_1px_rgba(255,255,255,0.2)]"></div>

                  {/* Internal Screen Container */}
                  <div className="w-full h-[530px] lg:h-[580px] bg-[#F4F6F9] rounded-[34px] lg:rounded-[38px] overflow-hidden relative select-none shadow-[inset_0_0_8px_rgba(0,0,0,0.1)] ring-1 ring-slate-950/20">
                      
                      {/* Glass screen reflection overlay */}
                      <div className="absolute inset-0 z-50 pointer-events-none rounded-[34px] lg:rounded-[38px] bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-50"></div>
                      <div className="absolute -top-[50%] -right-[50%] w-[100%] h-[200%] bg-white/5 rotate-45 transform pointer-events-none z-50"></div>

                      {/* Dynamic Island */}
                      <div className="absolute top-3 inset-x-0 h-[24px] bg-black rounded-full w-[85px] mx-auto z-40 flex items-center justify-end px-2 shadow-sm shadow-black/50 border border-slate-700/50">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800/80 mr-3 border border-slate-700/50"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></div>
                      </div>
                      
                      {/* Screens Container with transition */}
                      <motion.div 
                        className="w-full h-full text-slate-800 relative font-sans text-xs"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        dragDirectionLock
                        onDragEnd={handleDragEnd}
                      >
                        <AnimatePresence mode="wait">
                          {demoRole === 'customer' ? (
                            // ─── Customer Screens ───
                            customerScreen === 0 ? (
                              <motion.div
                                key="c-splash"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-gradient-to-br from-[#1B6B3A] to-[#114B27] flex flex-col items-center justify-center text-white p-6 cursor-pointer"
                                onClick={() => selectCustomerScreen(1)}
                              >
                                <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/20 mb-4 animate-pulse">
                                  <Smartphone className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-xl font-extrabold tracking-tight mb-1">Lapangku<span className="text-[#D1FAE5]">.</span></h2>
                                <p className="text-[10px] text-emerald-100/70 text-center max-w-[150px]">Pesan lapangan olahraga tanpa ribet</p>
                                <div className="absolute bottom-10 flex items-center gap-2">
                                  <RefreshCw className="w-3.5 h-3.5 text-[#D1FAE5] animate-spin" />
                                  <span className="text-[10px] font-semibold text-emerald-200/80">Memuat data...</span>
                                </div>
                              </motion.div>
                            ) : customerScreen === 1 ? (
                              <motion.div
                                key="c-home"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-14 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                              >
                                {/* Header */}
                                <div className="bg-white px-4 pt-10 pb-3 shadow-sm border-b border-slate-100 flex-shrink-0">
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <div className="text-[10px] text-slate-400 font-semibold leading-none mb-1">Halo,</div>
                                      <div className="text-[13px] font-bold text-slate-800 leading-none">Budi Santoso 👋</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="relative w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                                        <Bell className="w-4 h-4" />
                                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                                      </div>
                                      <div className="w-8 h-8 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                                        B
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-medium mb-3">
                                    <MapPin className="w-3.5 h-3.5 text-[#1B6B3A]" />
                                    <span>Malang, Jawa Timur</span>
                                  </div>
                                  <div className="w-full bg-[#F3F5F7] rounded-full h-8 flex items-center px-3 gap-2 border border-transparent hover:border-slate-200 transition-all">
                                    <Search className="w-3.5 h-3.5 text-slate-400" />
                                    <span className="text-[10.5px] text-slate-400 font-medium">Cari lapangan, olahraga...</span>
                                  </div>
                                </div>

                                {/* Content */}
                                <div className="p-3 flex-1">
                                  {/* Kategori */}
                                  <div className="mb-4">
                                    <h3 className="font-extrabold text-slate-800 text-[11px] mb-2 px-1">Kategori</h3>
                                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                      {['Semua', 'Futsal', 'Mini Soccer', 'Bulu Tangkis', 'Basket', 'Voli'].map((cat, i) => (
                                        <button 
                                          key={cat} 
                                          className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all flex-shrink-0 ${
                                            i === 0 
                                              ? 'bg-[#1B6B3A] text-white shadow-sm shadow-[#1B6B3A]/20' 
                                              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                                          }`}
                                        >
                                          {cat}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Rekomendasi */}
                                  <div className="mb-2 px-1 flex items-center justify-between">
                                    <h3 className="font-extrabold text-slate-800 text-[11px]">Rekomendasi Lapangan</h3>
                                    <span className="text-[9px] font-bold text-[#1B6B3A]">Lihat Semua</span>
                                  </div>

                                  {/* Grid of Fields */}
                                  <div className="grid grid-cols-2 gap-2.5">
                                    {/* Card 1 */}
                                    <div 
                                      onClick={() => selectCustomerScreen(2)}
                                      className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer"
                                    >
                                      <div className="h-20 bg-[#114B27] relative flex items-center justify-center text-white/90">
                                        <div className="absolute inset-0 bg-cover bg-center opacity-85" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=200')" }}></div>
                                        <div className="absolute top-1.5 left-1.5 flex flex-col gap-0.5">
                                          <span className="bg-[#1B6B3A] text-white text-[7px] font-extrabold px-1 py-0.5 rounded">FUTSAL</span>
                                          <span className="bg-black/60 text-white text-[7px] font-extrabold px-1 py-0.5 rounded">INDOOR</span>
                                        </div>
                                      </div>
                                      <div className="p-2 flex-1 flex flex-col">
                                        <span className="text-[7.5px] font-extrabold text-slate-400 tracking-wider">GOR PAHLAWAN</span>
                                        <h4 className="text-[10px] font-bold text-slate-800 truncate mb-1">Lapangan Futsal A</h4>
                                        <div className="mt-auto">
                                          <div className="text-[10.5px] font-extrabold text-[#1B6B3A]">Rp 150K<span className="text-[7.5px] font-normal text-slate-400">/jam</span></div>
                                          <div className="flex items-center justify-between mt-1 text-[8.5px] text-slate-500 border-t border-slate-50 pt-1">
                                            <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5 text-[#1B6B3A]" /> 1.2 km</span>
                                            <span className="flex items-center gap-0.5 text-amber-500 font-bold"><Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> 4.8</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Card 2 */}
                                    <div 
                                      onClick={() => selectCustomerScreen(2)}
                                      className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer"
                                    >
                                      <div className="h-20 bg-[#1B6B3A] relative flex items-center justify-center text-white/90">
                                        <div className="absolute inset-0 bg-cover bg-center opacity-85" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=200')" }}></div>
                                        <div className="absolute top-1.5 left-1.5 flex flex-col gap-0.5">
                                          <span className="bg-[#1B6B3A] text-white text-[7px] font-extrabold px-1 py-0.5 rounded">BADMINTON</span>
                                          <span className="bg-black/60 text-white text-[7px] font-extrabold px-1 py-0.5 rounded">INDOOR</span>
                                        </div>
                                      </div>
                                      <div className="p-2 flex-1 flex flex-col">
                                        <span className="text-[7.5px] font-extrabold text-slate-400 tracking-wider">SPORT CENTER</span>
                                        <h4 className="text-[10px] font-bold text-slate-800 truncate mb-1">Badminton Court 1</h4>
                                        <div className="mt-auto">
                                          <div className="text-[10.5px] font-extrabold text-[#1B6B3A]">Rp 80K<span className="text-[7.5px] font-normal text-slate-400">/jam</span></div>
                                          <div className="flex items-center justify-between mt-1 text-[8.5px] text-slate-500 border-t border-slate-50 pt-1">
                                            <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5 text-[#1B6B3A]" /> 2.4 km</span>
                                            <span className="flex items-center gap-0.5 text-amber-500 font-bold"><Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> 4.5</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Bottom Nav */}
                                <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 py-1.5 flex justify-around items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                                  <div className="flex flex-col items-center cursor-pointer text-[#1B6B3A]">
                                    <Smartphone className="w-4 h-4" />
                                    <span className="text-[8px] font-extrabold mt-0.5">Beranda</span>
                                  </div>
                                  <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500" onClick={() => selectCustomerScreen(3)}>
                                    <CalendarClock className="w-4 h-4" />
                                    <span className="text-[8px] font-bold mt-0.5">Pesanan</span>
                                  </div>
                                  <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500">
                                    <Heart className="w-4 h-4" />
                                    <span className="text-[8px] font-bold mt-0.5">Favorit</span>
                                  </div>
                                  <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500">
                                    <UserCircle className="w-4 h-4" />
                                    <span className="text-[8px] font-bold mt-0.5">Profil</span>
                                  </div>
                                </div>
                              </motion.div>
                            ) : customerScreen === 2 ? (
                              <motion.div
                                key="c-detail"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-white flex flex-col"
                              >
                                {/* Hero Image */}
                                <div className="h-32 bg-slate-700 relative flex-shrink-0">
                                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=300')" }}></div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"></div>
                                  <button 
                                    onClick={() => selectCustomerScreen(1)}
                                    className="absolute top-9 left-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 text-slate-700"
                                  >
                                    <ArrowLeft className="w-4 h-4" />
                                  </button>
                                  <button className="absolute top-9 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 text-slate-700">
                                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                                  </button>
                                  <div className="absolute bottom-2.5 left-4 flex gap-1">
                                    <span className="bg-[#E8F5EC] text-[#1B6B3A] text-[8px] font-extrabold px-1.5 py-0.5 rounded-full">FUTSAL</span>
                                    <span className="bg-[#E8F5EC] text-[#1B6B3A] text-[8px] font-extrabold px-1.5 py-0.5 rounded-full">INDOOR</span>
                                  </div>
                                </div>

                                {/* Body Info */}
                                <div className="p-3.5 flex-1 overflow-y-auto pb-16 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                  <span className="text-[8px] font-extrabold text-slate-400 tracking-wider">GOR PAHLAWAN</span>
                                  <h3 className="text-[14px] font-extrabold text-slate-800 leading-tight mb-1">Lapangan Futsal A</h3>
                                  
                                  <div className="flex items-center gap-1.5 text-slate-500 text-[9px] mb-3">
                                    <MapPin className="w-3 h-3 text-[#1B6B3A]" />
                                    <span>Jl. Pahlawan No. 10, Malang</span>
                                  </div>

                                  <div className="flex items-center justify-between border-y border-slate-100 py-2.5 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                      <span className="font-bold text-[10.5px]">4.8</span>
                                      <span className="text-slate-400 text-[8.5px]">(120 Ulasan)</span>
                                    </div>
                                    <div className="bg-[#E8F5EC] text-[#1B6B3A] text-[8.5px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6B3A] animate-pulse"></span>
                                      Buka • 08:00 - 22:00
                                    </div>
                                  </div>

                                  {/* Tab items */}
                                  <div className="flex border-b border-slate-100 mb-2.5">
                                    {['Info', 'Fasilitas', 'Ulasan'].map((tab, i) => (
                                      <span 
                                        key={tab} 
                                        className={`pb-1 px-3 text-[10px] font-extrabold border-b-2 cursor-pointer ${
                                          i === 0 
                                            ? 'text-[#1B6B3A] border-[#1B6B3A]' 
                                            : 'text-slate-400 border-transparent'
                                        }`}
                                      >
                                        {tab}
                                      </span>
                                    ))}
                                  </div>

                                  <p className="text-[9.5px] text-slate-500 leading-relaxed mb-3">
                                    Lapangan futsal vinyl standar nasional yang empuk dan nyaman. Dilengkapi dengan tribun penonton yang nyaman dan pencahayaan LED.
                                  </p>

                                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                                    {['Wi-Fi', 'Kantin', 'Parkir Luas', 'Loker'].map((f) => (
                                      <span key={f} className="bg-slate-50 text-slate-600 border border-slate-200/60 rounded px-1.5 py-0.5 text-[8.5px] font-semibold">{f}</span>
                                    ))}
                                  </div>
                                </div>

                                {/* Booking Bottom Sheet */}
                                <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 px-4 py-2.5 flex justify-between items-center z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
                                  <div>
                                    <div className="text-[8.5px] text-slate-400 font-bold leading-none mb-1">HARGA SEWA</div>
                                    <div className="text-[13px] font-extrabold text-[#1B6B3A] leading-none">Rp 150K<span className="text-[9px] font-normal text-slate-400">/jam</span></div>
                                  </div>
                                  <button 
                                    onClick={() => selectCustomerScreen(3)}
                                    className="bg-[#1B6B3A] hover:bg-[#114B27] text-white font-extrabold text-[10px] px-6 py-2.5 rounded-full shadow-md shadow-[#1B6B3A]/25 transition-all active:scale-95"
                                  >
                                    Booking Sekarang
                                  </button>
                                </div>
                              </motion.div>
                            ) : customerScreen === 3 ? (
                              <motion.div
                                key="c-payment"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-16 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                              >
                                {/* Header */}
                                <div className="bg-white px-3 pt-9 pb-3 shadow-sm border-b border-slate-100 flex items-center gap-2 flex-shrink-0">
                                  <button 
                                    onClick={() => selectCustomerScreen(2)}
                                    className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600"
                                  >
                                    <ArrowLeft className="w-3.5 h-3.5" />
                                  </button>
                                  <h3 className="text-[12.5px] font-extrabold text-slate-800">Pembayaran</h3>
                                </div>

                                {/* Content */}
                                <div className="p-3 space-y-2.5 flex-1">
                                  {/* Summary Card */}
                                  <div className="bg-white rounded-xl p-3 border border-slate-200/50 shadow-sm">
                                    <h4 className="font-extrabold text-[10.5px] text-slate-700 border-b border-slate-100 pb-1.5 mb-1.5 uppercase tracking-wide">Ringkasan Booking</h4>
                                    <div className="space-y-1">
                                      <div className="flex justify-between font-bold text-[10.5px] text-slate-800">
                                        <span>GOR Pahlawan (Futsal A)</span>
                                      </div>
                                      <div className="text-[9.5px] text-slate-500">Jadwal: Hari Ini, 16:00 - 18:00 (2 Jam)</div>
                                      <div className="flex justify-between font-extrabold text-[11px] text-[#1B6B3A] border-t border-dashed border-slate-100 pt-1.5 mt-1.5">
                                        <span>Total Tagihan:</span>
                                        <span>Rp 300.000</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Bank Transfer Card */}
                                  <div className="bg-white rounded-xl p-3 border border-slate-200/50 shadow-sm">
                                    <h4 className="font-extrabold text-[10.5px] text-slate-700 mb-1.5 uppercase tracking-wide">Transfer Bank</h4>
                                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 flex items-center justify-between mb-1.5">
                                      <div>
                                        <div className="font-bold text-[10.5px] text-slate-800">Bank Mandiri</div>
                                        <div className="text-[10px] font-extrabold text-[#1B6B3A] tracking-wider select-text">144-00-123456-7</div>
                                        <div className="text-[8.5px] text-slate-400 font-semibold">a/n PT Lapangku Jaya Indonesia</div>
                                      </div>
                                      <button className="bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded text-[8px] active:bg-slate-300">Copy</button>
                                    </div>
                                    <p className="text-[8px] text-slate-400 leading-normal italic">Silakan lakukan transfer sesuai jumlah di atas, kemudian unggah bukti transfer.</p>
                                  </div>

                                  {/* Upload Bukti */}
                                  <div className="bg-white rounded-xl p-3 border border-slate-200/50 shadow-sm">
                                    <h4 className="font-extrabold text-[10.5px] text-slate-700 mb-1.5 uppercase tracking-wide">Unggah Bukti Transfer</h4>
                                    <div className="border-2 border-dashed border-[#1B6B3A]/50 bg-[#E8F5EC]/20 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-emerald-50/40 transition-colors">
                                      <div className="w-8 h-8 rounded-full bg-[#E8F5EC] flex items-center justify-center text-[#1B6B3A] mb-1.5">
                                        <Check className="w-4 h-4 font-bold" />
                                      </div>
                                      <span className="text-[9.5px] font-bold text-slate-700">bukti_transfer.png</span>
                                      <span className="text-[8.5px] text-[#1B6B3A] font-bold">Sukses Diunggah (2.1 MB)</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Payment Action Button */}
                                <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 px-4 py-2.5 z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
                                  <button 
                                    onClick={() => selectCustomerScreen(4)}
                                    className="w-full bg-[#1B6B3A] hover:bg-[#114B27] text-white font-extrabold text-[11px] py-2.5 rounded-full shadow-md shadow-[#1B6B3A]/25 transition-all active:scale-95 flex items-center justify-center gap-1.5 animate-pulse"
                                  >
                                    <Upload className="w-4 h-4" />
                                    Kirim Bukti Pembayaran
                                  </button>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="c-success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-[#F4F6F9] flex flex-col justify-center items-center p-5 text-center cursor-pointer"
                                onClick={() => selectCustomerScreen(1)}
                              >
                                <motion.div 
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
                                  className="w-14 h-14 bg-[#E8F5EC] rounded-full flex items-center justify-center text-[#1B6B3A] mb-4 shadow-md shadow-[#1B6B3A]/10 animate-bounce"
                                >
                                  <CheckCircle2 className="w-9 h-9" />
                                </motion.div>
                                <h3 className="text-[14.5px] font-extrabold text-slate-800 mb-1 leading-none">Booking Berhasil!</h3>
                                <p className="text-[9.5px] text-slate-400 font-semibold mb-4 leading-none">Menunggu konfirmasi dari Mitra</p>

                                {/* E-Ticket Card */}
                                <div className="bg-white rounded-2xl w-full border border-slate-200/50 shadow-md p-3.5 mb-5 relative overflow-hidden text-left">
                                  <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/5 rounded-bl-3xl"></div>
                                  <div className="border-b border-dashed border-slate-100 pb-2 mb-2 flex justify-between items-center">
                                    <div>
                                      <div className="text-[8px] text-slate-400 font-bold uppercase">KODE BOOKING</div>
                                      <div className="text-[11px] font-extrabold text-[#1B6B3A] tracking-wider select-all">LPG-982834</div>
                                    </div>
                                    <span className="bg-[#D1FAE5] text-[#1B6B3A] text-[8.5px] font-extrabold px-2 py-0.5 rounded-full">Dikonfirmasi</span>
                                  </div>
                                  <div className="space-y-1.5 text-[9.5px]">
                                    <div className="flex justify-between">
                                      <span className="text-slate-400 font-medium">Lapangan:</span>
                                      <span className="font-bold text-slate-700">GOR Pahlawan (Futsal A)</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400 font-medium">Waktu:</span>
                                      <span className="font-bold text-slate-700">Hari Ini, 16:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400 font-medium">Customer:</span>
                                      <span className="font-bold text-slate-700">Budi Santoso</span>
                                    </div>
                                  </div>
                                </div>

                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    selectCustomerScreen(1);
                                  }}
                                  className="bg-[#1B6B3A] hover:bg-[#114B27] text-white font-extrabold text-[10px] px-6 py-2.5 rounded-full shadow-md shadow-[#1B6B3A]/25 transition-all active:scale-95"
                                >
                                  Kembali ke Beranda
                                </button>
                              </motion.div>
                            )
                          ) : (
                            // ─── Mitra Screens ───
                            mitraScreen === 0 ? (
                              <motion.div
                                key="m-dashboard"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-14 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                              >
                                {/* Header */}
                                <div className="bg-[#1B6B3A] text-white px-4 pt-10 pb-5 rounded-b-[24px] shadow-lg shadow-[#1B6B3A]/10 flex-shrink-0">
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <span className="text-[8px] text-emerald-200/80 font-bold uppercase tracking-wider">Mitra Lapangku</span>
                                      <h3 className="text-[13.5px] font-extrabold leading-none">GOR Pahlawan</h3>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white relative">
                                      <Bell className="w-4 h-4" />
                                      <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-orange-500 rounded-full"></span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 text-emerald-100/70 text-[9px] font-semibold">
                                    <MapPin className="w-3 h-3" />
                                    <span>Malang, Jawa Timur</span>
                                  </div>
                                </div>

                                {/* Stats Container */}
                                <div className="p-3 -mt-3.5 space-y-3 flex-1">
                                  {/* Stats Row */}
                                  <div className="bg-white rounded-xl p-3 border border-slate-200/45 shadow-md grid grid-cols-2 gap-2">
                                    <div>
                                      <div className="text-[8px] text-slate-400 font-bold uppercase">LAPORAN BULANAN</div>
                                      <div className="text-[13px] font-extrabold text-[#1B6B3A] mt-0.5">Rp 4.250K</div>
                                      <div className="flex items-center gap-0.5 text-[8px] text-[#1B6B3A] font-bold mt-1">
                                        <TrendingUp className="w-2.5 h-2.5" /> +12% minggu ini
                                      </div>
                                    </div>
                                    <div className="border-l border-slate-100 pl-3">
                                      <div className="text-[8px] text-slate-400 font-bold uppercase">PESANAN AKTIF</div>
                                      <div className="text-[13px] font-extrabold text-slate-800 mt-0.5">8 Booking</div>
                                      <div className="text-[8.5px] text-orange-600 font-extrabold mt-1">3 Butuh Verifikasi</div>
                                    </div>
                                  </div>

                                  {/* Quick Actions */}
                                  <div className="mb-2">
                                    <h4 className="font-extrabold text-[10.5px] text-slate-800 mb-2 px-1">Aksi Cepat</h4>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                      <div 
                                        onClick={() => selectMitraScreen(3)}
                                        className="bg-white p-2.5 rounded-xl border border-slate-200/50 hover:bg-slate-50 cursor-pointer shadow-sm"
                                      >
                                        <QrCode className="w-5 h-5 mx-auto text-[#1B6B3A] mb-1" />
                                        <span className="text-[8px] font-bold text-slate-700">Scan QR</span>
                                      </div>
                                      <div 
                                        onClick={() => selectMitraScreen(1)}
                                        className="bg-white p-2.5 rounded-xl border border-slate-200/50 hover:bg-slate-50 cursor-pointer shadow-sm"
                                      >
                                        <Plus className="w-5 h-5 mx-auto text-[#1B6B3A] mb-1" />
                                        <span className="text-[8px] font-bold text-slate-700">Tambah</span>
                                      </div>
                                      <div 
                                        onClick={() => selectMitraScreen(2)}
                                        className="bg-white p-2.5 rounded-xl border border-slate-200/50 hover:bg-slate-50 cursor-pointer shadow-sm"
                                      >
                                        <Check className="w-5 h-5 mx-auto text-[#1B6B3A] mb-1" />
                                        <span className="text-[8px] font-bold text-slate-700">Verifikasi</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Recent Bookings */}
                                  <div>
                                    <div className="flex justify-between items-center mb-2 px-1">
                                      <h4 className="font-extrabold text-[10.5px] text-slate-800">Daftar Booking</h4>
                                      <span className="text-[8.5px] font-bold text-[#1B6B3A] cursor-pointer" onClick={() => selectMitraScreen(2)}>Lihat Semua</span>
                                    </div>
                                    <div className="space-y-2">
                                      <div 
                                        onClick={() => selectMitraScreen(2)}
                                        className="bg-white rounded-xl p-2.5 border border-slate-100 flex items-center justify-between shadow-sm cursor-pointer hover:border-slate-300 transition-all"
                                      >
                                        <div>
                                          <div className="font-bold text-[10px] text-slate-800">Budi Santoso</div>
                                          <div className="text-[8.5px] text-slate-500">Futsal A • 16:00 - 18:00</div>
                                        </div>
                                        <span className="bg-amber-100 text-amber-800 text-[7.5px] font-extrabold px-1.5 py-0.5 rounded">Verifikasi</span>
                                      </div>
                                      <div className="bg-white rounded-xl p-2.5 border border-slate-100 flex items-center justify-between shadow-sm">
                                        <div>
                                          <div className="font-bold text-[10px] text-slate-800">Andi Saputra</div>
                                          <div className="text-[8.5px] text-slate-500">Badminton 1 • 19:00 - 20:00</div>
                                        </div>
                                        <span className="bg-[#D1FAE5] text-[#1B6B3A] text-[7.5px] font-extrabold px-1.5 py-0.5 rounded">Selesai</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Bottom Nav (Mitra Style with elevated central Scan Button) */}
                                <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 h-14 px-2 flex justify-between items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                                  <div className="flex flex-col items-center cursor-pointer text-[#1B6B3A] w-12">
                                    <Store className="w-4 h-4" />
                                    <span className="text-[7px] font-extrabold mt-0.5">DASHBOARD</span>
                                  </div>
                                  <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(1)}>
                                    <Trophy className="w-4 h-4" />
                                    <span className="text-[7px] font-bold mt-0.5">FIELDS</span>
                                  </div>
                                  
                                  {/* Elevated central scan button */}
                                  <div className="relative -top-2 flex flex-col items-center z-30" onClick={() => selectMitraScreen(3)}>
                                    <div className="w-9 h-9 bg-[#1B6B3A] rounded-full flex items-center justify-center text-white shadow-md shadow-[#1B6B3A]/30 hover:scale-105 active:scale-95 transition-all">
                                      <QrCode className="w-4.5 h-4.5" />
                                    </div>
                                    <span className="text-[7.5px] font-extrabold text-[#1B6B3A] mt-1 uppercase">SCAN</span>
                                  </div>

                                  <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(2)}>
                                    <CalendarClock className="w-4 h-4" />
                                    <span className="text-[7px] font-bold mt-0.5">ORDERS</span>
                                  </div>
                                  <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12">
                                    <UserCircle className="w-4 h-4" />
                                    <span className="text-[7px] font-bold mt-0.5">PROFILE</span>
                                  </div>
                                </div>
                              </motion.div>
                            ) : mitraScreen === 1 ? (
                              <motion.div
                                key="m-fields"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-14"
                              >
                                {/* Header */}
                                <div className="bg-white px-3.5 pt-9 pb-3 shadow-sm border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                                  <div className="flex items-center gap-2">
                                    <button 
                                      onClick={() => selectMitraScreen(0)}
                                      className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600"
                                    >
                                      <ArrowLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <h3 className="text-[12.5px] font-extrabold text-slate-800">Lapangan Saya</h3>
                                  </div>
                                  <button className="w-6 h-6 rounded-lg bg-[#E8F5EC] text-[#1B6B3A] flex items-center justify-center hover:bg-[#E8F5EC]">
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>

                                {/* Content */}
                                <div className="p-3 space-y-3 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                  <div className="bg-white rounded-xl overflow-hidden border border-slate-200/50 shadow-sm flex flex-col">
                                    <div className="h-20 bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=250')" }}></div>
                                    <div className="p-2.5">
                                      <div className="flex justify-between items-center">
                                        <h4 className="font-extrabold text-[11px] text-slate-800">Lapangan Futsal A</h4>
                                        <span className="bg-[#D1FAE5] text-[#1B6B3A] text-[7.5px] font-extrabold px-1.5 py-0.5 rounded">Aktif</span>
                                      </div>
                                      <p className="text-[8.5px] text-slate-400 mt-0.5">Tipe: Vinyl (Indoor) • Harga: Rp 150K / jam</p>
                                    </div>
                                  </div>

                                  <div className="bg-white rounded-xl overflow-hidden border border-slate-200/50 shadow-sm flex flex-col">
                                    <div className="h-20 bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=250')" }}></div>
                                    <div className="p-2.5">
                                      <div className="flex justify-between items-center">
                                        <h4 className="font-extrabold text-[11px] text-slate-800">Lapangan Badminton 1</h4>
                                        <span className="bg-[#D1FAE5] text-[#1B6B3A] text-[7.5px] font-extrabold px-1.5 py-0.5 rounded">Aktif</span>
                                      </div>
                                      <p className="text-[8.5px] text-slate-400 mt-0.5">Tipe: Kayu (Indoor) • Harga: Rp 80K / jam</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ) : mitraScreen === 2 ? (
                              <motion.div
                                key="m-verification"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-14 animate-pulse"
                              >
                                {/* Header */}
                                <div className="bg-white px-3.5 pt-9 pb-3 shadow-sm border-b border-slate-100 flex items-center gap-2 flex-shrink-0">
                                  <button 
                                    onClick={() => selectMitraScreen(0)}
                                    className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600"
                                  >
                                    <ArrowLeft className="w-3.5 h-3.5" />
                                  </button>
                                  <h3 className="text-[12.5px] font-extrabold text-slate-800">Verifikasi</h3>
                                </div>

                                {/* Content */}
                                <div className="p-3 flex-1 flex flex-col justify-center items-center">
                                  <div className="bg-white rounded-2xl w-full border border-slate-200/50 shadow-md p-3.5 relative overflow-hidden">
                                    <span className="bg-amber-100 text-amber-800 text-[8px] font-extrabold px-2 py-0.5 rounded-full absolute top-3.5 right-3.5">Butuh Verifikasi</span>
                                    <h4 className="font-extrabold text-[10px] text-slate-400 uppercase">BUKTI TRANSFER BARU</h4>
                                    <h3 className="text-[13px] font-extrabold text-slate-800 mb-2 border-b border-slate-100 pb-2 pt-1">Budi Santoso</h3>
                                    
                                    <div className="space-y-1.5 text-[9.5px] mb-4">
                                      <div className="flex justify-between">
                                        <span className="text-slate-400">Venue:</span>
                                        <span className="font-bold text-slate-700">GOR Pahlawan (Futsal A)</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-400">Jadwal:</span>
                                        <span className="font-bold text-slate-700">Hari Ini, 16:00 - 18:00</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-400">Total Transfer:</span>
                                        <span className="font-extrabold text-[#1B6B3A]">Rp 300.000</span>
                                      </div>
                                    </div>

                                    {/* Receipt preview placeholder */}
                                    <div className="border border-slate-200 bg-slate-50 rounded-xl p-2.5 flex items-center gap-3 mb-4">
                                      <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0">
                                        <Image className="w-5 h-5 text-[#1B6B3A]" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div className="font-bold text-[9px] text-slate-800 truncate">bukti_transfer.png</div>
                                        <div className="text-[8px] text-slate-400">Klik untuk melihat slip</div>
                                      </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-2.5">
                                      <button className="border border-rose-500 text-rose-500 font-extrabold py-2 rounded-xl text-[10px] hover:bg-rose-50 transition-colors">Tolak</button>
                                      <button 
                                        onClick={() => {
                                          changeDemoRole('customer');
                                          selectCustomerScreen(4);
                                        }}
                                        className="bg-[#1B6B3A] text-white font-extrabold py-2 rounded-xl text-[10px] hover:bg-[#114B27] shadow-sm shadow-[#1B6B3A]/25 transition-all"
                                      >
                                        Setujui
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="m-qr"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-black flex flex-col justify-between p-4 pb-16 text-white"
                              >
                                {/* Header */}
                                <div className="flex items-center justify-between pt-5">
                                  <button 
                                    onClick={() => selectMitraScreen(0)}
                                    className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center text-white"
                                  >
                                    <ArrowLeft className="w-4 h-4" />
                                  </button>
                                  <span className="text-[11px] font-bold">Scan QR Tiket</span>
                                  <div className="w-7 h-7"></div>
                                </div>

                                {/* Viewfinder */}
                                <div className="my-auto flex flex-col items-center">
                                  <div className="w-36 h-36 border-[3px] border-[#1B6B3A] rounded-3xl relative flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-[#1B6B3A]/15"></div>
                                    {/* Scanning line animation */}
                                    <motion.div 
                                      animate={{ y: [-75, 75, -75] }}
                                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                      className="absolute w-full h-[2px] bg-emerald-400 shadow-md shadow-emerald-400"
                                    />
                                    <QrCode className="w-14 h-14 text-white/20" />
                                  </div>
                                  <p className="text-[9px] text-center text-slate-300 max-w-[155px] mt-4 leading-normal">Arahkan kamera ke QR Code Tiket Customer Lapangku</p>
                                </div>

                                <div className="h-6"></div>
                              </motion.div>
                            )
                          )}
                        </AnimatePresence>
                      </motion.div>
                  </div>
                 </div>
              </motion.div>

    </div>
  );
}
