#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const THEMES = [
  'matrix', 'synthwave', 'tron', 'vaporwave', 'doom',
  'pastel-kawaii', 'midnight-oil', 'forest-console', 
  'coffee-shop', 'neon-city', 'portal-lab'
];

function findGeminiCli() {
  const possiblePaths = [
    'node_modules/@google/gemini-cli',
    '../gemini-cli',
    '../../gemini-cli',
    process.env.GEMINI_CLI_PATH
  ].filter(Boolean);

  for (const p of possiblePaths) {
    const fullPath = path.resolve(p);
    if (fs.existsSync(path.join(fullPath, 'packages/cli/src/ui/themes'))) {
      return fullPath;
    }
  }

  try {
    const globalPath = execSync('npm list -g @google/gemini-cli --depth=0', { encoding: 'utf8' });
    const match = globalPath.match(/(@google\/gemini-cli@.+)/);
    if (match) {
      return path.dirname(match[0]);
    }
  } catch (e) {}

  return null;
}

function updateThemeManager(themesDir) {
  const managerPath = path.join(themesDir, 'theme-manager.ts');
  if (!fs.existsSync(managerPath)) {
    console.error('theme-manager.ts not found');
    return false;
  }

  let content = fs.readFileSync(managerPath, 'utf8');
  
  const imports = THEMES.map(theme => {
    const name = theme.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    return `import { ${name} } from './${theme}.js';`;
  }).join('\n');

  const themeNames = THEMES.map(theme => 
    theme.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')
  );

  const importRegex = /(import.*from.*['"]\.\/.*['"];?\n)*/;
  const availableThemesRegex = /this\.availableThemes = \[([\s\S]*?)\];/;

  content = content.replace(importRegex, match => {
    return match + imports + '\n';
  });

  content = content.replace(availableThemesRegex, (match, existing) => {
    const existingThemes = existing.split(',').map(t => t.trim()).filter(t => t && !themeNames.includes(t));
    const allThemes = [...existingThemes, ...themeNames].join(',\n      ');
    return `this.availableThemes = [\n      ${allThemes},\n    ];`;
  });

  fs.writeFileSync(managerPath, content);
  return true;
}

function installThemes() {
  console.log('Looking for Gemini CLI installation...');
  
  const geminiPath = findGeminiCli();
  if (!geminiPath) {
    console.error('Gemini CLI not found. Make sure it\'s installed globally or set GEMINI_CLI_PATH');
    process.exit(1);
  }

  const themesDir = path.join(geminiPath, 'packages/cli/src/ui/themes');
  console.log(`Found Gemini CLI at: ${geminiPath}`);

  for (const theme of THEMES) {
    const src = path.join(__dirname, 'themes', `${theme}.ts`);
    const dest = path.join(themesDir, `${theme}.ts`);
    
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`✓ Installed ${theme}`);
    } else {
      console.warn(`⚠ Theme file not found: ${src}`);
    }
  }

  if (updateThemeManager(themesDir)) {
    console.log('✓ Updated theme-manager.ts');
  }

  console.log('\nRebuilding Gemini CLI...');
  try {
    execSync('npm run build', { cwd: geminiPath, stdio: 'inherit' });
    console.log('✓ Build complete');
    
    console.log('\nInstalling globally...');
    execSync('npm install -g .', { cwd: geminiPath, stdio: 'inherit' });
    console.log('✓ Global install complete');
    
    console.log('\n🎉 Themes installed! Use /theme in Gemini CLI to switch.');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  installThemes();
}

module.exports = { installThemes, THEMES };
