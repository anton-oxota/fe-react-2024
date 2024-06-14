import { useContext } from 'react';

import { ProductsContext } from '@/context/Products.context';

function useProducts() {
    const { fetchProductsWithParameters, productsData, isFetching, error } = useContext(ProductsContext);

    return {
        fetchProductsWithParameters,
        productsData,
        isFetching,
        error,
    };
}

export { useProducts };
