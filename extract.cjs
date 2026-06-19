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

function processComponent(name, startStr, endStr, imports, params) {
  let content = extractSection(startStr, endStr);
  // remove the conditional wrapper: "{view === '...' && (" and the trailing ")}"
  content = content.replace(startStr, '');
  content = content.substring(0, content.lastIndexOf(')}'));
  
  const finalFile = imports + '\n\nconst ' + name + ' = (' + params + ') => {\n  return (\n    <>\n' + content + '\n    </>\n  );\n};\nexport default ' + name + ';\n';
  fs.writeFileSync('./src/components/views/' + name + '.tsx', finalFile);
}

processComponent('SponsorsView', "{view === 'sponsor' && (", "</motion.section>", 
  "import React from 'react';\nimport { motion } from 'motion/react';\nimport { SPONSORS } from '../../lib/constants';", 
  "");

processComponent('PartecipantiView', "{view === 'partecipanti' && (", "</motion.section>", 
  "import React from 'react';\nimport { motion } from 'motion/react';\nimport { Users } from 'lucide-react';\nimport { Registration } from '../../lib/types';", 
  "{ registrations }: { registrations: Registration[] }");

processComponent('TabelloneView', "{view === 'tabellone' && (", "</motion.section>", 
  "import React, { useState } from 'react';\nimport { motion } from 'motion/react';\nimport { Trophy } from 'lucide-react';\nimport { TournamentState } from '../../lib/types';\nimport { ACCENT_COLOR } from '../../lib/constants';", 
  "{ tournamentState }: { tournamentState: TournamentState }");

processComponent('ArticoliView', "{view === 'articoli' && (", "</motion.section>", 
  "import React from 'react';\nimport { motion } from 'motion/react';\nimport { Article } from '../../lib/types';", 
  "{ articles }: { articles: Article[] }");

processComponent('PrivacyView', "{view === 'privacy' && (", "</motion.section>", 
  "import React from 'react';\nimport { motion } from 'motion/react';", 
  "");

// Extra extraction for IscrivitiView because it uses more variables
let iscrivitiContent = extractSection("{view === 'iscriviti' && (", "</motion.section>");
iscrivitiContent = iscrivitiContent.replace("{view === 'iscriviti' && (", '');
iscrivitiContent = iscrivitiContent.substring(0, iscrivitiContent.lastIndexOf(')}'));
const iscrivitiFile = `
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

const IscrivitiView = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const setView = (window as any).setView;

  return (
    <>
${iscrivitiContent}
    </>
  );
};
export default IscrivitiView;
`;
fs.writeFileSync('./src/components/views/IscrivitiView.tsx', iscrivitiFile);

console.log("Extraction complete!");
