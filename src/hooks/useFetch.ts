import { useCallback, useState } from 'react';

function useFetch<I>(initialValue: I, fetchFunction: Function) {
    const [fetchedData, setFetchedData] = useState(initialValue);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(
        async (...a: any) => {
            setIsFetching(true);
            setError(null);
            try {
                const data = await fetchFunction(...a);
                setFetchedData((previous) => [...(previous as I[]), data] as I);
            } catch (error_: any) {
                if (error_.name === 'AbortError') {
                    return;
                }
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
        setFetchedData,
        isFetching,
        error,
    };
}

export { useFetch };
