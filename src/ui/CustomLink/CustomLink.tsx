import React from 'react';

import styles from './CustomLink.module.css';

function CustomLink({ className, target = '_blank', children, ...restProps }: React.ComponentProps<'a'>) {
    return (
        <>
            &#32;
            <a className={`${styles.link} ${className}`} target={target} {...restProps}>
                {children}
            </a>
            &#32;
        </>
    );
}

export default CustomLink;
