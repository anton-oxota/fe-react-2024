import React, { useContext, useState } from 'react';

import ThemeDivider from '@assets/icons/h-divider.svg?react';
import LoginIcon from '@assets/icons/log_out.svg?react';
import LogoIcon from '@assets/icons/logo.svg?react';
import MenuIcon from '@assets/icons/menu_duo_lg.svg?react';
import DarkThemeIcon from '@assets/icons/moon.svg?react';
import CartIcon from '@assets/icons/shopping_cart_01.svg?react';
import LightThemeIcon from '@assets/icons/sun.svg?react';
import SingUpIcon from '@assets/icons/user_add.svg?react';

import { CartContext } from '@/context/Cart.context';
import { PageName } from '@/interfaces/Pages';
import { PageTheme } from '@/interfaces/Themes';

import styles from './header.module.css';

const htmlElement = document.querySelector('html');

interface HeaderProps {
    onChangePage: (page: PageName) => void;
    activePage: PageName;
}

const isLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;

function Header({ onChangePage, activePage }: HeaderProps) {
    let initialThemeState: PageTheme;
    const localTheme = localStorage.getItem('theme') as PageTheme | null;

    const { cartData } = useContext(CartContext);

    if (localTheme) {
        initialThemeState = localTheme;
    } else {
        initialThemeState = isLightTheme ? PageTheme.LIGHT : PageTheme.DARK;
    }

    const [theme, setTheme] = useState<PageTheme>(initialThemeState);
    htmlElement!.dataset.theme = theme;

    function handleChangeTheme(themeText: PageTheme) {
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
                            className={`${styles.themeButton} ${theme === PageTheme.LIGHT ? styles.themeActive : ''}`}
                            title="Light theme"
                            onClick={() => handleChangeTheme(PageTheme.LIGHT)}
                        >
                            <LightThemeIcon />
                        </button>

                        <ThemeDivider />

                        <button
                            className={`${styles.themeButton} ${theme === PageTheme.DARK ? styles.themeActive : ''}`}
                            title="Dark theme"
                            onClick={() => handleChangeTheme(PageTheme.DARK)}
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
