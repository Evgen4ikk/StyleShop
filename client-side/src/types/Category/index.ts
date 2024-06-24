import type { Product } from '@/types/Products'
import type { Subcategory } from '@/types/Subcategory'

export type Category = {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  image: string
  Subcategories: Subcategory[]
  Products: Product[]
}
