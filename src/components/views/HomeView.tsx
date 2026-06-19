import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Star, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { ACCENT_COLOR } from '../../lib/constants';

const HomeView = () => {
  const setView = (window as any).setView;
  const [showDailyPrizes, setShowDailyPrizes] = useState(false);
  const [showIncluded, setShowIncluded] = useState(false);
  return (

          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* --- HERO SECTION --- */}
            <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
              {/* Accent Glow */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none"
                style={{ backgroundColor: ACCENT_COLOR }}
              />

              <div className="flex flex-col items-center text-center z-10 pb-20 animate-fade-in-up">
                <div className="mb-8">
                  <span className="px-4 py-1.5 border border-[#A5D8FF]/30 text-[#A5D8FF] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-[#A5D8FF]/5">Edizione 2026</span>
                </div>

                <img
                  src="/logo.png"
                  alt="Armonia Logo"
                  width={320}
                  height={320}
                  className="w-64 md:w-80 aspect-square object-contain mb-10 bg-white/5 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                    (e.target as HTMLImageElement).className = "w-32 h-32 rounded-full object-cover border-4 border-[#A5D8FF] mb-12 grayscale shadow-2xl";
                  }}
                />

                <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-6">
                  ARMONIA <br /><span className="text-[#A5D8FF]">PADEL CUP</span>
                </h1>

                <p className="text-white/50 text-sm md:text-base max-w-sm mb-12 leading-relaxed uppercase tracking-widest font-light">
                  Precisione in campo. <br />Gusto esclusivo.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-16">
                  {[
                    { label: "Data", value: "22/06 - 28/06" },
                    { label: "Luogo", value: "Chiappetta Sport Village" },
                    { label: "Quota", value: "100€ a Coppia" }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-start p-4 bg-white/5 border border-white/10 rounded-2xl min-w-[140px] text-left"
                    >
                      <span className="text-[10px] uppercase text-[#A5D8FF] font-bold opacity-70 mb-1">{item.label}</span>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setView('iscriviti')}
                  className="group relative px-12 py-5 rounded-full font-black text-black overflow-hidden transition-all text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(165,216,255,0.4)] hover:scale-105 hover:bg-white active:scale-95"
                  style={{ backgroundColor: ACCENT_COLOR }}
                >
                  Iscriviti Ora
                </button>
              </div>


            </section>

            {/* --- PREMI SECTION --- */}
            <section id="prizes" className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5 min-h-[600px]">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-24 bg-[#A5D8FF]/5 blur-[60px] rounded-full pointer-events-none" />
                  <div className="mb-4">
                    <span className="px-4 py-1.5 border border-[#A5D8FF]/30 text-[#A5D8FF] text-[9px] font-bold uppercase tracking-[0.2em] rounded-full bg-[#A5D8FF]/5">Montepremi</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#a5d8ff] to-[#38bdf8] drop-shadow-[0_0_25px_rgba(165,216,255,0.7)]">3000€</span> <br className="sm:hidden" />di Montepremi
                  </h2>
                  <p className="text-white/40 italic font-light tracking-widest text-xs mt-4 uppercase">Riconoscimento al talento puro.</p>
                </div>

                <div className="grid md:grid-cols-6 gap-8">
                  {[
                    { 
                      title: "1° Posto", 
                      desc: (
                        <span>
                          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#a5d8ff] to-[#38bdf8] animate-pulse drop-shadow-[0_0_12px_rgba(165,216,255,0.8)] mr-1">
                            1000€
                          </span>
                          + Tavolo al "Molto" 3 Kit + Cena x2 presso "Wine Art"
                        </span>
                      ), 
                      icon: Trophy, 
                      accent: true,
                      colSpan: "md:col-span-3"
                    },
                    { 
                      title: "2° Posto", 
                      desc: (
                        <span>
                          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#a5d8ff] to-[#38bdf8] animate-pulse drop-shadow-[0_0_8px_rgba(165,216,255,0.6)] mr-1">
                            500€
                          </span>
                          + Tavolo al "Molto" 2 Kit + Pranzo x2 presso "Boa Sorte"
                        </span>
                      ), 
                      icon: Medal, 
                      accent: false,
                      colSpan: "md:col-span-3"
                    },
                    { 
                      title: "3° Posto", 
                      desc: "100€ buono sconto presso \"Armonia dei Gusti\" + Tavolo al \"Molendini\" 2 Kit", 
                      icon: Medal, 
                      accent: false,
                      colSpan: "md:col-span-2"
                    },
                    { 
                      title: "4° Posto", 
                      desc: "Tavolo al \"Molendini\" 1 Kit", 
                      icon: Medal, 
                      accent: false,
                      colSpan: "md:col-span-2"
                    },
                    { 
                      title: "MVP", 
                      desc: "Racchetta Head Coello Motion 2026", 
                      icon: Star, 
                      accent: false,
                      colSpan: "md:col-span-2"
                    }
                  ].map((prize, i) => (
                    <div
                      key={i}
                      className={`p-8 rounded-[32px] border border-white/5 bg-white/[0.03] flex items-center gap-6 ${prize.colSpan} hover:-translate-y-1 transition-transform duration-300`}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: prize.accent ? `${ACCENT_COLOR}15` : 'rgba(255,255,255,0.03)' }}
                      >
                        <prize.icon size={28} style={{ color: prize.accent ? ACCENT_COLOR : '#888' }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1" style={{ color: prize.accent ? ACCENT_COLOR : '#FFF' }}>{prize.title}</h3>
                        <div className="text-white/40 text-xs leading-relaxed">{prize.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* --- PREMI DI GIORNATA SUBSECTION --- */}
                <div className={`border-t border-white/5 transition-all duration-300 ${showDailyPrizes ? 'mt-24 pt-20' : 'mt-12 pt-12'}`}>
                  <div className={`text-center transition-all duration-300 ${showDailyPrizes ? 'mb-12' : 'mb-0'}`}>
                    <span className="px-4 py-1.5 border border-yellow-500/30 text-yellow-500 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full bg-yellow-500/5 mb-4 inline-block">Competizione Giornaliera</span>
                    <button 
                      onClick={() => setShowDailyPrizes(!showDailyPrizes)}
                      className="flex items-center justify-center gap-4 mx-auto group"
                    >
                      <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none group-hover:text-[#A5D8FF] transition-colors">
                        Premi di Giornata
                      </h3>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#A5D8FF]/10 transition-colors">
                        {showDailyPrizes ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </div>
                    </button>
                  </div>

                  <AnimatePresence>
                    {showDailyPrizes && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
                          {[
                            { day: "1° Giornata", prize: "Taglio presso \"Retròscena\"", desc: "Offerto da Retròscena Barber Shop." },
                            { day: "2° Giornata", prize: "Taglio presso \"Retròscena\"", desc: "Offerto da Retròscena Barber Shop." },
                            { day: "3° Giornata", prize: "Taglio presso \"Retròscena\"", desc: "Offerto da Retròscena Barber Shop." },
                            { day: "4° Giornata", prize: "Aperitivo x2 presso \"Dehor\"", desc: "Esperienza esclusiva per due persone." },
                            { day: "5° Giornata", prize: "Aperitivo x2 presso \"Dehor\"", desc: "Esperienza esclusiva per due persone." },
                            { day: "6° Giornata", prize: "Borsone Head", desc: "Borsone tecnico ufficiale Head Padel." },
                            { day: "7° Giornata", prize: "SPA x2 presso \"Masagiù\"", desc: "Percorso benessere esclusivo." }
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="p-6 rounded-[24px] border border-white/5 bg-white/[0.01] flex flex-col justify-between hover:bg-white/[0.03] hover:border-white/10 hover:-translate-y-1 transition-all duration-300"
                            >
                              <div>
                                <span className="text-[9px] font-bold text-[#A5D8FF] uppercase tracking-widest bg-[#A5D8FF]/10 px-2.5 py-1 rounded-full mb-4 inline-block">
                                  {item.day}
                                </span>
                                <h4 className="text-sm font-bold text-white tracking-tight uppercase mb-2 leading-snug">{item.prize}</h4>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* --- INCLUSO NELLA QUOTA SECTION --- */}
            <section id="included" className={`px-6 bg-[#070707] border-b border-white/5 transition-all duration-300 ${showIncluded ? 'py-24 min-h-[400px]' : 'py-12 min-h-0'}`}>
              <div className="max-w-7xl mx-auto">
                <div className={`text-center relative transition-all duration-300 ${showIncluded ? 'mb-16' : 'mb-0'}`}>
                  <div className="mb-4">
                    <span className="px-4 py-1.5 border border-[#A5D8FF]/30 text-[#A5D8FF] text-[9px] font-bold uppercase tracking-[0.2em] rounded-full bg-[#A5D8FF]/5">Player Pack</span>
                  </div>
                  <button 
                    onClick={() => setShowIncluded(!showIncluded)}
                    className="flex items-center justify-center gap-4 mx-auto group"
                  >
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none group-hover:text-[#A5D8FF] transition-colors">
                      Incluso nella quota
                    </h2>
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#A5D8FF]/10 transition-colors">
                      {showIncluded ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
                    </div>
                  </button>
                  <p className="text-white/40 italic font-light tracking-widest text-xs mt-4 uppercase">Tutto il valore della tua partecipazione.</p>
                </div>

                <AnimatePresence>
                  {showIncluded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                        {[
                          { text: "3 Partite Garantite", desc: "Fase a gironi assicurata con un minimo di tre partite giocate.", icon: Calendar },
                          { text: "25% di Sconto presso \"Armonia dei Gusti\"", desc: "Per assaporare il meglio della nostra produzione artigianale.", icon: Star },
                          { text: "Maglia e Pantaloncino personalizzati", desc: "Completo tecnico ufficiale Armonia Cup con personalizzazione.", icon: Trophy },
                          { text: "Sacca del Torneo", desc: "Sacca sportiva portaoggetti in edizione speciale.", icon: Medal },
                          { text: "10% di Sconto presso \"Novum Store\"", desc: "Sconto riservato su abbigliamento.", icon: Star },
                          { text: "20% di Sconto presso \"Doppio Malto\"", desc: "Per gustare ottimi piatti e birre artigianali d'eccellenza in compagnia.", icon: Star }
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] flex flex-col justify-between h-full group hover:border-[#A5D8FF]/20 hover:-translate-y-1 transition-all duration-300"
                          >
                            <div>
                              <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#A5D8FF] group-hover:bg-[#A5D8FF]/10 group-hover:scale-110 transition-all duration-300">
                                  <item.icon size={22} />
                                </div>
                                <h3 className="text-lg font-black italic uppercase tracking-tight text-white group-hover:text-[#A5D8FF] transition-colors">{item.text}</h3>
                              </div>
                              <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </motion.div>
  );
};

export default HomeView;
