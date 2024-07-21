import React from 'react';

import { cn } from '@/utils/cn';

import styles from './FormButton.module.css';

interface FormButtonInterface extends React.ComponentProps<'button'> {
    isActive?: boolean;
}

function FormButton({ className, children, isActive, ...props }: FormButtonInterface) {
    let classes = cn(styles.formButton, className);

    if (isActive) {
        classes = cn(classes, styles.active);
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}

export default FormButton;
