import React from 'react';

import styles from './FormInput.module.css';

interface FormInputInterface extends React.ComponentProps<'input'> {
    isError?: boolean;
    errorMessage?: string | null;
}

function FormInput({ className, isError, errorMessage, ...props }: FormInputInterface) {
    let classes = styles.input;

    if (className) {
        classes += ` ${className}`;
    }

    if (isError) {
        classes += ` ${styles.error}`;
    }

    return (
        <>
            <input className={classes} {...props} />
            {isError && <p className={styles.message}>{errorMessage}</p>}
        </>
    );
}

export default FormInput;
