// import { AboutMe } from './components/AboutMe/AboutMe.tsx';
import { useState } from 'react';

import { AboutMe } from './components/AboutMe/AboutMe.tsx';
import { Footer } from './components/Footer/Footer.tsx';
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent.tsx';
import { ProductsList } from './components/ProductsList/ProductsList.tsx';
import { PRODUCTS_DATA } from './data/data.ts';
import type { Product } from './interfaces/Product.ts';

// import styles from './App.module.css';

export type Pages = 'about' | 'products';

function App() {
    const localCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [];

    const [currentPage, setCurrentPage] = useState<Pages>('about');
    const [cartData, setCartData] = useState<Array<Product> | []>(localCart);

    function handleChangePage(page: Pages) {
        setCurrentPage(page);
    }

    function handleAddToCart(item: Product) {
        setCartData((previousCart) => {
            const updatedCart = [...previousCart, item];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }
    let content;

    switch (currentPage) {
        case 'about': {
            content = <AboutMe />;
            break;
        }
        case 'products': {
            content = <ProductsList data={PRODUCTS_DATA} handleAddToCart={handleAddToCart} cartData={cartData} />;
            break;
        }
        default: {
            content = <AboutMe />;
        }
    }

    return (
        <>
            <HeaderComponent onChangePage={handleChangePage} activePage={currentPage} cartData={cartData} />
            <main className="home">{content}</main>
            <Footer />
        </>
    );
}

export { App };
