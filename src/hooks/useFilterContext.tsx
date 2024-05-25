import { useContext } from 'react';

import { FilterContext } from '@/context/Filter.context';

function useFilterContext() {
    const { filteredProductsData, filtersState, handleSearcFilter, handleSelectFilter, toggleButtonFilter } = useContext(FilterContext);

    return {
        filteredProductsData,
        filtersState,
        handleSearcFilter,
        handleSelectFilter,
        toggleButtonFilter,
    };
}

export { useFilterContext };
