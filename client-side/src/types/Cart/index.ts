import type { Product } from '@/types/Products'
import type { User } from '@/types/User'

export type Cart = {
  id: number
  createdAt: string
  updatedAt: string
  user: User
  userId: number

  items: CartItem[]
}

export type CartItem = {
  id: number
  product: Product
  productId: number
  quantity: number
  cart: Cart
  cartId: number
}
