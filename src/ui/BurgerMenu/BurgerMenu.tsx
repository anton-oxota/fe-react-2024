import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useMatch } from 'react-router-dom';

import ThemeDivider from '@assets/icons/h-divider.svg?react';
import DarkThemeIcon from '@assets/icons/moon.svg?react';
import LightThemeIcon from '@assets/icons/sun.svg?react';

import { PageName } from '@/interfaces/Pages';
import { PageTheme } from '@/interfaces/Themes';
import { changeTheme, themeSelector } from '@/store/slices/themeSlice';

import styles from './BurgerMenu.module.css';

interface BurgerMenuProps {
    isOpen: boolean;
    handleIsOpen: () => void;
}

function BurgerMenu({ isOpen, handleIsOpen }: BurgerMenuProps) {
    const dispatch = useDispatch();
    const theme = useSelector(themeSelector);

    function handleChangeTheme(newTheme: PageTheme) {
        dispatch(changeTheme(newTheme));
    }

    const aboutUrlMatch = useMatch('');
    const productsUrlMatch = useMatch(`${PageName.PRODUCTS}`);

    return (
        <div className={`${styles.burgerMenu} ${styles.mobile} ${isOpen ? styles.open : ''}`}>
            <div className="container">
                <div className={styles.burgerMenuWrapper}>
                    <nav className={styles.burgerMenuNav}>
                        <ul>
                            <li onClick={handleIsOpen}>
                                <NavLink className={`${styles.burgerLink} ${aboutUrlMatch ? styles.active : ''}`} to={''}>
                                    About
                                </NavLink>
                            </li>
                            <li onClick={handleIsOpen}>
                                <NavLink className={`${styles.burgerLink} ${productsUrlMatch ? styles.active : ''}`} to={PageName.PRODUCTS}>
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={`${styles.burgerLink}`} to={''}>
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={`${styles.burgerLink}`} to={''}>
                                    Sing up
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.burgerMenuThemeSwitch}>
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
                </div>
            </div>
        </div>
    );
}

export { BurgerMenu };
