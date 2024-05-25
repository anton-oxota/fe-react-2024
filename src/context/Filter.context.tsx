import { createContext, useState } from 'react';

import { useProductsDataContext } from '@/hooks/useProductsDataContext';
import { SortByEnum } from '@/interfaces/Filters';
import type { Product } from '@/interfaces/Product';

interface StateInterface {
    filters: string[];
    sortBy: SortByEnum;
    search: string;
}

interface FilterContextInterface {
    filteredProductsData: Product[];
    filtersState: StateInterface;
    toggleButtonFilter: (filter: string) => void;
    handleSearcFilter: (string: string) => void;
    handleSelectFilter: (string: SortByEnum) => void;
}

export const FilterContext = createContext<FilterContextInterface>({
    filteredProductsData: [],
    filtersState: {
        filters: [],
        sortBy: SortByEnum.HIGH_TO_LOW,
        search: '',
    },
    toggleButtonFilter: () => {},
    handleSearcFilter: () => {},
    handleSelectFilter: () => {},
});

interface FilterContextProviderProps {
    children: React.ReactNode;
}

function FilterContextProvider({ children }: FilterContextProviderProps) {
    const { productsData } = useProductsDataContext();
    const [filtersState, setFiltersState] = useState<StateInterface>({
        filters: [],
        sortBy: SortByEnum.HIGH_TO_LOW,
        search: '',
    });

    function toggleButtonFilter(filter: string) {
        setFiltersState((previousState) => {
            if (previousState.filters.includes(filter)) {
                const updatedState = structuredClone(previousState);
                updatedState.filters.splice(updatedState.filters.indexOf(filter), 1);
                return updatedState;
            } else {
                return {
                    ...previousState,
                    filters: [...previousState.filters, filter],
                };
            }
        });
    }

    function handleSearcFilter(string: string) {
        setFiltersState((previousState) => ({
            ...previousState,
            search: string,
        }));
    }

    function handleSelectFilter(filter: SortByEnum) {
        setFiltersState((previousState) => ({
            ...previousState,
            sortBy: filter,
        }));
    }

    function filterData(dataArray: Product[]): Product[] {
        const filteredData = dataArray.filter((item) => {
            const isValidName =
                filtersState.search.length === 0 ? true : item.title.toLowerCase().includes(filtersState.search.toLowerCase());
            const isValidCategory = filtersState.filters.length === 0 ? true : filtersState.filters.includes(item.category.name);

            return isValidName && isValidCategory;
        });

        filteredData.sort((a, b) => {
            switch (filtersState.sortBy) {
                case SortByEnum.HIGH_TO_LOW: {
                    return b.price - a.price;
                }
                case SortByEnum.LOW_TO_HIGH: {
                    return a.price - b.price;
                }
                case SortByEnum.NEWEST: {
                    const aDate = new Date(a.updatedAt);
                    const bDate = new Date(b.updatedAt);
                    return Number(bDate) - Number(aDate);
                }
                case SortByEnum.OLDEST: {
                    const aDate = new Date(a.updatedAt);
                    const bDate = new Date(b.updatedAt);
                    return Number(aDate) - Number(bDate);
                }
                default: {
                    return b.price - a.price;
                }
            }
        });

        return filteredData;
    }

    const contextValue = {
        filtersState,
        filteredProductsData: filterData(productsData),
        toggleButtonFilter,
        handleSearcFilter,
        handleSelectFilter,
    };

    return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>;
}

export { FilterContextProvider };
