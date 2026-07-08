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

  // 1. Top level responsive layout
  // <div className="fade-in" style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 100px)' }}>
  content = content.replace(
    /<div\s+className="fade-in"\s+style=\{\{\s*display:\s*'flex',\s*gap:\s*'24px'(.*?)\}\}>/g,
    '<div className="fade-in responsive-layout" style={{$1}}>'
  );

  // If there wasn't a fade-in, but there is a flex gap 24px wrapper
  content = content.replace(
    /<div\s+style=\{\{\s*display:\s*'flex',\s*gap:\s*'24px'(.*?)\}\}>/g,
    '<div className="responsive-layout" style={{$1}}>'
  );

  // 2. Sidebar panel
  content = content.replace(
    /className="glass-card"\s+style=\{\{\s*width:\s*'320px',/g,
    'className="glass-card responsive-sidebar" style={{'
  );
  content = content.replace(
    /className="glass-card"\s+style=\{\{\s*width:\s*'350px',/g,
    'className="glass-card responsive-sidebar" style={{'
  );
  content = content.replace(
    /className="glass-card"\s+style=\{\{\s*width:\s*'360px',/g,
    'className="glass-card responsive-sidebar-wide" style={{'
  );
  content = content.replace(
    /className="glass-card"\s+style=\{\{\s*width:\s*'380px',/g,
    'className="glass-card responsive-sidebar-wide" style={{'
  );
  content = content.replace(
    /className="glass-card"\s+style=\{\{\s*width:\s*'400px',/g,
    'className="glass-card responsive-sidebar-wide" style={{'
  );
  
  // Handle no className
  content = content.replace(
    /<div\s+style=\{\{\s*width:\s*'320px',/g,
    '<div className="responsive-sidebar" style={{'
  );
  
  // specific IdentityGraph fix
  content = content.replace(
    /width:\s*'100%',\s*height:\s*'600px',\s*overflow:\s*'hidden'/g,
    'width: \'100%\', height: \'600px\', overflowX: \'auto\', overflowY: \'hidden\''
  );

  // 3. Main content area
  content = content.replace(
    /<div\s+style=\{\{\s*flex:\s*1,\s*display:\s*'flex',\s*flexDirection:\s*'column'/g,
    '<div className="responsive-content" style={{ display: \'flex\', flexDirection: \'column\''
  );
  
  // 4. Tables wrapping
  // Only wrap if it's not already wrapped (simple check: does not have <div className="table-responsive-wrapper"> right before it)
  // This is a naive regex but it usually works if we haven't wrapped it yet.
  if (!content.includes('table-responsive-wrapper')) {
    content = content.replace(
      /<table\s+style=\{\{/g,
      '<div className="table-responsive-wrapper"><table style={{'
    );
    content = content.replace(
      /<\/table>/g,
      '</table></div>'
    );
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
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
