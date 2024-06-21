import { SortBy } from '@/interfaces/Filters';
import type { Product } from '@/interfaces/Product';

export interface FetchProductsInterface {
    products: Product[];
    total: number;
}

const BASE_URL = 'https://ma-backend-api.mocintra.com/api/v1';

export async function fetchProduct(id: string): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    return await response.json();
}

interface FetchProductsOptions {
    limit?: number;
    offset?: number;
    title?: string;
    sortOrder?: SortBy;
    categoryId?: string;
}

export async function fetchProducts({
    limit = 0,
    offset = 0,
    title = '',
    categoryId = '',
    sortOrder = SortBy.HIGH_TO_LOW,
}: FetchProductsOptions): Promise<FetchProductsInterface> {
    const response = await fetch(
        `${BASE_URL}/products?limit=${limit}&offset=${offset}&title=${title}&categoryId=${categoryId}&sortOrder=${sortOrder}`,
    );

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return await response.json();
}
