import { createContext, useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';
import { useFiltersContext } from '@/hooks/useFiltersContext';
import { fetchProducts, type FetchProductsInterface } from '@/utils/http';

interface ProductsContextInterface {
    productsData: FetchProductsInterface | null;
    fetchProductsWithParameters: (limit: number, offset: number) => void;
    isFetching: boolean;
    error: string | null;
}

export const ProductsContext = createContext<ProductsContextInterface>({
    productsData: {
        products: [],
        total: 0,
    },
    fetchProductsWithParameters: () => {},
    isFetching: false,
    error: null,
});

interface ProductsProviderProps {
    children: React.ReactNode;
}

const productsInitialValue: FetchProductsInterface = { products: [], total: 0 };

function ProductsContextProvider({ children }: ProductsProviderProps) {
    const { search, sortBy, category } = useFiltersContext();
    const { fetchData, fetchedData, isFetching, error } = useFetch<FetchProductsInterface>(productsInitialValue, fetchProducts);

    const fetchProductsWithParameters = useCallback(
        (limit: number, offset: number) => {
            fetchData(limit, offset, search, sortBy, category);
        },
        [fetchData, search, sortBy, category],
    );

    const contextValue = {
        productsData: fetchedData,
        fetchProductsWithParameters,
        isFetching,
        error,
    };

    return <ProductsContext.Provider value={contextValue}>{children}</ProductsContext.Provider>;
}

export { ProductsContextProvider };
