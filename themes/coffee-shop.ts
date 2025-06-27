import { type ColorsTheme, Theme } from './theme.js';

const coffeeShopColors: ColorsTheme = {
  type: 'dark',
  Background: '#3c2415',
  Foreground: '#f5deb3',
  LightBlue: '#deb887',
  AccentBlue: '#8b7355',
  AccentPurple: '#a0522d',
  AccentCyan: '#daa520',
  AccentGreen: '#bdb76b',
  AccentYellow: '#f4a460',
  AccentRed: '#cd853f',
  Comment: '#8b7d6b',
  Gray: '#696969',
  GradientColors: ['#3c2415', '#8b7355', '#f5deb3'],
};

export const CoffeeShop: Theme = new Theme('Coffee Shop', 'dark', {
  hljs: { display: 'block', overflowX: 'auto', padding: '0.5em', background: coffeeShopColors.Background, color: coffeeShopColors.Foreground },
  'hljs-keyword': { color: coffeeShopColors.AccentPurple, fontWeight: 'bold' },
  'hljs-string': { color: coffeeShopColors.AccentYellow },
  'hljs-comment': { color: coffeeShopColors.Comment },
  'hljs-number': { color: coffeeShopColors.AccentCyan },
  'hljs-function': { color: coffeeShopColors.AccentGreen, fontWeight: 'bold' },
  'hljs-variable': { color: coffeeShopColors.LightBlue },
  'hljs-title': { color: coffeeShopColors.AccentRed, fontWeight: 'bold' },
  'hljs-type': { color: coffeeShopColors.AccentBlue },
  'hljs-built_in': { color: coffeeShopColors.AccentYellow },
}, coffeeShopColors);
