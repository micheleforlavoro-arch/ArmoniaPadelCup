import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TournamentState } from '../../lib/types';
import { ACCENT_COLOR } from '../../lib/constants';

const TabelloneTvView = () => {
  const [tournamentState, setTournamentState] = useState<TournamentState>({ is_drawn: false, bracket: null });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTournamentState = async () => {
    try {
      const { data, error } = await supabase.from('tournament_state').select('*').maybeSingle();
      if (!error && data) setTournamentState(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTournamentState();

    // Supabase Realtime Subscription
    const channel = supabase.channel('tv-bracket-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tournament_state' },
        (payload) => {
          console.log('Realtime update received:', payload);
          fetchTournamentState();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const renderTeam = (teamRaw: string | undefined, isFinalissima = false) => {
    const team = teamRaw || '-';
    if (team === '-') return <span className="truncate">-</span>;
    const parts = team.split('|');
    const name = parts[0] || '-';
    const score = parts[1] || '';
    
    return (
      <div className={`flex justify-between w-full items-center ${isFinalissima ? 'text-yellow-500' : 'text-white'}`}>
        <span className="truncate">{name}</span>
        {score && <span className={`font-black ml-2 ${isFinalissima ? 'text-yellow-400' : 'text-[#A5D8FF]'}`}>{score}</span>}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Trophy size={64} className="text-[#A5D8FF] mb-4" />
          <span className="text-white text-2xl font-black uppercase tracking-widest">Caricamento TV...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-screen h-screen bg-black overflow-hidden flex flex-col items-center justify-center relative select-none"
      style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/background torneo.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      
      {/* Sfondo Astratto */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A5D8FF]/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A5D8FF]/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Pulsante di Uscita */}
      <button 
        onClick={() => (window as any).setView('tabellone')}
        className="absolute top-8 right-8 z-50 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/70 hover:text-white transition-colors flex items-center gap-2 font-bold tracking-widest uppercase text-xs backdrop-blur-md"
        title="Torna al Tabellone Standard"
      >
        <X size={20} />
        Torna Indietro
      </button>

      <div className="z-10 w-full h-full p-8 flex flex-col">
        {/* Intestazione */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-5xl font-black uppercase tracking-tighter italic text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            ARMONIA PADEL CUP
          </h1>
          <h2 className="text-2xl font-bold uppercase tracking-[0.4em] text-[#A5D8FF] mt-2">
            Fase Finale - Live
          </h2>
        </div>

        {/* Tabellone */}
        <div className="flex-1 flex justify-center items-stretch w-full gap-6">
          
          {/* Ottavi */}
          <div className="flex flex-col justify-between flex-1 h-full py-2">
            <h3 className="text-center text-white/40 text-xl font-bold uppercase tracking-widest mb-2">Ottavi</h3>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={`ottavi-${i}`} className="flex-1 min-h-0 flex flex-col justify-center my-1">
                <div className="px-3 py-1 rounded-xl border border-white/20 bg-black/80 backdrop-blur-sm flex flex-col justify-center h-full max-h-[8vh]">
                  <div className="h-1/2 flex items-center px-1 text-[1.4vh] font-bold uppercase truncate border-b border-white/10 text-white">
                    {renderTeam(tournamentState.bracket?.ottavi?.[i * 2])}
                  </div>
                  <div className="h-1/2 flex items-center px-1 text-[1.4vh] font-bold uppercase truncate text-white">
                    {renderTeam(tournamentState.bracket?.ottavi?.[i * 2 + 1])}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quarti */}
          <div className="flex flex-col justify-around flex-1 h-full py-6">
            <h3 className="text-center text-[#A5D8FF]/60 text-xl font-bold uppercase tracking-widest mb-2">Quarti</h3>
            {[0, 1, 2, 3].map(i => (
              <div key={`quarti-${i}`} className="flex-1 min-h-0 flex flex-col justify-center my-2 relative">
                {/* Connettori */}
                <div className="absolute -left-3 top-1/2 w-3 border-t-2 border-white/10" />
                <div className="px-4 py-2 rounded-xl border-l-4 border-white/30 bg-black/80 backdrop-blur-sm flex flex-col justify-center h-full max-h-[12vh]">
                  <div className="h-1/2 flex items-center px-2 text-[1.8vh] font-black uppercase truncate border-b border-white/10 text-white">
                    {renderTeam(tournamentState.bracket?.quarterFinals?.[i * 2])}
                  </div>
                  <div className="h-1/2 flex items-center px-2 text-[1.8vh] font-black uppercase truncate text-white">
                    {renderTeam(tournamentState.bracket?.quarterFinals?.[i * 2 + 1])}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Semifinali */}
          <div className="flex flex-col justify-around flex-[1.2] h-full py-16">
            <h3 className="text-center text-[#A5D8FF] text-2xl font-black uppercase tracking-widest mb-2">Semifinali</h3>
            {[0, 1].map(i => (
              <div key={`semi-${i}`} className="flex-1 min-h-0 flex flex-col justify-center my-6 relative">
                <div className="absolute -left-3 top-1/2 w-3 border-t-2 border-white/20" />
                <div className="p-4 rounded-2xl border-l-4 border-[#A5D8FF] bg-black/80 backdrop-blur-sm flex flex-col justify-center h-full max-h-[16vh] shadow-[0_0_30px_rgba(165,216,255,0.1)]">
                  <div className="h-1/2 flex items-center px-3 text-[2.2vh] font-black uppercase truncate border-b border-white/10 text-white">
                    {renderTeam(tournamentState.bracket?.semiFinals?.[i * 2])}
                  </div>
                  <div className="h-1/2 flex items-center px-3 text-[2.2vh] font-black uppercase truncate text-white">
                    {renderTeam(tournamentState.bracket?.semiFinals?.[i * 2 + 1])}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Finale */}
          <div className="flex flex-col justify-around flex-[1.2] h-full py-32">
            <h3 className="text-center text-[#A5D8FF] text-2xl font-black uppercase tracking-widest mb-2">Finale</h3>
            <div className="flex-1 min-h-0 flex flex-col justify-center my-6 relative">
              <div className="absolute -left-3 top-1/2 w-3 border-t-2 border-white/20" />
              <div className="p-4 rounded-2xl border-l-4 border-[#A5D8FF]/60 bg-black/80 backdrop-blur-sm flex flex-col justify-center h-full max-h-[16vh] shadow-[0_0_30px_rgba(165,216,255,0.1)]">
                <div className="h-1/2 flex items-center px-3 text-[2.2vh] font-black uppercase truncate border-b border-white/10 text-white">
                  {renderTeam(tournamentState.bracket?.final?.[0])}
                </div>
                <div className="h-1/2 flex items-center px-3 text-[2.2vh] font-black uppercase truncate text-white">
                  {renderTeam(tournamentState.bracket?.final?.[1])}
                </div>
              </div>
            </div>
          </div>

          {/* Finalissima */}
          <div className="flex flex-col justify-center flex-[1.5] h-full">
             <h3 className="text-center text-yellow-500 text-3xl font-black uppercase tracking-[0.3em] mb-4">Finalissima</h3>
             <div className="relative p-8 rounded-[32px] border-4 border-yellow-500/40 bg-black/80 backdrop-blur-sm bg-gradient-to-b from-yellow-500/20 to-transparent shadow-[0_0_80px_rgba(250,176,5,0.15)] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-[40px] rounded-full" />
                <div className="absolute -left-3 top-1/2 w-3 border-t-2 border-yellow-500/40" />
                
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                    <Trophy size={36} />
                  </div>
                </div>

                <div className="flex flex-col h-[20vh]">
                  <div className={`h-1/2 flex items-center justify-center px-4 text-[3vh] font-black tracking-tight uppercase italic truncate border-b border-white/10 ${tournamentState.bracket?.finalissima?.[0] ? 'text-yellow-500' : 'text-white/20'}`}>
                    {renderTeam(tournamentState.bracket?.finalissima?.[0], true)}
                  </div>
                  <div className={`h-1/2 flex items-center justify-center px-4 text-[3vh] font-black tracking-tight uppercase italic truncate ${tournamentState.bracket?.finalissima?.[1] ? 'text-yellow-500' : 'text-white/20'}`}>
                    {renderTeam(tournamentState.bracket?.finalissima?.[1], true)}
                  </div>
                </div>

                {tournamentState.bracket?.winner && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 pt-4 border-t border-yellow-500/30 text-center"
                  >
                    <span className="text-[1.5vh] font-black uppercase tracking-[0.4em] text-yellow-500 block mb-2">Campione</span>
                    <span className="font-black text-[4vh] text-yellow-400 italic uppercase drop-shadow-[0_0_20px_rgba(250,176,5,0.8)]">
                      🏆 {tournamentState.bracket.winner} 🏆
                    </span>
                  </motion.div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TabelloneTvView;
