import React from 'react';

import PlusIcon from '@assets/icons/Add_Plus.svg?react';
import MinusIcon from '@assets/icons/Remove_Minus.svg?react';
import TrashIcon from '@assets/icons/Trash_Empty.svg?react';

import { useReduxStore } from '@/hooks/useReduxStore';
import { addToCart, type ProductCart, removeFromCart, removeItemFromCart, setItemQuantity } from '@/store/slices/cartSlice';

import styles from './CartItem.module.css';

interface CartItemPropsInterface {
    cartItem: ProductCart;
}

function CartItem({ cartItem }: CartItemPropsInterface) {
    const { useAppDispatch } = useReduxStore();
    const dispatch = useAppDispatch();

    const { images, title, price, quantity, id } = cartItem;
    const totalPrice = price * quantity;

    function handleAddToCart() {
        dispatch(addToCart(cartItem));
    }

    function handleRemoveFromCart() {
        dispatch(removeFromCart(id));
    }

    function handleRemoveItemFromCart() {
        dispatch(removeItemFromCart(id));
    }

    function handleChangeQuantity(newQuantity: ProductCart['quantity']) {
        if (!Number.isNaN(newQuantity)) {
            let qty = newQuantity;

            if (newQuantity > 99) {
                qty = 99;
            }

            dispatch(setItemQuantity({ id, quantity: qty }));
        }
    }

    function handleChangeQuantityBlure(newQuantity: ProductCart['quantity']) {
        if (newQuantity < 1) {
            dispatch(setItemQuantity({ id, quantity: 1 }));
        }
    }

    return (
        <li className={styles.cartItem}>
            <img className={styles.img} src={images[0]} alt="" />
            <div className={styles.info}>
                <div className={styles.title}>{title}</div>
                <div className={styles.price}>
                    {price} <span>₴</span>
                </div>
            </div>
            <div className={styles.actions}>
                <div className={styles.count}>
                    <button onClick={handleRemoveFromCart}>
                        <MinusIcon />
                    </button>
                    {/* <span>{quantity}</span> */}
                    <input
                        type="text"
                        value={quantity}
                        onChange={(event) => handleChangeQuantity(+event.target.value)}
                        onBlur={(event) => handleChangeQuantityBlure(+event.target.value)}
                    />
                    <button onClick={handleAddToCart}>
                        <PlusIcon />
                    </button>
                </div>
                <div className={styles.total}>
                    {totalPrice} <span>₴</span>{' '}
                </div>
            </div>
            <button className={styles.remove} onClick={handleRemoveItemFromCart}>
                <TrashIcon />
            </button>
        </li>
    );
}

export { CartItem };
