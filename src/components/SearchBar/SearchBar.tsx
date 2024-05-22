import React, { useContext, useRef } from 'react';

import SearchIcon from '@assets/icons/search_glass.svg?react';

import { DataContext } from '@/context/Data.context';
import { FilterContext } from '@/context/Filter.context';
import { SortByEnum } from '@/interfaces/Filters';
import { CustomSelector } from '@/ui/CustomSelector/CustomSelector';
import FilterButton from '@/ui/FilterButton/FilterButton';

import styles from './SearchBar.module.css';

function SearchBar() {
    const inputReference = useRef<HTMLInputElement>(null);
    const { data } = useContext(DataContext);
    const {
        filtersState: { filters: activeFilters },
        toggleButtonFilter,
        handleSearcFilter,
    } = useContext(FilterContext);

    const filtersArray: string[] = [];

    data.forEach((item) => {
        if (!filtersArray.includes(item.category.name)) {
            filtersArray.push(item.category.name);
        }
    });

    function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (inputReference.current) {
            const inputValue = inputReference.current.value;
            handleSearcFilter(inputValue);
        }
    }

    return (
        <section className={styles.searchBar}>
            <div className="container">
                <div className={styles.wrapper}>
                    <form className={styles.form} onSubmit={handleOnSubmit}>
                        <input ref={inputReference} type="text" name="search" placeholder="Search..." />
                        <button>
                            <SearchIcon />
                        </button>
                    </form>

                    <div className={styles.actions}>
                        {filtersArray.map((filter) => (
                            <FilterButton
                                key={filter}
                                filter={filter}
                                isActive={activeFilters.includes(filter)}
                                onClick={() => toggleButtonFilter(filter)}
                            >
                                {filter}
                            </FilterButton>
                        ))}
                    </div>

                    <CustomSelector
                        title="Sort by"
                        selectors={[
                            {
                                title: 'Price (High - Low)',
                                selector: SortByEnum.HIGH_TO_LOW,
                            },
                            {
                                title: 'Price (Low- High)',
                                selector: SortByEnum.LOW_TO_HIGH,
                            },
                            {
                                title: 'Newest',
                                selector: SortByEnum.NEWEST,
                            },
                            {
                                title: 'Oldest',
                                selector: SortByEnum.OLDEST,
                            },
                        ]}
                    />
                </div>
            </div>
        </section>
    );
}

export { SearchBar };
