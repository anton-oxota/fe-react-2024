import React, { createContext, useEffect, useState } from 'react';

import type { Product } from '@/interfaces/Product';

interface DataContextInterface {
    data: Product[];
}

export const DataContext = createContext<DataContextInterface>({
    data: [],
});

interface DataContextProviderProps {
    children: React.ReactNode;
}

function DataContextProvider({ children }: DataContextProviderProps) {
    const [productsData, setProductsData] = useState<Product[]>();

    useEffect(() => {
        fetch('https://ma-backend-api.mocintra.com/api/v1/products')
            .then((response) => response.json())
            .then((data) => {
                setProductsData(data);
            });
    }, []);

    let data: Product[] = [];

    if (productsData) {
        data = productsData;
    }

    const contextValue = {
        data,
    };

    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
}

export { DataContextProvider };
