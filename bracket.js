const fs = require('fs');
const content = fs.readFileSync('src/components/admin/AdminDashboard.tsx', 'utf8');

let curly = 0;
let paren = 0;
let square = 0;
let inTag = false;

// Simple counter
for (let i=0; i<content.length; i++) {
  if (content[i] === '{') curly++;
  if (content[i] === '}') curly--;
  if (content[i] === '(') paren++;
  if (content[i] === ')') paren--;
}
console.log('curly:', curly, 'paren:', paren);
