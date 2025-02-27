import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.remove("bg-white", "text-black", "bg-gray-900", "text-white");
    
    if (theme === "dark") {
      document.documentElement.classList.add("bg-gray-900", "text-white");
    } else {
      document.documentElement.classList.add("bg-white", "text-black");
    }

    localStorage.setItem("theme", theme); // Save theme preference
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
