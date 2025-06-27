import { type ColorsTheme, Theme } from './theme.js';

const neonCityColors: ColorsTheme = {
  type: 'dark',
  Background: '#0f0f23',
  Foreground: '#00ffff',
  LightBlue: '#1e90ff',
  AccentBlue: '#0080ff',
  AccentPurple: '#8a2be2',
  AccentCyan: '#00ffff',
  AccentGreen: '#39ff14',
  AccentYellow: '#ffff00',
  AccentRed: '#ff073a',
  Comment: '#4169e1',
  Gray: '#2f2f2f',
  GradientColors: ['#ff073a', '#00ffff', '#39ff14'],
};

export const NeonCity: Theme = new Theme('Neon City', 'dark', {
  hljs: { display: 'block', overflowX: 'auto', padding: '0.5em', background: neonCityColors.Background, color: neonCityColors.Foreground },
  'hljs-keyword': { color: neonCityColors.AccentPurple, fontWeight: 'bold' },
  'hljs-string': { color: neonCityColors.AccentGreen },
  'hljs-comment': { color: neonCityColors.Comment },
  'hljs-number': { color: neonCityColors.AccentYellow },
  'hljs-function': { color: neonCityColors.AccentCyan, fontWeight: 'bold' },
  'hljs-variable': { color: neonCityColors.LightBlue },
  'hljs-title': { color: neonCityColors.AccentRed, fontWeight: 'bold' },
  'hljs-type': { color: neonCityColors.AccentBlue },
  'hljs-built_in': { color: neonCityColors.AccentGreen },
}, neonCityColors);
