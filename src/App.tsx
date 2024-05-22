import { useState } from 'react';

import { AboutMe } from './components/AboutMe/AboutMe.tsx';
import { Footer } from './components/Footer/Footer.tsx';
import { Header } from './components/Header/Header.tsx';
import { ProductsList } from './components/ProductsList/ProductsList.tsx';
import { CartContextProvider } from './context/Cart.context.tsx';
import { DataContextProvider } from './context/Data.context.tsx';
import { FilterContextProvider } from './context/Filter.context.tsx';
// import { PRODUCTS_DATA } from './data/data.ts';
import { PageName } from './interfaces/Pages.ts';

// import styles from './App.module.css';

function App() {
    const [currentPage, setCurrentPage] = useState<PageName>(PageName.PRODUCTS);

    function handleChangePage(page: PageName) {
        setCurrentPage(page);
    }

    const content = {
        [PageName.ABOUT]: <AboutMe />,
        [PageName.PRODUCTS]: <ProductsList />,
    };

    return (
        <DataContextProvider>
            <CartContextProvider>
                <FilterContextProvider>
                    <Header onChangePage={handleChangePage} activePage={currentPage} />
                    <main className="home">{content[currentPage]}</main>
                    <Footer />
                </FilterContextProvider>
            </CartContextProvider>
        </DataContextProvider>
    );
}

export { App };
