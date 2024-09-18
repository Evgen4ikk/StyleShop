import Image from 'next/image'

import { CardList } from '@/components/Card'
import { getRouteCatalogBestseller, getRouteCatalogSlug } from '@/consts/router'

export default async function Home() {
  return (
    <div className='flex flex-col gap-14'>
      <Image src='/banner_sheaker.jpg' alt='banner' width={1280} height={299} className='w-full' />
      {/* <CardList */}
      {/*   title='Хит продаж' */}
      {/*   products={bestsellerProducts.slice(0, 3)} */}
      {/*   isSliced */}
      {/*   link={getRouteCatalogBestseller()} */}
      {/* /> */}
      {/* {[].map(({ category, products }) => ( */}
      {/*   <CardList */}
      {/*     key={category.id} */}
      {/*     title={category.name} */}
      {/*     products={products} */}
      {/*     isSliced */}
      {/*     link={getRouteCatalogSlug(category.slug)} */}
      {/*   /> */}
      {/* ))} */}
    </div>
  )
}
