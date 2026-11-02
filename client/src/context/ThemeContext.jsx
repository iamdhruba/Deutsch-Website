import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme state: 'light', 'dark', 'system'
  const [theme, setTheme] = useState(() => localStorage.getItem('lernen_theme') || 'system');
  const [dyslexiaFont, setDyslexiaFont] = useState(() => localStorage.getItem('lernen_dyslexia') === 'true');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('lernen_fontsize') || 'base');
  const [uiLanguage, setUiLanguage] = useState(() => localStorage.getItem('lernen_uilang') || 'en');

  // Compute effective dark mode
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const checkSystemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

    let shouldBeDark = false;
    if (theme === 'dark') shouldBeDark = true;
    else if (theme === 'light') shouldBeDark = false;
    else shouldBeDark = checkSystemDark();

    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('lernen_theme', theme);
  }, [theme]);

  // Apply Dyslexia font
  useEffect(() => {
    if (dyslexiaFont) {
      document.body.classList.add('font-dyslexia');
    } else {
      document.body.classList.remove('font-dyslexia');
    }
    localStorage.setItem('lernen_dyslexia', String(dyslexiaFont));
  }, [dyslexiaFont]);

  // Apply font size scale
  useEffect(() => {
    document.body.classList.remove('text-scale-sm', 'text-scale-base', 'text-scale-lg', 'text-scale-xl');
    document.body.classList.add(`text-scale-${fontSize}`);
    localStorage.setItem('lernen_fontsize', fontSize);
  }, [fontSize]);

  // Handle UI language
  const changeUiLanguage = (lang) => {
    setUiLanguage(lang);
    localStorage.setItem('lernen_uilang', lang);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        setTheme,
        toggleTheme,
        dyslexiaFont,
        setDyslexiaFont,
        fontSize,
        setFontSize,
        uiLanguage,
        setUiLanguage: changeUiLanguage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
