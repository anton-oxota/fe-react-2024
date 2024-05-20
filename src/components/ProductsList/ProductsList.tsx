import React from 'react';

import type { AddToCartHandler } from '@/App';
import type { Product } from '@/interfaces/Product';

import { ProductCard } from '../ProductCard/ProductCard';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './ProductsList.module.css';

interface ProductsListProps {
    data: Product[];
    handleAddToCart: AddToCartHandler;
    cartData: Product[];
}

function ProductsList({ data, cartData, handleAddToCart }: ProductsListProps) {
    return (
        <>
            <SearchBar />
            <section className={styles.productsList}>
                <div className="container">
                    <div className={styles.wrapper}>
                        {data.map((productData) => (
                            <ProductCard
                                key={productData.title}
                                productData={productData}
                                onAddToCart={handleAddToCart}
                                cartData={cartData}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export { ProductsList };
