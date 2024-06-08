import React, { createContext } from 'react';

import { useFetch } from '@/hooks/useFetch';
import type { Product } from '@/interfaces/Product';
import { fetchProducts } from '@/utils/http';

interface ProductsDataContextInterface {
    productsData: Product[];
    isErrorFetchingProductsData: string | null;
    isLoadingProductsData: boolean;
}

export const ProductsDataContext = createContext<ProductsDataContextInterface>({
    productsData: [],
    isErrorFetchingProductsData: 'Fetching error',
    isLoadingProductsData: true,
});

interface ProductsDataContextProviderProps {
    children: React.ReactNode;
}

function ProductsDataContextProvider({ children }: ProductsDataContextProviderProps) {
    const { fetchedData, isFetching, error } = useFetch([], fetchProducts);

    const contextValue = {
        productsData: fetchedData,
        isLoadingProductsData: isFetching,
        isErrorFetchingProductsData: error,
    };

    return <ProductsDataContext.Provider value={contextValue}>{children}</ProductsDataContext.Provider>;
}

export { ProductsDataContextProvider };
