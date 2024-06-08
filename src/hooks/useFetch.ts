import { useEffect, useState } from 'react';

function useFetch<I>(initialValue: I | null, fetchFunction: () => Promise<I>) {
    const [fetchedData, setFetchedData] = useState(initialValue);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsFetching(true);
        async function fetchPlace() {
            try {
                const data = await fetchFunction();
                setFetchedData(data);
            } catch (error_) {
                setError((error_ as Error).message || 'Failed to fetch');
            } finally {
                setIsFetching(false);
            }
        }

        fetchPlace();
    }, [fetchFunction]);

    return {
        fetchedData,
        isFetching,
        error,
    };
}

export { useFetch };
