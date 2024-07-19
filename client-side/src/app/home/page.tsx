import Image from 'next/image'

import { getAllCategories } from '@/api/requests/category'
import { getAllProducts } from '@/api/requests/product'
import { CardList } from '@/components/Card'
import { getRouteCatalogBestseller, getRouteCatalogSlug } from '@/consts/router'

export default async function Home() {
  const categories = await getAllCategories()

  const productsByCategory = await Promise.all(
    categories.map(async (category) => {
      const products = await getAllProducts({ categoryId: category.id })
      return { category, products }
    })
  )

  const bestsellerProducts = await getAllProducts({ bestseller: true })

  return (
    <div className='flex flex-col gap-14'>
      <Image src='/banner_sheaker.jpg' alt='banner' width={1280} height={299} className='w-full' />
      <CardList
        title='Хит продаж'
        products={bestsellerProducts.slice(0, 3)}
        isSliced
        link={getRouteCatalogBestseller()}
      />
      {productsByCategory.map(({ category, products }) => (
        <CardList
          key={category.id}
          title={category.name}
          products={products}
          isSliced
          link={getRouteCatalogSlug(category.slug)}
        />
      ))}
    </div>
  )
}
