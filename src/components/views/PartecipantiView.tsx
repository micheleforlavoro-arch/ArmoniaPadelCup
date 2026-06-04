import React from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';
import { Registration } from '../../lib/types';

const PartecipantiView = ({ registrations }: { registrations: Registration[] }) => {
  return (
    <>
        
          <motion.section
            key="partecipanti"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="pt-40 pb-24 px-6 bg-white/[0.01] min-h-screen"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-[10px] uppercase font-bold text-[#A5D8FF] tracking-[0.3em] mb-4 block">Team Ufficiali</span>
                <h2 className="text-5xl font-black tracking-tighter italic uppercase">PARTECIPANTI</h2>
              </div>

              {registrations.filter(r => r.status === 'accepted').length === 0 ? (
                <div className="py-20 text-center border border-white/5 bg-white/[0.02] rounded-3xl text-white/20 uppercase text-[10px] font-black tracking-widest">
                  Nessun partecipante ancora confermato
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {registrations.filter(r => r.status === 'accepted').map((reg, idx) => (
                    <motion.div
                      key={reg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-8 rounded-[32px] border border-white/5 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/10 transition-all flex flex-col justify-between h-full"
                    >
                      <div>
                        {reg.image_url ? (
                          <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-lg">
                            <img src={reg.image_url} alt={reg.team_name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-full h-48 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center mb-6 text-white/20">
                            <Users size={32} className="mb-2 opacity-50" />
                            <span className="text-[9px] uppercase tracking-widest font-black">Nessuna Foto</span>
                          </div>
                        )}

                        <h3 className="text-2xl font-black italic uppercase tracking-tight text-white mb-6">
                          {reg.team_name}
                        </h3>
                      </div>
                      <div className="space-y-3 pt-4 border-t border-white/5">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/40 uppercase tracking-wider font-bold">Giocatore 1</span>
                          <span className="text-white font-medium">{reg.p1_name} {reg.p1_surname}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/40 uppercase tracking-wider font-bold">Giocatore 2</span>
                          <span className="text-white font-medium">{reg.p2_name} {reg.p2_surname}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              
    </>
  );
};
export default PartecipantiView;
