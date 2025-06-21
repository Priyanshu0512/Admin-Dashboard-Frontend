import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = {
    colors: {
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        900: "#1e3a8a",
      },
      secondary: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
      },
      accent: {
        50: "#fff7ed",
        100: "#ffedd5",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
      },
      success: {
        50: "#f0fdf4",
        500: "#22c55e",
        600: "#16a34a",
      },
      warning: {
        50: "#fffbeb",
        500: "#f59e0b",
        600: "#d97706",
      },
      error: {
        50: "#fef2f2",
        500: "#ef4444",
        600: "#dc2626",
      },
      dark: {
        50: "#f8f9fa",
        100: "#f1f3f4",
        200: "#e8eaed",
        300: "#dadce0",
        400: "#bdc1c6",
        500: "#9aa0a6",
        600: "#80868b",
        700: "#5f6368",
        800: "#3c4043",
        850: "#2d2e30",
        900: "#202124",
        950: "#171717",
      },
    },
  };

  const value = {
    darkMode,
    toggleDarkMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
