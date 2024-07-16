import type { LoginSuccess } from '@/interfaces/Login';
import { Token } from '@/interfaces/Login';

export function getAccessToken() {
    return localStorage.getItem(Token.ACCESS_TOKEN);
}

export function setAccessToken(token: LoginSuccess['access_token']) {
    localStorage.setItem(Token.ACCESS_TOKEN, token);
}

export function getRefreshToken() {
    return localStorage.getItem(Token.REFRESH_TOKEN);
}

export function setRefreshToken(token: LoginSuccess['refresh_token']) {
    localStorage.setItem(Token.REFRESH_TOKEN, token);
}

export function logout() {
    localStorage.removeItem(Token.ACCESS_TOKEN);
    localStorage.removeItem(Token.REFRESH_TOKEN);
}
