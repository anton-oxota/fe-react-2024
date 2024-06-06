import type { Product } from '@/interfaces/Product';

export async function fetchProduct(id: string): Promise<Product> {
    const response = await fetch(`https://ma-backend-api.mocintra.com/api/v1/products/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    return await response.json();
}
