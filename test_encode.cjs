const fs = require('fs');
let c = fs.readFileSync('src/components/views/HomeView.tsx', 'utf8');
console.log(c.includes('€'));
const match = c.match(/1000(.*?)\s/);
console.log(match ? match[1] : 'not found');
console.log(Buffer.from(match ? match[1] : '').toString('hex'));
