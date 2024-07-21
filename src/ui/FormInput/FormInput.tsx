import React from 'react';

import { cn } from '@/utils/cn';

import styles from './FormInput.module.css';

interface FormInputInterface extends React.ComponentProps<'input'> {
    isError?: boolean;
    errorMessage?: string | null;
}

function FormInput({ className, isError, errorMessage, ...props }: FormInputInterface) {
    let classes = cn(styles.input, className);

    if (isError) {
        classes = cn(classes, styles.error);
    }

    return (
        <>
            <input className={classes} {...props} />
            {isError && <p className={styles.message}>{errorMessage}</p>}
        </>
    );
}

export default FormInput;
