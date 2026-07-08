const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/index.css');
let content = fs.readFileSync(filePath, 'utf8');

// Remove null bytes (they appear as \x00 characters in the string)
content = content.replace(/\x00/g, '');

// If there are now duplicate responsive sections, remove the duplicate
// Find the second occurrence of "/* Responsive Utilities */" and remove from there to end
const marker = '/* Responsive Utilities */';
const firstIdx = content.indexOf(marker);
const secondIdx = content.indexOf(marker, firstIdx + 1);

if (secondIdx !== -1) {
  content = content.substring(0, secondIdx).trimEnd() + '\n';
  console.log('Removed duplicate responsive section at index', secondIdx);
} else {
  console.log('No duplicate found - only cleaned null bytes');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done. File size:', content.length);
