import React from 'react';

import type { Product } from '@/interfaces/Product';

import { ProductCard } from '../ProductCard/ProductCard';

interface PaginationProps {
    currentPage: number;
    productCardsOnPage: number;
    productsData: Product[];
}

function Pagination({ currentPage, productCardsOnPage, productsData }: PaginationProps) {
    const displayedData = productsData.slice((currentPage - 1) * productCardsOnPage, currentPage * productCardsOnPage);

    return (
        <>
            {displayedData.map((productData) => (
                <ProductCard key={productData.title} productData={productData} />
            ))}
        </>
    );
}

export { Pagination };
