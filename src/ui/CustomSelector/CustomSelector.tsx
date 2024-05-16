import React, { useState } from 'react';

import ArrowDownIcon from '@assets/icons/Caret_Down_MD.svg?react';
import ArrowUpIcon from '@assets/icons/Caret_Up_MD.svg?react';

import styles from './CustomSelector.module.css';

interface Selector {
    title: string;
    selector: string;
}

interface CustomSelectorProps {
    selectors: Selector[];
    title: string;
}

function CustomSelector({ selectors, title }: CustomSelectorProps) {
    const [currentSelector, setCurrentSelector] = useState(selectors[0]);
    const [isOpen, setIsOpen] = useState(false);

    const menuSelectors = selectors.filter((item) => item.selector !== currentSelector.selector);

    function handleChangeCurrentSelector(selector: Selector['selector']) {
        const newSelector = selectors.find((item) => item.selector === selector)!;
        setCurrentSelector(newSelector);
        setIsOpen(false);
    }

    return (
        <div className={styles.selector}>
            <div className={styles.title}>{title}</div>
            <menu className={`${styles.selectorMenu} ${isOpen ? styles.open : ''}`}>
                <button className={styles.selectorButton} onClick={() => setIsOpen((previous) => !previous)}>
                    {currentSelector.title}
                    {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </button>
                <div className={styles.dropDown}>
                    {menuSelectors.map((item) => (
                        <button key={item.selector} onClick={() => handleChangeCurrentSelector(item.selector)}>
                            {item.title}
                        </button>
                    ))}
                </div>
            </menu>
        </div>
    );
}

export { CustomSelector };
