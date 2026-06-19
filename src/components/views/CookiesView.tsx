import React, { useEffect } from 'react';
import { motion } from 'motion/react';

const CookiesView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.section
      key="cookies"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="pt-40 pb-24 px-6 max-w-4xl mx-auto min-h-screen text-left"
    >
      <h2 className="text-4xl font-black mb-8 uppercase tracking-[0.1em] text-[#A5D8FF]">Informativa sui Cookie</h2>
      <div className="space-y-6 text-white/70 leading-relaxed text-sm md:text-base">
        <p>
          Questa Cookie Policy spiega cosa sono i cookie e come li utilizziamo sul sito web dell'Armonia Padel Cup.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4 uppercase tracking-widest">Cosa sono i Cookie?</h3>
        <p>
          I cookie sono piccoli file di testo che vengono memorizzati sul tuo computer o dispositivo mobile quando visiti un sito web. Permettono al sito web di ricordare le tue azioni e preferenze (come il login, la lingua, la dimensione dei caratteri e altre preferenze di visualizzazione) per un periodo di tempo.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4 uppercase tracking-widest">Come utilizziamo i Cookie?</h3>
        <p>
          Il nostro sito web utilizza principalmente cookie tecnici, necessari per il corretto funzionamento della piattaforma e per migliorare l'esperienza utente. Non utilizziamo cookie di profilazione per scopi pubblicitari.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4 uppercase tracking-widest">Tipi di Cookie Utilizzati</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Cookie Essenziali:</strong> Indispensabili per consentire di muoversi all'interno del sito e utilizzare le sue funzionalità, come l'accesso ad aree sicure.</li>
          <li><strong>Cookie Analitici:</strong> Utilizzati in forma aggregata e anonima per analizzare come gli utenti navigano sul sito, al fine di ottimizzare i contenuti e le performance.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4 uppercase tracking-widest">Gestione dei Cookie</h3>
        <p>
          Puoi controllare e/o cancellare i cookie a tuo piacimento. Puoi cancellare tutti i cookie già presenti sul tuo computer e impostare quasi tutti i browser in modo da bloccarne l'installazione. Tuttavia, se scegli di farlo, potresti dover regolare manualmente alcune preferenze ogni volta che visiti un sito e alcuni servizi o funzionalità potrebbero non funzionare.
        </p>
      </div>
    </motion.section>
  );
};

export default CookiesView;
