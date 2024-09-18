import { api } from '@/api/instance'
import type { Product } from '@/types/Products'

interface GetProductsParams {
  bestseller?: boolean
  categoryId?: number | string
  subcategoryId?: number | string
  id?: number | string
  slug?: string
  categorySlug?: string
}

export const getAllProducts = async (params: GetProductsParams = {}): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products', { params })
  return response.data
}
