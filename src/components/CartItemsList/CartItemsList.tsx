import React from 'react';
import { Link } from 'react-router-dom';

import ArrowLeftIcon from '@assets/icons/Arrow_Left_SM.svg?react';
import CreditCartIcon from '@assets/icons/Credit_Card_01.svg?react';

import { useReduxStore } from '@/hooks/useReduxStore';
import { PageName } from '@/interfaces/Pages';
import { cartSelector } from '@/store/slices/cartSlice';
import { CartItem } from '@/ui/CartItem/CartItem';

import styles from './CartItemsList.module.css';

function CartItemsList() {
    const { useAppSelector } = useReduxStore();

    const cart = useAppSelector(cartSelector);
    const totalItemsOnCart = cart.length;
    const totalItemsPrice = cart.reduce((accumulator, current) => accumulator + current.quantity * current.price, 0);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Cart ({totalItemsOnCart})</h2>
            {!totalItemsOnCart && <p className={styles.text}>You have not added any products to the cart yet.</p>}
            {!!totalItemsOnCart && (
                <ul className={styles.cartItemsList}>
                    {cart.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))}
                </ul>
            )}

            <div className={styles.totalInfo}>
                {!!totalItemsOnCart && (
                    <>
                        <div className={styles.total}>
                            <p>Total</p>
                            <div className={styles.totalPrice}>
                                {totalItemsPrice} <span>₴</span>
                            </div>
                        </div>
                        <button className={styles.buy}>
                            <CreditCartIcon />
                            Buy
                        </button>
                    </>
                )}

                <Link className={styles.back} to={`/${PageName.PRODUCTS}`}>
                    <ArrowLeftIcon />
                    Continue shopping
                </Link>
            </div>
        </div>
    );
}

export default CartItemsList;
