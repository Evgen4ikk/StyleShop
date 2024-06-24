'use client'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/api/api'
import type { Category } from '@/types/Category'

export const useGetAllCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get<Category[]>('/categories')
      return data
    }
  })
}
