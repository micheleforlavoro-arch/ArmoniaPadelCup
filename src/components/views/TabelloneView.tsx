import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';
import { TournamentState } from '../../lib/types';
import { ACCENT_COLOR } from '../../lib/constants';

const TabelloneView = ({ tournamentState, isAdminLoggedIn }: { tournamentState: TournamentState, isAdminLoggedIn?: boolean }) => {
  const [isBracketUnlocked, setIsBracketUnlocked] = useState(false);

  const renderTeam = (teamRaw: string | undefined, isYellow = false) => {
    const team = teamRaw || 'TBD';
    if (team === 'TBD') return <span className="truncate">TBD</span>;
    // Format: "Name | Score | DateTime | Court" or just "Name | Score"
    const parts = team.split('|');
    const name = parts[0] || 'TBD';
    const score = parts[1] || '';
    
    return (
      <div className={`flex justify-between w-full items-center ${isYellow ? 'text-yellow-500/90' : ''}`}>
        <span className="truncate">{name}</span>
        {score && <span className={`font-black ml-2 ${isYellow ? 'text-yellow-400' : 'text-[#A5D8FF]'}`}>{score}</span>}
      </div>
    );
  };

  const renderKoMatchInfo = (team1Raw: string | undefined, team2Raw: string | undefined) => {
    // Check if either team has metadata in index 2 (dateTime) or 3 (court)
    const t1Parts = (team1Raw || "").split('|');
    const t2Parts = (team2Raw || "").split('|');
    const dateTime = t1Parts[2] || t2Parts[2] || "";
    const court = t1Parts[3] || t2Parts[3] || "";

    if (!dateTime && !court) return null;
    return (
      <div className="text-[7.5px] uppercase font-bold text-white/30 tracking-widest pt-1 mt-1 border-t border-white/5 flex flex-wrap gap-2 justify-between">
        {dateTime && <span>{dateTime}</span>}
        {court && <span className="text-[#A5D8FF]/70">{court}</span>}
      </div>
    );
  };

  return (
    <>
        
          <motion.section
            key="tabellone"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="pt-40 pb-24 px-6 bg-white/[0.01] min-h-screen"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-center md:text-left">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A5D8FF] tracking-[0.3em] mb-4 block">Live Status</span>
                  <h2 className="text-5xl font-black tracking-tighter italic uppercase">TABELLONE</h2>
                </div>
                <div className="flex flex-col gap-4 items-center md:items-end mx-auto md:mx-0">
                    <div className="flex gap-3">
                      {/* I pulsanti TV sono stati spostati nell'area Admin per renderli privati */}
                    </div>
                  <div className="flex gap-3">
                    <span className={`px-5 py-1.5 rounded-full border border-white/10 text-[10px] font-bold tracking-widest uppercase transition-all ${!tournamentState.is_drawn ? 'bg-[#A5D8FF] text-black shadow-[0_0_15px_rgba(165,216,255,0.2)]' : 'text-white/40'}`}>Gironi</span>
                    <span className={`px-5 py-1.5 rounded-full border border-white/10 text-[10px] font-bold tracking-widest uppercase transition-all ${tournamentState.is_drawn ? 'bg-[#A5D8FF] text-black shadow-[0_0_15px_rgba(165,216,255,0.2)]' : 'text-white/40'}`}>Finali</span>
                  </div>
                </div>
              </div>

              {/* --- GIRONI (FASE A GRUPPI) --- */}
              <div className="mb-16">
                <h3 className="text-2xl font-black italic uppercase text-[#A5D8FF] mb-8 text-center md:text-left">FASE A GIRONI</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {['A', 'B', 'C', 'D', 'E', 'F'].map(gName => {
                    const groupTeams = tournamentState.bracket?.gironi?.[gName]
                      ? tournamentState.bracket.gironi[gName]
                      : ['TBD', 'TBD', 'TBD', 'TBD'];
                    return (
                      <div key={gName} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-left">
                        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                          <span className="font-black text-[#A5D8FF] italic">GIRONE {gName}</span>
                          <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">4 Squadre</span>
                        </div>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2 pb-3 border-b border-white/5">
                            <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold w-full">Squadre</span>
                            {groupTeams.slice(0, 4).map((team: string, idx: number) => (
                              <span key={`team-${idx}`} className={`text-[10px] uppercase font-semibold px-2 py-1 rounded bg-white/5 ${team ? 'text-white/80' : 'text-white/20 italic'}`}>
                                {team || `Team ${idx + 1}`}
                              </span>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase tracking-widest text-[#A5D8FF]/70 font-bold block mb-2">Partite & Punteggi</span>
                            {groupTeams.slice(4, 10).map((match: string, idx: number) => {
                              const matchStr = match || "";
                              // Format: "Sq1 | Sq2 | Pt | Data/Ora | Campo"
                              const parts = matchStr.includes('|') ? matchStr.split('|') : [matchStr, "", "", "", ""];
                              const hasContent = parts[0] || parts[1] || parts[2] || parts[3] || parts[4];
                              return (
                                <div key={`match-${idx}`} className="flex flex-col gap-0.5 py-1 border-b border-white/5 last:border-0 text-xs">
                                  {hasContent ? (
                                    <>
                                      <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                          <span className="text-[#A5D8FF]/30 font-bold w-4 text-right">{idx + 1}.</span>
                                          <span className="font-semibold uppercase tracking-wide truncate text-[#A5D8FF]">
                                            {parts[0] || '-'} <span className="text-[#A5D8FF]/40 text-[10px] mx-0.5">vs</span> {parts[1] || '-'}
                                          </span>
                                        </div>
                                        {parts[2] && (
                                          <span className="text-white font-black ml-2 bg-[#A5D8FF]/15 px-1.5 py-0.5 rounded text-[10px]">
                                            {parts[2]}
                                          </span>
                                        )}
                                      </div>
                                      {(parts[3] || parts[4]) && (
                                        <div className="flex gap-2 text-[9px] font-bold text-white/30 uppercase tracking-widest ml-6">
                                          {parts[3] && <span>{parts[3]}</span>}
                                          {parts[3] && parts[4] && <span>•</span>}
                                          {parts[4] && <span className="text-[#A5D8FF]/70">{parts[4]}</span>}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div className="flex items-center gap-1.5 text-white/20 italic">
                                      <span className="font-bold w-4 text-right">{idx + 1}.</span>
                                      <span>Partita da disputare</span>
                                    </div>
                                  )}
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

              {/* --- KO STAGE --- */}
              <h3 className="text-2xl font-black italic uppercase text-[#A5D8FF] mb-8 text-center md:text-left">FASE FINALE</h3>
              
              <div className="relative">
                {/* Mobile scroll unlock overlay */}
                {!isBracketUnlocked && (
                  <div 
                    onClick={() => setIsBracketUnlocked(true)}
                    className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md rounded-[48px] flex flex-col items-center justify-center cursor-pointer p-6 md:hidden text-center border border-white/10"
                  >
                    <Trophy size={48} className="text-[#A5D8FF] mb-4 animate-bounce" />
                    <span className="font-black text-xs uppercase tracking-[0.2em] text-[#A5D8FF] mb-2">Tocca per Sbloccare il Tabellone</span>
                    <p className="text-white/40 text-[9px] uppercase tracking-widest max-w-[240px] leading-relaxed">
                      Sblocca per esplorare la fase finale. Tocca in qualsiasi altro punto dello schermo per scorrere normalmente.
                    </p>
                  </div>
                )}
                
                {isBracketUnlocked && (
                  <button 
                    onClick={() => setIsBracketUnlocked(false)}
                    className="md:hidden absolute top-4 right-4 z-40 px-4 py-2 bg-black/80 border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-[#A5D8FF] hover:bg-white hover:text-black transition-all active:scale-95"
                  >
                    Blocca Scorrimento
                  </button>
                )}

                <div className={`relative p-12 border border-white/5 rounded-[48px] bg-black/40 shadow-inner ${isBracketUnlocked ? 'overflow-x-auto touch-pan-x' : 'overflow-hidden pointer-events-none md:pointer-events-auto md:overflow-x-auto'}`}>
                  <div className="min-w-[1250px] flex gap-8 justify-between items-center">
                    {/* Ottavi */}
                    <div className="flex flex-col justify-around gap-6">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div key={i} className="w-56 p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-2 group hover:border-[#A5D8FF]/20 transition-all text-left">
                          <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest"><span>Match #{i + 1}</span></div>
                          <div className="h-8 border-b border-white/5 flex items-center px-1 text-xs font-semibold uppercase italic">
                            {renderTeam(tournamentState.bracket?.ottavi?.[i * 2])}
                          </div>
                          <div className="h-8 flex items-center px-1 text-xs font-semibold uppercase italic">
                            {renderTeam(tournamentState.bracket?.ottavi?.[i * 2 + 1])}
                          </div>
                          {renderKoMatchInfo(tournamentState.bracket?.ottavi?.[i * 2], tournamentState.bracket?.ottavi?.[i * 2 + 1])}
                        </div>
                      ))}
                    </div>

                    {/* Quarti */}
                    <div className="flex flex-col justify-around gap-12 py-6">
                      {[0, 1, 2, 3].map(i => (
                        <div key={i} className="w-56 p-4 rounded-xl border border-white/5 bg-white/[0.02] border-l-2 space-y-2 text-left" style={{ borderLeftColor: `${ACCENT_COLOR}60` }}>
                          <div className="text-[8px] font-bold text-[#A5D8FF]/60 uppercase tracking-widest"><span>Quarto {i + 1}</span></div>
                          <div className="h-8 border-b border-white/5 flex items-center px-1 text-xs font-semibold uppercase italic">
                            {renderTeam(tournamentState.bracket?.quarterFinals?.[i * 2])}
                          </div>
                          <div className="h-8 flex items-center px-1 text-xs font-semibold uppercase italic">
                            {renderTeam(tournamentState.bracket?.quarterFinals?.[i * 2 + 1])}
                          </div>
                          {renderKoMatchInfo(tournamentState.bracket?.quarterFinals?.[i * 2], tournamentState.bracket?.quarterFinals?.[i * 2 + 1])}
                        </div>
                      ))}
                    </div>

                    {/* Semifinali */}
                    <div className="flex flex-col justify-around gap-24 py-12">
                      {[0, 1].map(i => (
                        <div key={i} className="w-56 p-4 rounded-xl border border-white/10 bg-white/[0.04] border-l-2 space-y-2 text-left" style={{ borderLeftColor: ACCENT_COLOR }}>
                          <div className="text-[8px] font-bold text-[#A5D8FF] uppercase tracking-widest"><span>Semi-Finale {i + 1}</span></div>
                          <div className="h-8 border-b border-white/5 flex items-center px-1 text-xs font-semibold uppercase italic">
                            {renderTeam(tournamentState.bracket?.semiFinals?.[i * 2])}
                          </div>
                          <div className="h-8 flex items-center px-1 text-xs font-semibold uppercase italic">
                            {renderTeam(tournamentState.bracket?.semiFinals?.[i * 2 + 1])}
                          </div>
                          {renderKoMatchInfo(tournamentState.bracket?.semiFinals?.[i * 2], tournamentState.bracket?.semiFinals?.[i * 2 + 1])}
                        </div>
                      ))}
                    </div>

                    {/* Finale */}
                    <div className="flex flex-col justify-around py-24">
                      <div className="w-56 p-4 rounded-xl border border-white/20 bg-white/[0.06] border-l-2 space-y-2 text-left" style={{ borderLeftColor: ACCENT_COLOR }}>
                        <div className="text-[8px] font-bold text-[#A5D8FF] uppercase tracking-widest"><span>Finale</span></div>
                        <div className="h-8 border-b border-white/5 flex items-center px-1 text-xs font-semibold uppercase italic">
                          {renderTeam(tournamentState.bracket?.final?.[0])}
                        </div>
                        <div className="h-8 flex items-center px-1 text-xs font-semibold uppercase italic">
                          {renderTeam(tournamentState.bracket?.final?.[1])}
                        </div>
                        {renderKoMatchInfo(tournamentState.bracket?.final?.[0], tournamentState.bracket?.final?.[1])}
                      </div>
                    </div>

                    {/* Finalissima in evidenza */}
                    <div className="flex flex-col justify-center">
                      <div className="w-72 p-6 rounded-[32px] border-2 bg-gradient-to-b from-yellow-500/10 to-yellow-500/0 border-yellow-500/30 space-y-4 shadow-[0_0_50px_rgba(250,176,5,0.05)] text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-2xl rounded-full" />
                        <div className="flex justify-center mb-2">
                          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                            <Trophy size={24} />
                          </div>
                        </div>
                        <div className="font-black text-[10px] uppercase tracking-[0.3em] text-yellow-500">Finalissima</div>
                        <div className="space-y-3">
                          <div className={`h-12 border-b border-white/10 flex items-center justify-center px-2 text-lg font-black tracking-tight uppercase italic ${tournamentState.bracket?.finalissima?.[0] ? 'text-yellow-500/90' : 'opacity-20'}`}>
                            {renderTeam(tournamentState.bracket?.finalissima?.[0], true)}
                          </div>
                          <div className={`h-12 flex items-center justify-center px-2 text-lg font-black tracking-tight uppercase italic ${tournamentState.bracket?.finalissima?.[1] ? 'text-yellow-500/90' : 'opacity-20'}`}>
                            {renderTeam(tournamentState.bracket?.finalissima?.[1], true)}
                          </div>
                          {renderKoMatchInfo(tournamentState.bracket?.finalissima?.[0], tournamentState.bracket?.finalissima?.[1])}
                        </div>
                        
                        {/* Vincitore (Campione) */}
                        {tournamentState.bracket?.winner && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-6 pt-4 border-t border-yellow-500/20 text-center"
                          >
                            <span className="text-[8px] font-black uppercase tracking-widest text-yellow-500 block mb-1">Campione Armonia Padel Cup</span>
                            <span className="font-black text-xl text-yellow-400 italic uppercase drop-shadow-[0_0_8px_rgba(250,176,5,0.5)]">
                              🏆 {tournamentState.bracket.winner} 🏆
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
    </>
  );
};
export default TabelloneView;
