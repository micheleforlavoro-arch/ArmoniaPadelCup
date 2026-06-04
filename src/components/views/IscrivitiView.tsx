
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

const IscrivitiView = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const setView = (window as any).setView;

  return (
    <>
        
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
                          alert('Errore di configurazione: le credenziali Supabase (VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY) non sono impostate o sono mancanti nel file .env!');
                          setFormStatus('error');
                          return;
                        }

                        const formData = new FormData(e.currentTarget);
                        const data = Object.fromEntries(formData);

                        try {
                          const { error } = await supabase
                            .from('registrations')
                            .insert([{
                              team_name: (data.teamName as string) || `${data.p1_surname || ''} - ${data.p2_surname || ''}`,
                              p1_name: data.p1_name,
                              p1_surname: data.p1_surname,
                              p2_name: data.p2_name,
                              p2_surname: data.p2_surname,
                              email: data.email,
                              level: 'default',
                              phone: data.phone,
                              payment: 'default',
                              status: 'pending'
                            }]);

                          if (error) {
                            console.error('Supabase error details:', {
                              code: error.code,
                              message: error.message,
                              hint: error.hint
                            });
                            alert('Errore database: ' + error.message + '\n\nSuggerimento: ' + (error.hint || 'Verifica la struttura delle tabelle.'));
                            setFormStatus('error');
                            return;
                          }

                          // Send confirmation email via our proxy
                          try {
                            const res = await fetch('/api/send-confirmation', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                ...data,
                                teamName: data.teamName || `${data.p1_surname || ''} - ${data.p2_surname || ''}`,
                                level: data.level || 'principiante',
                                payment: data.payment || 'contanti'
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
                          alert('Errore imprevisto di sistema: ' + err.message);
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
    </>
  );
};
export default IscrivitiView;
