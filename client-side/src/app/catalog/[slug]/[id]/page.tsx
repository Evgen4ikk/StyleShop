'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { getAllProducts } from '@/api/requests/product'
import { Typography } from '@/components/ui/Typography'
import type { Product } from '@/types/Products'

const CatalogIdPage = () => {
  const params: { id: string; slug: string } = useParams()

  const [productsById, setProductsById] = useState<Product[]>([])

  const getProducts = async () => {
    const data = await getAllProducts({ subcategoryId: params.id, categorySlug: params.slug })
    setProductsById(data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  if (productsById.length === 0) return <div>No products found</div>

  return (
    <div>
      <Typography variant='typography20_medium'>
        {productsById[0]?.subcategory?.name || 'Subcategory not found'}
      </Typography>
      {productsById.map((product) => (
        <div key={product.id}>
          <Typography variant='typography20_medium'>{product.name}</Typography>
        </div>
      ))}
    </div>
  )
}

export default CatalogIdPage
