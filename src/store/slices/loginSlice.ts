import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import type { LoginData, LoginError, LoginSuccess } from '@/interfaces/Login';
import { postLogin } from '@/utils/http';
import { setAccessToken, setRefreshToken } from '@/utils/token';

import type { RootStore } from '..';

const createLoginSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

interface InitialStateInterface {
    isLoading: boolean;
    isError: boolean;
    errorMessages: null | string | string[];
}

const initialState: InitialStateInterface = {
    isLoading: false,
    isError: false,
    errorMessages: null,
};

const loginSlice = createLoginSlice({
    name: 'login',
    initialState,
    reducers: (create) => ({
        login: create.asyncThunk(
            async ({ data, signal }: { data: LoginData; signal?: AbortController['signal'] }, { rejectWithValue }) => {
                const loginData = await postLogin(data, signal);

                if ((loginData as LoginError).error) {
                    return rejectWithValue(loginData);
                }

                return loginData;
            },
            {
                fulfilled: (state, action) => {
                    const payload = action.payload as LoginSuccess;
                    setAccessToken(payload.access_token);
                    setRefreshToken(payload.refresh_token);
                },
                rejected: (state, action) => {
                    const payload = action.payload as LoginError;

                    if (payload.statusCode === 401) {
                        state.isError = true;
                        state.errorMessages = 'Invalid pass or email';
                    }
                    if (payload.statusCode === 400) {
                        state.errorMessages = payload.message;
                    }
                },
                pending: (state) => {
                    state.isLoading = true;
                    state.isError = initialState.isError;
                    state.errorMessages = initialState.errorMessages;
                },
                settled: (state) => {
                    state.isLoading = false;
                },
            },
        ),
    }),
});

export const isLoadingSelector = (state: RootStore) => state.loginReducer.isLoading;
export const errorMessagesSelector = (state: RootStore) => state.loginReducer.errorMessages;
export const isErrorSelector = (state: RootStore) => state.loginReducer.isError;

export default loginSlice.reducer;
export const { login } = loginSlice.actions;
