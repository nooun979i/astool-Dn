const fs = require('fs');
let code = fs.readFileSync('src/pages/EditVehicle.tsx', 'utf8');
let lines = code.split('\n');
lines[34] = '  });';
fs.writeFileSync('src/pages/EditVehicle.tsx', lines.join('\n'));
