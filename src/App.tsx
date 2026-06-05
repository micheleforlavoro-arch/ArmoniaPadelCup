import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ShieldCheck, Instagram } from 'lucide-react';
import { supabase } from './lib/supabase';
import { Registration, TournamentState, Article } from './lib/types';
import { ACCENT_COLOR } from './lib/constants';
import Navbar from './components/layout/Navbar';

import HomeView from './components/views/HomeView';
import ChiSiamoView from './components/views/ChiSiamoView';
import SponsorsView from './components/views/SponsorsView';
import PartecipantiView from './components/views/PartecipantiView';
import ArticoliView from './components/views/ArticoliView';
import PrivacyView from './components/views/PrivacyView';
import CookiesView from './components/views/CookiesView';

const TabelloneView = lazy(() => import('./components/views/TabelloneView'));
const IscrivitiView = lazy(() => import('./components/views/IscrivitiView'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

import { 
  HomeSkeleton, 
  GenericPageSkeleton, 
  CardGridSkeleton, 
  ArticleListSkeleton, 
  TabelloneSkeleton 
} from './components/ui/Skeletons';

const DynamicFallback = ({ view }: { view: string }) => {
  switch (view) {
    case 'home': return <HomeSkeleton />;
    case 'sponsor': 
    case 'partecipanti': return <CardGridSkeleton />;
    case 'tabellone': return <TabelloneSkeleton />;
    case 'articoli': return <ArticleListSkeleton />;
    default: return <GenericPageSkeleton />;
  }
};

export default function App() {
  const [view, setView] = useState('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [tournamentState, setTournamentState] = useState<TournamentState>({ is_drawn: false, bracket: null });
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchRegistrations(),
      fetchTournamentState(),
      fetchArticles()
    ]).finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  async function fetchRegistrations() {
    try {
      const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
      if (!error && data) setRegistrations(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchTournamentState() {
    try {
      const { data, error } = await supabase.from('tournament_state').select('*').maybeSingle();
      if (!error && data) setTournamentState(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchArticles() {
    try {
      const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
      if (!error && data) setArticles(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateRegistrationStatus(id: string, status: 'accepted' | 'rejected') {
    const { error } = await supabase.from('registrations').update({ status }).eq('id', id);
    if (!error) fetchRegistrations();
  }

  async function handleDraw() {
    const acceptedTeams = registrations.filter(r => r.status === 'accepted');
    if (acceptedTeams.length < 2) return;
    const shuffled = [...acceptedTeams].sort(() => Math.random() - 0.5);
    const sanitizeGroup = (arr: any[]) => {
      const result = [];
      for (let i = 0; i < 4; i++) result.push(arr[i] || "");
      return result;
    };
    const bracket = {
      gironi: {
        A: sanitizeGroup(shuffled.slice(0, 4).map(t => t.team_name)),
        B: sanitizeGroup(shuffled.slice(4, 8).map(t => t.team_name)),
        C: sanitizeGroup(shuffled.slice(8, 12).map(t => t.team_name)),
        D: sanitizeGroup(shuffled.slice(12, 16).map(t => t.team_name)),
        E: sanitizeGroup(shuffled.slice(16, 20).map(t => t.team_name)),
        F: sanitizeGroup(shuffled.slice(20, 24).map(t => t.team_name))
      },
      ottavi: Array(16).fill(""),
      quarterFinals: Array(8).fill(""),
      semiFinals: Array(4).fill(""),
      final: Array(2).fill(""),
      winner: ""
    };
    const { error } = await supabase.from('tournament_state').upsert({ id: 1, is_drawn: true, bracket });
    if (!error) fetchTournamentState();
  }

  async function handleResetDraw() {
    const { error } = await supabase.from('tournament_state').upsert({ id: 1, is_drawn: false, bracket: null });
    if (!error) fetchTournamentState();
  }

  async function handleUpdateBracket(newBracket: any) {
    const { error } = await supabase.from('tournament_state').upsert({ id: 1, is_drawn: true, bracket: newBracket });
    if (!error) {
      alert("Tabellone salvato con successo!");
      fetchTournamentState();
    } else {
      alert("Errore durante il salvataggio.");
    }
  }

  async function handleAddArticle(newArt: Omit<Article, 'id' | 'created_at'>) {
    try {
      const { error } = await supabase.from('articles').insert([newArt]);
      if (error) return false;
      fetchArticles();
      return true;
    } catch { return false; }
  }

  async function handleUpdateArticle(id: string, updatedFields: Partial<Article>) {
    try {
      const { error } = await supabase.from('articles').update(updatedFields).eq('id', id);
      if (error) return false;
      fetchArticles();
      return true;
    } catch { return false; }
  }

  async function handleDeleteArticle(id: string) {
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) return false;
      fetchArticles();
      return true;
    } catch { return false; }
  }

  async function handleAddRegistration(newReg: Omit<Registration, 'id' | 'created_at'>) {
    try {
      const { error } = await supabase.from('registrations').insert([newReg]);
      if (error) return false;
      fetchRegistrations();
      return true;
    } catch { return false; }
  }

  async function handleUpdateRegistration(id: string, updatedFields: Partial<Registration>) {
    try {
      const { error } = await supabase.from('registrations').update(updatedFields).eq('id', id);
      if (error) return false;
      fetchRegistrations();
      return true;
    } catch { return false; }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    (window as any).setView = setView;
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-accent selection:text-black" style={{ '--accent': ACCENT_COLOR } as any}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="relative flex flex-col items-center z-10">
              <div className="relative flex items-center justify-center mb-8">
                <video 
                  src="/loader%20animato.MP4"
                  autoPlay
                  playsInline
                  loop
                  muted
                  className="w-72 md:w-80 h-auto object-contain"
                />
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center">
                <span className="text-white font-black text-[10px] tracking-[0.4em] uppercase opacity-80 animate-pulse">
                  Caricamento in corso<span className="text-[#A5D8FF]">...</span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <AnimatePresence mode="wait">
        <Suspense fallback={<DynamicFallback view={view} />}>
          {view === 'home' && <HomeView />}
          {view === 'chi-siamo' && <ChiSiamoView />}
          {view === 'sponsor' && <SponsorsView />}
          {view === 'partecipanti' && <PartecipantiView registrations={registrations} />}
          {view === 'tabellone' && <TabelloneView tournamentState={tournamentState} />}
          {view === 'articoli' && <ArticoliView articles={articles} />}
          {view === 'iscriviti' && <IscrivitiView />}
          {view === 'privacy' && <PrivacyView />}
          {view === 'cookies' && <CookiesView />}
          {view === 'admin' && (
            <motion.section
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-40 pb-24 px-6 max-w-7xl mx-auto min-h-screen"
            >
              {isAdminLoggedIn ? (
                <AdminDashboard
                  registrations={registrations}
                  onUpdateStatus={updateRegistrationStatus}
                  onDraw={handleDraw}
                  onResetDraw={handleResetDraw}
                  onUpdateBracket={handleUpdateBracket}
                  onRefresh={fetchRegistrations}
                  tournamentState={tournamentState}
                  onAddRegistration={handleAddRegistration}
                  onUpdateRegistration={handleUpdateRegistration}
                  articles={articles}
                  onAddArticle={handleAddArticle}
                  onUpdateArticle={handleUpdateArticle}
                  onDeleteArticle={handleDeleteArticle}
                />
              ) : (
                <div className="max-w-md mx-auto text-center space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                    <ShieldCheck size={32} className="text-[#A5D8FF]" />
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Area Riservata</h2>
                  <p className="text-white/40 text-xs uppercase tracking-widest leading-relaxed">
                    Inserisci la password per accedere al pannello di controllo.
                  </p>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-sm focus:outline-none focus:border-[#A5D8FF] tracking-widest"
                    onKeyDown={async (e) => {
                      if (e.key === 'Enter') {
                        const passwordVal = e.currentTarget.value;
                        try {
                          const response = await fetch('/api/verify-admin', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ password: passwordVal })
                          });
                          const data = await response.json();
                          if (data.success) {
                            setIsAdminLoggedIn(true);
                            fetchRegistrations(); 
                            fetchTournamentState();
                          } else {
                            alert('Password errata!');
                          }
                        } catch (err) {
                          alert('Errore durante la verifica della password.');
                        }
                      }
                    }}
                  />
                  <p className="text-white/20 text-[8px] uppercase tracking-widest leading-loose">Riservato esclusivamente ai membri del comitato organizzativo Armonia Padel Cup. </p>
                </div>
              )}
            </motion.section>
          )}
        </Suspense>
      </AnimatePresence>

      <footer className="py-32 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <button onClick={() => { window.scrollTo(0, 0); (window as any).setView('home'); }} className="flex items-center gap-4 group mb-8">
                <img
                  src="/logo.png"
                  alt="Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain transition-all duration-500 group-hover:scale-110"
                  onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                />
                <div className="flex flex-col items-start translate-y-1">
                  <span className="font-black tracking-tighter text-3xl uppercase italic leading-[0.7] mb-1.5">ARMONIA</span>
                  <span className="text-[#A5D8FF] font-black text-[11px] tracking-[0.5em] uppercase leading-none opacity-90">PADEL CUP</span>
                </div>
              </button>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-medium max-w-xs mb-8 leading-loose">
                Eccellenza sportiva. <br />Precisione assoluta. <br />Gusto ricercato.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/armoniapadelcup?igsh=M2Nud3Y2dXB3bWcx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group">
                  <Instagram size={18} className="text-white/40 group-hover:text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-8">Navigazione</h4>
              <ul className="space-y-4 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">
                <li><button onClick={() => setView('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => setView('partecipanti')} className="hover:text-white transition-colors">Partecipanti</button></li>
                <li><button onClick={() => setView('tabellone')} className="hover:text-white transition-colors">Tabellone</button></li>
                <li><button onClick={() => setView('sponsor')} className="hover:text-white transition-colors">Sponsor</button></li>
                <li><button onClick={() => setView('articoli')} className="hover:text-white transition-colors">Articoli</button></li>
                <li><button onClick={() => setView('iscriviti')} className="hover:text-[#A5D8FF] transition-colors">Iscriviti</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-8">Informazioni</h4>
              <ul className="space-y-4 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">
                <li className="flex items-center gap-3"><MapPin size={12} className="text-[#A5D8FF]" /> Cosenza, Rende</li>
                <li className="flex items-center gap-3 lowercase tracking-normal font-medium">armoniacupp@gmail.com</li>
                <li className="flex items-center gap-3">3477187888 / 3395029226 / 3802079586</li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-white/20">
            <p>&copy; 2024-2026 Armonia Padel Cup. kelin.dev</p>
            <div className="flex gap-8">
              <button onClick={() => setView('admin')} className="hover:text-[#A5D8FF] transition-all flex items-center gap-2">
                <ShieldCheck size={12} />
                Area Organizzatori
              </button>
              <button onClick={() => setView('privacy')} className="hover:text-white transition-all">Privacy</button>
              <button onClick={() => setView('cookies')} className="hover:text-white transition-all">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
