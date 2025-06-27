import { type ColorsTheme, Theme } from './theme.js';

const doomColors: ColorsTheme = {
  type: 'dark',
  Background: '#000000',
  Foreground: '#ff0000',
  LightBlue: '#ff4444',
  AccentBlue: '#cc0000',
  AccentPurple: '#990000',
  AccentCyan: '#ff6666',
  AccentGreen: '#00ff00',
  AccentYellow: '#ffff00',
  AccentRed: '#ff0000',
  Comment: '#660000',
  Gray: '#444444',
  GradientColors: ['#ff0000', '#ffff00', '#990000'],
};

export const Doom: Theme = new Theme('Doom', 'dark', {
  hljs: { display: 'block', overflowX: 'auto', padding: '0.5em', background: doomColors.Background, color: doomColors.Foreground },
  'hljs-keyword': { color: doomColors.AccentRed, fontWeight: 'bold' },
  'hljs-string': { color: doomColors.AccentYellow },
  'hljs-comment': { color: doomColors.Comment },
  'hljs-number': { color: doomColors.AccentYellow },
  'hljs-function': { color: doomColors.AccentRed, fontWeight: 'bold' },
  'hljs-variable': { color: doomColors.LightBlue },
  'hljs-title': { color: doomColors.AccentYellow, fontWeight: 'bold' },
  'hljs-type': { color: doomColors.AccentBlue },
  'hljs-built_in': { color: doomColors.AccentGreen },
}, doomColors);
