import { api } from '@/api/api'
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
  const { data } = await api.get<Product[]>('/products', { params })
  return data
}
