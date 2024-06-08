import { useState } from 'react';

function useToggle(initialValue: boolean): [boolean, () => void] {
    const [isOpen, setIsOpen] = useState(initialValue);

    function switchIsOpen() {
        setIsOpen((previousState) => !previousState);
    }

    return [isOpen, switchIsOpen];
}

export { useToggle };
