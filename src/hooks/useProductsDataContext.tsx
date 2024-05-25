import { useContext } from 'react';

import { ProductsDataContext } from '@/context/ProductData.context';

function useProductsDataContext() {
    const { productsData, isErrorFetchingProductsData, isLoadingProductsData } = useContext(ProductsDataContext);

    return {
        productsData,
        isErrorFetchingProductsData,
        isLoadingProductsData,
    };
}

export { useProductsDataContext };
