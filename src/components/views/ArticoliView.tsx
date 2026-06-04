import React from 'react';
import { motion } from 'motion/react';
import { Article } from '../../lib/types';

const ArticoliView = ({ articles }: { articles: Article[] }) => {
  return (
    <>
        
          <motion.section
            key="articoli"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="pt-40 pb-24 px-6 bg-white/[0.01] min-h-screen"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-[10px] uppercase font-bold text-[#A5D8FF] tracking-[0.3em] mb-4 block">Giornale del Torneo</span>
                <h2 className="text-5xl font-black tracking-tighter italic uppercase">ARTICOLI</h2>
              </div>

              {articles.length === 0 ? (
                <div className="py-20 text-center border border-white/5 bg-white/[0.02] rounded-3xl text-white/20 uppercase text-[10px] font-black tracking-widest">
                  Nessun articolo pubblicato
                </div>
              ) : (
                <div className="space-y-12">
                  {articles.map((article, idx) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-8 md:p-12 rounded-[32px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all text-left"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <span className="text-[10px] font-black text-[#A5D8FF] uppercase tracking-widest bg-[#A5D8FF]/10 px-3 py-1.5 rounded-full">
                          {article.giornata}
                        </span>
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                          {new Date(article.created_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-3xl font-black italic uppercase tracking-tight text-white mb-6">
                        {article.title}
                      </h3>
                      <div className="text-white/60 text-sm leading-relaxed whitespace-pre-line uppercase tracking-wide">
                        {article.content}
                      </div>
                    </motion.article>
                  ))}
                </div>
              
    </>
  );
};
export default ArticoliView;
