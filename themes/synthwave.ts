import { type ColorsTheme, Theme } from './theme.js';

const synthwaveColors: ColorsTheme = {
  type: 'dark',
  Background: '#1a0333',
  Foreground: '#ff00ff',
  LightBlue: '#00ffff',
  AccentBlue: '#0080ff',
  AccentPurple: '#ff00ff',
  AccentCyan: '#00ffff',
  AccentGreen: '#00ff80',
  AccentYellow: '#ffff00',
  AccentRed: '#ff0080',
  Comment: '#8b4599',
  Gray: '#2d1b69',
  GradientColors: ['#ff00ff', '#00ffff', '#ffff00'],
};

export const Synthwave: Theme = new Theme(
  'Synthwave',
  'dark',
  {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      background: synthwaveColors.Background,
      color: synthwaveColors.Foreground,
    },
    'hljs-keyword': {
      color: synthwaveColors.AccentPurple,
      fontWeight: 'bold',
    },
    'hljs-string': {
      color: synthwaveColors.AccentCyan,
    },
    'hljs-comment': {
      color: synthwaveColors.Comment,
    },
    'hljs-number': {
      color: synthwaveColors.AccentYellow,
    },
    'hljs-function': {
      color: synthwaveColors.AccentPurple,
      fontWeight: 'bold',
    },
    'hljs-variable': {
      color: synthwaveColors.LightBlue,
    },
    'hljs-title': {
      color: synthwaveColors.AccentCyan,
      fontWeight: 'bold',
    },
    'hljs-type': {
      color: synthwaveColors.AccentYellow,
    },
    'hljs-built_in': {
      color: synthwaveColors.AccentPurple,
    },
  },
  synthwaveColors,
);
