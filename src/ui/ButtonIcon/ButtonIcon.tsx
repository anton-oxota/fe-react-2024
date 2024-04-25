import React from 'react';

import styles from './ButtonIcon.module.css';

interface ButtonIconProps {
    src: string;
    alt: string;
    buttonProps?: React.ComponentProps<'button'>;
}

function ButtonIcon({ src, alt, ...buttonProps }: ButtonIconProps) {
    return (
        <button className={styles.button} {...buttonProps}>
            <img src={src} alt={alt} />
        </button>
    );
}

export default ButtonIcon;
