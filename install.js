#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ThemeInstaller {
  constructor() {
    this.themes = [
      { id: 'matrix', name: 'Matrix', description: 'Green on black Matrix style', selected: false },
      { id: 'synthwave', name: 'Synthwave', description: 'Purple/pink 80s retro', selected: false },
      { id: 'tron', name: 'Tron', description: 'Cyan/orange geometric', selected: false },
      { id: 'vaporwave', name: 'Vaporwave', description: 'Pink/purple aesthetic', selected: false },
      { id: 'doom', name: 'Doom', description: 'Red/black aggressive', selected: false },
      { id: 'pastel-kawaii', name: 'Pastel Kawaii', description: 'Soft pastels', selected: false },
      { id: 'midnight-oil', name: 'Midnight Oil', description: 'Dark blue/cream', selected: false },
      { id: 'forest-console', name: 'Forest Console', description: 'Nature greens', selected: false },
      { id: 'coffee-shop', name: 'Coffee Shop', description: 'Warm browns', selected: false },
      { id: 'neon-city', name: 'Neon City', description: 'Urban neon', selected: false },
      { id: 'portal-lab', name: 'Portal Lab', description: 'Clean white/gray with orange/blue', selected: false },
      { id: 'hacker-blue', name: 'Hacker Blue', description: 'Bright blue hacker style', selected: false },
      { id: 'sakura', name: 'Sakura', description: 'Pink cherry blossom theme', selected: false },
      { id: 'orange-dark', name: 'Orange Dark', description: 'Dark orange warm tones', selected: false },
      { id: 'purps', name: 'Purps', description: 'Deep purple theme', selected: false },
      { id: 'pinky', name: 'Pinky', description: 'Hot pink and magenta', selected: false },
      { id: 'chroma', name: 'Chroma', description: 'Bright colorful light theme', selected: false },
      { id: 'odyssey', name: 'Odyssey', description: 'Modern GitHub-inspired dark', selected: false }
    ];
    this.currentIndex = 0;
    this.colors = {};
    this.loadThemeColors();
  }

  loadThemeColors() {
    const themesDir = path.join(__dirname, 'themes');
    this.themes.forEach(theme => {
      const themeFile = path.join(themesDir, `${theme.id}.ts`);
      if (fs.existsSync(themeFile)) {
        try {
          const content = fs.readFileSync(themeFile, 'utf8');
          const bgMatch = content.match(/Background:\s*['"]([^'"]+)['"]/);
          const fgMatch = content.match(/Foreground:\s*['"]([^'"]+)['"]/);
          const accentMatch = content.match(/AccentCyan:\s*['"]([^'"]+)['"]/);
          const stringMatch = content.match(/AccentGreen:\s*['"]([^'"]+)['"]/);
          
          this.colors[theme.id] = {
            bg: bgMatch ? bgMatch[1] : '#000000',
            fg: fgMatch ? fgMatch[1] : '#ffffff',
            accent: accentMatch ? accentMatch[1] : (stringMatch ? stringMatch[1] : '#00ffff'),
            string: stringMatch ? stringMatch[1] : '#00ff00'
          };
        } catch (e) {
          this.colors[theme.id] = { bg: '#000000', fg: '#ffffff', accent: '#00ffff', string: '#00ff00' };
        }
      }
    });
  }

  colorize(text, color) {
    const colors = {
      reset: '\x1b[0m',
      bright: '\x1b[1m',
      cyan: '\x1b[36m',
      yellow: '\x1b[33m',
      gray: '\x1b[90m'
    };
    return colors[color] + text + colors.reset;
  }

  createPreview(themeId) {
    const colors = this.colors[themeId];
    if (!colors) return '';
    
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    
    const bg = hexToRgb(colors.bg);
    const fg = hexToRgb(colors.fg);
    const accent = hexToRgb(colors.accent);
    const string = hexToRgb(colors.string);
    
    const bgCode = `\x1b[48;2;${bg.r};${bg.g};${bg.b}m`;
    const fgCode = `\x1b[38;2;${fg.r};${fg.g};${fg.b}m`;
    const accentCode = `\x1b[38;2;${accent.r};${accent.g};${accent.b}m`;
    const stringCode = `\x1b[38;2;${string.r};${string.g};${string.b}m`;
    const reset = '\x1b[0m';
    
    return `${bgCode}${fgCode} ${accentCode}function${fgCode} ${accentCode}greet${fgCode}() { ${accentCode}console${fgCode}.${accentCode}log${fgCode}(${stringCode}"Hello, Gemini!"${fgCode}); } ${reset}`;
  }

  draw() {
    console.clear();
    console.log(this.colorize('Gemini CLI Theme Installer', 'bright'));
    console.log('='.repeat(50));
    console.log();
    console.log('Controls: ↑↓ Navigate | Space Toggle | Enter Install | A Select All | N Select None | Q Quit');
    console.log();
    
    this.themes.forEach((theme, index) => {
      const isSelected = index === this.currentIndex;
      const checkbox = theme.selected ? '[✓]' : '[ ]';
      const marker = isSelected ? '❯' : ' ';
      const preview = this.createPreview(theme.id);
      
      let line = `${marker} ${checkbox} ${theme.name}`;
      if (isSelected) {
        line = this.colorize(line, 'cyan');
      }
      
      console.log(line);
      
      if (isSelected) {
        console.log(`    ${this.colorize(theme.description, 'gray')}`);
        if (preview) {
          console.log(`    ${preview}`);
        }
        console.log();
      }
    });
    
    const selectedCount = this.themes.filter(t => t.selected).length;
    console.log(`Selected: ${this.colorize(selectedCount.toString(), 'yellow')}/${this.themes.length} themes`);
    
    if (selectedCount > 0) {
      console.log('\nPress Enter to install selected themes');
    }
  }

  handleInput(key) {
    switch (key) {
      case '\u001b[A':
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        break;
      case '\u001b[B':
        this.currentIndex = Math.min(this.themes.length - 1, this.currentIndex + 1);
        break;
      case ' ':
        this.themes[this.currentIndex].selected = !this.themes[this.currentIndex].selected;
        break;
      case '\r':
        return 'install';
      case 'q':
      case 'Q':
        return 'quit';
      case 'a':
      case 'A':
        this.themes.forEach(theme => theme.selected = true);
        break;
      case 'n':
      case 'N':
        this.themes.forEach(theme => theme.selected = false);
        break;
    }
    return 'continue';
  }

  async run() {
    return new Promise((resolve) => {
      if (!process.stdin.isTTY) {
        resolve(this.themes.map(t => t.id));
        return;
      }

      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      
      this.draw();
      
      const cleanup = () => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
      };
      
      process.stdin.on('data', (key) => {
        if (key === '\u0003') {
          cleanup();
          console.clear();
          process.exit(0);
        }
        
        const action = this.handleInput(key);
        
        if (action === 'quit') {
          cleanup();
          console.clear();
          resolve([]);
        } else if (action === 'install') {
          const selected = this.themes.filter(t => t.selected).map(t => t.id);
          cleanup();
          resolve(selected);
        } else {
          this.draw();
        }
      });
    });
  }
}

function isWindows() {
  return process.platform === 'win32';
}

function findGeminiCli() {
  const possiblePaths = [
    'node_modules/@google/gemini-cli',
    '../gemini-cli',
    '../../gemini-cli',
    process.env.GEMINI_CLI_PATH,
    isWindows() 
      ? path.join(process.env.USERPROFILE || '', 'gemini-cli')
      : path.join(process.env.HOME || '', 'gemini-cli'),
    isWindows()
      ? path.join(process.env.APPDATA || '', 'npm', 'node_modules', '@google', 'gemini-cli')
      : null,
    isWindows()
      ? 'C:\\Program Files\\nodejs\\node_modules\\@google\\gemini-cli'
      : '/usr/local/lib/node_modules/@google/gemini-cli',
    isWindows()
      ? null
      : '/opt/homebrew/lib/node_modules/@google/gemini-cli',
    // Add path for Linux global npm installations
    isWindows()
      ? null
      : '/usr/lib/node_modules/@google/gemini-cli',
  ].filter(Boolean);

  for (const p of possiblePaths) {
    try {
      const fullPath = path.resolve(p);
      // Check for both development structure and npm-installed structure
      const devThemesPath = path.join(fullPath, 'packages', 'cli', 'src', 'ui', 'themes');
      const distThemesPath = path.join(fullPath, 'dist', 'src', 'ui', 'themes');
      
      if (fs.existsSync(devThemesPath)) {
        return { path: fullPath, themesDir: devThemesPath, isDist: false };
      } else if (fs.existsSync(distThemesPath)) {
        return { path: fullPath, themesDir: distThemesPath, isDist: true };
      }
    } catch (e) {}
  }

  try {
    const result = execSync(isWindows() ? 'where node' : 'which node', { encoding: 'utf8' }).trim();
    if (result) {
      const nodeDir = path.dirname(result);
      const globalPaths = [
        path.join(nodeDir, '..', 'lib', 'node_modules', '@google', 'gemini-cli'),
        path.join(nodeDir, 'node_modules', '@google', 'gemini-cli'),
        path.join(nodeDir, '..', 'node_modules', '@google', 'gemini-cli'),
      ];
      
      for (const geminiPath of globalPaths) {
        const devThemesPath = path.join(geminiPath, 'packages', 'cli', 'src', 'ui', 'themes');
        const distThemesPath = path.join(geminiPath, 'dist', 'src', 'ui', 'themes');
        
        if (fs.existsSync(devThemesPath)) {
          return { path: geminiPath, themesDir: devThemesPath, isDist: false };
        } else if (fs.existsSync(distThemesPath)) {
          return { path: geminiPath, themesDir: distThemesPath, isDist: true };
        }
      }
    }
  } catch (e) {}

  try {
    const npmPrefix = execSync('npm config get prefix', { encoding: 'utf8' }).trim();
    const globalPath = path.join(npmPrefix, isWindows() ? 'node_modules' : 'lib/node_modules', '@google', 'gemini-cli');
    const devThemesPath = path.join(globalPath, 'packages', 'cli', 'src', 'ui', 'themes');
    const distThemesPath = path.join(globalPath, 'dist', 'src', 'ui', 'themes');
    
    if (fs.existsSync(devThemesPath)) {
      return { path: globalPath, themesDir: devThemesPath, isDist: false };
    } else if (fs.existsSync(distThemesPath)) {
      return { path: globalPath, themesDir: distThemesPath, isDist: true };
    }
  } catch (e) {}

  try {
    const globalList = execSync('npm list -g @google/gemini-cli --depth=0 --json', { encoding: 'utf8' });
    const data = JSON.parse(globalList);
    if (data.dependencies && data.dependencies['@google/gemini-cli']) {
      const basePath = data.dependencies['@google/gemini-cli'].path || path.join(data.path, 'node_modules', '@google', 'gemini-cli');
      const devThemesPath = path.join(basePath, 'packages', 'cli', 'src', 'ui', 'themes');
      const distThemesPath = path.join(basePath, 'dist', 'src', 'ui', 'themes');
      
      if (fs.existsSync(devThemesPath)) {
        return { path: basePath, themesDir: devThemesPath, isDist: false };
      } else if (fs.existsSync(distThemesPath)) {
        return { path: basePath, themesDir: distThemesPath, isDist: true };
      }
    }
  } catch (e) {}

  return null;
}

async function promptForPath() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
  }
  
  console.log('\nCould not auto-detect Gemini CLI installation.');
  console.log('Please enter the path to your gemini-cli directory:');
  
  while (true) {
    const userPath = await question('Path: ');
    const fullPath = path.resolve(userPath.trim());
    const devThemesPath = path.join(fullPath, 'packages', 'cli', 'src', 'ui', 'themes');
    const distThemesPath = path.join(fullPath, 'dist', 'src', 'ui', 'themes');
    
    if (fs.existsSync(devThemesPath)) {
      rl.close();
      return { path: fullPath, themesDir: devThemesPath, isDist: false };
    } else if (fs.existsSync(distThemesPath)) {
      rl.close();
      return { path: fullPath, themesDir: distThemesPath, isDist: true };
    } else {
      console.log('Invalid path. Try again.');
    }
  }
}

function updateThemeManager(themesDir, selectedThemes, isDist = false) {
  // In dist directory, files might be .js instead of .ts
  let managerPath = path.join(themesDir, 'theme-manager.ts');
  if (!fs.existsSync(managerPath) && isDist) {
    managerPath = path.join(themesDir, 'theme-manager.js');
  }
  if (!fs.existsSync(managerPath)) {
    return false;
  }

  let content = fs.readFileSync(managerPath, 'utf8');
  
  const imports = selectedThemes.map(themeId => {
    const name = themeId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    return `import { ${name} } from './${themeId}.js';`;
  }).join('\n');

  const themeNames = selectedThemes.map(themeId => 
    themeId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')
  );

  selectedThemes.forEach(themeId => {
    const name = themeId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    const importRegex = new RegExp(`import\\s*{\\s*${name}\\s*}\\s*from\\s*['"]\\.\/${themeId}\\.js['"];?\\n?`, 'g');
    content = content.replace(importRegex, '');
  });

  const lastImportIndex = content.lastIndexOf("import");
  if (lastImportIndex !== -1) {
    const nextLineIndex = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, nextLineIndex + 1) + imports + '\n' + content.slice(nextLineIndex + 1);
  }

  const availableThemesRegex = /this\.availableThemes = \[([\s\S]*?)\];/;
  content = content.replace(availableThemesRegex, (match, existing) => {
    const existingThemes = existing.split(',')
      .map(t => t.trim())
      .filter(t => t && !themeNames.includes(t));
    
    const allThemes = [...existingThemes, ...themeNames].join(',\n      ');
    return `this.availableThemes = [\n      ${allThemes},\n    ];`;
  });

  fs.writeFileSync(managerPath, content);
  return true;
}

async function installThemes() {
  console.log('Looking for Gemini CLI installation...');
  
  let geminiInfo = findGeminiCli();
  if (!geminiInfo) {
    geminiInfo = await promptForPath();
  }

  console.log(`Found Gemini CLI at: ${geminiInfo.path}`);
  
  const installer = new ThemeInstaller();
  const selectedThemes = await installer.run();
  
  if (selectedThemes.length === 0) {
    return;
  }
  
  console.clear();
  console.log('Installing themes...');
  
  const themesDir = geminiInfo.themesDir;

  let installedCount = 0;
  for (const themeId of selectedThemes) {
    const src = path.join(__dirname, 'themes', `${themeId}.ts`);
    // In dist directory, we might need to copy as .js files
    const ext = geminiInfo.isDist ? '.js' : '.ts';
    const dest = path.join(themesDir, `${themeId}${ext}`);
    
    if (fs.existsSync(src)) {
      // If copying to dist as .js, we need to transpile or at least rename imports
      let content = fs.readFileSync(src, 'utf8');
      if (geminiInfo.isDist) {
        // Simple conversion: change .ts imports to .js and remove TypeScript syntax
        content = content.replace(/from\s+['"]\.\/([\w-]+)\.ts['"]/g, "from './$1.js'");
        // Remove TypeScript type annotations from imports
        content = content.replace(/import\s*{\s*type\s+\w+,?\s*/g, "import { ");
        content = content.replace(/import\s*{\s*,?\s*type\s+\w+\s*}/g, "import { }");
        // Remove type annotations from variable declarations
        content = content.replace(/:\s*\w+\s*=/g, " =");
        content = content.replace(/export\s+const\s+(\w+):\s*\w+\s*=/g, "export const $1 =");
      }
      fs.writeFileSync(dest, content);
      const themeName = installer.themes.find(t => t.id === themeId)?.name || themeId;
      console.log(`✓ ${themeName}`);
      installedCount++;
    }
  }

  if (installedCount === 0) {
    return;
  }

  if (updateThemeManager(themesDir, selectedThemes, geminiInfo.isDist)) {
    console.log('✓ Updated theme manager');
  }

  console.log('\nSkipping auto-build. If themes don\'t appear, run this in the gemini-cli directory:');
  console.log('npm run build && npm install -g .');

  console.log(`\nSuccess! Installed ${installedCount} theme(s).`);
  console.log('\n1. Run: gemini');
  console.log('2. Type: /theme');
  console.log('3. Select your new theme!');
}

installThemes().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
