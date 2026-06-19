import React, { useEffect } from 'react';
import { motion } from 'motion/react';

const PrivacyView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.section
      key="privacy"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="pt-40 pb-24 px-6 max-w-4xl mx-auto min-h-screen text-left"
    >
      <h2 className="text-4xl font-black mb-8 uppercase tracking-[0.1em] text-[#A5D8FF]">Informativa sulla Privacy</h2>
      <div className="space-y-6 text-white/70 leading-relaxed text-sm md:text-base">
        <p>
          Ai sensi del Regolamento (UE) 2016/679 (GDPR), questa pagina descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito web e si iscrivono al torneo "Armonia Padel Cup".
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4 uppercase tracking-widest">1. Titolare del Trattamento</h3>
        <p>
          Il titolare del trattamento dei dati è l'organizzazione del torneo "Armonia Padel Cup". Per qualsiasi informazione o richiesta di cancellazione dei dati, è possibile contattare l'organizzazione tramite i canali ufficiali.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4 uppercase tracking-widest">2. Dati Raccolti</h3>
        <p>
          Durante l'iscrizione al torneo, raccogliamo i seguenti dati personali:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Nome e Cognome dei giocatori</li>
          <li>Indirizzo Email</li>
          <li>Numero di Telefono</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4 uppercase tracking-widest">3. Finalità del Trattamento</h3>
        <p>
          I dati raccolti vengono utilizzati esclusivamente per le seguenti finalità:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Gestione delle iscrizioni e organizzazione dei gironi/tabelloni.</li>
          <li>Comunicazioni tecniche o di servizio riguardanti orari e match.</li>
          <li>Creazione di statistiche interne aggregate sul torneo.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4 uppercase tracking-widest">4. Conservazione dei Dati</h3>
        <p>
          I dati personali saranno conservati per il tempo strettamente necessario alla gestione del torneo e non verranno in alcun modo ceduti a terze parti per finalità di marketing senza esplicito consenso.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4 uppercase tracking-widest">5. Diritti dell'Interessato</h3>
        <p>
          In qualunque momento hai il diritto di richiedere l'accesso, la rettifica, la cancellazione o la limitazione del trattamento dei tuoi dati personali, scrivendo all'organizzazione del torneo.
        </p>
      </div>
    </motion.section>
  );
};

export default PrivacyView;
