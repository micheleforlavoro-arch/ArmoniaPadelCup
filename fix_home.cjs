const fs = require('fs');

let content = fs.readFileSync('src/components/views/HomeView.tsx', 'utf8');

// Hero text
content = content.replace(
  /<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*y:\s*30\s*\}\}\s+animate=\{\{\s*opacity:\s*1,\s*y:\s*0\s*\}\}\s+transition=\{\{\s*duration:\s*0\.8\s*\}\}\s+className="flex flex-col items-center text-center z-10 pb-20"\s*>/g,
  '<div className="flex flex-col items-center text-center z-10 pb-20 animate-fade-in-up">'
);
content = content.replace(/<\/motion\.div>/g, '</div>');

// The scroll indicator
content = content.replace(
  /<motion\.div\s+animate=\{\{\s*y:\s*\[0,\s*10,\s*0\]\s*\}\}\s+transition=\{\{\s*repeat:\s*Infinity,\s*duration:\s*2\s*\}\}\s+className="absolute bottom-40 left-1\/2 -translate-x-1\/2 text-white\/20 z-20"\s*>/g,
  '<div className="absolute bottom-40 left-1/2 -translate-x-1/2 text-white/20 z-20 animate-bounce">'
);

// Buttons
content = content.replace(
  /<motion\.button\s+onClick=\{\(\) => setView\('iscriviti'\)\}\s+whileHover=\{\{\s*scale:\s*1\.05,\s*backgroundColor:\s*'#FFF'\s*\}\}\s+whileTap=\{\{\s*scale:\s*0\.95\s*\}\}\s+className="group relative px-12 py-5 rounded-full font-black text-black overflow-hidden transition-all text-xs uppercase tracking-\[0\.2em\] shadow-\[0_0_20px_rgba\(165,216,255,0\.4\)\]"\s+style=\{\{\s*backgroundColor:\s*ACCENT_COLOR\s*\}\}\s*>/g,
  '<button onClick={() => setView(\'iscriviti\')} className="group relative px-12 py-5 rounded-full font-black text-black overflow-hidden transition-all text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(165,216,255,0.4)] hover:scale-105 hover:bg-white active:scale-95" style={{ backgroundColor: ACCENT_COLOR }}>'
);
content = content.replace(/<\/motion\.button>/g, '</button>');

// Grid items (whileHover=-5)
// Notice the backtick placement correctly handled!
content = content.replace(
  /<motion\.div\s+key=\{i\}\s+whileHover=\{\{\s*y:\s*-5\s*\}\}\s+className=\{(.*?)\}\s*>/g,
  '<div key={i} className={$1 hover:-translate-y-1 transition-transform duration-300}>'
);

content = content.replace(
  /<motion\.div\s+key=\{i\}\s+whileHover=\{\{\s*y:\s*-5\s*\}\}\s+className="(.*?)"\s*>/g,
  '<div key={i} className=" hover:-translate-y-1 transition-transform duration-300">'
);

// Grid items (whileHover=-3)
content = content.replace(
  /<motion\.div\s+key=\{i\}\s+whileHover=\{\{\s*y:\s*-3\s*\}\}\s+className="(.*?)"\s*>/g,
  '<div key={i} className=" hover:-translate-y-1 transition-transform duration-300">'
);

// Restore the root motion.div which was replaced by </div>
content = content.replace(
  /<div\s+key="home"\s+initial=\{\{\s*opacity:\s*0\s*\}\}\s+animate=\{\{\s*opacity:\s*1\s*\}\}\s+exit=\{\{\s*opacity:\s*0\s*\}\}\s*>/g,
  '<motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>'
);
content = content.replace(
  /<\/div>\s*$/g,
  '</motion.div>' // Hack to restore the last closing tag
);
content = content.replace(/<\/div>\s*\);\s*\};\s*export default HomeView;/g, '</motion.div>\n  );\n};\n\nexport default HomeView;');

// Sections min-h
content = content.replace(
  /className="py-24 px-6 bg-\[#0a0a0a\] border-y border-white\/5"/g,
  'className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5 min-h-[600px]"'
);
content = content.replace(
  /className="py-24 px-6 bg-\[#070707\] border-b border-white\/5"/g,
  'className="py-24 px-6 bg-[#070707] border-b border-white/5 min-h-[400px]"'
);

fs.writeFileSync('src/components/views/HomeView.tsx', content, 'utf8');
console.log('Fixed HomeView');
