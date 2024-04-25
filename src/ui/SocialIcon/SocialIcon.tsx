import React from 'react';

import styles from './SocialIcon.module.css';

function SocialIcon({ children, href }: React.ComponentProps<'a'>) {
    return (
        <li>
            <a className={styles.socialLink} href={href} target="_blank" rel="noreferrer">
                {children}
            </a>
        </li>
    );
}

export { SocialIcon };
