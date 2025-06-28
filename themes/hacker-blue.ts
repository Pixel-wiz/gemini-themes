import { type ColorsTheme, Theme } from './theme.js';

const hackerBlueColors: ColorsTheme = {
  type: 'dark',
  Background: '#0a0e27',
  Foreground: '#00d4ff',
  LightBlue: '#4dc3ff',
  AccentBlue: '#0088cc',
  AccentPurple: '#6c5ce7',
  AccentCyan: '#00d4ff',
  AccentGreen: '#00ff88',
  AccentYellow: '#ffeb3b',
  AccentRed: '#ff4757',
  Comment: '#546e7a',
  Gray: '#37474f',
  GradientColors: ['#00d4ff', '#4dc3ff', '#00ff88'],
};

export const HackerBlue: Theme = new Theme(
  'HackerBlue',
  'dark',
  {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      background: hackerBlueColors.Background,
      color: hackerBlueColors.Foreground,
    },
    'hljs-keyword': {
      color: hackerBlueColors.AccentBlue,
      fontWeight: 'bold',
    },
    'hljs-string': {
      color: hackerBlueColors.AccentGreen,
    },
    'hljs-comment': {
      color: hackerBlueColors.Comment,
    },
    'hljs-number': {
      color: hackerBlueColors.AccentYellow,
    },
    'hljs-function': {
      color: hackerBlueColors.LightBlue,
      fontWeight: 'bold',
    },
    'hljs-variable': {
      color: hackerBlueColors.Foreground,
    },
    'hljs-title': {
      color: hackerBlueColors.AccentCyan,
      fontWeight: 'bold',
    },
    'hljs-type': {
      color: hackerBlueColors.AccentPurple,
    },
    'hljs-built_in': {
      color: hackerBlueColors.LightBlue,
    },
  },
  hackerBlueColors,
);
