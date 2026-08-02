const fs = require('fs');

const raw = fs.readFileSync('data/places.json', 'utf-8');
const fixed = Buffer.from(raw, 'latin1').toString('utf-8');

fs.writeFileSync('data/places.json', fixed, 'utf-8');
console.log('Encoding fixed!');
