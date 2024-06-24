import type { CartItem } from '@/types/Cart'
import type { Category } from '@/types/Category'
import type { Subcategory } from '@/types/Subcategory'

export type Product = {
  id: number
  createdAt: string
  updatedAt: string

  name: string
  price: number
  description: string
  images?: string[]
  stock: number
  category: Category
  categoryId: number
  subcategory: Subcategory
  subcategoryId: number

  CartItems: CartItem[]
}
