import React from 'react';

import styles from './FilterButton.module.css';

interface FilterButtonProps extends React.ComponentProps<'button'> {
    isActive: boolean;
}

function FilterButton({ children, isActive, ...restProps }: FilterButtonProps) {
    return (
        <button className={`${styles.button} ${isActive ? styles.active : ''}`} {...restProps}>
            {children}
        </button>
    );
}

export default FilterButton;
