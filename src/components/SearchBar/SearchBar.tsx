import React, { useRef } from 'react';

import SearchIcon from '@assets/icons/search_glass.svg?react';

import { useReduxStore } from '@/hooks/useReduxStore';
import type { Category } from '@/interfaces/Category';
import { SortBy } from '@/interfaces/Filters';
import { categorySelector, changeActiveCategory, changeSearch } from '@/store/slices/filtersSlice';
import { CustomSelector } from '@/ui/CustomSelector/CustomSelector';
import FilterButton from '@/ui/FilterButton/FilterButton';

import styles from './SearchBar.module.css';

export interface Selector {
    title: string;
    selector: SortBy;
}

const selectors: Readonly<Selector[]> = [
    {
        title: 'Price (High - Low)',
        selector: SortBy.HIGH_TO_LOW,
    },
    {
        title: 'Price (Low- High)',
        selector: SortBy.LOW_TO_HIGH,
    },
];

const filters: Readonly<Pick<Category, 'id' | 'name'>[]> = [
    { id: 1, name: 'Clothes' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Furniture' },
    { id: 4, name: 'Shoes' },
    { id: 5, name: 'Miscellaneous' },
];

function SearchBar() {
    const { useAppDispatch, useAppSelector } = useReduxStore();
    const dispatch = useAppDispatch();
    const inputReference = useRef<HTMLInputElement>(null);

    const category = useAppSelector(categorySelector);

    function handleChangeSearch(value: string) {
        dispatch(changeSearch(value));
    }

    function handleChangeActiveCategory(newCategory: Category['id']) {
        dispatch(changeActiveCategory(newCategory));
    }

    function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (inputReference.current) {
            handleChangeSearch(inputReference.current?.value);
        }
    }

    return (
        <section className={styles.searchBar}>
            <div className="container">
                <div className={styles.wrapper}>
                    <form className={styles.form} onSubmit={handleSearchSubmit} autoComplete="off">
                        <input ref={inputReference} type="text" name="search" placeholder="Search..." />
                        <button>
                            <SearchIcon />
                        </button>
                    </form>

                    <div className={styles.actions}>
                        {filters.map((filter) => (
                            <FilterButton
                                key={filter.id}
                                isActive={category === filter.id}
                                onClick={() => handleChangeActiveCategory(filter.id)}
                            >
                                {filter.name}
                            </FilterButton>
                        ))}
                    </div>

                    <CustomSelector title="Sort by" selectors={selectors} />
                </div>
            </div>
        </section>
    );
}

SearchBar.displayName = 'SearchBar';

export { SearchBar };
