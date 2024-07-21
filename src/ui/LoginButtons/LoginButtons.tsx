import React from 'react';
import { Link } from 'react-router-dom';

import LoginIcon from '@assets/icons/log_out.svg?react';
import SingUpIcon from '@assets/icons/user_add.svg?react';

import styles from '../../components/Header/header.module.css';

interface LoginButtonsInterface {
    logout: () => void;
    isLogin: boolean;
}

function LoginButtons({ logout, isLogin }: LoginButtonsInterface) {
    return (
        <>
            <Link to={''} className={styles.actionButton} onClick={logout}>
                <LoginIcon />
                Log out
            </Link>
            <button className={styles.actionButton} title="Sign" disabled={isLogin}>
                <SingUpIcon />
                Sign Up
            </button>
        </>
    );
}

export { LoginButtons };
