'use client'

import Link from 'next/link'

import { useGetAllCategoriesQuery } from '@/api/requests/useGetAllCategoriesQuery'
import CategoryItem from '@/app/home/components/CategoryItem/CategoryItem'
import { getRouteCategoriesId } from '@/consts/router'

import styles from './Categorylist.module.css'

export const Categorylist = () => {
  const { data: categories } = useGetAllCategoriesQuery()

  return (
    <div className={styles.categorylist}>
      {categories?.map((category) => (
        <Link href={getRouteCategoriesId(category.id)} key={category.id}>
          <CategoryItem category={category} />
        </Link>
      ))}
    </div>
  )
}
