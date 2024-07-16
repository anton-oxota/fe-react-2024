import React from 'react';

import styles from './FormButton.module.css';

interface FormButtonInterface extends React.ComponentProps<'button'> {
    isActive?: boolean;
}

function FormButton({ className, children, isActive, ...props }: FormButtonInterface) {
    let classes = styles.formButton;

    if (className) {
        classes += ` ${className}`;
    }

    if (isActive) {
        classes += ` ${styles.active}`;
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}

export default FormButton;
