import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';

function LayoutComponent() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export { LayoutComponent };
