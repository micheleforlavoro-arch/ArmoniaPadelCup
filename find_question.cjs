const fs = require('fs');
const path = require('path');
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('\uFFFD') || content.includes('\u00C2 ') || content.includes('Â')) {
        console.log('File needs fix:', fullPath);
      }
    }
  }
}
processDirectory('src');
