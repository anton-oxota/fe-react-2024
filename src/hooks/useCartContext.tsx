import { useContext } from 'react';

import { CartContext } from '@/context/Cart.context';

function useCartContext() {
    const { cartData, handleAddToCart } = useContext(CartContext);

    return {
        cartData,
        handleAddToCart,
    };
}

export { useCartContext };
