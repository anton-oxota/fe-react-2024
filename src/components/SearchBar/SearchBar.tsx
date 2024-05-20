import React from 'react';

import SearchIcon from '@assets/icons/search_glass.svg?react';

import { CustomSelector } from '@/ui/CustomSelector/CustomSelector';
import FilterButton from '@/ui/FilterButton/FilterButton';

import styles from './SearchBar.module.css';

function SearchBar() {
    return (
        <section className={styles.searchBar}>
            <div className="container">
                <div className={styles.wrapper}>
                    <form className={styles.form}>
                        <input type="text" placeholder="Search..." />
                        <button>
                            <SearchIcon />
                        </button>
                    </form>

                    <div className={styles.actions}>
                        <FilterButton>Electronics</FilterButton>
                        <FilterButton>Shoes</FilterButton>
                        <FilterButton>Clothes</FilterButton>
                    </div>

                    <CustomSelector
                        title="Sort by"
                        selectors={[
                            {
                                title: 'Price (High - Low)',
                                selector: 'highToLow',
                            },
                            {
                                title: 'Price (Low- High)',
                                selector: 'lowToHigh',
                            },
                            {
                                title: 'Newest',
                                selector: 'newest',
                            },
                            {
                                title: 'Oldest',
                                selector: 'oldest',
                            },
                        ]}
                    />
                </div>
            </div>
        </section>
    );
}

export { SearchBar };
