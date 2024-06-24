import type { Category } from '@/types/Category'
import type { Product } from '@/types/Products'

export type Subcategory = {
  id: number
  createdAt: string
  updatedAt: string

  name: string
  image: string
  category: Category
  categoryId: number

  Products: Product[]
}
