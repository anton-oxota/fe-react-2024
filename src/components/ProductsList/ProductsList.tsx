import React, { useEffect, useState } from 'react';

import PrevIcon from '@assets/icons/Chevron_Left.svg?react';
import NextIcon from '@assets/icons/Chevron_Right.svg?react';

import { useFetch } from '@/hooks/useFetch';
import { useFiltersContext } from '@/hooks/useFiltersContext';
import type { Product } from '@/interfaces/Product';
import type { FetchProductsInterface } from '@/utils/http';
import { fetchProducts } from '@/utils/http';

import { ProductCard } from '../ProductCard/ProductCard';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './ProductsList.module.css';

const productsInitialValue: FetchProductsInterface = { products: [], total: 0 };

const productCardsOnPage = 8;
const isMobile = window.innerWidth < 1290;

function ProductsList() {
    const [currentPage, setCurrentPage] = useState(1);
    const { search, sortBy, category } = useFiltersContext();
    const { fetchData, fetchedData, isFetching, error } = useFetch(productsInitialValue, fetchProducts);
    const qtyOfPages = Math.ceil((fetchedData ? fetchedData.total : 0) / productCardsOnPage);

    const [data, setData] = useState<Product[]>([]);

    // test

    useEffect(() => {
        if (isMobile) {
            if (currentPage === 1) {
                if (fetchedData) {
                    setData(fetchedData?.products);
                }
            } else {
                if (fetchedData) {
                    setData((previous) => [...previous, ...fetchedData.products]);
                }
            }
        } else {
            if (fetchedData) {
                setData(fetchedData?.products);
            }
        }

        return () => {};
        // if remove 'currentPage' everything work fine bun i don't know how to do it
    }, [fetchedData, currentPage]);

    // First render
    useEffect(() => {
        fetchData(productCardsOnPage);
    }, [fetchData]);

    useEffect(() => {
        if (!isMobile) {
            setData([]);
        }
        fetchData(productCardsOnPage, (currentPage - 1) * productCardsOnPage, search, sortBy, category);
    }, [fetchData, search, sortBy, category, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, sortBy, category]);

    // Window
    const isVisiblePagesButtons = !isMobile && !isFetching && !error && data && data.length > 0;

    useEffect(() => {
        function handleScroll() {
            if (document.documentElement.scrollHeight <= Math.ceil(window.innerHeight + window.scrollY)) {
                setCurrentPage((previous) => {
                    if (previous < qtyOfPages) {
                        return previous + 1;
                    }
                    return previous;
                });
            }
        }

        if (isMobile) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage, qtyOfPages, isVisiblePagesButtons]);

    function handleChangeButton(index: number) {
        setCurrentPage(index);
    }

    function createButtons() {
        const buttons = [];
        for (let index = 1; index <= qtyOfPages; index++) {
            const button = (
                <button
                    className={`${styles.pageButton} ${currentPage === index ? styles.active : ''}`}
                    key={index}
                    onClick={() => handleChangeButton(index)}
                >
                    {index}
                </button>
            );
            buttons.push(button);
        }
        return buttons;
    }

    const pageButtons = createButtons();

    function createPageButtons() {
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

    let productsListContent: React.ReactNode = data?.map((productData) => (
        <ProductCard key={productData.title} productData={productData} />
    ));

    if (isFetching && !isMobile) {
        productsListContent = <p>Loading Products...</p>;
    } else if (error) {
        productsListContent = <p>{error}</p>;
    } else if (data?.length === 0 && !error && !isFetching) {
        productsListContent = <p>No Items</p>;
    }

    return (
        <>
            <SearchBar />
            <section className={styles.productsList}>
                <div className="container">
                    <div className={styles.wrapper}>
                        {isMobile && isFetching && data && data.length === 0 && <p>Loading Products...</p>}
                        {productsListContent}
                    </div>
                    {isVisiblePagesButtons && (
                        <div className={styles.pageButtonsWrapper}>
                            <button
                                className={`${styles.pageButton} ${styles.sideButton}`}
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((previous) => previous - 1)}
                            >
                                <PrevIcon />
                            </button>
                            {pageButtons.length > 5 ? createPageButtons() : pageButtons}
                            <button
                                className={`${styles.pageButton} ${styles.sideButton}`}
                                disabled={currentPage === qtyOfPages}
                                onClick={() => setCurrentPage((previous) => previous + 1)}
                            >
                                <NextIcon />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export { ProductsList };
