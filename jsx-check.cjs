const fs = require('fs');
const content = fs.readFileSync('src/components/admin/AdminDashboard.tsx', 'utf8');

const openTags = [];
const tagRegex = /<\/?([a-zA-Z0-9\.]+)(?:\s+[^>]*?)?\/?>/g;
let match;
while ((match = tagRegex.exec(content)) !== null) {
  const fullTag = match[0];
  const tagName = match[1];

  if (fullTag.endsWith('/>')) {
    // Self-closing
  } else if (fullTag.startsWith('</')) {
    // Closing tag
    if (openTags.length > 0) {
       const last = openTags.pop();
       if (last.tagName !== tagName) {
          console.log('Mismatch! Expected closing for', last.tagName, 'but got', tagName);
       }
    } else {
       console.log('Unmatched closing tag:', tagName);
    }
  } else {
    // Opening tag
    openTags.push({tagName, fullTag});
  }
}
console.log('Remaining open tags:', openTags.map(t => t.tagName));
