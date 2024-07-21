import React from 'react';
import { Link, NavLink, useMatch, useNavigate } from 'react-router-dom';

import ThemeDivider from '@assets/icons/h-divider.svg?react';
import LogoIcon from '@assets/icons/logo.svg?react';
import MenuIcon from '@assets/icons/menu_duo_lg.svg?react';
import DarkThemeIcon from '@assets/icons/moon.svg?react';
import CartIcon from '@assets/icons/shopping_cart_01.svg?react';
import LightThemeIcon from '@assets/icons/sun.svg?react';

import { useReduxStore } from '@/hooks/useReduxStore';
import { useToggle } from '@/hooks/useToggle';
import { useVerify } from '@/hooks/useVerify';
import { PageName } from '@/interfaces/Pages';
import { PageTheme } from '@/interfaces/Themes';
import { cartSelector } from '@/store/slices/cartSlice';
import { changeTheme, themeSelector } from '@/store/slices/themeSlice';
import { BurgerMenu } from '@/ui/BurgerMenu/BurgerMenu';
import { LoginButtons } from '@/ui/LoginButtons/LoginButtons';
import LogoutButtons from '@/ui/LogoutButtons/LogoutButtons';
import { getAccessToken, logout } from '@/utils/token';

import styles from './header.module.css';

const isLogin = !!getAccessToken();

function Header() {
    const navigate = useNavigate();
    const { useAppDispatch, useAppSelector } = useReduxStore();
    const dispatch = useAppDispatch();
    const theme = useAppSelector(themeSelector);
    const cartData = useAppSelector(cartSelector);

    const accessToken = getAccessToken();

    const totalCartQty = cartData.reduce((accumulator, current) => accumulator + current.quantity, 0);

    const [isBurgerMenuOpen, handleToggleOpenBurgerMenu] = useToggle(false);

    const aboutMatchUrl = useMatch('');
    const productsMatchUrl = useMatch(`${PageName.PRODUCTS}`);

    function handleChangeTheme(newTheme: PageTheme) {
        dispatch(changeTheme(newTheme));
    }

    const { verify } = useVerify();

    function handleCartButton() {
        if (isBurgerMenuOpen) {
            handleToggleOpenBurgerMenu();
        }

        (async () => {
            const isVerify = await verify();

            if (isVerify) {
                navigate(PageName.CART);
            } else {
                navigate(PageName.LOGIN);
            }
        })();
    }

    return (
        <>
            <header className={styles.header}>
                <div className={`container `}>
                    <div className={styles.wrapper}>
                        <Link
                            to={``}
                            className={styles.logo}
                            title="Mastert Academy"
                            onClick={isBurgerMenuOpen ? handleToggleOpenBurgerMenu : undefined}
                        >
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
                            <button className={styles.cart} title="Cart" onClick={handleCartButton}>
                                {cartData.length > 0 && isLogin && <span>{totalCartQty}</span>}
                                <CartIcon />
                            </button>

                            <button className={styles.menu} title="Menu" onClick={handleToggleOpenBurgerMenu}>
                                <MenuIcon />
                            </button>

                            {accessToken ? (
                                <LoginButtons logout={logout} isLogin={isLogin} />
                            ) : (
                                <LogoutButtons handleToggleOpenBurgerMenu={handleToggleOpenBurgerMenu} />
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <BurgerMenu isOpen={isBurgerMenuOpen} handleIsOpen={handleToggleOpenBurgerMenu} />
        </>
    );
}

export { Header };
