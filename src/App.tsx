import { useState } from 'react';

import { AboutMe } from './components/AboutMe/AboutMe.tsx';
import { Footer } from './components/Footer/Footer.tsx';
import { Header } from './components/Header/Header.tsx';
import { ProductsList } from './components/ProductsList/ProductsList.tsx';
import { PRODUCTS_DATA } from './data/data.ts';
import type { Product } from './interfaces/Product.ts';

// import styles from './App.module.css';

export enum PagesEnum {
    ABOUT = 'about',
    PRODUCTS = 'products',
}

export type AddToCartHandler = (item: Product) => void;

const CardKey = 'cart';

function App() {
    const localCart: Product[] = localStorage.getItem(CardKey) ? JSON.parse(localStorage.getItem(CardKey)!) : [];

    const [currentPage, setCurrentPage] = useState<PagesEnum>(PagesEnum.ABOUT);
    const [cartData, setCartData] = useState<Product[]>(localCart);

    function handleChangePage(page: PagesEnum) {
        setCurrentPage(page);
    }

    function handleAddToCart(item: Product) {
        setCartData((previousCart) => {
            const updatedCart = [...previousCart, item];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }
    const content = {
        [PagesEnum.ABOUT]: <AboutMe />,
        [PagesEnum.PRODUCTS]: <ProductsList data={PRODUCTS_DATA} handleAddToCart={handleAddToCart} cartData={cartData} />,
    };

    return (
        <>
            <Header onChangePage={handleChangePage} activePage={currentPage} cartData={cartData} />
            <main className="home">{content[currentPage]}</main>
            <Footer />
        </>
    );
}

export { App };
