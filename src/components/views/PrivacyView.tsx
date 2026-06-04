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
      className="pt-40 pb-24 px-6 max-w-4xl mx-auto min-h-screen text-center"
    >
      <h2 className="text-4xl font-black mb-8 uppercase tracking-[0.1em] text-[#A5D8FF]">Privacy & Cookies Policy</h2>
      <p className="text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
        Questa è la pagina delle Informazioni sulla Privacy e sui Cookie.
        Il contenuto dettagliato sulle policy del torneo verrà inserito qui a breve.
      </p>
    </motion.section>
  );
};

export default PrivacyView;
