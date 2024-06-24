import type { FC } from 'react'
import Image from 'next/image'

import { Typography } from '@/components/ui/Typography'
import type { Category } from '@/types/Category'

interface CategoryItemProps {
  category: Category
}

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  return (
    <div>
      {category.image && <Image src={category.image} alt={category.name} width={350} height={350} />}
      <Typography variant='typography32_medium'>{category.name}</Typography>
    </div>
  )
}

export default CategoryItem
