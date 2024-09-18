import { useQuery } from '@tanstack/react-query'

import { type GetSubcategoryParams, getSubcategorySlug } from '@/api/requests/subcategory/slug'

export const useGetSubcategorySlugQuery = (settings?: QuerySettings<GetSubcategoryParams>) =>
  useQuery({
    queryKey: ['getSubcategorySlug', settings?.config, settings?.config?.params],
    queryFn: () => getSubcategorySlug({ config: settings?.config, params: settings?.config?.params }),
    ...settings?.options
  })
