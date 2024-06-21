import React, { useEffect, useRef, useState } from 'react';

import { useFetch } from '@/hooks/useFetch';
import { useFiltersContext } from '@/hooks/useFiltersContext';
import type { Product } from '@/interfaces/Product';
import type { FetchProductsInterface } from '@/utils/http';
import { fetchProducts } from '@/utils/http';

import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './ProductsList.module.css';

const productsInitialValue: FetchProductsInterface[] = [{ products: [], total: 0 }];

const productCardsOnPage = 8;
const isMobile = window.innerWidth < 1290;

function ProductsList() {
    const { search, sortBy, category } = useFiltersContext();
    const { fetchData, fetchedData, setFetchedData, isFetching, error } = useFetch(productsInitialValue, fetchProducts);
    const productsData = fetchedData?.reduce<Product[]>((previous, current) => [...previous, ...current.products], []);

    const [currentPage, setCurrentPage] = useState(1);
    function handleChangeButton(index: number) {
        setCurrentPage(index);
    }
    const qtyOfPages = Math.ceil((fetchedData ? fetchedData[1]?.total : 0) / productCardsOnPage);

    const lastElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entryes) => {
                if (entryes[0].isIntersecting) {
                    setCurrentPage((previousPage) => {
                        if (previousPage < qtyOfPages) {
                            return previousPage + 1;
                        }

                        return previousPage;
                    });
                }
            },
            { threshold: 0.5 },
        );

        if (isMobile && lastElement.current) {
            observer.observe(lastElement.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [fetchedData, qtyOfPages]);

    useEffect(() => {
        setCurrentPage(1);
        setFetchedData(productsInitialValue);
    }, [search, category, sortBy, setFetchedData]);

    useEffect(() => {
        const controller = new AbortController();

        if (!isMobile) {
            setFetchedData(productsInitialValue);
        }

        fetchData(
            {
                limit: productCardsOnPage,
                offset: (currentPage - 1) * productCardsOnPage,
                title: search,
                categoryId: category,
                sortOrder: sortBy,
            },
            controller.signal,
        );

        return () => {
            controller.abort();
        };
    }, [fetchData, search, category, sortBy, currentPage, setFetchedData]);

    const isVisiblePagesButtons = !isMobile && !isFetching && !error && productsData && productsData.length > 0;

    let productsListContent: React.ReactNode = productsData?.map((productData) => (
        <ProductCard key={productData.title} productRef={lastElement} productData={productData} />
    ));

    if (isFetching && !isMobile) {
        productsListContent = <p>Loading...</p>;
    } else if (error && !isMobile) {
        productsListContent = <p>{error}</p>;
    } else if (productsData.length === 0 && (search || category)) {
        productsListContent = <p>No Items</p>;
    }

    const isMobileFirstLoading = isMobile && !error && productsData.length === 0;
    const isMobileLoading = isMobile && isFetching && productsData.length > 0;
    const isMobileError = isMobile && error;

    return (
        <>
            <SearchBar />
            <section className={styles.productsList}>
                <div className="container">
                    <div className={styles.wrapper}>
                        {isMobileFirstLoading && <p>Loading...</p>}
                        {productsListContent}
                        {isMobileLoading && <p>Loading...</p>}
                        {isMobileError && <p>{error}</p>}
                    </div>
                    {isVisiblePagesButtons && (
                        <Pagination
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            handleChangeButton={handleChangeButton}
                            qtyOfPages={qtyOfPages}
                        />
                    )}
                </div>
            </section>
        </>
    );
}

export { ProductsList };
