import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'enspired-theme';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return true;
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'light') {
    return false;
  }
  if (savedTheme === 'dark') {
    return true;
  }

  return true;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const lightLogo = new Image();
    lightLogo.src = '/logo.svg';

    const darkLogo = new Image();
    darkLogo.src = '/logo%20dark.svg';
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const value = useMemo(
    () => ({
      isDark,
      toggleTheme: () => setIsDark((prev) => !prev),
    }),
    [isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
