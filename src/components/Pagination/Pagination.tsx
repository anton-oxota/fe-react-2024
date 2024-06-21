import React from 'react';

import PrevIcon from '@assets/icons/Chevron_Left.svg?react';
import NextIcon from '@assets/icons/Chevron_Right.svg?react';

import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    qtyOfPages: number;
    handleChangeButton: (index: number) => void;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({ currentPage, qtyOfPages, handleChangeButton, setCurrentPage }: PaginationProps) {
    function createButtons() {
        const buttons = [];
        for (let index = 1; index <= qtyOfPages; index++) {
            const button = (
                <button
                    className={`${styles.pageButton} ${currentPage === index ? styles.active : ''}`}
                    key={index}
                    onClick={() => handleChangeButton(index)}
                >
                    {index}
                </button>
            );
            buttons.push(button);
        }
        return buttons;
    }

    const pageButtons = createButtons();

    function createPageButtons() {
        let test;
        if (currentPage <= 3) {
            test = [
                pageButtons[currentPage - 3],
                pageButtons[currentPage - 2],
                pageButtons[currentPage - 1],
                pageButtons[currentPage],
                <span key={Math.random()}>...</span>,
                pageButtons[qtyOfPages - 1],
            ];
        }

        if (currentPage >= qtyOfPages - 2) {
            test = [
                pageButtons[0],
                <span key={Math.random()}>...</span>,
                pageButtons[currentPage - 2],
                pageButtons[currentPage - 1],
                pageButtons[currentPage],
                pageButtons[currentPage + 1],
            ];
        }

        if (currentPage > 3 && currentPage < qtyOfPages - 2) {
            test = [
                pageButtons[0],
                <span key={Math.random()}>...</span>,
                pageButtons[currentPage - 2],
                pageButtons[currentPage - 1],
                pageButtons[currentPage],
                <span key={Math.random()}>...</span>,
                pageButtons[qtyOfPages - 1],
            ];
        }

        return test;
    }
    return (
        <div className={styles.pageButtonsWrapper}>
            <button
                className={`${styles.pageButton} ${styles.sideButton}`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((previous) => previous - 1)}
            >
                <PrevIcon />
            </button>
            {pageButtons.length > 5 ? createPageButtons() : pageButtons}
            <button
                className={`${styles.pageButton} ${styles.sideButton}`}
                disabled={currentPage === qtyOfPages}
                onClick={() => setCurrentPage((previous) => previous + 1)}
            >
                <NextIcon />
            </button>
        </div>
    );
}

export { Pagination };
