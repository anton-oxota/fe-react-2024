import { SortBy } from '@/interfaces/Filters';
import type { LoginError, LoginSuccess } from '@/interfaces/Login';
import type { Product } from '@/interfaces/Product';

const BASE_URL = 'https://ma-backend-api.mocintra.com/api/v1';

export async function fetchProduct(id: Product['id'], signal: AbortController['signal']): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`, { signal });

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    return await response.json();
}

export interface FetchProductsOptions {
    limit?: number;
    offset?: number;
    title?: string;
    sortOrder?: SortBy;
    categoryId?: number | string;
}

export interface FetchProductsInterface {
    products: Product[];
    total: number;
}

export async function fetchProducts(
    { limit = 0, offset = 0, title = '', categoryId = '', sortOrder = SortBy.HIGH_TO_LOW }: FetchProductsOptions,
    signal: AbortController['signal'],
): Promise<FetchProductsInterface> {
    const response = await fetch(
        `${BASE_URL}/products?limit=${limit}&offset=${offset}&title=${title}&categoryId=${categoryId}&sortOrder=${sortOrder}`,
        { signal },
    );

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return await response.json();
}

export async function postLogin(
    data: { email: string; password: string },
    signal?: AbortController['signal'],
): Promise<LoginSuccess | LoginError> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        signal,
        headers: {
            'Content-type': 'application/json',
        },
    });

    return await response.json();
}

export async function loginVerify(accessToken: LoginSuccess['access_token']): Promise<{ message: string; statusCode: number }> {
    const response = await fetch(`${BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return await response.json();
}

export async function refreshTokenPost(refreshToken: LoginSuccess['refresh_token']): Promise<LoginSuccess | LoginError> {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        headers: {
            'Content-type': 'application/json',
        },
    });

    return await response.json();
}
