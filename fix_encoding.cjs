const fs = require('fs');
const path = require('path');

const replacements = {
  'â‚¬': '€',
  'Â°': '°',
  'Ã²': 'ò',
  'Ã¹': 'ù',
  'Ã ': 'à',
  'Ã¨': 'è',
  'Ã©': 'é',
  'Ã¬': 'ì',
  'â€™': '’',
  'Â ': ' ',
  'Ã²': 'ò'
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [bad, good] of Object.entries(replacements)) {
        if (content.includes(bad)) {
          content = content.split(bad).join(good);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed', fullPath);
      }
    }
  }
}

processDirectory('src/components');
