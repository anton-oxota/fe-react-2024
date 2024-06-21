import { createContext, useState } from 'react';

import type { Category } from '@/interfaces/Category';
import { SortBy } from '@/interfaces/Filters';

interface FiltersContextInterface {
    search: string;
    sortBy: SortBy;
    category: '' | Category['id'];
    handleChangeSerch: (value: string) => void;
    handleSortBy: (selector: SortBy) => void;
    handleChangeActiveCategory: (category: Category['id']) => void;
}

export const FiltersContext = createContext<FiltersContextInterface>({
    search: '',
    sortBy: SortBy.HIGH_TO_LOW,
    category: '',
    handleChangeSerch: () => {},
    handleSortBy: () => {},
    handleChangeActiveCategory: () => {},
});

interface FilterProviderProps {
    children: React.ReactNode;
}

interface FilterState {
    search: string;
    sortBy: SortBy;
    category: '' | Category['id'];
}

function FiltersContextProvider({ children }: FilterProviderProps) {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        sortBy: SortBy.HIGH_TO_LOW,
        category: '',
    });

    function handleChangeSerch(value: string) {
        setFilters((previous) => ({
            ...previous,
            search: value,
        }));
    }

    function handleSortBy(selector: SortBy) {
        setFilters((previous) => ({ ...previous, sortBy: selector }));
    }

    function handleChangeActiveCategory(category: Category['id']) {
        setFilters((previous) => {
            if (previous.category === category) {
                return {
                    ...previous,
                    category: '',
                };
            }

            return {
                ...previous,
                category,
            };
        });
    }

    const contextValue = {
        ...filters,
        handleChangeSerch,
        handleSortBy,
        handleChangeActiveCategory,
    };

    return <FiltersContext.Provider value={contextValue}>{children}</FiltersContext.Provider>;
}

export { FiltersContextProvider };
