import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TournamentState } from '../../lib/types';

const GironiTvView = () => {
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

    const channel = supabase.channel('tv-gironi-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tournament_state' },
        () => {
          fetchTournamentState();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

  const gironiList = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div 
      className="w-screen h-screen bg-black overflow-hidden flex flex-col items-center justify-center relative select-none"
      style={{ backgroundImage: 'url("/background torneo.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      
      {/* Sfondo Astratto */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A5D8FF]/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#A5D8FF]/5 blur-[120px] rounded-full mix-blend-screen" />
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

      <div className="z-10 w-full h-full p-4 flex flex-col">
        {/* Intestazione */}
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-4xl font-black uppercase tracking-tighter italic text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            ARMONIA PADEL CUP
          </h1>
          <h2 className="text-xl font-bold uppercase tracking-[0.4em] text-[#A5D8FF] mt-1">
            Fase a Gironi - Live
          </h2>
        </div>

        {/* Griglia Gironi */}
        <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-4 px-8 pb-4 min-h-0">
          {gironiList.map(gName => {
            const groupTeams = tournamentState.bracket?.gironi?.[gName]
              ? tournamentState.bracket.gironi[gName]
              : ['TBD', 'TBD', 'TBD', 'TBD'];
              
            return (
              <div key={gName} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col backdrop-blur-sm min-h-0 overflow-hidden">
                <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                  <span className="font-black text-2xl text-[#A5D8FF] italic">GIRONE {gName}</span>
                </div>
                <div className="flex-1 flex flex-col min-h-0">
                  {/* Squadre */}
                  <div className="flex flex-wrap gap-1 pb-2 mb-2 border-b border-white/10">
                    <span className="text-[1.2vh] uppercase tracking-widest text-white/40 font-bold w-full">Squadre del Girone</span>
                    {groupTeams.slice(0, 4).map((team: string, idx: number) => (
                      <span key={`tv-team-${idx}`} className={`text-[1.5vh] uppercase font-bold px-2 py-1 rounded bg-white/5 ${team ? 'text-white' : 'text-white/20 italic'}`}>
                        {team || `Team ${idx + 1}`}
                      </span>
                    ))}
                  </div>
                  {/* Partite */}
                  <div className="flex-1 flex flex-col justify-around min-h-0">
                    <span className="text-[1.2vh] uppercase tracking-widest text-[#A5D8FF]/70 font-bold mb-1">Partite & Punteggi Live</span>
                    {groupTeams.slice(4, 10).map((match: string, idx: number) => {
                      const matchStr = match || "";
                      const parts = matchStr.includes('|') ? matchStr.split('|') : [matchStr, "", ""];
                      const hasContent = parts[0] || parts[1] || parts[2];
                      return (
                        <div key={`tv-match-${idx}`} className="flex items-center gap-2 py-0.5 border-b border-white/5 last:border-0 min-h-0">
                          <span className="text-[#A5D8FF]/30 font-bold text-[1.6vh] w-5 text-right">{idx + 1}.</span>
                          <span className={`font-black text-[1.8vh] uppercase tracking-wide truncate ${hasContent ? 'text-[#A5D8FF]' : 'text-white/10 italic'}`}>
                            {hasContent ? (
                              <>
                                {parts[0] || '-'} <span className="text-[#A5D8FF]/40 text-[1.2vh] mx-1">vs</span> {parts[1] || '-'} 
                                {parts[2] && <span className="text-white ml-2">{parts[2]}</span>}
                              </>
                            ) : '-'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GironiTvView;
