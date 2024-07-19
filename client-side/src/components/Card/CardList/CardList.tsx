import type { FC } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import Link from 'next/link'

import { Typography } from '@/components/ui/Typography'
import type { Product } from '@/types/Products'

import { CardItem } from '../CardItem/CardItem'

interface ICardList {
  title: string
  products: Product[]
  isSliced?: boolean
  link?: string
}

export const CardList: FC<ICardList> = ({ ...props }) => {
  const { title, products, isSliced = false, link } = props

  return (
    <>
      <div className='flex items-center justify-between'>
        <Typography variant='typography32_bold' className='uppercase'>
          {title}
        </Typography>
        {isSliced && link && (
          <Link href={link}>
            <Typography variant='typography24_semibold' className='uppercase flex items-center'>
              Все модели
              <FiArrowUpRight size={32} />
            </Typography>
          </Link>
        )}
      </div>
      <div className='grid grid-cols-3 gap-x-[8vw] gap-y-[5vw]'>
        {products.map((product) => (
          <CardItem key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
