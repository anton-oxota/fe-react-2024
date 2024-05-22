import React, { useContext, useEffect, useState } from 'react';

import PrevIcon from '@assets/icons/Chevron_Left.svg?react';
import NextIcon from '@assets/icons/Chevron_Right.svg?react';

import { FilterContext } from '@/context/Filter.context';

import Pagination from '../Pagination/Pagination';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './ProductsList.module.css';

const productCardsOnPage = 8;

function ProductsList() {
    const { filteredData } = useContext(FilterContext);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredData]);

    const qtyOfPages = Math.ceil(filteredData.length / productCardsOnPage);

    function createButtons() {
        const buttons = [];
        for (let index = 1; index <= qtyOfPages; index++) {
            const button = (
                <button
                    className={`${styles.pageButton} ${currentPage === index ? styles.active : ''}`}
                    key={index}
                    onClick={() => setCurrentPage(index)}
                >
                    {index}
                </button>
            );
            buttons.push(button);
        }
        return buttons;
    }

    const pageButtons = createButtons();

    function create() {
        let test;
        if (currentPage <= 3) {
            test = [
                pageButtons[currentPage - 3],
                pageButtons[currentPage - 2],
                pageButtons[currentPage - 1],
                pageButtons[currentPage],
                <span key={Math.random()}>...</span>,
                pageButtons[qtyOfPages - 1],
            ];
        }

        if (currentPage >= qtyOfPages - 2) {
            test = [
                pageButtons[0],
                <span key={Math.random()}>...</span>,
                pageButtons[currentPage - 2],
                pageButtons[currentPage - 1],
                pageButtons[currentPage],
                pageButtons[currentPage + 1],
            ];
        }

        if (currentPage > 3 && currentPage < qtyOfPages - 2) {
            test = [
                pageButtons[0],
                <span key={Math.random()}>...</span>,
                pageButtons[currentPage - 2],
                pageButtons[currentPage - 1],
                pageButtons[currentPage],
                <span key={Math.random()}>...</span>,
                pageButtons[qtyOfPages - 1],
            ];
        }

        return test;
    }

    return (
        <>
            <SearchBar />
            <section className={styles.productsList}>
                <div className="container">
                    <div className={styles.wrapper}>
                        {filteredData.length === 0 && <p>No Items</p>}
                        <Pagination currentPage={currentPage} data={filteredData} productCardsOnPage={productCardsOnPage} />
                    </div>
                    <div className={styles.pageButtonsWrapper}>
                        <button
                            className={`${styles.pageButton} ${styles.sideButton}`}
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((previous) => previous - 1)}
                        >
                            <PrevIcon />
                        </button>
                        {/* {pageButtons} */}
                        {/* {create()} */}
                        {pageButtons.length > 5 ? create() : pageButtons}
                        <button
                            className={`${styles.pageButton} ${styles.sideButton}`}
                            disabled={currentPage === qtyOfPages}
                            onClick={() => setCurrentPage((previous) => previous + 1)}
                        >
                            <NextIcon />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export { ProductsList };
