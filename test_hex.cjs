const fs = require('fs');
let c = fs.readFileSync('src/components/views/HomeView.tsx', 'utf8');
const lines = c.split('\n');
lines.forEach((line, i) => {
  if (line.includes('\uFFFD')) {
    console.log('Line ' + (i+1) + ':', line);
  }
});
