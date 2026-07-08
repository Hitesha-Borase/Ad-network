const fs = require('fs');
const path = require('path');

// Manually fix specific files: restore "ImageIcon" as import alias for "Image"
// and remove remaining unused imports

const fixes = {
  'src/components/ai/ImageGenerator.tsx': {
    find: `import { Sparkles, Download, Settings, RefreshCw } from 'lucide-react';`,
    replace: `import { Sparkles, Image as ImageIcon, Download, RefreshCw } from 'lucide-react';`
  },
  'src/components/ai/content/AiNewsletter.tsx': {
    find: `import { Mail, Sparkles, LayoutTemplate, Type, Hand, CheckCircle2 } from 'lucide-react';`,
    replace: `import { Mail, Sparkles, LayoutTemplate, Image as ImageIcon, Type, Hand } from 'lucide-react';`
  },
  'src/components/ai/content/AiSocialMedia.tsx': {
    find: `import { Share2, Sparkles, Hash, MessageCircle, Heart, Repeat2, Bookmark } from 'lucide-react';`,
    replace: `import { Share2, Sparkles, Image as ImageIcon, Hash, MessageCircle, Heart, Repeat2 } from 'lucide-react';`
  },
  'src/components/ai/VideoGenerator.tsx': {
    find: `import { Video, Play, Music, Mic, Settings, Download, Film } from 'lucide-react';`,
    replace: `import { Video, Play, Music, Mic, Download, Film } from 'lucide-react';`
  },
  'src/components/analytics/SessionReplay.tsx': {
    find: `import { Play, Monitor, Clock, Search, Activity } from 'lucide-react';`,
    replace: `import { Play, Monitor, Clock, Activity } from 'lucide-react';`
  },
};

Object.entries(fixes).forEach(([relPath, fix]) => {
  const full = path.join(__dirname, relPath);
  if (!fs.existsSync(full)) {
    console.log('Not found:', relPath);
    return;
  }
  let content = fs.readFileSync(full, 'utf8');
  if (content.includes(fix.find)) {
    content = content.replace(fix.find, fix.replace);
    fs.writeFileSync(full, content, 'utf8');
    console.log('Fixed:', path.basename(full));
  } else {
    // Try to find the import line and report it
    const importLine = content.split('\n').find(l => l.includes('lucide-react'));
    console.log('Skipped (not matched):', path.basename(full));
    console.log('  Current import:', importLine);
  }
});
