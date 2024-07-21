import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import LoginIcon from '@assets/icons/log_out.svg?react';
import SingUpIcon from '@assets/icons/user_add.svg?react';

import { PageName } from '@/interfaces/Pages';

import styles from '../../components/Header/header.module.css';

interface LogoutButtonsInteface {
    handleToggleOpenBurgerMenu: () => void;
}

function LogoutButtons({ handleToggleOpenBurgerMenu }: LogoutButtonsInteface) {
    const location = useLocation();

    return (
        <>
            <Link
                to={PageName.LOGIN}
                state={location.pathname}
                className={styles.actionButton}
                title="Login"
                onClick={handleToggleOpenBurgerMenu}
            >
                <LoginIcon />
                Login
            </Link>

            <button className={`${styles.actionButton} ${styles.active}`} title="Sign">
                <SingUpIcon />
                Sign Up
            </button>
        </>
    );
}

export default LogoutButtons;
