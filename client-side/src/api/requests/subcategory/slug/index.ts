import { api } from '@/api/instance'
import type { Subcategory } from '@/types/Subcategory'

export interface GetSubcategoryParams {
  slug: string
}

export type GetSubcategoryConfig = RequestConfig<GetSubcategoryParams>

interface GetSubcategoryResponse {
  subcategory: Subcategory[]
}

export const getSubcategorySlug = async ({ config, params }: GetSubcategoryConfig) => {
  const response = await api.get<GetSubcategoryResponse>(`/subcategories/category/${params.slug}`, config)

  return response.data
}
