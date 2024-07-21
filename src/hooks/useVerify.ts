import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type LoginError, type LoginSuccess } from '@/interfaces/Login';
import { PageName } from '@/interfaces/Pages';
import { loginVerify, refreshTokenPost } from '@/utils/http';
import { getAccessToken, getRefreshToken, logout, setAccessToken, setRefreshToken } from '@/utils/token';

function useVerify() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const verify = useRef(async () => {
        setIsLoading(true);
        const accessToken = getAccessToken();
        if (!accessToken) {
            setIsLoading(false);
            return false;
        }

        const data = await loginVerify(accessToken);

        if (data.statusCode === 401) {
            return refresh();
        } else {
            setIsLoading(false);
            return true;
        }
    });
    // async function verify(): Promise<boolean> {
    //     setIsLoading(true);
    //     const accessToken = getAccessToken();
    //     if (!accessToken) {
    //         setIsLoading(false);
    //         return false;
    //     }

    //     const data = await loginVerify(accessToken);

    //     if (data.statusCode === 401) {
    //         return refresh();
    //     } else {
    //         setIsLoading(false);
    //         return true;
    //     }
    // }

    async function refresh(): Promise<boolean> {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            const data = await refreshTokenPost(refreshToken);

            if ((data as LoginError).statusCode === 401) {
                setIsLoading(false);
                logout();
                navigate(PageName.LOGIN);
                return false;
            } else {
                setIsLoading(false);
                setAccessToken((data as LoginSuccess).access_token);
                setRefreshToken((data as LoginSuccess).access_token);
                return verify.current();
            }
        } else {
            setIsLoading(false);
            logout();
            navigate(PageName.LOGIN);
            return false;
        }
    }

    return {
        isLoading,
        verify: verify.current,
    };
}

export { useVerify };
