'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { getAllProducts } from '@/api/requests/product'
import { Typography } from '@/components/ui/Typography'
import type { Product } from '@/types/Products'

const CatalogSlugPage = () => {
  const params: { slug: string } = useParams()
  const [products, setProducts] = useState<Product[]>()

  const getProducts = async () => {
    const filter = params.slug === 'bestseller' ? { bestseller: true } : { categorySlug: params.slug }
    const products = await getAllProducts(filter)

    setProducts(products)
  }

  console.log(products)

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <Typography variant='typography20_medium'>
        {params.slug === 'bestseller' ? 'Хит продаж' : products?.[0].category.name}
      </Typography>
      {products?.map((product) => (
        <div key={product.id}>
          <Typography variant='typography20_medium'>{product.name}</Typography>
        </div>
      ))}
    </div>
  )
}

export default CatalogSlugPage
