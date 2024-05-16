import React, { useState } from 'react';

import ThemeDivider from '@assets/icons/h-divider.svg?react';
import LoginIcon from '@assets/icons/log_out.svg?react';
import LogoIcon from '@assets/icons/logo.svg?react';
import MenuIcon from '@assets/icons/menu_duo_lg.svg?react';
import DarkThemeIcon from '@assets/icons/moon.svg?react';
import CartIcon from '@assets/icons/shopping_cart_01.svg?react';
import LightThemeIcon from '@assets/icons/sun.svg?react';
import SingUpIcon from '@assets/icons/user_add.svg?react';

import { PageName } from '@/interfaces/Pages';
import type { Product } from '@/interfaces/Product';
import type { Themes } from '@/interfaces/Themes';

import styles from './header.module.css';

const htmlElement = document.querySelector('html');

interface HeaderProps {
    onChangePage: (page: PageName) => void;
    activePage: PageName;
    cartData: Array<Product>;
}

const isLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;

function Header({ onChangePage, activePage, cartData }: HeaderProps) {
    let initialThemeState: Themes;
    const localTheme = localStorage.getItem('theme') as Themes | null;

    if (localTheme) {
        initialThemeState = localTheme;
    } else {
        initialThemeState = isLightTheme ? 'light' : 'dark';
    }

    const [theme, setTheme] = useState<Themes>(initialThemeState);
    htmlElement!.dataset.theme = theme;

    function handleChangeTheme(themeText: Themes) {
        setTheme(themeText);
        localStorage.setItem('theme', themeText);
    }

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.wrapper}>
                    <a href="/" className={styles.logo} title="Mastert Academy">
                        <LogoIcon />
                    </a>

                    <div className={styles.theme}>
                        <button
                            className={`${styles.themeButton} ${theme === 'light' ? styles.themeActive : ''}`}
                            title="Light theme"
                            onClick={() => handleChangeTheme('light')}
                        >
                            <LightThemeIcon />
                        </button>

                        <ThemeDivider />

                        <button
                            className={`${styles.themeButton} ${theme === 'dark' ? styles.themeActive : ''}`}
                            title="Dark theme"
                            onClick={() => handleChangeTheme('dark')}
                        >
                            <DarkThemeIcon />
                        </button>
                    </div>

                    <nav className={styles.nav}>
                        <ul className={styles.navWrapper}>
                            <li>
                                <button
                                    className={activePage === PageName.ABOUT ? styles.navLinkActive : styles.navLink}
                                    onClick={() => onChangePage(PageName.ABOUT)}
                                >
                                    About
                                </button>
                            </li>
                            <li>
                                <button
                                    className={activePage === PageName.PRODUCTS ? styles.navLinkActive : styles.navLink}
                                    onClick={() => onChangePage(PageName.PRODUCTS)}
                                >
                                    Products
                                </button>
                            </li>
                        </ul>
                    </nav>

                    <div className={styles.actions}>
                        <button className={styles.cart} title="Cart">
                            {cartData.length > 0 && <span>{cartData.length}</span>}
                            <CartIcon />
                        </button>

                        <button className={styles.menu} title="Menu">
                            <MenuIcon />
                        </button>

                        <button className={styles.login} title="Login">
                            <LoginIcon />
                            Login
                        </button>

                        <button className={styles.signUp} title="Sign">
                            <SingUpIcon />
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export { Header };
