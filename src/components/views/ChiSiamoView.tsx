import React from 'react';
import { motion } from 'motion/react';

const ChiSiamoView = () => {
  return (          <motion.section
            key="chi-siamo"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pt-40 pb-24 px-6 max-w-7xl mx-auto min-h-screen"
          >
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-8 italic uppercase">
                  GUSTO E <br /><span className="text-[#A5D8FF]">EQUILIBRIO.</span>
                </h2>
                <div className="space-y-6 text-white/50 text-sm leading-relaxed uppercase tracking-widest font-light">
                  <p>
                    L'unione tra l'eccellenza della gelateria artigianale e l'adrenalina del padel.
                  </p>
                  <p>
                    Un'esperienza totalizzante per chi cerca la perfezione in ogni gesto, sul campo e oltre.
                  </p>
                  <p>
                    Armonia Padel Cup nasce per celebrare la passione sportiva in un contesto di assoluto prestigio e convivialità.
                  </p>
                </div>
              </div>
              <div
                className="group relative aspect-square bg-white/[0.03] rounded-[48px] overflow-hidden border border-white/5 shadow-2xl flex items-center justify-center p-12 animate-fade-in-up"
              >
                <img
                  src="/logo.png"
                  alt="Armonia Logo"
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                  onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                />
              </div>
            </div>
          </motion.section>
  );
};

export default ChiSiamoView;
