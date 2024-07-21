import React, { useEffect, useRef, useState } from 'react';

import { useReduxStore } from '@/hooks/useReduxStore';
import type { Product } from '@/interfaces/Product';
import { categorySelector, searchSelector, sortBySelector } from '@/store/slices/filtersSlice';
import { dataSelector, errorSelector, getProducts, isLoadingSelector, resetData } from '@/store/slices/productsSlise';

import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './ProductsList.module.css';

const productCardsOnPage = 8;
const isMobile = window.innerWidth < 1290;

function ProductsList() {
    const { useAppDispatch, useAppSelector } = useReduxStore();
    const dispatch = useAppDispatch();

    const search = useAppSelector(searchSelector);
    const sortBy = useAppSelector(sortBySelector);
    const category = useAppSelector(categorySelector);

    const fetchedData = useAppSelector(dataSelector);
    const isFetching = useAppSelector(isLoadingSelector);
    const error = useAppSelector(errorSelector);

    const [currentPage, setCurrentPage] = useState(1);
    function handleChangeButton(index: number) {
        setCurrentPage(index);
    }
    const productsData = fetchedData?.reduce<Product[]>((previous, current) => [...previous, ...current.products], []);
    const totalOfProducts = fetchedData[1]?.total;
    const qtyOfPages = Math.ceil((fetchedData ? totalOfProducts : 0) / productCardsOnPage);

    const lastElement = useRef<HTMLDivElement>(null);

    // Infinite Scroll
    // IntersectionObserver
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
        dispatch(resetData());
    }, [search, category, sortBy, dispatch]);

    useEffect(() => {
        const controller = new AbortController();

        if (!isMobile) {
            dispatch(resetData());
        }

        dispatch(
            getProducts({
                limit: productCardsOnPage,
                offset: (currentPage - 1) * productCardsOnPage,
                title: search,
                categoryId: category,
                sortOrder: sortBy,
                signal: controller.signal,
            }),
        );

        return () => {
            controller.abort();
        };
    }, [search, category, sortBy, currentPage, dispatch]);

    const isVisiblePagesButtons = !isMobile && !isFetching && !error && productsData && productsData.length > 0;

    let productsListContent: React.ReactNode = productsData?.map((productData) => (
        <ProductCard key={productData.title} productRef={lastElement} productData={productData} />
    ));

    if (totalOfProducts === 0 && (search || category)) {
        productsListContent = <p>No Items</p>;
    } else if (error && !isMobile) {
        productsListContent = <p>{error}</p>;
    } else if ((productsData.length === 0 || isFetching) && !isMobile) {
        productsListContent = <p>Loading...</p>;
    }

    const isMobileFirstLoading = isMobile && !error && productsData.length === 0 && !fetchedData[1];
    const isMobileLoading = isMobile && isFetching && productsData.length > 0;
    const isMobileError = isMobile && error;

    return (
        <>
            <SearchBar />
            <section className={styles.productsList}>
                <div className="container">
                    <p>Total amount of products: {totalOfProducts}</p>
                    {(search || category) && <p>Filtered amount of products: {totalOfProducts}</p>}
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
