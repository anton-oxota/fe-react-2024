import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { PageTheme } from '@/interfaces/Themes';

import type { RootStore } from '..';

const html = document.querySelector('html')!;
const isLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;
const localTheme = localStorage.getItem('theme');
let theme: PageTheme;

if (localTheme) {
    theme = localTheme as PageTheme;
} else {
    theme = isLightTheme ? PageTheme.LIGHT : PageTheme.DARK;
    localStorage.setItem('theme', theme);
}

html.dataset.theme = theme;

const initialState = {
    theme,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme(state, action: PayloadAction<PageTheme>) {
            const newTheme = action.payload;

            state.theme = newTheme;
            localStorage.setItem('theme', newTheme);

            html.dataset.theme = state.theme;
        },
    },
});

export const themeSelector = (state: RootStore) => state.themeReducer.theme;

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
