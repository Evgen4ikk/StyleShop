'use client'

import { useParams } from 'next/navigation'

export default function CategoriesId() {
  const { id } = useParams<{ id: string }>()
  return <div>Categories {id}</div>
}
