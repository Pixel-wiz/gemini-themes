import { type ColorsTheme, Theme } from './theme.js';

const purpsColors: ColorsTheme = {
  type: 'dark',
  Background: '#1e0b2e',
  Foreground: '#e4c1f9',
  LightBlue: '#7209b7',
  AccentBlue: '#5b21b6',
  AccentPurple: '#a855f7',
  AccentCyan: '#c084fc',
  AccentGreen: '#84cc16',
  AccentYellow: '#fbbf24',
  AccentRed: '#f97316',
  Comment: '#7c3aed',
  Gray: '#581c87',
  GradientColors: ['#a855f7', '#c084fc', '#e4c1f9'],
};

export const Purps: Theme = new Theme(
  'Purps',
  'dark',
  {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      background: purpsColors.Background,
      color: purpsColors.Foreground,
    },
    'hljs-keyword': {
      color: purpsColors.AccentPurple,
      fontWeight: 'bold',
    },
    'hljs-string': {
      color: purpsColors.AccentGreen,
    },
    'hljs-comment': {
      color: purpsColors.Comment,
    },
    'hljs-number': {
      color: purpsColors.AccentYellow,
    },
    'hljs-function': {
      color: purpsColors.AccentCyan,
      fontWeight: 'bold',
    },
    'hljs-variable': {
      color: purpsColors.Foreground,
    },
    'hljs-title': {
      color: purpsColors.LightBlue,
      fontWeight: 'bold',
    },
    'hljs-type': {
      color: purpsColors.AccentBlue,
    },
    'hljs-built_in': {
      color: purpsColors.AccentPurple,
    },
  },
  purpsColors,
);
