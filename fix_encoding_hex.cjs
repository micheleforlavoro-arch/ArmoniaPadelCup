const fs = require('fs');
const path = require('path');

const map = {
  // bad hex string : good string
  'c3a2e2809ac2ac': '€', // â‚¬
  'c382c2b0': '°', // Â° -> Â is c382, ° is c2b0
  'c383c2b2': 'ò', // Ã² -> Ã is c383, ² is c2b2
  'c383c2b9': 'ù', // Ã¹
  'c383c2a0': 'à', // Ã 
  'c383c2a8': 'è', // Ã¨
  'c383c2a9': 'é', // Ã©
  'c383c2ac': 'ì', // Ã¬
  'c3a2e282ace284a2': '’', // â€™ -> â (c3a2) € (e282ac) ™ (e284a2)
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath); // Read as Buffer
      let hexString = content.toString('hex');
      let changed = false;

      for (const [badHex, goodStr] of Object.entries(map)) {
        if (hexString.includes(badHex)) {
          const goodHex = Buffer.from(goodStr, 'utf8').toString('hex');
          hexString = hexString.split(badHex).join(goodHex);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, Buffer.from(hexString, 'hex'));
        console.log('Fixed', fullPath);
      }
    }
  }
}

processDirectory('src/components');
