import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import PrevIcon from '@assets/icons/Chevron_Left.svg?react';
import CartIcon from '@assets/icons/shopping_cart_01.svg?react';

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

    const { fetchData, fetchedData, isFetching, error } = useFetch<Product[]>([], fetchProduct);

    let productData;

    if (fetchedData) {
        productData = fetchedData[0];
    }

    useEffect(() => {
        const controller = new AbortController();

        fetchData(productId, controller.signal);

        return () => {
            controller.abort();
        };
    }, [productId, fetchData]);

    let content;

    if (error) {
        content = <p>{error}</p>;
    } else if (productData) {
        content = (
            <div className={styles.wrapper}>
                <ProductSlider productImgs={productData.images} />
                <div className={styles.productInfo}>
                    <h2 className={`${styles.productPrice} ${styles.mobile}`}>
                        {productData.price} <span>₴</span>
                    </h2>
                    <h1 className={styles.productTitle}>{productData.title}</h1>
                    <div className={styles.productLabel}>{productData.category.name}</div>
                    <p className={styles.productInfoText}>{productData.description}</p>
                    <div className={styles.productActions}>
                        <h2 className={`${styles.productPrice} ${styles.desctop}`}>
                            {productData.price} <span>₴</span>
                        </h2>
                        <Link to={`/${PageName.PRODUCTS}`} className={`${styles.productBack} ${styles.mobile}`}>
                            <PrevIcon />
                            Back
                        </Link>
                        <button className={styles.productAddToCart} onClick={() => handleAddToCart(productData)}>
                            <CartIcon />
                            Add to cart
                        </button>
                    </div>
                </div>
                <Link to={`/${PageName.PRODUCTS}`} className={`${styles.productBack} ${styles.desctop}`}>
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
