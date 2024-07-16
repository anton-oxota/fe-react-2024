import { useEffect, useState } from 'react';

export function useValidateInput(initialState: string, validateFunction: Function) {
    const [value, setValue] = useState(initialState);
    const [didTouch, setDidTouch] = useState(false);
    const [errorMessage, setErrorMessage] = useState<null | string>(null);

    function onChange(newValue: string) {
        setErrorMessage(null);
        setDidTouch(false);
        setValue(newValue);
    }

    function onBlure() {
        setDidTouch(true);
    }

    const isInvalid = validateFunction(value);
    const isShowError = (value && didTouch && isInvalid) || (didTouch && errorMessage);

    useEffect(() => {
        if (!errorMessage) {
            setErrorMessage(isInvalid);
        }
    }, [isShowError, isInvalid, errorMessage]);

    return {
        value,
        isShowError,
        isInvalid,
        errorMessage,
        onChange,
        onBlure,
        setErrorMessage,
        setDidTouch,
    };
}
