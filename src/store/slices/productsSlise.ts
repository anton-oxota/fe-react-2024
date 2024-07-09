import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import type { FetchProductsOptions } from '@/utils/http';
import { fetchProducts, type FetchProductsInterface } from '@/utils/http';

import type { RootStore } from '..';

const productsSliceCreator = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

interface InitialStateInterface {
    data: FetchProductsInterface[];
    isLoading: boolean;
    error: null | string;
}

const initialState: InitialStateInterface = {
    data: [{ total: 0, products: [] }],
    isLoading: false,
    error: null,
};

const productsSlice = productsSliceCreator({
    name: 'products',
    initialState,
    reducers: (create) => ({
        getProducts: create.asyncThunk(
            async (fetchOptions: FetchProductsOptions & { signal: AbortController['signal'] }, { rejectWithValue }) => {
                try {
                    return await fetchProducts(fetchOptions, fetchOptions.signal);
                } catch (error) {
                    if ((error as Error).name === 'AbortError') {
                        return;
                    }
                    return rejectWithValue('Fail to fetch products');
                }
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload) {
                        state.data.push(action.payload);
                    }
                },
                pending: (state) => {
                    state.isLoading = true;
                    state.error = null;
                },
                rejected: (state, action) => {
                    state.error = (action.payload ?? action.error) as string;
                },
                settled: (state) => {
                    state.isLoading = false;
                },
            },
        ),
        resetData: create.reducer((state) => {
            state.data = initialState.data;
            state.isLoading = true;
        }),
    }),
});

export const dataSelector = (state: RootStore) => state.productsReducer.data;
export const isLoadingSelector = (state: RootStore) => state.productsReducer.isLoading;
export const errorSelector = (state: RootStore) => state.productsReducer.error;

export const { getProducts, resetData } = productsSlice.actions;
export default productsSlice.reducer;
