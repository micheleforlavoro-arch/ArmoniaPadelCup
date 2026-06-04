import React from 'react';
import { motion } from 'motion/react';
import { SPONSORS } from '../../lib/constants';

const SponsorsView = () => {
  return (
    <>
        
          <motion.section
            key="sponsor"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="pt-40 pb-24 px-6 bg-white/[0.01] min-h-screen"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-[10px] uppercase font-bold text-[#A5D8FF] tracking-[0.3em] mb-4 block">Official Partners</span>
                <h2 className="text-5xl font-black tracking-tighter italic uppercase">SPONSOR UFFICIALI</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SPONSORS.map((sponsor, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-lg">
                        <img src={sponsor.img} alt={sponsor.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[9px] font-bold text-[#A5D8FF] uppercase tracking-widest bg-[#A5D8FF]/10 px-2.5 py-1 rounded-full mb-4 inline-block">
                        {sponsor.type}
                      </span>
                      <h3 className="text-2xl font-black italic uppercase tracking-tight text-white mb-4">
                        {sponsor.name}
                      </h3>

                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
    </>
  );
};
export default SponsorsView;
