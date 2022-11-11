import React, { useContext, useState } from 'react';
const ThemeContext = React.createContext('');
const ThemeUpdateContext = React.createContext((theme: string) => {});
export function useTheme() {
    return useContext(ThemeContext);
}
export function useThemeUpdate(theme: string) {
    return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }: any) {
    const [OTheme, setOTheme] = useState('theme-orange');
    const toggleTheme = (theme: string) => {
        setOTheme(theme);
    }
    return (
        <ThemeContext.Provider value={OTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}
