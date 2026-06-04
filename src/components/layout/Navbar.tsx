import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const ACCENT_COLOR = "#A5D8FF";

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
    { name: 'Partecipanti', id: 'partecipanti' },
    { name: 'Tabellone', id: 'tabellone' },
    { name: 'Sponsor', id: 'sponsor' },
    { name: 'Articoli', id: 'articoli' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'h-20 bg-black border-b border-white/5 shadow-2xl' : 'h-28 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto h-full px-8 flex justify-between items-center">
        <button onClick={() => { window.scrollTo(0, 0); (window as any).setView('home'); }} className="flex items-center gap-4 group">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110"
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
            className="absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 p-6 md:hidden"
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

export default Navbar;
