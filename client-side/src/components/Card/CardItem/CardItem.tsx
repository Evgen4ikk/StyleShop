'use client'

import { type FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Typography } from '@/components/ui/Typography'
import { getRouteCatalogSlug } from '@/consts/router'
import type { Product } from '@/types/Products'

interface ICardItem {
  product: Product
}

export const CardItem: FC<ICardItem> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className='flex flex-wrap h-[calc(100%-42px)] cursor-pointer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={getRouteCatalogSlug(product.slug)}>
        <div className='w-full mb-10 py-[30%] relative overflow-hidden'>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`absolute top-0 left-0 bottom-0 right-0 w-full h-full transition-transform duration-300 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
        </div>
        <div className='flex flex-col'>
          <Typography variant='typography20_medium' className='max-h-[100px] mb-2'>
            {product.name}
          </Typography>
          <Typography variant='typography16_medium'>{product.price} ₽</Typography>
        </div>
      </Link>
    </div>
  )
}
