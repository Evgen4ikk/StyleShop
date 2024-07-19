import { api } from '@/api/api'
import type { Category } from '@/types/Category'

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/categories')
  return response.data
}
