const fs = require('fs');

const constantsPath = 'src/lib/constants.ts';
let content = fs.readFileSync(constantsPath, 'utf8');

// Replacements
content = content.replace(
  /img: "\/retro`scena_logo_Tavola disegno 1.pdf"/g,
  'img: "/retròscena_logo_Tavola disegno 1.jpg"'
);
content = content.replace(
  /img: "\/ARMONIA DEI GUSTI VETTORIALE.pdf"/g,
  'img: "/ARMONIA DEI GUSTI VETTORIALE.jpg"'
);
content = content.replace(
  /img: "\/Logo COLOSSEO - ind.pdf"/g,
  'img: "/Logo COLOSSEO .jpg"'
);
content = content.replace(
  /img: "\/logo DO&BIZ.pdf"/g,
  'img: "/logo DO&BIZ.jpg"'
);

// Update Wine Art
content = content.replace(
  /\{ name: "Wine Art", type: "Ristorazione", desc: "[^"]*", img: "https:\/\/images[^"]*" \}/g,
  '{ name: "Wine Art", type: "Ristorazione", desc: "Cantina vinicola e piatti ricercati.", img: "/wine art logo.jpg" }'
);

// Check if Chiappetta is there, if not, add it
if (!content.includes('Chiappetta Sport Village')) {
  content = content.replace(
    '];',
    '  { name: "Chiappetta Sport Village", type: "Location Ufficiale", desc: "", img: "/logo chiappetta sport village.jpg" }\n];'
  );
}

fs.writeFileSync(constantsPath, content, 'utf8');
console.log('Updated sponsors');
