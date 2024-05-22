import React, { useContext } from 'react';

import CartIcon from '@assets/icons/shopping_cart_01.svg?react';

import { CartContext } from '@/context/Cart.context';
import type { Product } from '@/interfaces/Product';

import headerStyles from '../../components/Header/header.module.css';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    productData: Product;
}

function ProductCard({ productData }: ProductCardProps) {
    const { cartData, handleAddToCart } = useContext(CartContext);
    const itemsQty = cartData.filter((item) => item.title === productData.title);

    const title = productData.title.length > 30 ? `${productData.title.slice(0, 30)}...` : productData.title;

    return (
        <div className={styles.productCard}>
            <div className={styles.wrapper}>
                <img className={styles.img} src={productData.images[0]} alt="" />
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.info}>
                    <div className={styles.price}>
                        {productData.price} <span>₴</span>
                    </div>
                    <button className={`${styles.buy} ${headerStyles.cart}`} onClick={() => handleAddToCart(productData)}>
                        {itemsQty.length > 0 && <span>{itemsQty.length}</span>}
                        <CartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export { ProductCard };
