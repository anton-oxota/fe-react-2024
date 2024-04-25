import React from 'react';

import LoginIcon from '../../assets/icons/log_out.svg?react';
import LogoIcon from '../../assets/icons/logo.svg?react';
import MenuIcon from '../../assets/icons/menu_duo_lg.svg?react';
import DarkThemeIcon from '../../assets/icons/moon.svg?react';
import CartIcon from '../../assets/icons/shopping_cart_01.svg?react';
import LightThemeIcon from '../../assets/icons/sun.svg?react';
import SingUpIcon from '../../assets/icons/user_add.svg?react';

import styles from './header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.wrapper}>
                    <a href="/" className={styles.logo} title="Mastert Academy">
                        <LogoIcon />
                    </a>

                    <div className={styles.theme}>
                        <button className={`${styles.themeButton} ${styles.themeActive}`} title="Light theme">
                            <LightThemeIcon />
                        </button>

                        <svg width="2" height="20" viewBox="0 0 2 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 0V20" stroke="#656565" />
                        </svg>

                        <button className={styles.themeButton} title="Dark theme">
                            <DarkThemeIcon />
                        </button>
                    </div>

                    <nav className={styles.nav}>
                        <ul className={styles.navWrapper}>
                            <li>
                                <a className={styles.navLinkActive} href="/">
                                    About
                                </a>
                            </li>
                            <li>
                                <a className={styles.navLink} href="/">
                                    Products
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className={styles.actions}>
                        <button className={styles.cart} title="Cart">
                            <CartIcon />
                        </button>

                        <button className={styles.menu} title="Menu">
                            <MenuIcon />
                        </button>

                        <button className={styles.login} title="Login">
                            <LoginIcon />
                            Login
                        </button>

                        <button className={styles.signUp} title="Sign up">
                            <SingUpIcon />
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
