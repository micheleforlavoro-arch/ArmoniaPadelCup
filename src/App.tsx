/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  ChevronDown,
  Menu,
  X,
  CheckCircle2,
  ArrowRight,
  Star,
  Medal,
  HelpCircle,
  Instagram,
  Facebook,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Trash2,
  Edit3,
  Dices,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from './lib/supabase';

// --- Constants ---
const ACCENT_COLOR = "#A5D8FF"; // Ice Blue

// --- Types ---
interface Registration {
  id: string;
  team_name: string;
  p1_name: string;
  p1_surname: string;
  p2_name: string;
  p2_surname: string;
  email: string;
  level: string;
  phone: string;
  payment: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  image_url?: string;
}

interface TournamentState {
  is_drawn: boolean;
  bracket: any;
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Chi Siamo', id: 'chi-siamo' },
    { name: 'Regolamento', id: 'regolamento' },
    { name: 'Partecipanti', id: 'partecipanti' },
    { name: 'Tabellone', id: 'tabellone' },
    // { name: 'FAQ', id: 'faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'h-20 bg-black/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'h-28 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto h-full px-8 flex justify-between items-center">
        <button onClick={() => { window.scrollTo(0, 0); (window as any).setView('home'); }} className="flex items-center gap-4 group">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_20px_rgba(165,216,255,0.3)]"
            onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
          />
          <div className="flex flex-col items-start translate-y-1">
            <span className="font-black tracking-tighter text-3xl uppercase italic leading-[0.7] mb-1.5">ARMONIA</span>
            <span className="text-[#A5D8FF] font-black text-[11px] tracking-[0.5em] uppercase leading-none opacity-90">PADEL CUP</span>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => (window as any).setView(link.id)}
                className="hover:text-[#A5D8FF] transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => (window as any).setView('iscriviti')}
            className="px-6 py-2.5 bg-[#A5D8FF] text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_15px_rgba(165,216,255,0.3)] active:scale-95"
          >
            Iscriviti Ora
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { (window as any).setView(link.id); setIsMobileMenuOpen(false); }}
                  className="text-white/70 text-lg py-2 text-left"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => { (window as any).setView('iscriviti'); setIsMobileMenuOpen(false); }}
                className="mt-4 px-6 py-3 rounded-full text-center text-black font-bold"
                style={{ backgroundColor: ACCENT_COLOR }}
              >
                Iscriviti Ora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Accordion = ({ title, content }: { title: string, content: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        className="w-full py-6 flex justify-between items-center text-left hover:text-accent transition-colors group"
        onClick={() => setIsOpen(!isOpen)}
        style={{ '--accent': ACCENT_COLOR } as any}
      >
        <span className={`text-lg font-medium ${isOpen ? 'text-[#A5D8FF]' : 'text-white'}`}>{title}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#A5D8FF]' : 'text-white/40'}`}
          size={20}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-white/60 leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminDashboard = ({
  registrations,
  onUpdateStatus,
  onDraw,
  onResetDraw,
  onUpdateBracket,
  onRefresh,
  tournamentState,
  onAddRegistration,
  onUpdateRegistration
}: {
  registrations: Registration[],
  onUpdateStatus: (id: string, status: 'accepted' | 'rejected') => void,
  onDraw: () => void,
  onResetDraw: () => void,
  onUpdateBracket: (newBracket: any) => void,
  onRefresh: () => void,
  tournamentState: TournamentState,
  onAddRegistration: (newReg: Omit<Registration, 'id' | 'created_at'>) => Promise<boolean>,
  onUpdateRegistration: (id: string, updatedFields: Partial<Registration>) => Promise<boolean>
}) => {
  const acceptedCount = registrations.filter(r => r.status === 'accepted').length;
  const [editingBracket, setEditingBracket] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'iscrizioni' | 'tabellone'>('iscrizioni');
  const [isAdding, setIsAdding] = useState(false);
  const [editingReg, setEditingReg] = useState<Registration | null>(null);

  // Form states
  const [teamName, setTeamName] = useState('');
  const [p1Name, setP1Name] = useState('');
  const [p1Surname, setP1Surname] = useState('');
  const [p2Name, setP2Name] = useState('');
  const [p2Surname, setP2Surname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [level, setLevel] = useState('principiante');
  const [payment, setPayment] = useState('contanti');
  const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected'>('accepted');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (tournamentState.is_drawn && tournamentState.bracket) {
      setEditingBracket(tournamentState.bracket);
    } else {
      setEditingBracket(null);
    }
  }, [tournamentState]);

  useEffect(() => {
    if (editingReg) {
      setTeamName(editingReg.team_name || '');
      setP1Name(editingReg.p1_name || '');
      setP1Surname(editingReg.p1_surname || '');
      setP2Name(editingReg.p2_name || '');
      setP2Surname(editingReg.p2_surname || '');
      setEmail(editingReg.email || '');
      setPhone(editingReg.phone || '');
      setLevel(editingReg.level || 'principiante');
      setPayment(editingReg.payment || 'contanti');
      setStatus(editingReg.status || 'accepted');
      setImageUrl(editingReg.image_url || '');
    } else {
      resetForm();
    }
  }, [editingReg]);

  const resetForm = () => {
    setTeamName('');
    setP1Name('');
    setP1Surname('');
    setP2Name('');
    setP2Surname('');
    setEmail('');
    setPhone('');
    setLevel('principiante');
    setPayment('contanti');
    setStatus('accepted');
    setImageUrl('');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      team_name: teamName,
      p1_name: p1Name,
      p1_surname: p1Surname,
      p2_name: p2Name,
      p2_surname: p2Surname,
      email,
      phone,
      level,
      payment,
      status,
      image_url: imageUrl
    };

    if (editingReg) {
      const success = await onUpdateRegistration(editingReg.id, data);
      if (success) {
        setEditingReg(null);
      }
    } else {
      const success = await onAddRegistration(data);
      if (success) {
        setIsAdding(false);
        resetForm();
      }
    }
  };

  const advanceTeam = (teamName: string, round: 'quarterFinals' | 'semiFinals', index: number) => {
    if (!teamName || !editingBracket) return;
    const newBracket = { ...editingBracket };

    if (round === 'quarterFinals') {
      if (!newBracket.semiFinals) newBracket.semiFinals = ["", "", "", ""];
      newBracket.semiFinals[index] = teamName;
    } else if (round === 'semiFinals') {
      if (!newBracket.final) newBracket.final = ["", ""];
      newBracket.final[index] = teamName;
    }
    setEditingBracket(newBracket);
  };

  const updateTeamName = (round: string, index: number, value: string) => {
    if (!editingBracket) return;
    const newBracket = { ...editingBracket };
    if (!newBracket[round]) newBracket[round] = [];
    newBracket[round][index] = value;
    setEditingBracket(newBracket);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">Area Organizzatori.</h2>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-white/40 text-xs uppercase tracking-widest">
              {viewMode === 'iscrizioni' ? `Gestione iscrizioni (${registrations.length})` : 'Gestione Tabellone'}
            </p>
            {viewMode === 'iscrizioni' && (
              <div className="flex items-center gap-4">
                <button onClick={onRefresh} className="text-[#A5D8FF] text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                  <Loader2 size={10} className={registrations.length === 0 ? "animate-spin" : ""} />
                  Aggiorna Lista
                </button>
                <button onClick={() => { setIsAdding(!isAdding); setEditingReg(null); }} className="text-green-400 text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                  + Aggiungi Coppia
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          {viewMode === 'tabellone' ? (
            <>
              <button
                onClick={() => setViewMode('iscrizioni')}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-2"
              >
                ← Indietro
              </button>
              {tournamentState.is_drawn && (
                <button
                  onClick={() => {
                    onResetDraw();
                    setViewMode('iscrizioni');
                  }}
                  className="px-6 py-3 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Reset
                </button>
              )}
            </>
          ) : (
            <>
              {tournamentState.is_drawn && (
                <button
                  onClick={() => setViewMode('tabellone')}
                  className="flex-1 md:flex-none px-6 py-3 border border-[#A5D8FF]/30 text-[#A5D8FF] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#A5D8FF]/10 transition-all shadow-2xl flex items-center justify-center gap-2"
                >
                  Gestisci Tabellone
                </button>
              )}
              <button
                onClick={() => {
                  onDraw();
                  setViewMode('tabellone');
                }}
                disabled={tournamentState.is_drawn || acceptedCount < 2}
                className="flex-1 md:flex-none px-6 py-3 bg-[#A5D8FF] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-2xl disabled:opacity-30 flex items-center justify-center gap-2"
              >
                <Dices size={16} />
                {tournamentState.is_drawn ? 'Tabellone Generato' : `Sorteggio (${acceptedCount} Squadre)`}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Form Aggiungi / Modifica Coppia */}
      {(isAdding || editingReg) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-[#A5D8FF]/20 rounded-[32px] p-8 space-y-6"
        >
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-xl font-black italic uppercase text-[#A5D8FF]">
              {editingReg ? 'Modifica Iscrizione' : 'Aggiungi Nuova Coppia'}
            </h3>
            <button
              onClick={() => { setIsAdding(false); setEditingReg(null); }}
              className="text-white/40 hover:text-white text-xs uppercase font-bold tracking-widest"
            >
              Annulla
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* <div>
              <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Nome Squadra</label>
              <input
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                type="text"
                required
                placeholder="es. I Gladiatori del Padel"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#A5D8FF] transition-all hover:bg-white/[0.08]"
              />
            </div> */}

            <div>
              <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Foto della coppia</label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="block w-full text-xs text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                />
                {imageUrl && (
                  <img src={imageUrl} alt="Anteprima" className="w-12 h-12 rounded-xl object-cover border border-white/20" />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Giocatore 1</label>
                <div className="grid grid-cols-2 gap-3">
                  <input value={p1Name} onChange={e => setP1Name(e.target.value)} type="text" required placeholder="Nome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
                  <input value={p1Surname} onChange={e => setP1Surname(e.target.value)} type="text" required placeholder="Cognome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="mail@esempio.it" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Giocatore 2</label>
                <div className="grid grid-cols-2 gap-3">
                  <input value={p2Name} onChange={e => setP2Name(e.target.value)} type="text" required placeholder="Nome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
                  <input value={p2Surname} onChange={e => setP2Surname(e.target.value)} type="text" required placeholder="Cognome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Telefono</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" required placeholder="+39 ..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 col-span-2">
              {/* <div>
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Livello</label>
                <select value={level} onChange={e => setLevel(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF] appearance-none cursor-pointer">
                  <option value="principiante" className="bg-[#050505]">Principiante</option>
                  <option value="intermedio" className="bg-[#050505]">Intermedio</option>
                  <option value="avanzato" className="bg-[#050505]">Avanzato</option>
                </select>
              </div> */}
              {/* <div>
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Metodo Pagamento</label>
                <select value={payment} onChange={e => setPayment(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF] appearance-none cursor-pointer">
                  <option value="paypal-postepay" className="bg-[#050505]">Paypal - Postepay</option>
                  <option value="contanti" className="bg-[#050505]">Contanti</option>
                  <option value="bonifico" className="bg-[#050505]">Bonifico Bancario</option>
                </select>
              </div> */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Stato</label>
                <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF] appearance-none cursor-pointer">
                  <option value="pending" className="bg-[#050505]">Pending</option>
                  <option value="accepted" className="bg-[#050505]">Accepted</option>
                  <option value="rejected" className="bg-[#050505]">Rejected</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="col-span-2 mt-4 py-4 bg-[#A5D8FF] text-black font-black uppercase tracking-[0.3em] text-xs rounded-xl hover:bg-white transition-all transform active:scale-[0.98] shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
            >
              {editingReg ? 'Salva Modifiche' : 'Crea Coppia'}
            </button>
          </form>
        </motion.div>
      )}

      {viewMode === 'tabellone' && tournamentState.is_drawn && editingBracket && (
        <div className="bg-white/[0.02] border border-[#A5D8FF]/20 rounded-[32px] p-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-black italic uppercase text-[#A5D8FF]">Modifica Tabellone</h3>
            <button
              onClick={() => onUpdateBracket(editingBracket)}
              className="px-6 py-2 bg-[#A5D8FF]/20 text-[#A5D8FF] hover:bg-[#A5D8FF] hover:text-black rounded-lg text-xs font-bold uppercase transition-colors"
            >
              Salva Modifiche
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Quarti */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Quarti di Finale</h4>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2">
                  {[0, 1].map(j => {
                    const team = editingBracket.quarterFinals?.[i * 2 + j] || '';
                    return (
                      <div key={j} className="flex gap-2">
                        <input
                          type="text"
                          value={team}
                          onChange={(e) => updateTeamName('quarterFinals', i * 2 + j, e.target.value)}
                          className="w-full bg-white/5 px-3 py-1.5 rounded text-xs focus:outline-none focus:border-[#A5D8FF] border border-transparent"
                          placeholder="TBD"
                        />
                        <button
                          onClick={() => advanceTeam(team, 'quarterFinals', i)}
                          disabled={!team}
                          className="px-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500 hover:text-white disabled:opacity-30 transition-colors"
                          title="Fai passare il turno"
                        >
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Semifinali */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Semifinali</h4>
              {[0, 1].map(i => (
                <div key={i} className="p-3 bg-black/40 rounded-xl border border-[#A5D8FF]/20 space-y-2 mt-12">
                  {[0, 1].map(j => {
                    const team = editingBracket.semiFinals?.[i * 2 + j] || '';
                    return (
                      <div key={j} className="flex gap-2">
                        <input
                          type="text"
                          value={team}
                          onChange={(e) => updateTeamName('semiFinals', i * 2 + j, e.target.value)}
                          className="w-full bg-white/5 px-3 py-1.5 rounded text-xs focus:outline-none focus:border-[#A5D8FF] border border-transparent"
                          placeholder="TBD"
                        />
                        <button
                          onClick={() => advanceTeam(team, 'semiFinals', i)}
                          disabled={!team}
                          className="px-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500 hover:text-white disabled:opacity-30 transition-colors"
                          title="Fai passare in finale"
                        >
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Finale */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Finale</h4>
              <div className="p-4 bg-black/40 rounded-xl border border-yellow-500/30 space-y-4 mt-32">
                {[0, 1].map(j => {
                  const team = editingBracket.final?.[j] || '';
                  return (
                    <div key={j} className="flex gap-2">
                      <input
                        type="text"
                        value={team}
                        onChange={(e) => updateTeamName('final', j, e.target.value)}
                        className="w-full bg-white/5 px-3 py-2 rounded text-sm font-bold focus:outline-none focus:border-yellow-500 border border-transparent text-yellow-500/80"
                        placeholder="TBD"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'iscrizioni' && (
        <div className="grid gap-4">
          {registrations.length === 0 ? (
            <div className="py-20 text-center border border-white/5 bg-white/[0.02] rounded-3xl text-white/20 uppercase text-[10px] font-black tracking-widest">
              Nessuna iscrizione presente
            </div>
          ) : (
            registrations.map(reg => (
              <div key={reg.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col md:flex-row justify-between gap-6 hover:bg-white/[0.05] transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {reg.image_url && (
                      <img src={reg.image_url} alt="Foto Coppia" className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-lg" />
                    )}
                    <span className="font-black text-lg text-[#A5D8FF] italic uppercase">{reg.team_name}</span>
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${reg.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                        reg.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                      }`}>
                      {reg.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold flex flex-wrap gap-x-4 gap-y-1">
                    <span>Cap: {reg.p1_name} {reg.p1_surname}</span>
                    <span>P2: {reg.p2_name} {reg.p2_surname}</span>
                    <span>Liv: {reg.level}</span>
                    <span>Pag: {reg.payment}</span>
                    <span className="flex items-center gap-1">
                      <span className="text-white/20">Email:</span>
                      <a href={`mailto:${reg.email}`} className="text-[#A5D8FF] hover:underline normal-case">{reg.email}</a>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-white/20">Tel:</span>
                      <a href={`tel:${reg.phone}`} className="text-[#A5D8FF] hover:underline">{reg.phone}</a>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingReg(reg)}
                    className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
                    title="Modifica Iscrizione"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => onUpdateStatus(reg.id, 'accepted')}
                    disabled={reg.status === 'accepted'}
                    className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all disabled:opacity-20 cursor-pointer"
                    title="Accetta Iscrizione"
                  >
                    <ShieldCheck size={18} />
                  </button>
                  <button
                    onClick={() => onUpdateStatus(reg.id, 'rejected')}
                    disabled={reg.status === 'rejected'}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-20 cursor-pointer"
                    title="Rifiuta Iscrizione"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [tournamentState, setTournamentState] = useState<TournamentState>({ is_drawn: false, bracket: null });

  useEffect(() => {
    fetchRegistrations();
    fetchTournamentState();
  }, []);

  async function fetchRegistrations() {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Errore Supabase nel recupero iscrizioni:', error);
        return;
      }

      if (data) {
        setRegistrations(data);
      }
    } catch (err) {
      console.error('Eccezione fetchRegistrations:', err);
    }
  }

  async function fetchTournamentState() {
    try {
      const { data, error } = await supabase
        .from('tournament_state')
        .select('*')
        .maybeSingle(); // Use maybeSingle to avoid errors if empty

      if (error) {
        console.error('Errore caricamento stato torneo:', error.message);
        return;
      }

      if (data) {
        setTournamentState(data);
      } else {
        // Se non esiste, lo stato di default è già settato nello useState
        console.log('Stato torneo non trovato, uso default.');
      }
    } catch (err) {
      console.error('Eccezione fetchTournamentState:', err);
    }
  }

  async function updateRegistrationStatus(id: string, status: 'accepted' | 'rejected') {
    const { error } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', id);

    if (!error) {
      fetchRegistrations();
    }
  }

  async function handleDraw() {
    const acceptedTeams = registrations.filter(r => r.status === 'accepted');
    if (acceptedTeams.length < 2) return;

    // Shuffle
    const shuffled = [...acceptedTeams].sort(() => Math.random() - 0.5);

    // Simple bracket for 8 teams max (prototype logic)
    const bracket = {
      quarterFinals: shuffled.slice(0, 8).map(t => t.team_name),
      semiFinals: [],
      final: []
    };

    const { error } = await supabase
      .from('tournament_state')
      .upsert({
        id: 1,
        is_drawn: true,
        bracket
      });

    if (!error) {
      fetchTournamentState();
    }
  }

  async function handleResetDraw() {
    const { error } = await supabase
      .from('tournament_state')
      .upsert({
        id: 1,
        is_drawn: false,
        bracket: null
      });

    if (!error) {
      fetchTournamentState();
    }
  }

  async function handleUpdateBracket(newBracket: any) {
    const { error } = await supabase
      .from('tournament_state')
      .upsert({
        id: 1,
        is_drawn: true,
        bracket: newBracket
      });

    if (!error) {
      alert("Tabellone salvato con successo!");
      fetchTournamentState();
    } else {
      alert("Errore durante il salvataggio.");
    }
  }

  async function handleAddRegistration(newReg: Omit<Registration, 'id' | 'created_at'>) {
    try {
      const { error } = await supabase
        .from('registrations')
        .insert([newReg]);
      if (error) {
        console.error('Errore inserimento:', error);
        alert('Errore durante il salvataggio nel database: ' + error.message);
        return false;
      }
      fetchRegistrations();
      return true;
    } catch (err: any) {
      console.error(err);
      alert('Errore imprevisto: ' + err.message);
      return false;
    }
  }

  async function handleUpdateRegistration(id: string, updatedFields: Partial<Registration>) {
    try {
      const { error } = await supabase
        .from('registrations')
        .update(updatedFields)
        .eq('id', id);
      if (error) {
        console.error('Errore aggiornamento:', error);
        alert('Errore durante il salvataggio nel database: ' + error.message);
        return false;
      }
      fetchRegistrations();
      return true;
    } catch (err: any) {
      console.error(err);
      alert('Errore imprevisto: ' + err.message);
      return false;
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // Expose setView to window for Navbar access (simple router)
  useEffect(() => {
    (window as any).setView = setView;
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-accent selection:text-black" style={{ '--accent': ACCENT_COLOR } as any}>
      <Navbar />

      <AnimatePresence mode="wait">
        {view === 'home' && (
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
                className="absolute -top-24 -left-24 w-96 h-96 bg-[#A5D8FF]/10 blur-[120px] rounded-full pointer-events-none"
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none"
                style={{ backgroundColor: ACCENT_COLOR }}
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center z-10"
              >
                <div className="mb-8">
                  <span className="px-4 py-1.5 border border-[#A5D8FF]/30 text-[#A5D8FF] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-[#A5D8FF]/5">Edizione 2026</span>
                </div>

                <img
                  src="/logo.png"
                  alt="Armonia Logo"
                  className="w-64 md:w-80 h-auto mb-10 drop-shadow-[0_0_30px_rgba(165,216,255,0.15)]"
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
                    { label: "Data", value: "??/??/????" },
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

                <motion.button
                  onClick={() => setView('iscriviti')}
                  whileHover={{ scale: 1.05, backgroundColor: '#FFF' }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-5 rounded-full font-black text-black overflow-hidden transition-all text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(165,216,255,0.4)]"
                  style={{ backgroundColor: ACCENT_COLOR }}
                >
                  Iscriviti Ora
                </motion.button>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
              >
                <ChevronDown size={32} />
              </motion.div>
            </section>

            {/* --- PREMI SECTION --- */}
            <section id="prizes" className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-24 bg-[#A5D8FF]/5 blur-[60px] rounded-full pointer-events-none" />
                  <div className="mb-4">
                    <span className="px-4 py-1.5 border border-[#A5D8FF]/30 text-[#A5D8FF] text-[9px] font-bold uppercase tracking-[0.2em] rounded-full bg-[#A5D8FF]/5">Montepremi</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
                    Più di <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe066] via-[#fcc419] to-[#fab005] drop-shadow-[0_0_20px_rgba(250,176,5,0.4)]">2000€</span> <br className="sm:hidden" />di Montepremi
                  </h2>
                  <p className="text-white/40 italic font-light tracking-widest text-xs mt-4 uppercase">Riconoscimento al talento puro.</p>
                </div>

                <div className="grid md:grid-cols-6 gap-8">
                  {[
                    { 
                      title: "1° Posto", 
                      desc: (
                        <span>
                          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffe066] via-[#fcc419] to-[#fab005] animate-pulse drop-shadow-[0_0_12px_rgba(250,176,5,0.7)] mr-1">
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
                          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffe066] via-[#fcc419] to-[#fab005] animate-pulse drop-shadow-[0_0_8px_rgba(250,176,5,0.5)] mr-1">
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
                      desc: "Tavolo al \"Molendini\" 2 Kit", 
                      icon: Medal, 
                      accent: false,
                      colSpan: "md:col-span-2"
                    },
                    { 
                      title: "MVP", 
                      desc: "Racchetta Head Coello 2026", 
                      icon: Star, 
                      accent: false,
                      colSpan: "md:col-span-2"
                    }
                  ].map((prize, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className={`p-8 rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-xl flex items-center gap-6 ${prize.colSpan}`}
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
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {view === 'chi-siamo' && (
          <motion.section
            key="chi-siamo"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pt-40 pb-24 px-6 max-w-7xl mx-auto min-h-screen"
          >
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
              >
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
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative aspect-square bg-white/[0.03] rounded-[48px] overflow-hidden border border-white/5 shadow-2xl flex items-center justify-center p-12"
              >
                <img
                  src="/logo.png"
                  alt="Armonia Logo"
                  className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(165,216,255,0.2)]"
                  onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                />
              </motion.div>
            </div>
          </motion.section>
        )}

        {view === 'regolamento' && (
          <motion.section
            key="regolamento"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pt-40 pb-24 px-6 max-w-3xl mx-auto min-h-screen"
          >
            <h2 className="text-5xl font-black mb-12 text-center tracking-tighter">REGOLAMENTO.</h2>
            <div className="space-y-4">
              <Accordion
                title="Formato del Torneo"
                content="Gironi all'italiana con fase finale a eliminazione diretta. Partite a set unico ai 9 game con killer point sul 40-40."
              />
              <Accordion
                title="Validità Iscrizione"
                content="L'iscrizione è considerata valida solo al ricevimento del pagamento della quota. È richiesto il certificato medico sportivo non agonistico in corso di validità."
              />
              <Accordion
                title="Svolgimento Match"
                content="Tutte le coppie devono presentarsi 15 minuti prima dell'inizio programmato. Un ritardo superiore ai 10 minuti comporta la perdita a tavolino."
              />
              <Accordion
                title="Equipaggiamento"
                content="Il torneo fornisce le palle ufficiali per ogni match. È obbligatorio l'uso di abbigliamento consono e scarpe da padel."
              />
            </div>
          </motion.section>
        )}

        {view === 'partecipanti' && (
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
                <h2 className="text-5xl font-black tracking-tighter italic uppercase">PARTECIPANTI.</h2>
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
                      className="p-8 rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/10 transition-all flex flex-col justify-between h-full"
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
                        <div className="flex justify-between items-start mb-6">
                          <span className="text-[10px] uppercase tracking-widest text-[#A5D8FF] font-black bg-[#A5D8FF]/10 px-3 py-1 rounded-full">
                            Livello {reg.level}
                          </span>
                          <span className="text-white/20 text-[10px] font-bold tracking-widest">
                            #{idx + 1}
                          </span>
                        </div>
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
              )}
            </div>
          </motion.section>
        )}

        {view === 'tabellone' && (
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
                  <h2 className="text-5xl font-black tracking-tighter italic uppercase">TABELLONE.</h2>
                </div>
                <div className="flex gap-3 mx-auto md:mx-0">
                  <span className={`px-5 py-1.5 rounded-full border border-white/10 text-[10px] font-bold tracking-widest uppercase transition-all ${!tournamentState.is_drawn ? 'bg-[#A5D8FF] text-black shadow-[0_0_15px_rgba(165,216,255,0.2)]' : 'text-white/40'}`}>Qualificazioni</span>
                  <span className={`px-5 py-1.5 rounded-full border border-white/10 text-[10px] font-bold tracking-widest uppercase transition-all ${tournamentState.is_drawn ? 'bg-[#A5D8FF] text-black shadow-[0_0_15px_rgba(165,216,255,0.2)]' : 'text-white/40'}`}>Finali</span>
                </div>
              </div>

              <div className="relative p-12 border border-white/5 rounded-[48px] bg-black/40 backdrop-blur-3xl overflow-x-auto touch-pan-x shadow-inner">
                <div className="min-w-[900px] flex gap-12 justify-between items-center">
                  <div className="flex flex-col justify-around gap-12">
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} className="w-64 p-5 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3 group hover:opacity-100 transition-opacity">
                        <div className="flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest group-hover:text-[#A5D8FF]/40"><span>Match #{i + 1}</span></div>
                        <div className="h-10 border-b border-white/5 flex items-center px-1 text-xs font-medium uppercase italic">
                          {tournamentState.is_drawn ? tournamentState.bracket.quarterFinals[i * 2] || 'TBD' : 'TBD'}
                        </div>
                        <div className="h-10 flex items-center px-1 text-xs font-medium uppercase italic">
                          {tournamentState.is_drawn ? tournamentState.bracket.quarterFinals[i * 2 + 1] || 'TBD' : 'TBD'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col justify-around gap-24 relative py-12">
                    {[0, 1].map(i => (
                      <div key={i} className="w-64 p-5 rounded-2xl border border-white/10 bg-white/[0.04] border-l-2 space-y-3" style={{ borderLeftColor: ACCENT_COLOR }}>
                        <div className="flex justify-between items-center text-[10px] font-bold text-[#A5D8FF] uppercase tracking-widest"><span>Semi-Finale {i + 1}</span></div>
                        <div className={`h-10 border-b border-white/5 flex items-center px-1 text-xs uppercase italic ${tournamentState.is_drawn && tournamentState.bracket?.semiFinals?.[i * 2] ? 'font-bold' : 'opacity-40'}`}>
                          {tournamentState.is_drawn ? (tournamentState.bracket?.semiFinals?.[i * 2] || 'TBD') : 'TBD'}
                        </div>
                        <div className={`h-10 flex items-center px-1 text-xs uppercase italic ${tournamentState.is_drawn && tournamentState.bracket?.semiFinals?.[i * 2 + 1] ? 'font-bold' : 'opacity-40'}`}>
                          {tournamentState.is_drawn ? (tournamentState.bracket?.semiFinals?.[i * 2 + 1] || 'TBD') : 'TBD'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col justify-center relative">
                    <div className="w-80 p-8 rounded-[32px] border-2 bg-[#A5D8FF]/5 space-y-6 shadow-[0_0_50px_rgba(165,216,255,0.05)]" style={{ borderColor: ACCENT_COLOR }}>
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-[#A5D8FF]/20 flex items-center justify-center text-[#A5D8FF]">
                          <Trophy size={32} />
                        </div>
                      </div>
                      <div className="text-center font-black text-xs uppercase tracking-[0.4em] text-[#A5D8FF] mb-4">Finalissima</div>
                      <div className={`h-14 border-b border-white/10 flex items-center px-2 text-xl font-black tracking-tight uppercase italic ${tournamentState.is_drawn && tournamentState.bracket?.final?.[0] ? 'text-yellow-500/90' : 'opacity-20'}`}>
                        {tournamentState.is_drawn ? (tournamentState.bracket?.final?.[0] || 'TBD') : 'TBD'}
                      </div>
                      <div className={`h-14 flex items-center px-2 text-xl font-black tracking-tight uppercase italic ${tournamentState.is_drawn && tournamentState.bracket?.final?.[1] ? 'text-yellow-500/90' : 'opacity-20'}`}>
                        {tournamentState.is_drawn ? (tournamentState.bracket?.final?.[1] || 'TBD') : 'TBD'}
                      </div>
                    </div>
                  </div>
                </div>
                {!tournamentState.is_drawn && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-10 pointer-events-none">
                    <div className="px-10 py-5 bg-black border border-white/10 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase text-white/40">
                      Sorteggio in corso...
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {view === 'iscriviti' && (
          <motion.section
            key="iscriviti"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="pt-40 pb-24 px-6 max-w-4xl mx-auto min-h-screen"
          >
            <div className="bg-zinc-900/50 p-8 md:p-16 rounded-[40px] border border-white/10 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#A5D8FF]/10 blur-[80px] rounded-full pointer-events-none" />

              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 flex flex-col items-center"
                  >
                    <div className="w-24 h-24 bg-[#A5D8FF]/20 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 size={48} className="text-[#A5D8FF]" />
                    </div>
                    <h2 className="text-4xl font-black mb-4 uppercase tracking-[0.1em]">Iscrizione Effettuata!</h2>
                    <p className="text-white/50 mb-12 max-w-sm mx-auto">La tua richiesta è stata inviata con successo. Gli organizzatori valuteranno la tua iscrizione e riceverai una conferma via email.</p>
                    <button
                      onClick={() => { setFormStatus('idle'); setView('home'); }}
                      className="px-8 py-3 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                      Torna alla Home
                    </button>
                  </motion.div>
                ) : formStatus === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 flex flex-col items-center"
                  >
                    <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-8">
                      <AlertCircle size={48} className="text-red-500" />
                    </div>
                    <h2 className="text-4xl font-black mb-4 uppercase tracking-[0.1em]">C'è stato un problema</h2>
                    <p className="text-white/50 mb-12 max-w-sm mx-auto">Non siamo riusciti a inviare la tua iscrizione. Riprova tra qualche minuto o contattaci direttamente.</p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="px-8 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#A5D8FF] transition-all"
                    >
                      Riprova
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    <div className="text-center mb-12">
                      <h2 className="text-5xl font-black tracking-tighter mb-4 italic uppercase">ISCRIZIONE.</h2>
                      <p className="text-white/40 italic uppercase text-[10px] tracking-[0.2em]">Assicura il tuo posto nell'elite del Padel.</p>
                    </div>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setFormStatus('submitting');

                        if (!isSupabaseConfigured) {
                          console.error('Supabase non configurato nelle environment variables.');
                          setFormStatus('error');
                          return;
                        }

                        const formData = new FormData(e.currentTarget);
                        const data = Object.fromEntries(formData);

                        try {
                          const { error } = await supabase
                            .from('registrations')
                            .insert([{
                              team_name: data.teamName,
                              p1_name: data.p1_name,
                              p1_surname: data.p1_surname,
                              p2_name: data.p2_name,
                              p2_surname: data.p2_surname,
                              email: data.email,
                              level: data.level,
                              phone: data.phone,
                              payment: data.payment,
                              status: 'pending'
                            }]);

                          if (error) {
                            console.error('Supabase error details:', {
                              code: error.code,
                              message: error.message,
                              hint: error.hint
                            });
                            setFormStatus('error');
                            return;
                          }

                          // Send confirmation email via our proxy
                          try {
                            const res = await fetch('/api/send-confirmation', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                ...data
                              })
                            });
                            const result = await res.json();
                            console.log("Risposta API Email:", result);
                            if (result.status === "skipped") {
                              alert("ATTENZIONE: L'iscrizione è andata a buon fine nel database, ma l'email NON è partita perché le variabili SMTP mancano o non sono state caricate su Vercel. Fai un REDEPLOY su Vercel!");
                            } else if (result.status === "error") {
                              alert("ATTENZIONE: Errore del server SMTP nell'invio della mail. Controlla i log su Vercel.");
                            }
                          } catch (emailErr) {
                            console.error('Email sending failed (non-blocking):', emailErr);
                          }

                          setFormStatus('success');
                        } catch (err: any) {
                          console.error('Registration failed:', err);
                          setFormStatus('error');
                        }
                      }}
                      className="grid md:grid-cols-2 gap-x-12 gap-y-8"
                    >
                      {/* <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Nome Squadra</label>
                        <input name="teamName" type="text" required placeholder="es. I Gladiatori del Padel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#A5D8FF] transition-all hover:bg-white/[0.08]" />
                      </div> */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Giocatore 1 (Capitano)</label>
                          <div className="grid grid-cols-2 gap-3">
                            <input name="p1_name" type="text" required placeholder="Nome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
                            <input name="p1_surname" type="text" required placeholder="Cognome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Email Contatto</label>
                          <input name="email" type="email" required placeholder="mail@esempio.it" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Giocatore 2</label>
                          <div className="grid grid-cols-2 gap-3">
                            <input name="p2_name" type="text" required placeholder="Nome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
                            <input name="p2_surname" type="text" required placeholder="Cognome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-white/30 ml-2 mb-2 tracking-[0.2em]">Telefono</label>
                          <input name="phone" type="tel" required placeholder="+39 ..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A5D8FF]" />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="col-span-2 mt-4 w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-xs rounded-xl hover:bg-[#A5D8FF] transition-all transform active:scale-[0.98] shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Inviando...
                          </>
                        ) : (
                          'Invia Iscrizione'
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* {view === 'faq' && (
          <motion.section
            key="faq"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="pt-40 pb-24 px-6 max-w-3xl mx-auto min-h-screen"
          >
            <h2 className="text-5xl font-black mb-12 text-center tracking-tighter">FAQ.</h2>
            <div className="space-y-4">
              <Accordion title="Posso cambiare compagno dopo l'iscrizione?" content="Sì, è possibile modificare il nominativo del secondo giocatore fino a 48 ore prima dell'inizio del torneo, previa comunicazione via email." />
              <Accordion title="Cosa succede in caso di pioggia?" content="I campi sono coperti, pertanto il torneo si svolgerà regolarmente indipendentemente dalle condizioni meteorologiche." />
              <Accordion title="È prevista una zona ristoro?" content="Certamente. Sarà presente un'area hospitality con free tasting della Gelateria Armonia per tutti i partecipanti e accompagnatori." />
              <Accordion title="Qual è il premio per la miglior coppia 'Under 21'?" content="Abbiamo un premio speciale dedicato ai giovani talenti: un voucher formativo per una Masterclass con un coach professionista." />
            </div>
          </motion.section>
        )} */}

        {view === 'privacy' && (
          <motion.section
            key="privacy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-40 pb-24 px-6 max-w-4xl mx-auto min-h-screen"
          >
            <div className="bg-zinc-900/40 p-12 rounded-[48px] border border-white/5 backdrop-blur-3xl">
              <h2 className="text-5xl font-black mb-12 tracking-tighter uppercase italic">Privacy <span className="text-[#A5D8FF]">Policy.</span></h2>
              <div className="space-y-8 text-white/50 text-xs leading-loose uppercase tracking-widest font-medium">
                <section>
                  <h3 className="text-white text-sm mb-4 font-black">1. Titolare del Trattamento</h3>
                  <p>Il titolare del trattamento dei dati è Armonia Padel Cup, con sede in Cosenza, Rende. Email di riferimento: armoniacup@gmail.com.</p>
                </section>
                <section>
                  <h3 className="text-white text-sm mb-4 font-black">2. Dati Raccolti</h3>
                  <p>Raccogliamo i seguenti dati personali forniti volontariamente in fase di iscrizione: Nome, Cognome, Indirizzo Email, Numero di Telefono.</p>
                </section>
                <section>
                  <h3 className="text-white text-sm mb-4 font-black">3. Finalità del Trattamento</h3>
                  <p>I dati sono trattati esclusivamente per l'organizzazione del torneo Armonia Padel Cup 2026, la gestione delle comunicazioni relative all'evento e la verifica dei requisiti di partecipazione.</p>
                </section>
                <section>
                  <h3 className="text-white text-sm mb-4 font-black">4. Conservazione dei Dati</h3>
                  <p>I dati saranno conservati per il tempo strettamente necessario allo svolgimento della manifestazione sportiva e per adempiere agli obblighi di legge.</p>
                </section>
                <section>
                  <h3 className="text-white text-sm mb-4 font-black">5. Diritti dell'Interessato</h3>
                  <p>In ogni momento è possibile richiedere l'accesso, la rettifica o la cancellazione dei propri dati inviando una comunicazione a armoniacup@gmail.com.</p>
                </section>
              </div>
            </div>
          </motion.section>
        )}

        {view === 'cookies' && (
          <motion.section
            key="cookies"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-40 pb-24 px-6 max-w-4xl mx-auto min-h-screen"
          >
            <div className="bg-zinc-900/40 p-12 rounded-[48px] border border-white/5 backdrop-blur-3xl">
              <h2 className="text-5xl font-black mb-12 tracking-tighter uppercase italic">Cookie <span className="text-[#A5D8FF]">Policy.</span></h2>
              <div className="space-y-8 text-white/50 text-xs leading-loose uppercase tracking-widest font-medium">
                <section>
                  <h3 className="text-white text-sm mb-4 font-black">Cosa sono i Cookie?</h3>
                  <p>I cookie sono piccoli file di testo che i siti visitati dagli utenti inviano ai loro terminali, dove vengono memorizzati per essere riasmessi agli stessi siti alla visita successiva.</p>
                </section>
                <section>
                  <h3 className="text-white text-sm mb-4 font-black">Cookie Tecnici</h3>
                  <p>Questo sito utilizza esclusivamente cookie tecnici necessari per il corretto funzionamento dell'applicazione e per memorizzare le preferenze di navigazione (come la visualizzazione della pagina corrente).</p>
                </section>
                <section>
                  <h3 className="text-white text-sm mb-4 font-black">Cookie di Terze Parti</h3>
                  <p>Non utilizziamo cookie di profilazione o di tracciamento pubblicitario di terze parti. Potrebbero essere presenti cookie tecnici legati alla gestione del database Supabase per la sicurezza della sessione.</p>
                </section>
                <section>
                  <h3 className="text-white text-sm mb-4 font-black">Gestione dei Cookie</h3>
                  <p>È possibile disabilitare i cookie direttamente dalle impostazioni del proprio browser, tuttavia alcune funzionalità del sito potrebbero risultare compromesse.</p>
                </section>
              </div>
            </div>
          </motion.section>
        )}

        {view === 'admin' && (
          <motion.section
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-40 pb-24 px-6 max-w-5xl mx-auto min-h-screen"
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
              />
            ) : (
              <div className="max-w-md mx-auto bg-zinc-900 border border-white/10 p-12 rounded-[40px] text-center">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <ShieldCheck size={32} className="text-[#A5D8FF]" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 italic">Accesso Area<br />Organizzatori.</h2>
                <input
                  type="password"
                  placeholder="Inserisci Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center mb-6 focus:outline-none focus:border-[#A5D8FF]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (e.currentTarget.value === 'armonia2026') {
                        setIsAdminLoggedIn(true);
                        fetchRegistrations(); // Forza il refresh al login
                        fetchTournamentState();
                      }
                    }
                  }}
                />
                <p className="text-white/20 text-[8px] uppercase tracking-widest leading-loose">Riservato esclusivamente ai membri del comitato organizzativo Armonia Padel Cup. (Psw: armonia2026)</p>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="py-32 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <button onClick={() => { window.scrollTo(0, 0); (window as any).setView('home'); }} className="flex items-center gap-4 group mb-8">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_20px_rgba(165,216,255,0.3)]"
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
                <a
                  href="https://www.instagram.com/armoniacup_?igsh=M2Nud3Y2dXB3bWcx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group"
                >
                  <Instagram size={18} className="text-white/40 group-hover:text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-8">Navigazione</h4>
              <ul className="space-y-4 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">
                <li><button onClick={() => setView('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => setView('regolamento')} className="hover:text-white transition-colors">Regolamento</button></li>
                <li><button onClick={() => setView('partecipanti')} className="hover:text-white transition-colors">Partecipanti</button></li>
                <li><button onClick={() => setView('tabellone')} className="hover:text-white transition-colors">Tabellone</button></li>
                <li><button onClick={() => setView('iscriviti')} className="hover:text-[#A5D8FF] transition-colors">Iscriviti</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-8">Informazioni</h4>
              <ul className="space-y-4 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">
                <li className="flex items-center gap-3"><MapPin size={12} className="text-[#A5D8FF]" /> Cosenza, Rende</li>
                <li className="flex items-center gap-3 lowercase tracking-normal font-medium">armoniacup@gmail.com</li>
                <li className="flex items-center gap-3">3477187888</li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-white/20">
            <p>&copy; 2024-2026 Armonia Padel Cup. Smart Agency.</p>
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
