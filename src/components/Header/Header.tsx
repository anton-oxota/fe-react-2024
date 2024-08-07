import React from 'react';
import { Link, NavLink, useMatch } from 'react-router-dom';

import ThemeDivider from '@assets/icons/h-divider.svg?react';
import LoginIcon from '@assets/icons/log_out.svg?react';
import LogoIcon from '@assets/icons/logo.svg?react';
import MenuIcon from '@assets/icons/menu_duo_lg.svg?react';
import DarkThemeIcon from '@assets/icons/moon.svg?react';
import CartIcon from '@assets/icons/shopping_cart_01.svg?react';
import LightThemeIcon from '@assets/icons/sun.svg?react';
import SingUpIcon from '@assets/icons/user_add.svg?react';

import { useReduxStore } from '@/hooks/useReduxStore';
import { useToggle } from '@/hooks/useToggle';
import { PageName } from '@/interfaces/Pages';
import { PageTheme } from '@/interfaces/Themes';
import { cartSelector } from '@/store/slices/cartSlice';
import { changeTheme, themeSelector } from '@/store/slices/themeSlice';
import { BurgerMenu } from '@/ui/BurgerMenu/BurgerMenu';

import styles from './header.module.css';

function Header() {
    const { useAppDispatch, useAppSelector } = useReduxStore();
    const dispatch = useAppDispatch();
    const theme = useAppSelector(themeSelector);
    const cartData = useAppSelector(cartSelector);

    const totalCartQty = cartData.reduce((accumulator, current) => accumulator + current.quantity, 0);

    const [isBurgerMenuOpen, handleToggleOpenBurgerMenu] = useToggle(false);

    const aboutMatchUrl = useMatch('');
    const productsMatchUrl = useMatch(`${PageName.PRODUCTS}`);

    function handleChangeTheme(newTheme: PageTheme) {
        dispatch(changeTheme(newTheme));
    }

    return (
        <>
            <header className={styles.header}>
                <div className={`container `}>
                    <div className={styles.wrapper}>
                        <Link to={``} className={styles.logo} title="Mastert Academy">
                            <LogoIcon />
                        </Link>

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
                                    <NavLink to="" className={aboutMatchUrl ? styles.navLinkActive : styles.navLink}>
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={PageName.PRODUCTS} className={productsMatchUrl ? styles.navLinkActive : styles.navLink}>
                                        Products
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>

                        <div className={styles.actions}>
                            <button className={styles.cart} title="Cart">
                                {cartData.length > 0 && <span>{totalCartQty}</span>}
                                <CartIcon />
                            </button>

                            <button className={styles.menu} title="Menu" onClick={handleToggleOpenBurgerMenu}>
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
            <BurgerMenu isOpen={isBurgerMenuOpen} handleIsOpen={handleToggleOpenBurgerMenu} />
        </>
    );
}

export { Header };
