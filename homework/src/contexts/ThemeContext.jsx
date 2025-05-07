import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {


  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem("savedTheme");
    console.log(saved)
    if (saved) {
      return JSON.parse(saved);
    }
    return false;
  };
  
  const [isDarkTheme, setIsDarkTheme] = useState(loadFromLocalStorage());

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };
  useEffect(() => {
    localStorage.setItem("savedTheme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};