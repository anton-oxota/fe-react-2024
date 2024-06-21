import { useContext } from 'react';

import { FiltersContext } from '@/context/Filters.context';

function useFiltersContext() {
    const { search, handleChangeSerch, sortBy, handleSortBy, category, handleChangeActiveCategory } = useContext(FiltersContext);

    return {
        search,
        handleChangeSerch,
        sortBy,
        handleSortBy,
        category,
        handleChangeActiveCategory,
    };
}

export { useFiltersContext };
