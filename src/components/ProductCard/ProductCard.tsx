import React from 'react';
import { useNavigate } from 'react-router-dom';

import CartIcon from '@assets/icons/shopping_cart_01.svg?react';

import { useCartContext } from '@/hooks/useCartContext';
import type { Product } from '@/interfaces/Product';

import headerStyles from '../../components/Header/header.module.css';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    productData: Product;
}

function ProductCard({ productData }: ProductCardProps) {
    const { cartData, handleAddToCart } = useCartContext();
    const itemsQty = cartData.filter((item) => item.title === productData.title);

    const title = productData.title.length > 30 ? `${productData.title.slice(0, 30)}...` : productData.title;

    const navigate = useNavigate();

    function handleOpenProductPage() {
        navigate(`${productData.id}`);
    }

    function handleBuyProduct(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        handleAddToCart(productData);
    }

    return (
        <div onClick={handleOpenProductPage} className={`${styles.productCard}`}>
            <div className={styles.wrapper}>
                <img className={styles.img} src={productData.images[0]} alt="" />
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.info}>
                    <div className={styles.price}>
                        {productData.price} <span>₴</span>
                    </div>
                    <button className={`${styles.buy} ${headerStyles.cart}`} onClick={handleBuyProduct}>
                        {itemsQty.length > 0 && <span>{itemsQty.length}</span>}
                        <CartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export { ProductCard };
