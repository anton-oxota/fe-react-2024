import { useCallback, useState } from 'react';

function useFetch<I>(initialValue: I | null, fetchFunction: (...a: any) => Promise<I>, isMobile: boolean = false) {
    const [fetchedData, setFetchedData] = useState(initialValue);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(
        async (...a: any) => {
            setIsFetching(true);
            setError(null);
            try {
                const data = await fetchFunction(...a);
                setFetchedData(data);
            } catch (error_) {
                setError((error_ as Error).message || 'Failed to fetch');
            } finally {
                setIsFetching(false);
            }
        },
        [fetchFunction],
    );

    return {
        fetchData,
        fetchedData,
        isFetching,
        error,
    };
}

export { useFetch };
