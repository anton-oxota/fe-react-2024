import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import ThemeDivider from '@assets/icons/h-divider.svg?react';
import DarkThemeIcon from '@assets/icons/moon.svg?react';
import LightThemeIcon from '@assets/icons/sun.svg?react';

import { ROOT_URL } from '@/App';
import { useThemeContext } from '@/hooks/useThemeContext';
import { PageName } from '@/interfaces/Pages';
import { PageTheme } from '@/interfaces/Themes';

import styles from './BurgerMenu.module.css';

interface BurgerMenuProps {
    isOpen: boolean;
    handleIsOpen: () => void;
}

function BurgerMenu({ isOpen, handleIsOpen }: BurgerMenuProps) {
    const { handleChangeTheme, theme } = useThemeContext();

    const aboutUrlMatch = useMatch(ROOT_URL);
    const productsUrlMatch = useMatch(`${ROOT_URL}${PageName.PRODUCTS}`);

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
