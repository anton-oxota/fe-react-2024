import React from 'react';
import { useNavigate } from 'react-router-dom';

import CartIcon from '@assets/icons/shopping_cart_01.svg?react';

import { useReduxStore } from '@/hooks/useReduxStore';
import type { Product } from '@/interfaces/Product';
import { addToCart, cartSelector } from '@/store/slices/cartSlice';

import headerStyles from '../../components/Header/header.module.css';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    productData: Product;
    productRef: React.RefObject<HTMLDivElement> | null;
}

function ProductCard({ productData, productRef }: ProductCardProps) {
    const { useAppDispatch, useAppSelector } = useReduxStore();
    const dispatch = useAppDispatch();
    const cartData = useAppSelector(cartSelector);

    const itemQty = cartData.find((cartItem) => cartItem.id === productData.id)?.quantity || 0;

    const title = productData.title.length > 30 ? `${productData.title.slice(0, 30)}...` : productData.title;

    const navigate = useNavigate();

    function handleOpenProductPage() {
        navigate(`${productData.id}`);
    }

    function handleBuyProduct(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        dispatch(addToCart(productData));
    }

    return (
        <div ref={productRef} onClick={handleOpenProductPage} className={`${styles.productCard}`}>
            <div className={styles.wrapper}>
                <img className={styles.img} src={productData.images[0]} alt="" />
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.info}>
                    <div className={styles.price}>
                        {productData.price} <span>₴</span>
                    </div>
                    <button className={`${styles.buy} ${headerStyles.cart}`} onClick={handleBuyProduct}>
                        {itemQty > 0 && <span>{itemQty}</span>}
                        <CartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export { ProductCard };
