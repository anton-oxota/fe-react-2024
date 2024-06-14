import { SortByEnum } from '@/interfaces/Filters';
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

export async function fetchProducts(
    limit: number = 0,
    offset: number = 0,
    title: string = '',
    sortOrder: SortByEnum = SortByEnum.HIGH_TO_LOW,
    categoryId: string = '',
): Promise<FetchProductsInterface> {
    const response = await fetch(
        `${BASE_URL}/products?limit=${limit}&offset=${offset}&title=${title}&categoryId=${categoryId}&sortOrder=${sortOrder}`,
    );

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return await response.json();
}
