import { createContext, useState } from 'react';

import { PageTheme } from '@/interfaces/Themes';

const htmlElement = document.querySelector('html');
const isLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;

let initialThemeState: PageTheme;
const localTheme = localStorage.getItem('theme') as PageTheme | null;

if (localTheme) {
    initialThemeState = localTheme;
} else {
    initialThemeState = isLightTheme ? PageTheme.LIGHT : PageTheme.DARK;
}

interface ThemeContextInterface {
    theme: PageTheme;
    handleChangeTheme: (theme: PageTheme) => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
    theme: initialThemeState,
    handleChangeTheme: () => {},
});

interface ThemeContextProviderProps {
    children: React.ReactNode;
}

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    const [theme, setTheme] = useState<PageTheme>(initialThemeState);
    htmlElement!.dataset.theme = theme;

    function handleChangeTheme(themeText: PageTheme) {
        setTheme(themeText);
        localStorage.setItem('theme', themeText);
    }

    const contextValue = {
        theme,
        handleChangeTheme,
    };
    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export { ThemeContextProvider };
