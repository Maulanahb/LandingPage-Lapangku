import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Wallet, Calendar, CheckCircle2, ChevronRight, Activity, Scan, ShoppingBag } from 'lucide-react';
import MobileAppDemo from './MobileAppDemo';

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<'customer' | 'mitra' | 'scan'>('customer');

  const contentMap = {
    customer: {
      title: 'Katalog & Booking Pintar',
      desc: 'Temukan ratusan pilihan lapangan olahraga mulai dari Futsal, Basket, hingga Bulutangkis. Sistem pencarian cerdas kami mempermudah Anda mencari jadwal kosong dalam sekejap.',
      icon: <Search className="w-6 h-6" />,
      features: [
        { title: 'Pencarian Instan', desc: 'Filter berdasarkan lokasi, jenis olahraga, dan fasilitas.' },
        { title: 'Real-time Availability', desc: 'Hanya menampilkan lapangan dengan jadwal yang benar-benar kosong.' },
        { title: 'Pembayaran Mudah', desc: 'Berbagai metode pembayaran mulai dari transfer bank hingga e-wallet.' }
      ],
      interaction: 'Geser layar ke kiri atau kanan pada handphone simulasi, atau klik layar untuk menelusuri alur booking dari awal hingga pembayaran.'
    },
    mitra: {
      title: 'Manajemen Lapangan Digital',
      desc: 'Kelola jadwal, pesanan, dan laporan keuangan lapangan Anda dalam satu dasbor praktis. Tinggalkan pencatatan manual yang rawan bentrok.',
      icon: <Calendar className="w-6 h-6" />,
      features: [
        { title: 'Jadwal Otomatis', desc: 'Jadwal langsung terisi saat customer melakukan booking.' },
        { title: 'Laporan Keuangan', desc: 'Pantau pendapatan harian, mingguan, dan bulanan secara otomatis.' },
        { title: 'Verifikasi Pesanan', desc: 'Konfirmasi bukti pembayaran customer dengan satu klik.' }
      ],
      interaction: 'Lihat dasbor Mitra di mockup untuk memantau ringkasan pesanan. Geser layar untuk melihat fitur manajemen lainnya.'
    },
    scan: {
      title: 'Verifikasi Tiket Cepat',
      desc: 'Customer cukup menunjukkan e-ticket mereka saat datang, dan Anda tinggal memindai QR code-nya untuk memverifikasi pesanan tanpa repot mencocokkan data.',
      icon: <Scan className="w-6 h-6" />,
      features: [
        { title: 'QR Code Scanner', desc: 'Pindai langsung dari aplikasi untuk mencegah tiket palsu.' },
        { title: 'Status Instan', desc: 'Menampilkan detail pesanan dan status pembayaran seketika.' },
        { title: 'Check-in Praktis', desc: 'Sistem mencatat waktu kedatangan customer secara otomatis.' }
      ],
      interaction: 'Layar mockup saat ini menampilkan simulator Scanner QR. Anda dapat melihat bagaimana kamera digunakan untuk memindai tiket.'
    }
  };

  const currentContent = contentMap[activeTab];

  return (
    <div className="py-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tabs */}
        <div className="flex justify-center mb-16 relative z-20">
          <div className="inline-flex bg-slate-50 p-1.5 rounded-full border border-slate-200 shadow-sm overflow-x-auto max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setActiveTab('customer')}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeTab === 'customer' ? 'bg-brand-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <ShoppingBag className="w-4 h-4" />
              Customer App
            </button>
            <button
              onClick={() => setActiveTab('mitra')}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeTab === 'mitra' ? 'bg-brand-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <Calendar className="w-4 h-4" />
              Manajemen Mitra
            </button>
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeTab === 'scan' ? 'bg-brand-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <Scan className="w-4 h-4" />
              Scanner QR
            </button>
          </div>
        </div>

        {/* Content & Mockup Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-6 xl:col-start-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-14 h-14 bg-brand-primary-light text-brand-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-brand-primary-selected">
                  {currentContent.icon}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  {currentContent.title}
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  {currentContent.desc}
                </p>

                <div className="space-y-6 mb-10">
                  {currentContent.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary-light text-brand-primary flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">{feat.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interaction Tip Box */}
                <div className="bg-brand-primary-light/80 border border-brand-primary-selected/60 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                  <div className="flex-shrink-0 text-xl">💡</div>
                  <div>
                    <h4 className="font-bold text-brand-primary text-sm mb-1">Coba Interaksi:</h4>
                    <p className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: currentContent.interaction}}></p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Mockup */}
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-5 xl:col-start-8 flex justify-center relative pointer-events-auto z-10" style={{ perspective: "1000px" }}>
             {/* Decorative blob behind phone */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] pt-[120%] bg-gradient-to-tr from-brand-primary/10 via-brand-primary/5 to-sky-400/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
             
             <div className="relative z-10 w-full max-w-[300px] lg:max-w-full flex justify-center">
               <MobileAppDemo tab={activeTab} hideToggle={true} />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
