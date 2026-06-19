const fs = require('fs');
let content = fs.readFileSync('src/components/views/SponsorsView.tsx', 'utf8');

// Replace inner motion.div
content = content.replace(
  /<motion\.div\s+key=\{idx\}\s+initial=\{\{\s*opacity:\s*0,\s*y:\s*20\s*\}\}\s+animate=\{\{\s*opacity:\s*1,\s*y:\s*0\s*\}\}\s+transition=\{\{\s*delay:\s*idx\s*\*\s*0\.05\s*\}\}\s+className="(.*?)"\s*>/g,
  '<div key={idx} className="">'
);
content = content.replace(/<\/motion\.div>/g, '</div>');

// Restore root motion.section
content = content.replace(
  /<div\s+key="sponsor"\s+initial=\{\{\s*opacity:\s*0,\s*scale:\s*0\.98\s*\}\}\s+animate=\{\{\s*opacity:\s*1,\s*scale:\s*1\s*\}\}\s+exit=\{\{\s*opacity:\s*0,\s*scale:\s*1\.02\s*\}\}\s+className="(.*?)"\s*>/g,
  '<motion.section key="sponsor" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className=" min-h-screen">'
);

content = content.replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*$/g,
  '</div>\n            </div>\n          </motion.section>\n    </>\n  );\n};\nexport default SponsorsView;' // Hacky restore
);

// Specifically replace the end correctly
fs.writeFileSync('src/components/views/SponsorsView.tsx', content, 'utf8');
console.log('Fixed SponsorsView');
