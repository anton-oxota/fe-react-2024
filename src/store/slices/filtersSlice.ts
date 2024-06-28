import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Category } from '@/interfaces/Category';
import { SortBy } from '@/interfaces/Filters';

import type { RootStore } from '..';

interface InitialStateInterface {
    search: string;
    sortBy: SortBy;
    category: '' | Category['id'];
}

const initialState: InitialStateInterface = {
    search: '',
    sortBy: SortBy.HIGH_TO_LOW,
    category: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        changeSortBy(state, action: PayloadAction<SortBy>) {
            state.sortBy = action.payload;
        },
        changeActiveCategory(state, action: PayloadAction<Category['id']>) {
            state.category = state.category === action.payload ? initialState.category : action.payload;
        },
    },
});

export const searchSelector = (state: RootStore) => state.filtersReducer.search;
export const sortBySelector = (state: RootStore) => state.filtersReducer.sortBy;
export const categorySelector = (state: RootStore) => state.filtersReducer.category;

export const { changeActiveCategory, changeSearch, changeSortBy } = filtersSlice.actions;
export default filtersSlice.reducer;
