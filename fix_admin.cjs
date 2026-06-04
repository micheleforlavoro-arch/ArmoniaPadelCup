const fs = require('fs');

const appTsx = fs.readFileSync('old_app.tsx', 'utf8');
const lines = appTsx.split('\n');

const startIdx = lines.findIndex(l => l.includes("          <AdminDashboard"));
console.log('startIdx:', startIdx);
