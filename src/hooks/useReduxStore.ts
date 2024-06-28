import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootStore } from '@/store';

export function useReduxStore() {
    const useAppDispatch = useDispatch.withTypes<AppDispatch>();
    const useAppSelector = useSelector.withTypes<RootStore>();

    return {
        useAppDispatch,
        useAppSelector,
    };
}
