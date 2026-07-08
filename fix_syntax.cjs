const fs = require('fs');
const path = require('path');

const dirsToSearch = [
  'src/components/ai',
  'src/components/analytics',
  'src/components/cdp',
  'src/components/automation'
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  content = content.replace(/style=\{\{\s*,/g, 'style={{');
  
  // there could also be double commas or comma space
  content = content.replace(/style=\{\{\s*,\s*/g, 'style={{');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed syntax in', filePath);
  }
}

dirsToSearch.forEach(dir => {
  const fullDirPath = path.join(__dirname, dir);
  if (fs.existsSync(fullDirPath)) {
    const files = fs.readdirSync(fullDirPath);
    files.forEach(file => {
      if (file.endsWith('.tsx')) {
        processFile(path.join(fullDirPath, file));
      }
    });
  }
});
