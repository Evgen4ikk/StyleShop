import { api } from '@/api/instance'
import type { Subcategory } from '@/types/Subcategory'

export const getSubcategoriesByCategorySlug = async (categorySlug: string): Promise<Subcategory[]> => {
  const response = await api.get<Subcategory[]>(`/subcategories/category/${categorySlug}`)
  console.log(response)
  return response.data
}
