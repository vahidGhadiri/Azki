import { useState, useEffect, useCallback } from "react";

type Themes = {
  light: string;
  dark?: string;
};

type Colors = Record<string, Themes>;

const useTheme = (colors: Colors, initialTheme: keyof Themes = "light") => {
  const [theme, setTheme] = useState<keyof Themes>(initialTheme);

  const setColors = useCallback((theme: keyof Themes) => {
    const themeRoot = document.documentElement;

    for (const color in colors) {
      themeRoot.style.setProperty(`--${color}`, colors[color][theme]);
    }
    setTheme(theme);
  }, [colors]);

  useEffect(() => {
    setColors(theme);
  }, [theme, colors, setColors]);

  return { setColors, theme };
};

export default useTheme;
