import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.css';

function NotFoundPage() {
    return (
        <>
            <div className="container">
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>
                        <div>404</div>
                        Page Not Found
                    </h1>
                    <Link className={styles.goHome} to="">
                        Go Home
                    </Link>
                </div>
            </div>
        </>
    );
}

export { NotFoundPage };
