import React, { useState, useEffect } from 'react';
import { MapPin, CalendarClock, Smartphone, Users, CheckCircle2, PlayCircle, Dribbble, Star, Zap, Clock, Upload, UserCircle, Store, Shield, ArrowLeft, Heart, Plus, Bell, RefreshCw, Check, TrendingUp, Image, BarChart3, Search, QrCode, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MobileAppDemo({ 
  tab = 'customer', 
  hideToggle = false, 
  autoplay = true,
  variant = 'hero',
  customerScreenOverride,
  mitraScreenOverride,
  scanScreenOverride,
  onCustomerScreenChange,
  onMitraScreenChange,
  onScanScreenChange
}: { 
  tab?: 'customer' | 'mitra' | 'scan', 
  hideToggle?: boolean, 
  autoplay?: boolean,
  variant?: 'hero' | 'demo',
  customerScreenOverride?: number,
  mitraScreenOverride?: number,
  scanScreenOverride?: number,
  onCustomerScreenChange?: (screen: number) => void,
  onMitraScreenChange?: (screen: number) => void,
  onScanScreenChange?: (screen: number) => void
}) {
  // ─── Simulator State Hooks ─────────────────────────────────────
  const [demoRole, setDemoRole] = useState<'customer' | 'mitra' | 'scan'>('customer');
  const [scanScreen, setScanScreen] = useState(0);
  
  // Customer Screens: 0: Splash, 1: Home, 2: Detail, 3: Pilih Jadwal, 4: Payment, 5: Success, 6: Pesanan Saya
  const [customerScreen, setCustomerScreen] = useState(0); 
  
  // Mitra Screens: 0: Dashboard, 1: Manage Fields, 2: Tambah Lapangan, 3: Verifikasi Bukti, 4: QR Scanner, 5: Analisis & Laporan
  const [mitraScreen, setMitraScreen] = useState(0); 
  
  const [isAutoplay, setIsAutoplay] = useState(autoplay);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [direction, setDirection] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [savedMitraScreen, setSavedMitraScreen] = useState(0);

  // States for Customer Schedule Screen
  const [selectedDate, setSelectedDate] = useState<'Hari Ini' | 'Besok' | 'Lusa'>('Hari Ini');
  const [selectedSlots, setSelectedSlots] = useState<string[]>(['16:00 - 17:00', '17:00 - 18:00']);

  // States for Mitra CRUD Form
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldSport, setNewFieldSport] = useState<'Futsal' | 'Badminton' | 'Basket'>('Futsal');
  const [newFieldPrice, setNewFieldPrice] = useState('150000');
  const [newFieldFloor, setNewFieldFloor] = useState('Vinyl');
  const [newFieldFacilities, setNewFieldFacilities] = useState<string[]>(['Wi-Fi', 'Kantin', 'Parkir Luas']);
  const [showSaveToast, setShowSaveToast] = useState(false);

  // List of fields (Mitra CRUD state)
  const [fieldsList, setFieldsList] = useState([
    { name: 'Lapangan Futsal A', type: 'Vinyl (Futsal)', price: 'Rp 150K / jam', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=250', status: 'Aktif' },
    { name: 'Lapangan Badminton 1', type: 'Kayu (Badminton)', price: 'Rp 80K / jam', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=250', status: 'Aktif' }
  ]);

  // Payment confirmation status
  const [paymentStatus, setPaymentStatus] = useState<'Menunggu Verifikasi' | 'Dikonfirmasi'>('Menunggu Verifikasi');

  // Autoplay Logic
  useEffect(() => {
    if (!isAutoplay || !autoplay) return;
    const timer = setInterval(() => {
      if (demoRole === 'customer') {
        setCustomerScreen((prev) => (prev + 1) % 7);
      } else {
        setMitraScreen((prev) => (prev + 1) % 6);
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [demoRole, isAutoplay, autoplay]);

  // Resume Autoplay timer after manual interaction (only if parent autoplay is true)
  useEffect(() => {
    if (isAutoplay || !autoplay) return;
    const timer = setTimeout(() => {
      setIsAutoplay(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [isAutoplay, lastInteraction, autoplay]);

  // Handle overrides from parent
  useEffect(() => {
    if (customerScreenOverride !== undefined) {
      setCustomerScreen(customerScreenOverride);
    }
  }, [customerScreenOverride]);

  useEffect(() => {
    if (mitraScreenOverride !== undefined) {
      setMitraScreen(mitraScreenOverride);
    }
  }, [mitraScreenOverride]);

  useEffect(() => {
    if (scanScreenOverride !== undefined) {
      setScanScreen(scanScreenOverride);
    }
  }, [scanScreenOverride]);

  // Trigger state change callbacks
  useEffect(() => {
    if (onCustomerScreenChange) onCustomerScreenChange(customerScreen);
  }, [customerScreen]);

  useEffect(() => {
    if (onMitraScreenChange) onMitraScreenChange(mitraScreen);
  }, [mitraScreen]);

  useEffect(() => {
    if (onScanScreenChange) onScanScreenChange(scanScreen);
  }, [scanScreen]);

  const selectCustomerScreen = (screen: number) => {
    setIsAutoplay(false);
    setHasInteracted(true);
    setLastInteraction(Date.now());
    setDirection(screen > customerScreen ? 1 : -1);
    setCustomerScreen(screen);
  };

  const selectMitraScreen = (screen: number) => {
    setIsAutoplay(false);
    setHasInteracted(true);
    setLastInteraction(Date.now());
    setDirection(screen > mitraScreen ? 1 : -1);
    setMitraScreen(screen);
  };

  const selectScanScreen = (screen: number) => {
    setIsAutoplay(false);
    setHasInteracted(true);
    setLastInteraction(Date.now());
    setDirection(screen > scanScreen ? 1 : -1);
    setScanScreen(screen);
  };

  const changeDemoRole = (role: 'customer' | 'mitra' | 'scan') => {
    setIsAutoplay(autoplay);
    setDemoRole(role);
    if (role === 'customer') setCustomerScreen(0);
    else setMitraScreen(0);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: { offset: { x: number, y: number }, velocity: { x: number, y: number } }) => {
    const swipePower = Math.abs(offset.x) * velocity.x;
    const swipeConfidenceThreshold = 8000;
    const swipeDistanceThreshold = 80;
    
    if (swipePower < -swipeConfidenceThreshold || offset.x < -swipeDistanceThreshold) {
      // Swipe left -> Next screen
      setIsAutoplay(false);
      setHasInteracted(true);
      setLastInteraction(Date.now());
      setDirection(1);
      if (demoRole === 'customer') setCustomerScreen(c => (c + 1) % 7);
      else setMitraScreen(m => (m + 1) % 6);
    } else if (swipePower > swipeConfidenceThreshold || offset.x > swipeDistanceThreshold) {
      // Swipe right -> Prev screen
      setIsAutoplay(false);
      setHasInteracted(true);
      setLastInteraction(Date.now());
      setDirection(-1);
      if (demoRole === 'customer') setCustomerScreen(c => (c - 1 + 7) % 7);
      else setMitraScreen(m => (m - 1 + 6) % 6);
    }
  };

  // Sync role and scanner states based on active tab prop
  useEffect(() => {
    if (tab === 'customer') {
      setDemoRole('customer');
      if (autoplay) setIsAutoplay(true);
    } else if (tab === 'mitra') {
      setDemoRole('mitra');
      setMitraScreen(prev => {
        if (prev === 4) return savedMitraScreen; // Screen 4 is QR scanner
        return prev;
      });
      if (autoplay) setIsAutoplay(true);
    } else if (tab === 'scan') {
      setDemoRole('scan');
      setIsAutoplay(true);
    }
  }, [tab, autoplay]);

  // Toggle dynamic facility selection
  const toggleFacility = (facility: string) => {
    if (newFieldFacilities.includes(facility)) {
      setNewFieldFacilities(newFieldFacilities.filter(f => f !== facility));
    } else {
      setNewFieldFacilities([...newFieldFacilities, facility]);
    }
  };

  // Handle addition of a new field in the simulator
  const handleSaveField = () => {
    if (!newFieldName.trim()) return;
    const newField = {
      name: newFieldName,
      type: `${newFieldFloor} (${newFieldSport})`,
      price: `Rp ${Math.round(parseInt(newFieldPrice || '100000') / 1000)}K / jam`,
      image: newFieldSport === 'Badminton' 
        ? 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=250'
        : 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=250',
      status: 'Aktif'
    };
    setFieldsList([...fieldsList, newField]);
    setShowSaveToast(true);
    setTimeout(() => {
      setShowSaveToast(false);
      setNewFieldName('');
      selectMitraScreen(1); // Redirect back to fields list screen
    }, 1500);
  };

  // Calculate pricing based on selected slots (each represents 1 hour @ Rp 150.000)
  const totalCost = selectedSlots.length * 150000;

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
      
      {/* Outer Phone Wrapper (applies 3D tilt/hover conditionally) */}
      <motion.div 
        className="relative w-[260px] lg:w-[290px] z-10 pointer-events-auto"
        style={variant === 'hero' ? {
          perspective: 1200,
          transformStyle: 'preserve-3d'
        } : {}}
        animate={variant === 'hero' ? {
          y: [0, -10, 0],
          rotateX: [10, 8, 10],
          rotateY: [-15, -12, -15],
          rotateZ: [3, 2, 3],
        } : {}}
        transition={variant === 'hero' ? {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
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
                <AnimatePresence custom={direction} initial={false}>
                  {demoRole === 'customer' ? (
                    // ─── Customer Screens ───
                    customerScreen === 0 ? (
                      <motion.div
                        key="c-splash"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                              {['Semua', 'Futsal', 'Mini Soccer', 'Bulu Tangkis', 'Basket'].map((cat, i) => (
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
                                <span className="text-[7.5px] font-extrabold text-slate-400 tracking-wider">GOR GAGAH</span>
                                <h4 className="text-[10px] font-bold text-slate-800 truncate mb-1">Lapangan Futsal A</h4>
                                <div className="mt-auto">
                                  <div className="text-[10.5px] font-extrabold text-[#1B6B3A]">Rp 150K<span className="text-[7.5px] font-normal text-slate-400">/jam</span></div>
                                  <div className="flex items-center justify-between mt-1 text-[8.5px] text-slate-500 border-t border-slate-55 pt-1">
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
                                <span className="text-[7.5px] font-extrabold text-slate-400 tracking-wider">GOR HERO</span>
                                <h4 className="text-[10px] font-bold text-slate-800 truncate mb-1">Badminton Court 1</h4>
                                <div className="mt-auto">
                                  <div className="text-[10.5px] font-extrabold text-[#1B6B3A]">Rp 80K<span className="text-[7.5px] font-normal text-slate-400">/jam</span></div>
                                  <div className="flex items-center justify-between mt-1 text-[8.5px] text-slate-500 border-t border-slate-55 pt-1">
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
                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500" onClick={() => selectCustomerScreen(6)}>
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
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                          <span className="text-[8px] font-extrabold text-slate-400 tracking-wider">GOR GAGAH</span>
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
                            {['Info', 'Fasilitas', 'Ulasan'].map((tabItem, i) => (
                              <span 
                                key={tabItem} 
                                className={`pb-1 px-3 text-[10px] font-extrabold border-b-2 cursor-pointer ${
                                  i === 0 
                                    ? 'text-[#1B6B3A] border-[#1B6B3A]' 
                                    : 'text-slate-400 border-transparent'
                                }`}
                              >
                                {tabItem}
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
                      // ─── [NEW] Pilih Jadwal Screen ───
                      <motion.div
                        key="c-schedule"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-16"
                      >
                        {/* Header */}
                        <div className="bg-white px-3 pt-9 pb-3 shadow-sm border-b border-slate-100 flex items-center gap-2 flex-shrink-0">
                          <button 
                            onClick={() => selectCustomerScreen(2)}
                            className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <h3 className="text-[12.5px] font-extrabold text-slate-800">Pilih Jadwal</h3>
                        </div>

                        {/* Content */}
                        <div className="p-3 space-y-3.5 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                          {/* Date Selector */}
                          <div>
                            <h4 className="font-extrabold text-[9.5px] text-slate-400 mb-2 uppercase tracking-wide">PILIH TANGGAL</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['Hari Ini', 'Besok', 'Lusa'].map((dateOpt) => (
                                <button
                                  key={dateOpt}
                                  onClick={() => setSelectedDate(dateOpt as any)}
                                  className={`py-2 rounded-xl text-[10px] font-bold border transition-all ${
                                    selectedDate === dateOpt
                                      ? 'bg-[#1B6B3A] text-white border-[#1B6B3A] shadow-sm'
                                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                  }`}
                                >
                                  {dateOpt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Time Slots Selector */}
                          <div>
                            <h4 className="font-extrabold text-[9.5px] text-slate-400 mb-2 uppercase tracking-wide">PILIH JAM (MINIMAL 1 JAM)</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { time: '08:00 - 09:00', status: 'Terisi' },
                                { time: '10:00 - 11:00', status: 'Terisi' },
                                { time: '14:00 - 15:00', status: 'Tersedia' },
                                { time: '16:00 - 17:00', status: 'Tersedia' },
                                { time: '17:00 - 18:00', status: 'Tersedia' },
                                { time: '19:00 - 20:00', status: 'Tersedia' }
                              ].map((slot) => {
                                const isSelected = selectedSlots.includes(slot.time);
                                const isBooked = slot.status === 'Terisi';
                                return (
                                  <button
                                    key={slot.time}
                                    disabled={isBooked}
                                    onClick={() => {
                                      if (isSelected) {
                                        setSelectedSlots(selectedSlots.filter(s => s !== slot.time));
                                      } else {
                                        setSelectedSlots([...selectedSlots, slot.time]);
                                      }
                                    }}
                                    className={`py-2 px-2.5 rounded-xl border text-[9px] font-extrabold transition-all flex flex-col items-center justify-center ${
                                      isBooked
                                        ? 'bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed'
                                        : isSelected
                                          ? 'bg-[#E8F5EC] text-[#1B6B3A] border-[#1B6B3A]'
                                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span>{slot.time}</span>
                                    <span className={`text-[7px] mt-0.5 ${isBooked ? 'text-rose-400' : isSelected ? 'text-[#1B6B3A] font-bold' : 'text-slate-400'}`}>
                                      {isBooked ? 'Terisi' : isSelected ? 'Dipilih' : 'Tersedia'}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Proceed Bottom Sheet */}
                        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 px-4 py-2.5 flex justify-between items-center z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
                          <div>
                            <div className="text-[8.5px] text-slate-400 font-bold leading-none mb-1">TOTAL ({selectedSlots.length} JAM)</div>
                            <div className="text-[13px] font-extrabold text-[#1B6B3A] leading-none">Rp {totalCost.toLocaleString('id-ID')}</div>
                          </div>
                          <button 
                            onClick={() => selectCustomerScreen(4)}
                            disabled={selectedSlots.length === 0}
                            className={`font-extrabold text-[10px] px-6 py-2.5 rounded-full shadow-md transition-all active:scale-95 ${
                              selectedSlots.length === 0 
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                : 'bg-[#1B6B3A] hover:bg-[#114B27] text-white shadow-[#1B6B3A]/25'
                            }`}
                          >
                            Lanjut Bayar
                          </button>
                        </div>
                      </motion.div>
                    ) : customerScreen === 4 ? (
                      <motion.div
                        key="c-payment"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-16 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                      >
                        {/* Header */}
                        <div className="bg-white px-3 pt-9 pb-3 shadow-sm border-b border-slate-100 flex items-center gap-2 flex-shrink-0">
                          <button 
                            onClick={() => selectCustomerScreen(3)}
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
                                <span>GOR GAGAH (Futsal A)</span>
                              </div>
                              <div className="text-[9.5px] text-slate-500">Jadwal: {selectedDate}, {selectedSlots.join(', ')} ({selectedSlots.length} Jam)</div>
                              <div className="flex justify-between font-extrabold text-[11px] text-[#1B6B3A] border-t border-dashed border-slate-100 pt-1.5 mt-1.5">
                                <span>Total Tagihan:</span>
                                <span>Rp {totalCost.toLocaleString('id-ID')}</span>
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
                            onClick={() => {
                              setPaymentStatus('Menunggu Verifikasi');
                              selectCustomerScreen(5);
                            }}
                            className="w-full bg-[#1B6B3A] hover:bg-[#114B27] text-white font-extrabold text-[11px] py-2.5 rounded-full shadow-md shadow-[#1B6B3A]/25 transition-all active:scale-95 flex items-center justify-center gap-1.5 animate-pulse"
                          >
                            <Upload className="w-4 h-4" />
                            Kirim Bukti Pembayaran
                          </button>
                        </div>
                      </motion.div>
                    ) : customerScreen === 5 ? (
                      <motion.div
                        key="c-success"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-[#F4F6F9] flex flex-col justify-center items-center p-5 text-center cursor-pointer"
                        onClick={() => selectCustomerScreen(6)}
                      >
                        <motion.div 
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
                          className="w-14 h-14 bg-[#E8F5EC] rounded-full flex items-center justify-center text-[#1B6B3A] mb-4 shadow-md shadow-[#1B6B3A]/10 animate-bounce"
                        >
                          <CheckCircle2 className="w-9 h-9" />
                        </motion.div>
                        <h3 className="text-[14.5px] font-extrabold text-slate-800 mb-1 leading-none">Booking Berhasil!</h3>
                        <p className="text-[9.5px] text-slate-400 font-semibold mb-4 leading-none">Status: {paymentStatus}</p>

                        {/* E-Ticket Card */}
                        <div className="bg-white rounded-2xl w-full border border-slate-200/50 shadow-md p-3.5 mb-5 relative overflow-hidden text-left">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/5 rounded-bl-3xl"></div>
                          <div className="border-b border-dashed border-slate-100 pb-2 mb-2 flex justify-between items-center">
                            <div>
                              <div className="text-[8px] text-slate-400 font-bold uppercase">KODE BOOKING</div>
                              <div className="text-[11px] font-extrabold text-[#1B6B3A] tracking-wider select-all">LPG-982834</div>
                            </div>
                            <span className={`text-[8.5px] font-extrabold px-2 py-0.5 rounded-full ${
                              paymentStatus === 'Dikonfirmasi'
                                ? 'bg-[#D1FAE5] text-[#1B6B3A]'
                                : 'bg-amber-100 text-amber-700'
                            }`}>{paymentStatus === 'Dikonfirmasi' ? 'Dikonfirmasi' : 'Pending'}</span>
                          </div>
                          <div className="space-y-1.5 text-[9.5px]">
                            <div className="flex justify-between">
                              <span className="text-slate-400 font-medium">Lapangan:</span>
                              <span className="font-bold text-slate-700">GOR GAGAH (Futsal A)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400 font-medium">Waktu:</span>
                              <span className="font-bold text-slate-700">{selectedDate}, {selectedSlots.join(', ')}</span>
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
                            selectCustomerScreen(6); // Open Order History
                          }}
                          className="bg-[#1B6B3A] hover:bg-[#114B27] text-white font-extrabold text-[10px] px-6 py-2.5 rounded-full shadow-md shadow-[#1B6B3A]/25 transition-all active:scale-95"
                        >
                          Lihat Pesanan Saya
                        </button>
                      </motion.div>
                    ) : (
                      // ─── [NEW] Customer Screen 6: Pesanan Saya ───
                      <motion.div
                        key="c-orders"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-14"
                      >
                        {/* Header */}
                        <div className="bg-white px-4 pt-10 pb-3 shadow-sm border-b border-slate-100 flex-shrink-0">
                          <h3 className="text-[14px] font-extrabold text-slate-800">Pesanan Saya</h3>
                          <div className="flex border-b border-slate-100 mt-2">
                            <span className="pb-1 px-3 text-[10px] font-extrabold border-[#1B6B3A] border-b-2 text-[#1B6B3A] cursor-pointer">Aktif</span>
                            <span className="pb-1 px-3 text-[10px] font-bold border-transparent text-slate-400 cursor-pointer">Riwayat</span>
                          </div>
                        </div>

                        {/* List */}
                        <div className="p-3 space-y-3.5 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                          {/* Active Booking */}
                          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm relative">
                            <span className={`absolute top-3.5 right-3.5 text-[7.5px] font-extrabold px-2 py-0.5 rounded-full ${
                              paymentStatus === 'Dikonfirmasi'
                                ? 'bg-[#D1FAE5] text-[#1B6B3A]'
                                : 'bg-amber-100 text-amber-700'
                            }`}>{paymentStatus}</span>
                            
                            <span className="text-[7.5px] font-extrabold text-slate-400 tracking-wider">GOR GAGAH</span>
                            <h4 className="font-bold text-[11px] text-slate-800 leading-tight">Lapangan Futsal A</h4>
                            <p className="text-[8.5px] text-slate-500 mt-1">Jadwal: {selectedDate}, {selectedSlots.join(', ')}</p>
                            
                            <div className="border-t border-slate-100/60 pt-2 mt-2 flex justify-between items-center text-[9px]">
                              <div>
                                <span className="text-slate-400">Total Biaya: </span>
                                <span className="font-extrabold text-[#1B6B3A]">Rp {totalCost.toLocaleString('id-ID')}</span>
                              </div>
                              <span className="text-[8px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded-md">LPG-982834</span>
                            </div>
                          </div>

                          {/* Completed Booking */}
                          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm relative opacity-80">
                            <span className="absolute top-3.5 right-3.5 text-[7.5px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Selesai</span>
                            <span className="text-[7.5px] font-extrabold text-slate-400 tracking-wider">GOR HERO</span>
                            <h4 className="font-bold text-[11px] text-slate-800 leading-tight">Badminton Court 1</h4>
                            <p className="text-[8.5px] text-slate-500 mt-1">Jadwal: 20 Juni 2026, 19:00 - 20:00</p>
                          </div>
                        </div>

                        {/* Bottom Nav */}
                        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 py-1.5 flex justify-around items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500" onClick={() => selectCustomerScreen(1)}>
                            <Smartphone className="w-4 h-4" />
                            <span className="text-[8px] font-bold mt-0.5">Beranda</span>
                          </div>
                          <div className="flex flex-col items-center cursor-pointer text-[#1B6B3A]">
                            <CalendarClock className="w-4 h-4" />
                            <span className="text-[8px] font-extrabold mt-0.5">Pesanan</span>
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
                    )
                  ) : demoRole === 'mitra' ? (
                    // ─── Mitra Screens ───
                    mitraScreen === 0 ? (
                      <motion.div
                        key="m-dashboard"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-14 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                      >
                        {/* Header */}
                        <div className="bg-[#1B6B3A] text-white px-4 pt-10 pb-5 rounded-b-[24px] shadow-lg shadow-[#1B6B3A]/10 flex-shrink-0">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <span className="text-[8px] text-emerald-200/80 font-bold uppercase tracking-wider">Mitra Lapangku</span>
                              <h3 className="text-[13.5px] font-extrabold leading-none">GOR GAGAH</h3>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white relative">
                              <Bell className="w-4 h-4" />
                              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-orange-550 rounded-full animate-pulse"></span>
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
                          <div 
                            onClick={() => selectMitraScreen(5)} // Open Reports screen
                            className="bg-white rounded-xl p-3 border border-slate-200/45 shadow-md grid grid-cols-2 gap-2 cursor-pointer hover:border-slate-300 transition-all"
                          >
                            <div>
                              <div className="text-[8px] text-slate-400 font-bold uppercase">LAPORAN BULANAN</div>
                              <div className="text-[13px] font-extrabold text-[#1B6B3A] mt-0.5">Rp {(4250000 + (paymentStatus === 'Dikonfirmasi' ? totalCost : 0)).toLocaleString('id-ID')}</div>
                              <div className="flex items-center gap-0.5 text-[8px] text-[#1B6B3A] font-bold mt-1">
                                <TrendingUp className="w-2.5 h-2.5" /> +15% minggu ini
                              </div>
                            </div>
                            <div className="border-l border-slate-100 pl-3">
                              <div className="text-[8px] text-slate-400 font-bold uppercase">PESANAN AKTIF</div>
                              <div className="text-[13px] font-extrabold text-slate-800 mt-0.5">9 Booking</div>
                              <div className="text-[8.5px] text-orange-600 font-extrabold mt-1">
                                {paymentStatus === 'Menunggu Verifikasi' ? '3 Butuh Verifikasi' : '2 Butuh Verifikasi'}
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="mb-2">
                            <h4 className="font-extrabold text-[10.5px] text-slate-800 mb-2 px-1">Aksi Cepat</h4>
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div 
                                onClick={() => selectMitraScreen(4)} // Open QR Scanner
                                className="bg-white p-2.5 rounded-xl border border-slate-200/50 hover:bg-slate-50 cursor-pointer shadow-sm"
                              >
                                <QrCode className="w-5 h-5 mx-auto text-[#1B6B3A] mb-1" />
                                <span className="text-[8px] font-bold text-slate-700">Scan QR</span>
                              </div>
                              <div 
                                onClick={() => selectMitraScreen(2)} // Open Add Field CRUD Form
                                className="bg-white p-2.5 rounded-xl border border-slate-200/50 hover:bg-slate-50 cursor-pointer shadow-sm"
                              >
                                <Plus className="w-5 h-5 mx-auto text-[#1B6B3A] mb-1" />
                                <span className="text-[8px] font-bold text-slate-700">Tambah</span>
                              </div>
                              <div 
                                onClick={() => selectMitraScreen(3)} // Open Verification screen
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
                              <span className="text-[8.5px] font-bold text-[#1B6B3A] cursor-pointer" onClick={() => selectMitraScreen(3)}>Lihat Semua</span>
                            </div>
                            <div className="space-y-2">
                              <div 
                                onClick={() => selectMitraScreen(3)} // Open verification details
                                className="bg-white rounded-xl p-2.5 border border-slate-100 flex items-center justify-between shadow-sm cursor-pointer hover:border-slate-300 transition-all"
                              >
                                <div>
                                  <div className="font-bold text-[10px] text-slate-800">Budi Santoso</div>
                                  <div className="text-[8.5px] text-slate-500">Futsal A • {selectedDate}, {selectedSlots.join(', ')}</div>
                                </div>
                                <span className={`text-[7.5px] font-extrabold px-1.5 py-0.5 rounded ${
                                  paymentStatus === 'Dikonfirmasi'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>{paymentStatus === 'Dikonfirmasi' ? 'Dikonfirmasi' : 'Verifikasi'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Nav */}
                        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 h-14 px-2 flex justify-between items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                          <div className="flex flex-col items-center cursor-pointer text-[#1B6B3A] w-12">
                            <Store className="w-4 h-4" />
                            <span className="text-[7px] font-extrabold mt-0.5">DASHBOARD</span>
                          </div>
                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(1)}>
                            <Trophy className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">FIELDS</span>
                          </div>
                          
                          <div className="relative -top-2 flex flex-col items-center z-30" onClick={() => selectMitraScreen(4)}>
                            <div className="w-9 h-9 bg-[#1B6B3A] rounded-full flex items-center justify-center text-white shadow-md shadow-[#1B6B3A]/30 hover:scale-105 active:scale-95 transition-all">
                              <QrCode className="w-4.5 h-4.5" />
                            </div>
                            <span className="text-[7.5px] font-extrabold text-[#1B6B3A] mt-1 uppercase">SCAN</span>
                          </div>

                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(3)}>
                            <CalendarClock className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">ORDERS</span>
                          </div>
                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(5)}>
                            <BarChart3 className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">REPORTS</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : mitraScreen === 1 ? (
                      <motion.div
                        key="m-fields"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                          <button 
                            onClick={() => selectMitraScreen(2)} // Add field trigger
                            className="w-6 h-6 rounded-lg bg-[#E8F5EC] text-[#1B6B3A] flex items-center justify-center hover:bg-[#E8F5EC]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Content (Render dynamically from state list!) */}
                        <div className="p-3 space-y-3 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                          {fieldsList.map((field, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden border border-slate-200/50 shadow-sm flex flex-col">
                              <div className="h-20 bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url('${field.image}')` }}></div>
                              <div className="p-2.5">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-extrabold text-[11px] text-slate-800">{field.name}</h4>
                                  <span className="bg-[#D1FAE5] text-[#1B6B3A] text-[7.5px] font-extrabold px-1.5 py-0.5 rounded">{field.status}</span>
                                </div>
                                <p className="text-[8.5px] text-slate-400 mt-0.5">Tipe: {field.type} • Harga: {field.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Nav */}
                        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 h-14 px-2 flex justify-between items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(0)}>
                            <Store className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">DASHBOARD</span>
                          </div>
                          <div className="flex flex-col items-center cursor-pointer text-[#1B6B3A] w-12">
                            <Trophy className="w-4 h-4" />
                            <span className="text-[7px] font-extrabold mt-0.5">FIELDS</span>
                          </div>
                          
                          <div className="relative -top-2 flex flex-col items-center z-30" onClick={() => selectMitraScreen(4)}>
                            <div className="w-9 h-9 bg-[#1B6B3A] rounded-full flex items-center justify-center text-white shadow-md shadow-[#1B6B3A]/30 hover:scale-105 active:scale-95 transition-all">
                              <QrCode className="w-4.5 h-4.5" />
                            </div>
                            <span className="text-[7.5px] font-extrabold text-[#1B6B3A] mt-1 uppercase">SCAN</span>
                          </div>

                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(3)}>
                            <CalendarClock className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">ORDERS</span>
                          </div>
                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(5)}>
                            <BarChart3 className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">REPORTS</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : mitraScreen === 2 ? (
                      // ─── [NEW] Mitra Screen 2: Tambah Lapangan CRUD Form ───
                      <motion.div
                        key="m-add-field"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-16"
                      >
                        {/* Header */}
                        <div className="bg-white px-3.5 pt-9 pb-3 shadow-sm border-b border-slate-100 flex items-center gap-2 flex-shrink-0">
                          <button 
                            onClick={() => selectMitraScreen(1)}
                            className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <h3 className="text-[12.5px] font-extrabold text-slate-800">Tambah Lapangan</h3>
                        </div>

                        {/* Content Form */}
                        <div className="p-3.5 space-y-3 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-left">
                          {/* Input Nama */}
                          <div>
                            <label className="block text-[8px] font-bold text-slate-400 uppercase mb-1">NAMA LAPANGAN</label>
                            <input 
                              type="text" 
                              value={newFieldName}
                              onChange={(e) => setNewFieldName(e.target.value)}
                              placeholder="Contoh: Lapangan Futsal B" 
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-[10px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1B6B3A]"
                            />
                          </div>

                          {/* Olahraga & Tipe lantai */}
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[8px] font-bold text-slate-400 uppercase mb-1">CABANG OLAHRAGA</label>
                              <select 
                                value={newFieldSport}
                                onChange={(e) => setNewFieldSport(e.target.value as any)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-[10px] text-slate-800 focus:outline-none focus:border-[#1B6B3A]"
                              >
                                <option value="Futsal">Futsal</option>
                                <option value="Badminton">Badminton</option>
                                <option value="Basket">Basket</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[8px] font-bold text-slate-400 uppercase mb-1">TIPE LANTAI</label>
                              <select 
                                value={newFieldFloor}
                                onChange={(e) => setNewFieldFloor(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-[10px] text-slate-800 focus:outline-none focus:border-[#1B6B3A]"
                              >
                                <option value="Vinyl">Vinyl</option>
                                <option value="Kayu">Kayu</option>
                                <option value="Rumput Sintetis">Rumput</option>
                                <option value="Interlock">Interlock</option>
                              </select>
                            </div>
                          </div>

                          {/* Harga Sewa */}
                          <div>
                            <label className="block text-[8px] font-bold text-slate-400 uppercase mb-1">TARIF SEWA (RP/JAM)</label>
                            <input 
                              type="number" 
                              value={newFieldPrice}
                              onChange={(e) => setNewFieldPrice(e.target.value)}
                              placeholder="150000" 
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-[10px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1B6B3A]"
                            />
                          </div>

                          {/* Fasilitas */}
                          <div>
                            <label className="block text-[8px] font-bold text-slate-400 uppercase mb-1">FASILITAS LAPANGAN</label>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {['Wi-Fi', 'Kantin', 'Parkir Luas', 'Loker', 'Shower'].map((facility) => {
                                const selected = newFieldFacilities.includes(facility);
                                return (
                                  <button
                                    key={facility}
                                    type="button"
                                    onClick={() => toggleFacility(facility)}
                                    className={`px-2 py-1 rounded-lg border text-[9px] font-bold transition-all ${
                                      selected 
                                        ? 'bg-[#E8F5EC] text-[#1B6B3A] border-[#1B6B3A]' 
                                        : 'bg-white text-slate-500 border-slate-200'
                                    }`}
                                  >
                                    {facility}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Save Action Button */}
                        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 px-4 py-2.5 z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
                          <button 
                            onClick={handleSaveField}
                            disabled={!newFieldName.trim()}
                            className={`w-full font-extrabold text-[11px] py-2.5 rounded-full shadow-md transition-all active:scale-95 ${
                              !newFieldName.trim()
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                : 'bg-[#1B6B3A] hover:bg-[#114B27] text-white shadow-[#1B6B3A]/25'
                            }`}
                          >
                            Simpan Lapangan Baru
                          </button>
                        </div>

                        {/* Form saved Toast notification */}
                        <AnimatePresence>
                          {showSaveToast && (
                            <motion.div 
                              initial={{ opacity: 0, y: 30, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 30, scale: 0.9 }}
                              className="absolute bottom-16 inset-x-6 bg-slate-900 text-white rounded-xl py-2 px-3 flex items-center justify-center gap-2 shadow-lg z-50 text-[9px] font-bold"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Lapangan Baru Ditambahkan!
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ) : mitraScreen === 3 ? (
                      <motion.div
                        key="m-verification"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-14"
                      >
                        {/* Header */}
                        <div className="bg-white px-3.5 pt-9 pb-3 shadow-sm border-b border-slate-100 flex items-center gap-2 flex-shrink-0">
                          <button 
                            onClick={() => selectMitraScreen(0)}
                            className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <h3 className="text-[12.5px] font-extrabold text-slate-800">Verifikasi Pembayaran</h3>
                        </div>

                        {/* Content */}
                        <div className="p-3 flex-1 flex flex-col justify-center items-center">
                          <div className="bg-white rounded-2xl w-full border border-slate-200/50 shadow-md p-3.5 relative overflow-hidden text-left">
                            <span className={`text-[7.5px] font-extrabold px-2 py-0.5 rounded-full absolute top-3.5 right-3.5 ${
                              paymentStatus === 'Dikonfirmasi'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>{paymentStatus === 'Dikonfirmasi' ? 'Telah Disetujui' : 'Butuh Verifikasi'}</span>
                            <h4 className="font-extrabold text-[9px] text-slate-400 uppercase">BUKTI TRANSFER BARU</h4>
                            <h3 className="text-[13px] font-extrabold text-slate-800 mb-2 border-b border-slate-100 pb-2 pt-1">Budi Santoso</h3>
                            
                            <div className="space-y-1.5 text-[9.5px] mb-4">
                              <div className="flex justify-between">
                                <span className="text-slate-400">Venue:</span>
                                <span className="font-bold text-slate-700">GOR GAGAH (Futsal A)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Jadwal:</span>
                                <span className="font-bold text-slate-700">{selectedDate}, {selectedSlots.join(', ')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Total Transfer:</span>
                                <span className="font-extrabold text-[#1B6B3A]">Rp {totalCost.toLocaleString('id-ID')}</span>
                              </div>
                            </div>

                            {/* Receipt preview placeholder */}
                            <div className="border border-slate-200 bg-slate-50 rounded-xl p-2.5 flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0">
                                <Image className="w-5 h-5 text-[#1B6B3A]" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-bold text-[9px] text-slate-800 truncate">bukti_transfer.png</div>
                                <div className="text-[8px] text-slate-400">Slip Mandiri Terunggah</div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-2.5">
                              <button className="border border-rose-500 text-rose-500 font-extrabold py-2 rounded-xl text-[10px] hover:bg-rose-50 transition-colors">Tolak</button>
                              <button 
                                onClick={() => {
                                  setPaymentStatus('Dikonfirmasi');
                                  selectMitraScreen(0); // Redirect to dashboard
                                }}
                                className="bg-[#1B6B3A] text-white font-extrabold py-2 rounded-xl text-[10px] hover:bg-[#114B27] shadow-sm shadow-[#1B6B3A]/25 transition-all"
                              >
                                Setujui
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Nav */}
                        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 h-14 px-2 flex justify-between items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(0)}>
                            <Store className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">DASHBOARD</span>
                          </div>
                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(1)}>
                            <Trophy className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">FIELDS</span>
                          </div>
                          
                          <div className="relative -top-2 flex flex-col items-center z-30" onClick={() => selectMitraScreen(4)}>
                            <div className="w-9 h-9 bg-[#1B6B3A] rounded-full flex items-center justify-center text-white shadow-md shadow-[#1B6B3A]/30 hover:scale-105 active:scale-95 transition-all">
                              <QrCode className="w-4.5 h-4.5" />
                            </div>
                            <span className="text-[7.5px] font-extrabold text-[#1B6B3A] mt-1 uppercase">SCAN</span>
                          </div>

                          <div className="flex flex-col items-center cursor-pointer text-[#1B6B3A] w-12">
                            <CalendarClock className="w-4 h-4" />
                            <span className="text-[7px] font-extrabold mt-0.5">ORDERS</span>
                          </div>
                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(5)}>
                            <BarChart3 className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">REPORTS</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : mitraScreen === 4 ? (
                      <motion.div
                        key="m-qr"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                              animate={{ y: [-70, 70, -70] }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                              className="absolute w-full h-[2px] bg-emerald-400 shadow-md shadow-emerald-400"
                            />
                            <QrCode className="w-14 h-14 text-white/20" />
                          </div>
                          <p className="text-[9px] text-center text-slate-300 max-w-[155px] mt-4 leading-normal">Arahkan kamera ke QR Code Tiket Customer Lapangku untuk Check-in otomatis</p>
                        </div>

                        <div className="h-6"></div>
                      </motion.div>
                    ) : (
                      // ─── [NEW] Mitra Screen 5: Analisis & Laporan ───
                      <motion.div
                        key="m-reports"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-[#F4F6F9] flex flex-col pb-14"
                      >
                        {/* Header */}
                        <div className="bg-white px-3.5 pt-9 pb-3 shadow-sm border-b border-slate-100 flex items-center gap-2 flex-shrink-0">
                          <button 
                            onClick={() => selectMitraScreen(0)}
                            className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <h3 className="text-[12.5px] font-extrabold text-slate-800">Laporan Pendapatan</h3>
                        </div>

                        {/* Content */}
                        <div className="p-3.5 space-y-3.5 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-left">
                          {/* Financial summary widget */}
                          <div className="bg-gradient-to-br from-[#1B6B3A] to-[#114B27] text-white p-3 rounded-2xl shadow-sm">
                            <span className="text-[8px] font-bold text-emerald-200 uppercase tracking-wider">TOTAL SALDO</span>
                            <h3 className="text-[18px] font-extrabold">Rp {(4250000 + (paymentStatus === 'Dikonfirmasi' ? totalCost : 0)).toLocaleString('id-ID')}</h3>
                            <div className="border-t border-white/20 pt-2 mt-2 flex justify-between text-[8px] text-emerald-100">
                              <span>Pencairan Terjadwal:</span>
                              <span className="font-bold">Setiap Jumat</span>
                            </div>
                          </div>

                          {/* CSS-based Bar Chart */}
                          <div className="bg-white rounded-xl p-3 border border-slate-200/50 shadow-sm">
                            <h4 className="font-bold text-[9.5px] text-slate-700 mb-3 uppercase">OKUPANSI JADWAL HARIAN</h4>
                            <div className="flex justify-between items-end h-20 px-1 border-b border-slate-100 pb-1">
                              {[
                                { day: 'Sen', val: 40 },
                                { day: 'Sel', val: 55 },
                                { day: 'Rab', val: 65 },
                                { day: 'Kam', val: 80 },
                                { day: 'Jum', val: 95 }
                              ].map((bar) => (
                                <div key={bar.day} className="flex flex-col items-center gap-1.5 flex-1">
                                  <div className="w-5 bg-gradient-to-t from-[#1B6B3A] to-[#2ecc71] rounded-t-md transition-all duration-500" style={{ height: `${bar.val * 0.6}px` }}></div>
                                  <span className="text-[7.5px] text-slate-400 font-semibold">{bar.day}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Field utilization list */}
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-[9.5px] text-slate-700 uppercase px-1">EFISIENSI LAPANGAN</h4>
                            <div className="bg-white rounded-xl p-2.5 border border-slate-100 text-[8.5px] flex items-center justify-between shadow-sm">
                              <span className="font-bold text-slate-700">Futsal A</span>
                              <span className="font-bold text-[#1B6B3A]">85% Okupansi</span>
                            </div>
                            <div className="bg-white rounded-xl p-2.5 border border-slate-100 text-[8.5px] flex items-center justify-between shadow-sm">
                              <span className="font-bold text-slate-700">Badminton 1</span>
                              <span className="font-bold text-slate-500">60% Okupansi</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Nav */}
                        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 h-14 px-2 flex justify-between items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(0)}>
                            <Store className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">DASHBOARD</span>
                          </div>
                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(1)}>
                            <Trophy className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">FIELDS</span>
                          </div>
                          
                          <div className="relative -top-2 flex flex-col items-center z-30" onClick={() => selectMitraScreen(4)}>
                            <div className="w-9 h-9 bg-[#1B6B3A] rounded-full flex items-center justify-center text-white shadow-md shadow-[#1B6B3A]/30 hover:scale-105 active:scale-95 transition-all">
                              <QrCode className="w-4.5 h-4.5" />
                            </div>
                            <span className="text-[7.5px] font-extrabold text-[#1B6B3A] mt-1 uppercase">SCAN</span>
                          </div>

                          <div className="flex flex-col items-center cursor-pointer text-slate-300 hover:text-slate-500 w-12" onClick={() => selectMitraScreen(3)}>
                            <CalendarClock className="w-4 h-4" />
                            <span className="text-[7px] font-bold mt-0.5">ORDERS</span>
                          </div>
                          <div className="flex flex-col items-center cursor-pointer text-[#1B6B3A] w-12">
                            <BarChart3 className="w-4 h-4" />
                            <span className="text-[7px] font-extrabold mt-0.5">REPORTS</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ) : (
                    // ─── Scan Screens ───
                    scanScreen === 0 ? (
                      <motion.div
                        key="s-ticket"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-[#F4F6F9] flex flex-col justify-center items-center p-5 text-center"
                      >
                        <div className="w-14 h-14 bg-[#E8F5EC] rounded-full flex items-center justify-center text-[#1B6B3A] mb-4 shadow-md shadow-[#1B6B3A]/10">
                          <CheckCircle2 className="w-9 h-9" />
                        </div>
                        <h3 className="text-[14.5px] font-extrabold text-slate-800 mb-1 leading-none">E-Tiket Anda</h3>
                        <p className="text-[10.5px] text-slate-500 mb-5 font-semibold px-4">
                          Tunjukkan QR ini pada petugas untuk check-in.
                        </p>

                        <div className="w-full max-w-[220px] bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden relative">
                          <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-[#F4F6F9] rounded-full"></div>
                          <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-[#F4F6F9] rounded-full"></div>
                          <div className="absolute top-1/2 inset-x-4 border-t-2 border-dashed border-slate-200"></div>

                          <div className="p-4 pb-5 flex flex-col items-center border-b border-dashed border-slate-200">
                            <QrCode className="w-24 h-24 text-slate-800 mb-2" />
                            <div className="text-[8px] text-slate-400 font-bold uppercase">KODE TIKET</div>
                            <div className="text-[11px] font-extrabold text-[#1B6B3A] tracking-wider select-all">LPG-982834</div>
                          </div>
                          <div className="p-4 pt-5 bg-emerald-50/50">
                            <div className="space-y-1.5 text-[9.5px]">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">Venue:</span>
                                <span className="font-bold text-slate-700">GOR GAGAH</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">Lapangan:</span>
                                <span className="font-bold text-slate-700">Futsal A</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">Waktu:</span>
                                <span className="font-bold text-slate-700">16:00 - 18:00</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : scanScreen === 1 ? (
                      <motion.div
                        key="s-scanner"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-black flex flex-col justify-between p-4 pb-16 text-white"
                      >
                        <div className="flex items-center gap-3 pt-8 px-1">
                          <h2 className="text-[13px] font-extrabold flex-1 text-center">Scan QR Tiket</h2>
                        </div>
                        <div className="my-auto flex flex-col items-center">
                          <div className="w-36 h-36 border-[3px] border-[#1B6B3A] rounded-3xl relative flex items-center justify-center overflow-hidden">
                            <motion.div 
                              className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.5)] z-10"
                              animate={{ top: ['0%', '100%', '0%'] }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                            />
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-400 rounded-br-xl" />
                            <QrCode className="w-14 h-14 text-white/20" />
                          </div>
                          <p className="text-[8px] text-white/60 font-semibold mt-6 max-w-[160px] text-center leading-relaxed">
                            Arahkan kamera ke QR Code Tiket Customer Lapangku untuk Check-in otomatis
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="s-success"
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({ scale: 0.9, opacity: 0 }),
                          center: { scale: 1, opacity: 1 },
                          exit: (dir: number) => ({ scale: 1.1, opacity: 0 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="absolute inset-0 bg-black flex flex-col items-center justify-center p-4 text-white overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-emerald-500/20 mix-blend-screen" />
                        <motion.div 
                          initial={{ scale: 0, opacity: 0, rotate: -45 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.1 }}
                          className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)] mb-6 z-10"
                        >
                          <Check className="w-10 h-10 text-white" strokeWidth={3} />
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-center z-10"
                        >
                          <h2 className="text-xl font-extrabold mb-1">Validasi Sukses!</h2>
                          <p className="text-emerald-100/80 text-xs font-semibold mb-6">Tiket LPG-982834 aktif</p>
                          
                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 w-full max-w-[200px] text-left">
                            <div className="text-[9px] text-emerald-200/70 font-bold uppercase mb-1">Status Kehadiran</div>
                            <div className="text-sm font-extrabold mb-3">Telah Check-in</div>
                            
                            <div className="space-y-2 text-[10px]">
                              <div className="flex justify-between border-b border-white/10 pb-1">
                                <span className="text-white/60">Waktu</span>
                                <span className="font-bold">15:45 WIB</span>
                              </div>
                              <div className="flex justify-between border-b border-white/10 pb-1">
                                <span className="text-white/60">Pemesan</span>
                                <span className="font-bold">Budi Santoso</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </motion.div>
          </div>
         </div>

         {/* Screen Indicators */}
         <div className="flex justify-center gap-2 mt-6 pb-2">
           {demoRole === 'customer' 
             ? Array.from({length: 7}).map((_, i) => (
                 <button 
                   key={i} 
                   onClick={() => selectCustomerScreen(i)} 
                   className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer shadow-sm hover:scale-110 ${customerScreen === i ? 'bg-[#1B6B3A] border-2 border-[#1B6B3A]' : 'bg-white border-2 border-slate-300 hover:border-slate-400'}`} 
                   aria-label={`Go to screen ${i + 1}`}
                 />
               ))
             : demoRole === 'mitra'
               ? Array.from({length: 6}).map((_, i) => (
                   <button 
                     key={i} 
                     onClick={() => selectMitraScreen(i)} 
                     className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer shadow-sm hover:scale-110 ${mitraScreen === i ? 'bg-[#1B6B3A] border-2 border-[#1B6B3A]' : 'bg-white border-2 border-slate-300 hover:border-slate-400'}`} 
                     aria-label={`Go to screen ${i + 1}`}
                   />
                 ))
               : Array.from({length: 3}).map((_, i) => (
                   <button 
                     key={i} 
                     onClick={() => selectScanScreen(i)} 
                     className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer shadow-sm hover:scale-110 ${scanScreen === i ? 'bg-[#1B6B3A] border-2 border-[#1B6B3A]' : 'bg-white border-2 border-slate-300 hover:border-slate-400'}`} 
                     aria-label={`Go to screen ${i + 1}`}
                   />
                 ))
           }
         </div>

      </motion.div>
    </div>
  );
}
