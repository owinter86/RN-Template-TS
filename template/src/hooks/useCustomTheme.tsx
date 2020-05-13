import React, { useCallback, useState } from 'react';

const primaryLight = '#9BC8AB';
const primary = '#51A27E';
const primaryDark = '#006255';
const white = '#fff';
const black = '#000';

const defaultTheme = {
  white,
  black,
  primaryLight,
  primary,
  primaryDark,
  canvas: white,
  canvasLight: '#EBF4EE',
  canvasContrast: black,
  canvasAlert: '#FEF2F4',

  //Text
  baseText: black,
  contrastText: white,
  errorText: '#FF4500',
  fadedText: '#999999',
  dropdownText: '#2F363A',
  disabledText: '#C7D4DB',
  linkText: primary,
  headerText: primary,
  headerFadedText: primaryLight,
  selectedPrimaryText: '#82B68B',

  //Button
  primaryButton: primaryDark,
  disabledButton: '#D9D9D9',
  fadedBackground: '#E5E5E5',
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
