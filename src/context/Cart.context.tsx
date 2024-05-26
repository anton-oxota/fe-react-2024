import { createContext, useState } from 'react';

import type { Product } from '@/interfaces/Product';

interface CartContextInterface {
    cartData: Product[];
    handleAddToCart: (item: Product) => void;
}

export const CartContext = createContext<CartContextInterface>({
    cartData: [],
    handleAddToCart: () => {},
});

interface CartContextProviderProperty {
    children: React.ReactNode;
}
const CardKey = 'cart';
const localCart: Product[] = localStorage.getItem(CardKey) ? JSON.parse(localStorage.getItem(CardKey)!) : [];

function CartContextProvider({ children }: CartContextProviderProperty) {
    const [cartData, setCartData] = useState<Product[]>(localCart);

    function handleAddToCart(item: Product) {
        setCartData((previousCart) => {
            const updatedCart = [...previousCart, item];
            localStorage.setItem(CardKey, JSON.stringify(updatedCart));
            return updatedCart;
        });
    }
    const contextValue = {
        cartData,
        handleAddToCart,
    };
    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export { CartContextProvider };
