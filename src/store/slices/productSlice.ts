import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import type { Product } from '@/interfaces/Product';
import { fetchProduct } from '@/utils/http';

import type { RootStore } from '..';

const productSliceCreator = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

interface InitialStateInterface {
    productData: Product | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: InitialStateInterface = {
    productData: null,
    isLoading: false,
    error: null,
};

const productSlice = productSliceCreator({
    name: 'product',
    initialState,
    reducers: (create) => ({
        getProductById: create.asyncThunk(
            async ({ id, signal }: { id: Product['id']; signal: AbortController['signal'] }, { rejectWithValue }) => {
                try {
                    return await fetchProduct(id, signal);
                } catch (error) {
                    if ((error as Error).name === 'AbortError') {
                        return;
                    }
                    return rejectWithValue('Fail to fetch product');
                }
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload) {
                        state.productData = action.payload;
                    }
                },
                pending: (state) => {
                    state.isLoading = true;
                    state.error = null;
                },
                rejected: (state, action) => {
                    state.isLoading = false;
                    state.error = (action.payload ?? action.meta) as string;
                },
                settled: (state) => {
                    state.isLoading = false;
                },
            },
        ),
        resetData: create.reducer((state) => {
            state.productData = initialState.productData;
        }),
    }),
});

export const productDataSelector = (state: RootStore) => state.productReducer.productData;
export const isLoadingSelector = (state: RootStore) => state.productReducer.isLoading;
export const errorSelector = (state: RootStore) => state.productReducer.error;

export const { getProductById, resetData } = productSlice.actions;
export default productSlice.reducer;
