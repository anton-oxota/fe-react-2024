export interface LoginData {
    email: string;
    password: string;
}

export interface LoginSuccess {
    access_token: string;
    refresh_token: string;
}

export interface LoginError {
    error: string;
    message: string[] | string;
    statusCode: number;
}

export enum Token {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
}

export enum LoginFormField {
    EMAIL = 'email',
    PASSWORD = 'password',
}
