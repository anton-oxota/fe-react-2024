import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Product } from '@/interfaces/Product';

import type { RootStore } from '..';

const localCart = localStorage.getItem('cart');

type ProductCart = Product & { quantity: number };

interface InitialStateInterface {
    cart: ProductCart[];
}

const initialState: InitialStateInterface = {
    cart: localCart ? JSON.parse(localCart) : [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const item = action.payload;

            const exisitingItemIndex = state.cart.findIndex((cartItem) => cartItem.id === item.id);

            if (exisitingItemIndex === -1) {
                const newItem = {
                    ...item,
                    quantity: 1,
                };
                state.cart.push(newItem);
            } else {
                state.cart[exisitingItemIndex].quantity! += 1;
            }

            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart(state, action: PayloadAction<Product['id']>) {
            const itemId = action.payload;
            const exisitingItemIndex = state.cart.findIndex((cartItem) => cartItem.id === itemId);
            const item = state.cart[exisitingItemIndex];

            if (item.quantity! > 1) {
                state.cart[exisitingItemIndex].quantity! += -1;
            } else {
                state.cart.splice(exisitingItemIndex, 1);
            }
        },
    },
});

export const cartSelector = (state: RootStore) => state.cartReducer.cart;

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
