import React, { useState } from 'react';

import ArrowDownIcon from '@assets/icons/Caret_Down_MD.svg?react';
import ArrowUpIcon from '@assets/icons/Caret_Up_MD.svg?react';

import type { Selector } from '@/components/SearchBar/SearchBar';
import { useReduxStore } from '@/hooks/useReduxStore';
import { useToggle } from '@/hooks/useToggle';
import type { SortBy } from '@/interfaces/Filters';
import { changeSortBy } from '@/store/slices/filtersSlice';

import styles from './CustomSelector.module.css';

interface CustomSelectorProps {
    selectors: Readonly<Selector[]>;
    title: string;
}

function CustomSelector({ selectors, title }: CustomSelectorProps) {
    const { useAppDispatch } = useReduxStore();
    const dispatch = useAppDispatch();

    const [currentSelector, setCurrentSelector] = useState(selectors[0]);
    const [isOpen, toogleIsOpen] = useToggle(false);

    const menuSelectors = selectors.filter((item) => item.selector !== currentSelector?.selector);

    function handleSortBy(sortBy: SortBy) {
        dispatch(changeSortBy(sortBy));
    }

    function handleChangeCurrentSelector(selector: Selector['selector']) {
        handleSortBy(selector);
        setCurrentSelector(selectors.find((selectorItem) => selectorItem.selector === selector)!);
        toogleIsOpen();
    }

    return (
        <div className={styles.selector}>
            <div className={styles.title}>{title}</div>
            <menu className={`${styles.selectorMenu} ${isOpen ? styles.open : ''}`}>
                <button className={styles.selectorButton} onClick={toogleIsOpen}>
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
