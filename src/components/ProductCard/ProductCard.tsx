import React from 'react';

import CartIcon from '@assets/icons/shopping_cart_01.svg?react';

import type { AddToCartHandler } from '@/App';
import type { Product } from '@/interfaces/Product';

import headerStyles from '../../components/Header/header.module.css';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    productData: Product;
    onAddToCart: AddToCartHandler;
    cartData: Product[];
}

function ProductCard({ onAddToCart, productData, cartData }: ProductCardProps) {
    const itemsQty = cartData.filter((item) => item.title === productData.title);

    return (
        <div className={styles.productCard}>
            <div className={styles.wrapper}>
                <img className={styles.img} src={productData.images[0]} alt="" />
                <h3 className={styles.title}>{productData.title}</h3>
                <div className={styles.info}>
                    <div className={styles.price}>
                        {productData.price} <span>₴</span>
                    </div>
                    <button className={`${styles.buy} ${headerStyles.cart}`} onClick={() => onAddToCart(productData)}>
                        {itemsQty.length > 0 && <span>{itemsQty.length}</span>}
                        <CartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export { ProductCard };
