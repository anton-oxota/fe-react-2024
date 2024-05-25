import React from 'react';

import type { Product } from '@/interfaces/Product';

import { ProductCard } from '../ProductCard/ProductCard';

interface PaginationProps {
    currentPage: number;
    productCardsOnPage: number;
    data: Product[];
}

function Pagination({ currentPage, productCardsOnPage, data }: PaginationProps) {
    const displayedData = data.slice((currentPage - 1) * productCardsOnPage, currentPage * productCardsOnPage);

    return (
        <>
            {displayedData.map((productData) => (
                <ProductCard key={productData.title} productData={productData} />
            ))}
        </>
    );
}

export { Pagination };
