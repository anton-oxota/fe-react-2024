import React from 'react';

import { CustomLink } from '@/ui/CustomLink/CustomLink';
import { Socials } from '@/ui/Socials/Socials';

import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.content}>
                    <Socials />
                    <p className={styles.description}>
                        Made with 💗 on course
                        <CustomLink className={styles.courseLink} href="https://www.mastersacademy.education/frontend-for-beginners-it">
                            &apos;Intro to React&apos; from Masters Academy in 2024
                        </CustomLink>
                        , by Anton
                    </p>
                </div>
            </div>
        </footer>
    );
}

export { Footer };
