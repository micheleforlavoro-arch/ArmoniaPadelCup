const fs = require('fs');

const appTsx = fs.readFileSync('old_app.tsx', 'utf8');
const lines = appTsx.split('\n');

const startIdx = lines.findIndex(l => l.includes("{view === 'home' && ("));
const endIdx = lines.findIndex(l => l.includes("{view === 'chi-siamo' && ("));

let content = lines.slice(startIdx, endIdx).join('\n');
content = content.replace("{view === 'home' && (", '');
content = content.trim();
if (content.endsWith(')}')) {
  content = content.slice(0, -2);
}

const finalFile = \import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Trophy, Medal, Star, Calendar } from 'lucide-react';
import { ACCENT_COLOR } from '../../lib/constants';

const HomeView = () => {
  const setView = (window as any).setView;
  return (
    <>
\
    </>
  );
};

export default HomeView;
\;

fs.writeFileSync('./src/components/views/HomeView.tsx', finalFile);
console.log('Fixed HomeView');

const startChi = lines.findIndex(l => l.includes("{view === 'chi-siamo' && ("));
const endChi = lines.findIndex(l => l.includes("{view === 'sponsor' && ("));
let contentChi = lines.slice(startChi, endChi).join('\n');
contentChi = contentChi.replace("{view === 'chi-siamo' && (", '');
contentChi = contentChi.trim();
if (contentChi.endsWith(')}')) {
  contentChi = contentChi.slice(0, -2);
}

const finalChi = \import React from 'react';
import { motion } from 'motion/react';

const ChiSiamoView = () => {
  return (
    <>
\
    </>
  );
};

export default ChiSiamoView;
\;
fs.writeFileSync('./src/components/views/ChiSiamoView.tsx', finalChi);
console.log('Fixed ChiSiamoView');
