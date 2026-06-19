const fs = require('fs');

const sponsors = [
  { name: "Armonia dei Gusti", type: "Main Sponsor", desc: "", img: "/ARMONIA DEI GUSTI VETTORIALE.jpg" },
  { name: "Chiappetta Sport Village", type: "Location Ufficiale", desc: "", img: "/logo chiappetta sport village.jpg" },
  { name: "Molto", type: "Sponsor Ufficiale", desc: "", img: "/logo molto.png" },
  { name: "Molendini", type: "Ristorazione", desc: "", img: "/molendini logo.png" },
  { name: "Retròscena Barber Shop", type: "Barber Shop", desc: "", img: "/retròscena_logo_Tavola disegno 1.jpg" },
  { name: "Dehor", type: "Lounge & Aperitif", desc: "", img: "/dehor logo.png" },
  { name: "Masagiù SPA", type: "Wellness", desc: "", img: "/masagiù logo.jpg" },
  { name: "Novum Store", type: "Abbigliamento", desc: "", img: "/novum store logo.png" },
  { name: "Wine Art", type: "Ristorazione", desc: "", img: "/wine art logo.jpg" },
  { name: "Boa Sorte", type: "Ristorazione", desc: "", img: "/boa sorte logo.png" },
  { name: "Doppio Malto", type: "Birreria & Grill", desc: "", img: "/doppio malto.png" },
  { name: "Head Padel", type: "Technical Partner", desc: "", img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=300&q=50" },
  { name: "Colosseo", type: "Sponsor Ufficiale", desc: "", img: "/Logo COLOSSEO .jpg" },
  { name: "DO&BIZ", type: "Sponsor Ufficiale", desc: "", img: "/logo DO&BIZ.jpg" },
  { name: "Call The Future", type: "Sponsor Ufficiale", desc: "", img: "/call the future logo.jpg" },
  { name: "Pasticceria Siciliana", type: "Sponsor Ufficiale", desc: "", img: "/PASTICCERIA SICILIANA logo.jpg" },
  { name: "Due Fratelli", type: "Sponsor Ufficiale", desc: "", img: "/due fratelli logo.png" },
  { name: "AM Sport", type: "Sponsor Ufficiale", desc: "", img: "/AM Group.jpg" },
  { name: "Pizza.com", type: "Sponsor Ufficiale", desc: "", img: "/pizza.com logo.jpeg" },
  { name: "Maxima", type: "Sponsor Ufficiale", desc: "", img: "/maxima logo.jpg" }
];

const content = fs.readFileSync('src/lib/constants.ts', 'utf8');

const prefixMatch = content.match(/export const SPONSORS = \[/);
const suffixMatch = content.match(/];/);

if (prefixMatch && suffixMatch) {
  const startIdx = prefixMatch.index;
  const endIdx = content.indexOf('];', startIdx) + 2;

  const sponsorsStr = 'export const SPONSORS = ' + JSON.stringify(sponsors, null, 2) + ';';

  const newContent = content.substring(0, startIdx) + sponsorsStr + content.substring(endIdx);
  fs.writeFileSync('src/lib/constants.ts', newContent, 'utf8');
  console.log('Success!');
} else {
  console.log('Could not find SPONSORS array boundaries.');
}
