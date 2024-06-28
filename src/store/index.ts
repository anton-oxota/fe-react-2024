import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slices/cartSlice';
import filtersReducer from './slices/filtersSlice';
import productReducer from './slices/productSlice';
import productsReducer from './slices/productsSlise';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
    reducer: {
        themeReducer,
        cartReducer,
        productsReducer,
        productReducer,
        filtersReducer,
    },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
