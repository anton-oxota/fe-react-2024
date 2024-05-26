import { useContext } from 'react';

import { ThemeContext } from '@/context/Theme.context';

function useThemeContext() {
    const { theme, handleChangeTheme } = useContext(ThemeContext);
    return {
        theme,
        handleChangeTheme,
    };
}

export { useThemeContext };
