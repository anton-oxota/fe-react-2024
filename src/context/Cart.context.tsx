import { createContext, useState } from 'react';

import type { Product } from '@/interfaces/Product';

interface CartContextInterface {
    cartData: Product[];
    handleAddToCart: (item: Product) => void;
}

export const CartContext = createContext<CartContextInterface>({});

interface CartContextProviderProperty {
    children: React.ReactNode;
}
const CardKey = 'cart';

function CartContextProvider({ children }: CartContextProviderProperty) {
    const localCart: Product[] = localStorage.getItem(CardKey) ? JSON.parse(localStorage.getItem(CardKey)!) : [];
    const [cartData, setCartData] = useState<Product[]>(localCart);

    function handleAddToCart(item: Product) {
        setCartData((previousCart) => {
            const updatedCart = [...previousCart, item];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
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
