import React, { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import PrevIcon from '@assets/icons/Chevron_Left.svg?react';
import CartIcon from '@assets/icons/shopping_cart_01.svg?react';

import { ROOT_URL } from '@/App';
import { ProductSlider } from '@/components/ProductSlider/ProductSlider';
import { useCartContext } from '@/hooks/useCartContext';
import { useFetch } from '@/hooks/useFetch';
import { PageName } from '@/interfaces/Pages';
import type { Product } from '@/interfaces/Product';

import { fetchProduct } from '../../utils/http';

import styles from './ProductPage.module.css';

function ProductPage() {
    const { productId } = useParams();
    const { handleAddToCart } = useCartContext();

    const fetchProductFunction = useCallback(() => fetchProduct(productId!), [productId]);

    const { fetchedData, isFetching, error } = useFetch<Product>(null, fetchProductFunction);

    let content;

    if (error) {
        content = <p>{error}</p>;
    } else if (fetchedData) {
        content = (
            <div className={styles.wrapper}>
                <ProductSlider productImgs={fetchedData.images} />
                <div className={styles.productInfo}>
                    <h2 className={`${styles.productPrice} ${styles.mobile}`}>
                        {fetchedData.price} <span>₴</span>
                    </h2>
                    <h1 className={styles.productTitle}>{fetchedData.title}</h1>
                    <div className={styles.productLabel}>{fetchedData.category.name}</div>
                    <p className={styles.productInfoText}>{fetchedData.description}</p>
                    <div className={styles.productActions}>
                        <h2 className={`${styles.productPrice} ${styles.desctop}`}>
                            {fetchedData.price} <span>₴</span>
                        </h2>
                        <Link to={`/${ROOT_URL}${PageName.PRODUCTS}`} className={`${styles.productBack} ${styles.mobile}`}>
                            <PrevIcon />
                            Back
                        </Link>
                        <button className={styles.productAddToCart} onClick={() => handleAddToCart(fetchedData)}>
                            <CartIcon />
                            Add to cart
                        </button>
                    </div>
                </div>
                <Link to={`/${ROOT_URL}${PageName.PRODUCTS}`} className={`${styles.productBack} ${styles.desctop}`}>
                    <PrevIcon />
                    Back
                </Link>
            </div>
        );
    }

    return (
        <section className={styles.product}>
            <div className="container">
                {isFetching && <p>Loading...</p>}
                {content}
            </div>
        </section>
    );
}

export { ProductPage };
