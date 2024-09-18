import { useQuery } from '@tanstack/react-query'

import { getCategories } from '@/api/requests/category'

export const useGetCategoriesQuery = (settings?: QuerySettings<typeof getCategories>) =>
  useQuery({
    queryKey: ['getCategories', settings?.config],
    queryFn: () => getCategories({ config: settings?.config }),
    ...settings?.options
  })
