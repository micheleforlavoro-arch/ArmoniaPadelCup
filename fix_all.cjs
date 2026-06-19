const fs = require('fs');
const path = require('path');

function replaceFile(file, replacements) {
  let c = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [bad, good] of Object.entries(replacements)) {
    if (c.includes(bad)) {
      c = c.split(bad).join(good);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, c, 'utf8');
    console.log('Fixed', file);
  }
}

const UFFFD = '\uFFFD';

// AdminDashboard.tsx
replaceFile('src/components/admin/AdminDashboard.tsx', {
  '1Â Giornata': '1\u00B0 Giornata',
  '2Â Giornata': '2\u00B0 Giornata',
  '3Â Giornata': '3\u00B0 Giornata',
  '4Â Giornata': '4\u00B0 Giornata',
  '5Â Giornata': '5\u00B0 Giornata',
  '6Â Giornata': '6\u00B0 Giornata',
  '7Â Giornata': '7\u00B0 Giornata'
});

// ChiSiamoView.tsx
replaceFile('src/components/views/ChiSiamoView.tsx', {
  ['convivialit' + UFFFD]: 'convivialit\u00E0',
});

// IscrivitiView.tsx
replaceFile('src/components/views/IscrivitiView.tsx', {
  ['richiesta ' + UFFFD + ' stata']: 'richiesta \u00E8 stata',
  ["C'" + UFFFD + ' stato']: "C'\u00E8 stato",
  ['iscrizione ' + UFFFD + ' andata']: 'iscrizione \u00E8 andata',
  ['NON ' + UFFFD + ' partita']: 'NON \u00E8 partita',
  ['perch' + UFFFD + ' le']: 'perch\u00E9 le',
});

// HomeView.tsx
replaceFile('src/components/views/HomeView.tsx', {
  ['100' + UFFFD]: '100\u20AC',
  ['3000' + UFFFD]: '3000\u20AC',
  ['1000' + UFFFD]: '1000\u20AC',
  ['500' + UFFFD]: '500\u20AC',
  ['1Â Posto']: '1\u00B0 Posto',
  ['2Â Posto']: '2\u00B0 Posto',
  ['3Â Posto']: '3\u00B0 Posto',
  ['4Â Posto']: '4\u00B0 Posto',
  ['1Â Giornata']: '1\u00B0 Giornata',
  ['2Â Giornata']: '2\u00B0 Giornata',
  ['3Â Giornata']: '3\u00B0 Giornata',
  ['4Â Giornata']: '4\u00B0 Giornata',
  ['5Â Giornata']: '5\u00B0 Giornata',
  ['6Â Giornata']: '6\u00B0 Giornata',
  ['7Â Giornata']: '7\u00B0 Giornata',
  ['Retr' + UFFFD + 'scena']: 'Retr\u00F2scena',
  ['Masagi' + UFFFD]: 'Masagi\u00F9',
});

