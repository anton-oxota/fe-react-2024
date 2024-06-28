import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import PrevIcon from '@assets/icons/Chevron_Left.svg?react';
import CartIcon from '@assets/icons/shopping_cart_01.svg?react';

import { ProductSlider } from '@/components/ProductSlider/ProductSlider';
import { useReduxStore } from '@/hooks/useReduxStore';
import { PageName } from '@/interfaces/Pages';
import { addToCart } from '@/store/slices/cartSlice';
import { errorSelector, getProductById, isLoadingSelector, productDataSelector, resetData } from '@/store/slices/productSlice';

import styles from './ProductPage.module.css';

function ProductPage() {
    const { useAppDispatch, useAppSelector } = useReduxStore();
    const dispatch = useAppDispatch();
    const { productId } = useParams();

    const productData = useAppSelector(productDataSelector);
    const isFetching = useAppSelector(isLoadingSelector);
    const error = useAppSelector(errorSelector);

    useEffect(() => {
        const controller = new AbortController();

        dispatch(getProductById({ id: +productId!, signal: controller.signal }));

        return () => {
            controller.abort();
            dispatch(resetData());
        };
    }, [productId, dispatch]);

    function handleAddToCart() {
        if (productData) {
            dispatch(addToCart(productData));
        }
    }

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
                        <button className={styles.productAddToCart} onClick={handleAddToCart}>
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
