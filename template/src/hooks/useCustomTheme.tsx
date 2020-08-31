import React, { useCallback, useState } from 'react';

// do not export colors, use customTheme hook to extract colors allowing component subscribe to light mode dark mode changes
const colors = {
  yellow: '#FFEB14',
  yellowDark: '#F8D500',
  redLight: '#FBE5E6',
  red: '#E15055',
  redDark: '#C3373C',
  blue: '#78D7F0',
  blueDark: '#34B4D6',
  fadedText: '#94A1AE',
  white: 'white',
  black: 'black',
  lightGrey: '#EBEFF3',
  greenLight: '#35E58D',
  borderGrey: '#C8CFD6',
  accent: '#F7931A',
};

const defaultTheme = {
  yellow: colors.yellow,
  yellowDark: colors.yellowDark,
  blue: colors.blue,
  blueFaded: 'rgba(135,202,225,1)',
  blueDark: colors.blueDark,
  red: colors.red,
  redDark: colors.redDark,
  redLight: colors.redLight,
  lightGrey: colors.lightGrey,
  greenLight: colors.greenLight,
  borderGrey: colors.borderGrey,
  fadedBackground: '#F3F6FA',
  fadedBackgroundDark: '#E6EBF0',
  accent: colors.accent,

  canvas: colors.white,
  borderColorFaded: colors.lightGrey,

  //Text
  baseText: colors.black,
  error: colors.red,
  negativeText: colors.red,
  positiveText: '#22CC77',
  linkText: '#00A9D0',
  accentText: colors.accent,
  fadedText: colors.fadedText,
  bodyText: '#5E6E7B',
  contrastText: colors.white,
  selectedText: '#00A8D4',

  //Button
  yellowButton: colors.yellow,
  yellowButtonShadow: colors.yellowDark,
  whiteButton: colors.white,
  whiteButtonShadow: colors.lightGrey,
  blueButton: colors.blue,
  blueButtonShadow: colors.blueDark,
  redButton: colors.red,
  redButtonShadow: colors.redDark,
  disabledButton: colors.lightGrey,
  disabledButtonShadow: '#D0D8DF',

  // tab bar
  activeTab: 'black',
  inactiveTab: colors.fadedText,
} as const;

type Theme = typeof defaultTheme;

export const ThemeContextUpdater = React.createContext<(theme: Theme) => void>((_: Theme) => {});
export const ThemeContext = React.createContext<Theme>(defaultTheme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const changeTheme = useCallback((updatedTheme: Theme) => {
    setTheme(updatedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeContextUpdater.Provider value={changeTheme}>{children}</ThemeContextUpdater.Provider>
    </ThemeContext.Provider>
  );
}

export function useCustomTheme() {
  const theme = React.useContext(ThemeContext);
  return theme;
}
