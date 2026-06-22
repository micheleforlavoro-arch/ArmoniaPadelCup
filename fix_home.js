const fs = require('fs');

const appTsx = fs.readFileSync('./src/App.tsx', 'utf8');
const lines = appTsx.split('\n');

function extractSection(startStr, endStr) {
  const startIdx = lines.findIndex(l => l.includes(startStr));
  let endIdx = -1;
  for(let i = startIdx; i < lines.length; i++) {
     if(lines[i].includes(endStr)) {
        endIdx = i;
        break;
     }
  }
  if (endIdx === -1) return '';
  return lines.slice(startIdx, endIdx + 1).join('\n');
}

let content = extractSection("{view === 'home' && (", "</motion.div>");
content = content.replace("{view === 'home' && (", '');
content = content.substring(0, content.lastIndexOf(')}'));

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

// For ChiSiamoView
let contentChi = extractSection("{view === 'chi-siamo' && (", "</motion.section>");
contentChi = contentChi.replace("{view === 'chi-siamo' && (", '');
contentChi = contentChi.substring(0, contentChi.lastIndexOf(')}'));

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
