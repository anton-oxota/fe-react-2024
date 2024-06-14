import React, { useRef } from 'react';

import SearchIcon from '@assets/icons/search_glass.svg?react';

import { useFiltersContext } from '@/hooks/useFiltersContext';
import type { Category } from '@/interfaces/Category';
import { SortByEnum } from '@/interfaces/Filters';
import { CustomSelector } from '@/ui/CustomSelector/CustomSelector';
import FilterButton from '@/ui/FilterButton/FilterButton';

import styles from './SearchBar.module.css';

export interface Selector {
    title: string;
    selector: SortByEnum;
}

const selectors: Readonly<Selector[]> = [
    {
        title: 'Price (High - Low)',
        selector: SortByEnum.HIGH_TO_LOW,
    },
    {
        title: 'Price (Low- High)',
        selector: SortByEnum.LOW_TO_HIGH,
    },
    // {
    //     title: 'Newest',
    //     selector: SortByEnum.NEWEST,
    // },
    // {
    //     title: 'Oldest',
    //     selector: SortByEnum.OLDEST,
    // },
];

const filters: Readonly<Pick<Category, 'id' | 'name'>[]> = [
    { id: 1, name: 'Clothes' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Furniture' },
    { id: 4, name: 'Shoes' },
    { id: 5, name: 'Miscellaneous' },
];

function SearchBar() {
    const inputReference = useRef<HTMLInputElement>(null);

    const { handleChangeSerch, category, handleChangeActiveCategory } = useFiltersContext();

    function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (inputReference.current) {
            handleChangeSerch(inputReference.current?.value);
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
