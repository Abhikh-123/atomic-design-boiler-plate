// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   type ReactNode,
// } from 'react';

// interface ThemeContextType {
//   theme: string;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const useTheme = (): ThemeContextType => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// interface ThemeProviderProps {
//   children: ReactNode;
// }

// export const ThemeProvider = ({ children }: ThemeProviderProps) => {
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

//   const toggleTheme = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };

//   const theme = isDarkMode ? 'dark' : 'light';

//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', theme);
//   }, [isDarkMode, theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
import { createContext } from 'react';

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
