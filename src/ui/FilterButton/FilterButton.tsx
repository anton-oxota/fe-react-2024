import React from 'react';

import styles from './FilterButton.module.css';

function FilterButton({ children, ...restProps }: React.ComponentProps<'button'>) {
    return (
        <button className={styles.button} {...restProps}>
            {children}
        </button>
    );
}

export default FilterButton;
