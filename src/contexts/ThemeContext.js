import { createContext, useState } from "react";

const DarkModeContext = createContext();

const DarkModeContextProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.className = darkMode ? 'light-theme' : 'dark-theme';
    }

    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )

}

export { DarkModeContext, DarkModeContextProvider}