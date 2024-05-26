import { useContext } from 'react';

import { FilterContext } from '@/context/Filter.context';

function useFilterContext() {
    const { filteredAndSortedProductsData, filtersState, handleSearcFilter, handleSelectFilter, toggleButtonFilter } =
        useContext(FilterContext);

    return {
        filteredAndSortedProductsData,
        filtersState,
        handleSearcFilter,
        handleSelectFilter,
        toggleButtonFilter,
    };
}

export { useFilterContext };
