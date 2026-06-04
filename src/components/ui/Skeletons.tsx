import React from 'react';
import { motion } from 'motion/react';

// Shared container animation for smooth cross-fades
const skeletonAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const HomeSkeleton = () => (
  <motion.div {...skeletonAnimation} className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
    <div className="flex flex-col items-center mb-16 space-y-6">
      <div className="w-32 h-4 bg-white/5 rounded-full animate-pulse" />
      <div className="w-64 md:w-96 h-12 bg-white/10 rounded-2xl animate-pulse" />
      <div className="w-48 h-4 bg-white/5 rounded-full animate-pulse mt-4" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-64 rounded-[32px] bg-white/5 animate-pulse border border-white/5" />
      ))}
    </div>
  </motion.div>
);

export const GenericPageSkeleton = () => (
  <motion.div {...skeletonAnimation} className="pt-40 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
    <div className="w-48 h-10 bg-white/10 rounded-xl animate-pulse mb-12" />
    <div className="space-y-6">
      <div className="w-full h-4 bg-white/5 rounded-full animate-pulse" />
      <div className="w-5/6 h-4 bg-white/5 rounded-full animate-pulse" />
      <div className="w-4/6 h-4 bg-white/5 rounded-full animate-pulse" />
      <div className="w-full h-4 bg-white/5 rounded-full animate-pulse mt-8" />
      <div className="w-full h-4 bg-white/5 rounded-full animate-pulse" />
      <div className="w-3/4 h-4 bg-white/5 rounded-full animate-pulse" />
    </div>
  </motion.div>
);

export const CardGridSkeleton = () => (
  <motion.div {...skeletonAnimation} className="pt-40 pb-24 px-6 bg-white/[0.01] min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20 flex flex-col items-center">
        <div className="w-24 h-3 bg-white/5 rounded-full animate-pulse mb-6" />
        <div className="w-64 h-12 bg-white/10 rounded-2xl animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-72 rounded-[32px] bg-white/5 animate-pulse border border-white/5 flex flex-col justify-between p-8">
            <div className="w-full h-32 bg-white/5 rounded-2xl mb-6" />
            <div className="space-y-3">
              <div className="w-2/3 h-6 bg-white/10 rounded-lg" />
              <div className="w-1/2 h-4 bg-white/5 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export const ArticleListSkeleton = () => (
  <motion.div {...skeletonAnimation} className="pt-40 pb-24 px-6 bg-white/[0.01] min-h-screen">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16 flex flex-col items-center">
        <div className="w-32 h-3 bg-white/5 rounded-full animate-pulse mb-4" />
        <div className="w-72 h-12 bg-white/10 rounded-2xl animate-pulse" />
      </div>
      <div className="space-y-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-8 md:p-12 rounded-[32px] border border-white/5 bg-white/5 animate-pulse">
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-6 bg-white/10 rounded-full" />
              <div className="w-24 h-6 bg-white/5 rounded-full" />
            </div>
            <div className="w-3/4 h-8 bg-white/10 rounded-xl mb-6" />
            <div className="space-y-3">
              <div className="w-full h-4 bg-white/5 rounded-full" />
              <div className="w-full h-4 bg-white/5 rounded-full" />
              <div className="w-4/5 h-4 bg-white/5 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export const TabelloneSkeleton = () => (
  <motion.div {...skeletonAnimation} className="pt-40 pb-24 px-6 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 flex flex-col items-center">
        <div className="w-32 h-3 bg-white/5 rounded-full animate-pulse mb-4" />
        <div className="w-72 h-12 bg-white/10 rounded-2xl animate-pulse" />
      </div>
      <div className="w-full h-96 bg-white/5 rounded-[32px] border border-white/5 animate-pulse" />
    </div>
  </motion.div>
);
