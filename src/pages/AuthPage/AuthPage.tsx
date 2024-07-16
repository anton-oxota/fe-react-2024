import React from 'react';

import styles from './AuthPage.module.css';

interface AuthPageProps {
    title: string;
    children: React.ReactNode;
}

function AuthPage({ title, children }: AuthPageProps) {
    return (
        <section className={styles.auth}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.title}>{title}</div>
                    {children}
                </div>
            </div>
        </section>
    );
}

export default AuthPage;
