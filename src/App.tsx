import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { AboutMe } from './components/AboutMe/AboutMe.tsx';
import LoginForm from './components/LoginForm/LoginForm.tsx';
import { ProductsList } from './components/ProductsList/ProductsList.tsx';
import { PageName } from './interfaces/Pages.ts';
import { LayoutComponent } from './layouts/LayoutComponent.tsx';
import AuthPage from './pages/AuthPage/AuthPage.tsx';
import { CartPage } from './pages/CartPage/CartPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.tsx';
import { ProductPage } from './pages/ProductPage/ProductPage.tsx';
import { store } from './store/index.js';

// import styles from './App.module.css';

function App() {
    return (
        <HashRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="" element={<LayoutComponent />}>
                        <Route index element={<AboutMe />} />
                        <Route path={PageName.PRODUCTS} element={<ProductsList />} />
                        <Route path={`${PageName.PRODUCTS}/:productId`} element={<ProductPage />} />
                        <Route
                            path={PageName.LOGIN}
                            element={
                                <AuthPage title="Login">
                                    <LoginForm />
                                </AuthPage>
                            }
                        />
                        <Route path={PageName.CART} element={<CartPage />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Provider>
        </HashRouter>
    );
}

export { App };
