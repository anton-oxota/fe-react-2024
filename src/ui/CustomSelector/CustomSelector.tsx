import React, { useState } from 'react';

import ArrowDownIcon from '@assets/icons/Caret_Down_MD.svg?react';
import ArrowUpIcon from '@assets/icons/Caret_Up_MD.svg?react';

import type { Selector } from '@/components/SearchBar/SearchBar';
import { useFilterContext } from '@/hooks/useFilterContext';

import styles from './CustomSelector.module.css';

interface CustomSelectorProps {
    selectors: Readonly<Selector[]>;
    title: string;
}

function CustomSelector({ selectors, title }: CustomSelectorProps) {
    const {
        filtersState: { sortBy },
        handleSelectFilter,
    } = useFilterContext();

    const [currentSelector, setCurrentSelector] = useState(selectors.find((sel) => sel.selector === sortBy));
    const [isOpen, setIsOpen] = useState(false);

    const menuSelectors = selectors.filter((item) => item.selector !== currentSelector?.selector);

    function handleChangeCurrentSelector(selector: Selector['selector']) {
        const newSelector = selectors.find((item) => item.selector === selector)!;
        setCurrentSelector(newSelector);
        handleSelectFilter(selector);
        setIsOpen(false);
    }

    return (
        <div className={styles.selector}>
            <div className={styles.title}>{title}</div>
            <menu className={`${styles.selectorMenu} ${isOpen ? styles.open : ''}`}>
                <button className={styles.selectorButton} onClick={() => setIsOpen((previous) => !previous)}>
                    {currentSelector?.title}
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
