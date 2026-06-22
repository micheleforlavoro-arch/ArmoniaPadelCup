import React, { useState, useEffect, useRef } from 'react';
import { Trophy, X, Maximize2, Minimize2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TournamentState } from '../../lib/types';

const TabelloneTvView = () => {
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

    // Supabase Realtime Subscription
    const channel = supabase.channel('tv-bracket-updates')
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

  const renderTeam = (teamRaw: string | undefined, isFinalissima = false) => {
    const team = teamRaw || '-';
    if (team === '-') return <span className="truncate">-</span>;
    // Format: "Name | Score | DateTime | Court" or just "Name | Score"
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

  const renderKoMatchInfo = (team1Raw: string | undefined, team2Raw: string | undefined) => {
    const t1Parts = (team1Raw || "").split('|');
    const t2Parts = (team2Raw || "").split('|');
    const dateTime = t1Parts[2] || t2Parts[2] || "";
    const court = t1Parts[3] || t2Parts[3] || "";

    if (!dateTime && !court) return null;
    return (
      <div className="text-[0.9vh] uppercase font-bold text-white/30 tracking-wider pt-0.5 mt-0.5 border-t border-white/5 flex flex-wrap gap-1 justify-between w-full min-w-0">
        {dateTime && <span className="truncate">{dateTime}</span>}
        {court && <span className="text-[#A5D8FF]/70 truncate">{court}</span>}
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
      ref={containerRef}
      className="w-screen h-screen bg-black overflow-hidden flex flex-col items-center justify-between relative select-none p-4"
      style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("/background torneo.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      
      {/* Sfondo Astratto */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A5D8FF]/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A5D8FF]/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Pulsanti di Controllo in Alto */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button 
          onClick={toggleFullscreen}
          className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 hover:text-white transition-all flex items-center gap-2 font-bold tracking-widest uppercase text-xs backdrop-blur-md cursor-pointer"
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
          className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 hover:text-white transition-all flex items-center gap-2 font-bold tracking-widest uppercase text-xs backdrop-blur-md cursor-pointer"
          title="Torna al Tabellone Standard"
        >
          <X size={16} />
          Torna Indietro
        </button>
      </div>

      {/* Intestazione */}
      <div className="flex flex-col items-center mt-2 w-full">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          ARMONIA PADEL CUP
        </h1>
        <h2 className="text-lg font-bold uppercase tracking-[0.4em] text-[#A5D8FF] mt-1">
          Fase Finale - Live
        </h2>
      </div>

      {/* Tabellone */}
      <div className="w-full flex-1 flex justify-center items-stretch gap-4 px-4 my-4 min-h-0">
        
        {/* Ottavi */}
        <div className="flex flex-col justify-between flex-1 h-full py-1 min-h-0">
          <h3 className="text-center text-white/40 text-sm font-black uppercase tracking-widest mb-1">Ottavi</h3>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <div key={`ottavi-${i}`} className="flex-1 min-h-0 flex flex-col justify-center my-0.5">
              <div className="px-3 py-1 rounded-xl border border-white/15 bg-black/75 backdrop-blur-sm flex flex-col justify-center h-full max-h-[8vh] shadow-lg">
                <div className="h-1/2 flex items-center px-1 text-[1.25vh] font-bold uppercase truncate border-b border-white/10 text-white">
                  {renderTeam(tournamentState.bracket?.ottavi?.[i * 2])}
                </div>
                <div className="h-1/2 flex items-center px-1 text-[1.25vh] font-bold uppercase truncate text-white">
                  {renderTeam(tournamentState.bracket?.ottavi?.[i * 2 + 1])}
                </div>
                {renderKoMatchInfo(tournamentState.bracket?.ottavi?.[i * 2], tournamentState.bracket?.ottavi?.[i * 2 + 1])}
              </div>
            </div>
          ))}
        </div>

        {/* Quarti */}
        <div className="flex flex-col justify-around flex-1 h-full py-4 min-h-0">
          <h3 className="text-center text-[#A5D8FF]/60 text-sm font-black uppercase tracking-widest mb-1">Quarti</h3>
          {[0, 1, 2, 3].map(i => (
            <div key={`quarti-${i}`} className="flex-1 min-h-0 flex flex-col justify-center my-1 relative">
              {/* Connettori */}
              <div className="absolute -left-2 top-1/2 w-2 border-t border-white/15" />
              <div className="px-3 py-1.5 rounded-xl border-l-4 border-white/30 bg-black/75 backdrop-blur-sm flex flex-col justify-center h-full max-h-[12vh] shadow-lg">
                <div className="h-1/2 flex items-center px-1.5 text-[1.4vh] font-black uppercase truncate border-b border-white/10 text-white">
                  {renderTeam(tournamentState.bracket?.quarterFinals?.[i * 2])}
                </div>
                <div className="h-1/2 flex items-center px-1.5 text-[1.4vh] font-black uppercase truncate text-white">
                  {renderTeam(tournamentState.bracket?.quarterFinals?.[i * 2 + 1])}
                </div>
                {renderKoMatchInfo(tournamentState.bracket?.quarterFinals?.[i * 2], tournamentState.bracket?.quarterFinals?.[i * 2 + 1])}
              </div>
            </div>
          ))}
        </div>

        {/* Semifinali */}
        <div className="flex flex-col justify-around flex-[1.1] h-full py-10 min-h-0">
          <h3 className="text-center text-[#A5D8FF] text-base font-black uppercase tracking-widest mb-1">Semifinali</h3>
          {[0, 1].map(i => (
            <div key={`semi-${i}`} className="flex-1 min-h-0 flex flex-col justify-center my-2 relative">
              <div className="absolute -left-2 top-1/2 w-2 border-t border-white/20" />
              <div className="p-3 rounded-2xl border-l-4 border-[#A5D8FF] bg-black/75 backdrop-blur-sm flex flex-col justify-center h-full max-h-[16vh] shadow-[0_0_20px_rgba(165,216,255,0.15)]">
                <div className="h-1/2 flex items-center px-2 text-[1.6vh] font-black uppercase truncate border-b border-white/10 text-white">
                  {renderTeam(tournamentState.bracket?.semiFinals?.[i * 2])}
                </div>
                <div className="h-1/2 flex items-center px-2 text-[1.6vh] font-black uppercase truncate text-white">
                  {renderTeam(tournamentState.bracket?.semiFinals?.[i * 2 + 1])}
                </div>
                {renderKoMatchInfo(tournamentState.bracket?.semiFinals?.[i * 2], tournamentState.bracket?.semiFinals?.[i * 2 + 1])}
              </div>
            </div>
          ))}
        </div>

        {/* Finale */}
        <div className="flex flex-col justify-around flex-[1.1] h-full py-20 min-h-0">
          <h3 className="text-center text-[#A5D8FF] text-base font-black uppercase tracking-widest mb-1">Finale</h3>
          <div className="flex-1 min-h-0 flex flex-col justify-center my-4 relative">
            <div className="absolute -left-2 top-1/2 w-2 border-t border-white/20" />
            <div className="p-3 rounded-2xl border-l-4 border-[#A5D8FF]/60 bg-black/75 backdrop-blur-sm flex flex-col justify-center h-full max-h-[16vh] shadow-[0_0_20px_rgba(165,216,255,0.15)]">
              <div className="h-1/2 flex items-center px-2 text-[1.6vh] font-black uppercase truncate border-b border-white/10 text-white">
                {renderTeam(tournamentState.bracket?.final?.[0])}
              </div>
              <div className="h-1/2 flex items-center px-2 text-[1.6vh] font-black uppercase truncate text-white">
                {renderTeam(tournamentState.bracket?.final?.[1])}
              </div>
              {renderKoMatchInfo(tournamentState.bracket?.final?.[0], tournamentState.bracket?.final?.[1])}
            </div>
          </div>
        </div>

        {/* Finalissima */}
        <div className="flex flex-col justify-center flex-[1.3] h-full py-8 min-h-0">
           <h3 className="text-center text-yellow-500 text-lg font-black uppercase tracking-[0.2em] mb-2">Finalissima</h3>
           <div className="relative p-6 rounded-[28px] border-2 border-yellow-500/30 bg-black/85 backdrop-blur-sm bg-gradient-to-b from-yellow-500/10 to-transparent shadow-[0_0_40px_rgba(250,176,5,0.15)] overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-[30px] rounded-full" />
              <div className="absolute -left-2 top-1/2 w-2 border-t border-yellow-500/30" />
              
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                  <Trophy size={20} />
                </div>
              </div>

              <div className="flex flex-col h-[16vh] justify-center">
                <div className={`h-1/2 flex items-center justify-center px-2 text-[2.2vh] font-black tracking-tight uppercase italic truncate border-b border-white/10 ${tournamentState.bracket?.finalissima?.[0] ? 'text-yellow-500' : 'text-white/20'}`}>
                  {renderTeam(tournamentState.bracket?.finalissima?.[0], true)}
                </div>
                <div className={`h-1/2 flex items-center justify-center px-2 text-[2.2vh] font-black tracking-tight uppercase italic truncate ${tournamentState.bracket?.finalissima?.[1] ? 'text-yellow-500' : 'text-white/20'}`}>
                  {renderTeam(tournamentState.bracket?.finalissima?.[1], true)}
                </div>
                {renderKoMatchInfo(tournamentState.bracket?.finalissima?.[0], tournamentState.bracket?.finalissima?.[1])}
              </div>

              {tournamentState.bracket?.winner && (
                <div className="mt-3 pt-3 border-t border-yellow-500/30 text-center">
                  <span className="text-[1.1vh] font-black uppercase tracking-[0.3em] text-yellow-500 block mb-1">Campione</span>
                  <span className="font-black text-[2.6vh] text-yellow-400 italic uppercase drop-shadow-[0_0_15px_rgba(250,176,5,0.75)] truncate block">
                    🏆 {tournamentState.bracket.winner} 🏆
                  </span>
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default TabelloneTvView;
