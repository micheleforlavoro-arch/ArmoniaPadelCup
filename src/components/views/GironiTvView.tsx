import React, { useState, useEffect, useRef } from 'react';
import { Trophy, X, Maximize2, Minimize2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TournamentState } from '../../lib/types';

const GironiTvView = () => {
  const [tournamentState, setTournamentState] = useState<TournamentState>({ is_drawn: false, bracket: null });
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  const parseMatch = (matchStr: string) => {
    // Expected format: "Sq1 | Sq2 | Pt | Data/Ora | Campo"
    const parts = (matchStr || "").split('|').map(p => p.trim());
    return {
      home: parts[0] || '',
      away: parts[1] || '',
      score: parts[2] || '',
      dateTime: parts[3] || '',
      court: parts[4] || ''
    };
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

  const gironiList = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen bg-black overflow-hidden flex flex-col items-center justify-center relative select-none"
      style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/background torneo.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      
      {/* Sfondo Astratto */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A5D8FF]/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#A5D8FF]/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Pulsanti di Controllo in Alto */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button 
          onClick={toggleFullscreen}
          className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 hover:text-white transition-all flex items-center gap-2 font-bold tracking-widest uppercase text-xs backdrop-blur-md"
          title={isFullscreen ? "Esci da Schermo Intero" : "Schermo Intero"}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          {isFullscreen ? "Finestra" : "Schermo Intero"}
        </button>

        <button 
          onClick={async () => {
            if (document.fullscreenElement) {
              try { await document.exitFullscreen(); } catch(e){}
            }
            (window as any).setView('tabellone');
          }}
          className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 hover:text-white transition-all flex items-center gap-2 font-bold tracking-widest uppercase text-xs backdrop-blur-md"
          title="Torna al Tabellone Standard"
        >
          <X size={16} />
          Torna Indietro
        </button>
      </div>

      <div className="z-10 w-full h-full p-4 flex flex-col justify-between">
        {/* Intestazione */}
        <div className="flex flex-col items-center mt-2 mb-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter italic text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            ARMONIA PADEL CUP
          </h1>
          <h2 className="text-lg font-bold uppercase tracking-[0.4em] text-[#A5D8FF] mt-1">
            Fase a Gironi - Live
          </h2>
        </div>

        {/* Griglia Gironi */}
        <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-4 px-6 pb-2 min-h-0">
          {gironiList.map(gName => {
            const groupTeams = tournamentState.bracket?.gironi?.[gName]
              ? tournamentState.bracket.gironi[gName]
              : ['TBD', 'TBD', 'TBD', 'TBD'];
              
            return (
              <div key={gName} className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col backdrop-blur-sm min-h-0 overflow-hidden shadow-2xl">
                {/* Intestazione Girone */}
                <div className="flex justify-between items-center mb-2 border-b border-white/15 pb-2">
                  <span className="font-black text-2xl text-[#A5D8FF] italic tracking-wide">GIRONE {gName}</span>
                </div>
                
                <div className="flex-1 flex flex-col justify-between min-h-0 gap-2">
                  {/* Squadre */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[1vh] uppercase tracking-[0.2em] text-white/40 font-bold mb-0.5">Squadre</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {groupTeams.slice(0, 4).map((team: string, idx: number) => (
                        <div key={`tv-team-${idx}`} className={`text-[1.25vh] uppercase font-black px-2 py-1 rounded border border-white/5 bg-white/5 truncate ${team ? 'text-white' : 'text-white/20 italic'}`}>
                          {team || `Team ${idx + 1}`}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Partite */}
                  <div className="flex-1 flex flex-col justify-between min-h-0 border-t border-white/10 pt-2">
                    <span className="text-[1vh] uppercase tracking-[0.2em] text-[#A5D8FF]/70 font-bold mb-1">Partite & Info Live</span>
                    <div className="flex-1 flex flex-col justify-between min-h-0 gap-1.5">
                      {groupTeams.slice(4, 10).map((match: string, idx: number) => {
                        const { home, away, score, dateTime, court } = parseMatch(match);
                        const hasContent = home || away || score || dateTime || court;
                        return (
                          <div key={`tv-match-${idx}`} className="flex flex-col justify-center py-1 border-b border-white/5 last:border-0 min-h-0">
                            {hasContent ? (
                              <>
                                {/* Nomi Squadre e Punteggio */}
                                <div className="flex justify-between items-center w-full">
                                  <div className="flex-1 flex items-center gap-1.5 min-w-0">
                                    <span className="text-[#A5D8FF]/30 font-black text-[1.25vh]">{idx + 1}.</span>
                                    <span className="font-black text-[1.4vh] uppercase tracking-wide truncate text-[#A5D8FF]">
                                      {home || '-'} <span className="text-white/30 text-[1vh] font-normal mx-0.5">vs</span> {away || '-'}
                                    </span>
                                  </div>
                                  {score && (
                                    <span className="bg-[#A5D8FF] text-black font-black text-[1.3vh] px-1.5 py-0.25 rounded-md min-w-[2.2ch] text-center shadow-lg ml-2">
                                      {score}
                                    </span>
                                  )}
                                </div>
                                {/* Data, Ora, Campo */}
                                {(dateTime || court) && (
                                  <div className="flex items-center gap-2 text-[1vh] font-bold uppercase tracking-wider text-white/40 mt-0.5 ml-4">
                                    {dateTime && <span>{dateTime}</span>}
                                    {dateTime && court && <span className="text-white/20">•</span>}
                                    {court && <span className="text-[#A5D8FF]/60">{court}</span>}
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="flex items-center gap-1.5 text-white/10 italic text-[1.3vh]">
                                <span>{idx + 1}.</span>
                                <span>Partita da disputare</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
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
