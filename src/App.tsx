import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AboutMe } from './components/AboutMe/AboutMe.tsx';
import { ProductsList } from './components/ProductsList/ProductsList.tsx';
import { CartContextProvider } from './context/Cart.context.tsx';
import { FilterContextProvider } from './context/Filter.context.tsx';
import { ProductsDataContextProvider } from './context/ProductData.context.tsx';
import { ThemeContextProvider } from './context/Theme.context.tsx';
// import { PRODUCTS_DATA } from './data/data.ts';
import { PageName } from './interfaces/Pages.ts';
import { LayoutComponent } from './layouts/LayoutComponent.tsx';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.tsx';
import { ProductPage } from './pages/ProductPage/ProductPage.tsx';

// import styles from './App.module.css';

export const ROOT_URL = 'fe-react-2024/';

function App() {
    return (
        <BrowserRouter>
            <ProductsDataContextProvider>
                <CartContextProvider>
                    <FilterContextProvider>
                        <ThemeContextProvider>
                            <Routes>
                                <Route path={ROOT_URL} element={<LayoutComponent />}>
                                    <Route index element={<AboutMe />} />
                                    <Route path={PageName.PRODUCTS} element={<ProductsList />} />
                                    <Route path={`${PageName.PRODUCTS}/:productId`} element={<ProductPage />} />
                                </Route>
                                <Route path={`*`} element={<NotFoundPage />} />
                            </Routes>
                        </ThemeContextProvider>
                    </FilterContextProvider>
                </CartContextProvider>
            </ProductsDataContextProvider>
        </BrowserRouter>
    );
}

export { App };
