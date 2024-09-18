import { api } from '@/api/instance'
import type { Category } from '@/types/Category'

type GetOrdersConfig = RequestConfig

interface GetCategoriesResponse extends Response {
  categories: Category[]
}

export const getCategories = async (requestConfig?: GetOrdersConfig) =>
  api.get<GetCategoriesResponse>('/categories', requestConfig?.config)
