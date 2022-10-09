import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  success_50: '#f0fdf4',
  success_100: '#dcfce7',
  success_200: '#bbf7d0',
  success_300: '#86efac',
  success_400: '#4ade80',
  success_500: '#22c55e',
  success_600: '#16a34a',
  success_700: '#15803d',
  success_800: '#166534',
  success_900: '#14532d',
  rose_600: '#e11d48',
  green: '#27AE60',
  red: '#FF1717',
  blue: '#0064C0',
  darkBlue: '#111A2C',
  darkGray: '#525C67',
  darkGray2: '#757D85',
  gray: '#898B9A',
  gray2: '#BBBDC1',
  gray3: '#CFD0D7',
  lightGray1: '#DDDDDD',
  lightGray2: '#F5F5F8',
  white3: '#F8F8FF',
  white2: '#FBFBFB',
  white: '#FFFFFF',
  black: '#000000',
  tertiary50: '#ecfdf5',
  teal_400: '#2dd4bf',

  transparent: 'transparent',
  transparentBlack1: 'rgba(0, 0, 0, 0.1)',
  transparentBlack2: 'rgba(0, 0, 0, 0.2)',
  transparentBlack3: 'rgba(0, 0, 0, 0.3)',
  transparentBlack4: 'rgba(0, 0, 0, 0.4)',
  transparentBlack5: 'rgba(0, 0, 0, 0.5)',
  transparentBlack6: 'rgba(0, 0, 0, 0.6)',
  transparentBlack7: 'rgba(0, 0, 0, 0.7)',
  transparentBlack8: 'rgba(0, 0, 0, 0.8)',

  blue_50: '#eff6ff',
  blue_100: '#dbeafe',
  blue_200: '#bfdbfe',
  blue_300: '#93c5fd',
  blue_400: '#60a5fa',
  blue_500: '#3b82f6',
  blue_600: '#2563eb',
  blue_700: '#1d4ed8',
  blue_800: '#1e40af',
  blue_900: '#1e3a8a',

  orange_400: '#fb923c',
  orange_500: '#f97316',
  orange_600: '#ea580c',

  amber_300: '#fcd34d',
  amber_400: '#fbbf24',
  amber_500: '#f59e0b',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {fontFamily: 'Poppins-Black', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h5, lineHeight: 22},
  h6: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h5, lineHeight: 18},
  body1: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body5, lineHeight: 22},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
