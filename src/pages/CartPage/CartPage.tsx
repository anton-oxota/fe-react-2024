import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CartItemsList from '@/components/CartItemsList/CartItemsList';
import { useVerify } from '@/hooks/useVerify';
import { PageName } from '@/interfaces/Pages';

import styles from './CartPage.module.css';

function CartPage() {
    const navigate = useNavigate();
    const { verify } = useVerify();
    useEffect(() => {
        (async () => {
            if (!(await verify())) {
                navigate(`/${PageName.LOGIN}`);
            }
        })();
    }, [navigate, verify]);
    return (
        <section className={styles.cart}>
            <div className="container">
                <CartItemsList />
            </div>
        </section>
    );
}

export { CartPage };
