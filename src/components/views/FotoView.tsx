import React from 'react';
import { motion } from 'motion/react';
import { Camera, ExternalLink } from 'lucide-react';

const FotoView = () => {
  return (
    <motion.section
      key="foto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden pt-32 pb-24 px-6"
    >
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/Sfondo Foto.jpeg")' }}
      />
      <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-md" />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-24 h-24 bg-black/50 backdrop-blur-lg rounded-full flex items-center justify-center mb-8 border border-white/20 shadow-[0_0_30px_rgba(165,216,255,0.2)]">
          <Camera size={40} className="text-[#A5D8FF]" />
        </div>
      
      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
        Galleria <span className="text-[#A5D8FF]">Fotografica</span>
      </h2>
      
      <p className="text-white/60 max-w-2xl mx-auto mb-12 text-sm md:text-base leading-relaxed tracking-widest uppercase">
        Rivivi i momenti più emozionanti dell'Armonia Padel Cup. Clicca sul pulsante qui sotto per accedere all'album completo su Google Drive e scaricare le tue foto preferite.
      </p>

      <a 
        href="https://drive.google.com/drive/folders/1kME3EJ6SeoZXKIzpLQqGhqzMG7R3IJ92?usp=share_link"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-4 px-8 py-5 bg-[#A5D8FF] text-black rounded-full font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(165,216,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] active:scale-95"
      >
        <span className="relative z-10 flex items-center gap-3">
          Foto Ottavi <ExternalLink size={18} />
        </span>
      </a>
      
        <p className="mt-8 text-white/40 text-[10px] uppercase tracking-widest bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
          I contenuti sono aggiornati costantemente.
        </p>
      </div>
    </motion.section>
  );
};

export default FotoView;
