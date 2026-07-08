const fs = require('fs');
const path = require('path');

// Fix TS6133 "declared but never used" by removing unused imports 
// Simple strategy: parse import declarations, compile each name, check if used in rest of file

function removeUnusedImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Match: import { A, B, C } from '...'
  content = content.replace(/import\s*\{([^}]+)\}\s*from\s*'[^']+';?\n?/g, (fullMatch, importList) => {
    const names = importList.split(',').map(s => s.trim()).filter(Boolean);
    const restOfFile = content.replace(fullMatch, '');
    const usedNames = names.filter(name => {
      // Check if name appears outside of the import statement
      const pattern = new RegExp(`\\b${name}\\b`, 'g');
      const matches = (restOfFile + ' ').match(pattern) || [];
      return matches.length > 0;
    });

    if (usedNames.length === 0) return ''; // Remove entire import
    if (usedNames.length === names.length) return fullMatch; // Nothing changed

    // Reconstruct import with only used names
    return fullMatch.replace(`{${importList}}`, `{ ${usedNames.join(', ')} }`);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Cleaned imports in', path.basename(filePath));
  }
}

const filesToClean = [
  'src/components/ai/AiAgentsList.tsx',
  'src/components/ai/BannerGenerator.tsx',
  'src/components/ai/content/AiBlogWriter.tsx',
  'src/components/ai/content/AiNewsletter.tsx',
  'src/components/ai/content/AiPressRelease.tsx',
  'src/components/ai/content/AiSocialMedia.tsx',
  'src/components/ai/Copywriter.tsx',
  'src/components/ai/ImageGenerator.tsx',
  'src/components/ai/VideoGenerator.tsx',
  'src/components/analytics/AiInsights.tsx',
  'src/components/analytics/AnalyticsDashboard.tsx',
  'src/components/analytics/Attribution.tsx',
  'src/components/analytics/RevenueReports.tsx',
  'src/components/analytics/SessionReplay.tsx',
  'src/components/automation/Scheduler.tsx',
  'src/components/automation/WorkflowBuilder.tsx',
  'src/components/cdp/AudienceBuilder.tsx',
  'src/components/cdp/Segments.tsx',
];

filesToClean.forEach(f => {
  const full = path.join(__dirname, f);
  if (fs.existsSync(full)) removeUnusedImports(full);
});
