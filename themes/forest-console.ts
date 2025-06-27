import { type ColorsTheme, Theme } from './theme.js';

const forestConsoleColors: ColorsTheme = {
  type: 'dark',
  Background: '#0d2818',
  Foreground: '#90ee90',
  LightBlue: '#40e0d0',
  AccentBlue: '#32cd32',
  AccentPurple: '#228b22',
  AccentCyan: '#00fa9a',
  AccentGreen: '#90ee90',
  AccentYellow: '#adff2f',
  AccentRed: '#cd853f',
  Comment: '#556b2f',
  Gray: '#2f4f4f',
  GradientColors: ['#0d2818', '#228b22', '#90ee90'],
};

export const ForestConsole: Theme = new Theme('Forest Console', 'dark', {
  hljs: { display: 'block', overflowX: 'auto', padding: '0.5em', background: forestConsoleColors.Background, color: forestConsoleColors.Foreground },
  'hljs-keyword': { color: forestConsoleColors.AccentGreen, fontWeight: 'bold' },
  'hljs-string': { color: forestConsoleColors.AccentYellow },
  'hljs-comment': { color: forestConsoleColors.Comment },
  'hljs-number': { color: forestConsoleColors.AccentCyan },
  'hljs-function': { color: forestConsoleColors.AccentBlue, fontWeight: 'bold' },
  'hljs-variable': { color: forestConsoleColors.LightBlue },
  'hljs-title': { color: forestConsoleColors.AccentYellow, fontWeight: 'bold' },
  'hljs-type': { color: forestConsoleColors.AccentPurple },
  'hljs-built_in': { color: forestConsoleColors.AccentCyan },
}, forestConsoleColors);
