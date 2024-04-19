import React from 'react';

import styles from './CustomLink.module.css';

interface CustomLinkProps {
    children: React.ReactNode;
    href: string;
    ['string']?: string;
}

function CustomLink(props: CustomLinkProps) {
    return (
        <>
            &#32;
            <a className={styles.link} target="blank" {...props}>
                {props.children}
            </a>
            &#32;
        </>
    );
}

export default CustomLink;
