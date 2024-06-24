import type { Cart } from '@/types/Cart'

export type User = {
  id: number
  createdAt: string
  updatedAt: string
  email: string
  password: string
  name: string
  Cart: Cart[]
}
