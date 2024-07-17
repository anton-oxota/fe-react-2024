import React, { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LoginIcon from '@assets/icons/log_out.svg?react';
import SingUpIcon from '@assets/icons/user_add.svg?react';

import { useReduxStore } from '@/hooks/useReduxStore';
import { useValidateInput } from '@/hooks/useValidateInput';
import type { LoginData } from '@/interfaces/Login';
import { errorMessagesSelector, isErrorSelector, isLoadingSelector, login } from '@/store/slices/loginSlice';
import FormButton from '@/ui/FormButton/FormButton';
import FormInput from '@/ui/FormInput/FormInput';
import formInputStyles from '@/ui/FormInput/FormInput.module.css';
import { getAccessToken } from '@/utils/token';

import styles from './LoginForm.module.css';

function emailValidation(value: string) {
    if (!/@/gi.test(value)) {
        return 'invalide email';
    }
}
function passwordValidation(value: string) {
    if (value.length < 5) {
        return 'invalide password';
    }
}

function LoginForm() {
    const { useAppDispatch, useAppSelector } = useReduxStore();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const previousLocation = location.state;

    const {
        value: emailValue,
        isShowError: emailIsShowError,
        isInvalid: emailIsInvalid,
        errorMessage: emailErrorMessage,
        onChange: emailOnChange,
        onBlure: emailOnBlure,
        setErrorMessage: emailSetErrorMessage,
        setDidTouch: emailSetDidTouch,
    } = useValidateInput('', emailValidation);

    const {
        value: passwordValue,
        isShowError: passwordIsShowError,
        isInvalid: passwordIsInvalid,
        errorMessage: passwordErrorMessage,
        onChange: passwordOnChange,
        onBlure: passwordOnBlure,
        setErrorMessage: passwordSetErrorMessage,
        setDidTouch: passwordSetDidTouch,
    } = useValidateInput('', passwordValidation);

    const errorMessages = useAppSelector(errorMessagesSelector);
    const isError = useAppSelector(isErrorSelector);
    const isLoading = useAppSelector(isLoadingSelector);

    let emaliErrorText: string | undefined;
    let passwordErrorText: string | undefined;

    if (Array.isArray(errorMessages)) {
        emaliErrorText = errorMessages?.find((mgs: string) => mgs.includes('email'));
        passwordErrorText = errorMessages?.find((mgs: string) => mgs.includes('password'));
    }

    useEffect(() => {
        if (emaliErrorText) {
            emailSetDidTouch(true);
            emailSetErrorMessage(emaliErrorText);
        }

        if (passwordErrorText) {
            passwordSetDidTouch(true);
            passwordSetErrorMessage(passwordErrorText);
        }
    }, [emailSetDidTouch, passwordSetDidTouch, emailSetErrorMessage, passwordSetErrorMessage, emaliErrorText, passwordErrorText]);

    const accessToken = getAccessToken();

    useLayoutEffect(() => {
        if (accessToken) {
            if (previousLocation) {
                navigate(previousLocation);
            } else {
                navigate(`/`);
            }
        }

        return () => {
            if (accessToken) {
                if (previousLocation) {
                    navigate(previousLocation);
                } else {
                    navigate(`/`);
                }
            }
        };
    }, [accessToken, navigate, isLoading, previousLocation]);

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.target;
        const fd = new FormData(form as HTMLFormElement);

        const email = fd.get('email') as LoginData['email'] | null;
        const password = fd.get('password') as LoginData['password'] | null;

        let data: LoginData = {
            email: '',
            password: '',
        };

        if (email && password) {
            data = {
                email,
                password,
            };
        }
        dispatch(login({ data }));
    }

    const isSubmitButtonActive = !isLoading && passwordValue && emailValue && !emailIsInvalid && !passwordIsInvalid;

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <FormInput
                name="email"
                type="email"
                placeholder="Email address"
                value={emailValue}
                onChange={(event) => emailOnChange(event.target.value)}
                onBlur={emailOnBlure}
                isError={emailIsShowError}
                errorMessage={emailErrorMessage}
            />

            <FormInput
                name="password"
                type="password"
                placeholder="Password"
                value={passwordValue}
                onChange={(event) => passwordOnChange(event.target.value)}
                onBlur={passwordOnBlure}
                isError={passwordIsShowError}
                errorMessage={passwordErrorMessage}
            />

            {isError && <p className={formInputStyles.message}>{errorMessages}</p>}

            <div className={styles.actions}>
                <FormButton type="submit" isActive={!!isSubmitButtonActive} disabled={!isSubmitButtonActive}>
                    <LoginIcon />
                    Login
                </FormButton>
                <FormButton type="button">
                    <SingUpIcon />
                    Sign Up
                </FormButton>
            </div>
        </form>
    );
}

export default LoginForm;
