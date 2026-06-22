const fs = require('fs');
let content = fs.readFileSync('src/components/ui/Skeletons.tsx', 'utf8');

// Add bg-[#050505] to all skeletons
content = content.replace(/className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen"/g, 'className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen bg-[#050505]"');
content = content.replace(/className="pt-40 pb-24 px-6 max-w-4xl mx-auto min-h-screen"/g, 'className="pt-40 pb-24 px-6 max-w-4xl mx-auto min-h-screen bg-[#050505]"');
content = content.replace(/className="pt-40 pb-24 px-6 bg-white\/\[0\.01\] min-h-screen"/g, 'className="pt-40 pb-24 px-6 bg-[#050505] min-h-screen"');
content = content.replace(/className="pt-40 pb-24 px-6 min-h-screen"/g, 'className="pt-40 pb-24 px-6 min-h-screen bg-[#050505]"');

fs.writeFileSync('src/components/ui/Skeletons.tsx', content, 'utf8');
