'use client'

import { type FC, useEffect, useState } from 'react'
import Link from 'next/link'

import { getAllCategories } from '@/api/requests/category'
import { Typography } from '@/components/ui/Typography'
import { getRouteBrandList, getRouteCatalogSlug, getRouteCatalogSlugId, getRouteInfo } from '@/consts/router'
import type { Category } from '@/types/Category'
import type { Subcategory } from '@/types/Subcategory'

import styles from './Navbar.module.css'

export const Navbar: FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      await getAllCategories().then((data) => {
        setCategories(data)
        setIsLoading(false)
      })
    })()
  }, [])

  const items = [
    {
      title: 'ХИТ!',
      slug: 'bestseller',
      href: null,
      subcategories: null
    },
    ...(isLoading
      ? [
          {
            title: 'Обувь',
            slug: 'shoes',
            href: null,
            subcategories: null
          },
          {
            title: 'Одежда',
            slug: 'clothes',
            href: null,
            subcategories: null
          }
        ]
      : categories.map((category: Category) => ({
          title: category.name,
          slug: category.slug,
          href: null,
          subcategories: category.Subcategories
        }))),
    {
      title: 'Бренды',
      href: getRouteBrandList(),
      subcategories: null
    },
    {
      title: 'Информация',
      href: getRouteInfo(),
      subcategories: null
    }
  ]

  return (
    <ul className={styles.Navbar}>
      {items.map((item) => (
        <li key={item.title} className={styles.item} onMouseEnter={() => setHoveredItem(item.title)}>
          <Link
            href={item.href || (item.slug ? getRouteCatalogSlug(item.slug) : '')}
            onClick={() => setHoveredItem(null)}
          >
            {item.title}
          </Link>
          {hoveredItem === item.title && item.subcategories && (
            <ul
              className={styles.subcategories}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ display: hoveredItem === item.title ? 'block' : 'none' }}
            >
              <div className={styles.subcategories_wrapper}>
                <Typography variant='typography20_medium'>{item.title}</Typography>
                <div className={styles.subcategories__list}>
                  {item.subcategories.map((subcategory: Subcategory) => (
                    <li key={subcategory.name} className={styles.subcategories__item}>
                      <Link
                        href={getRouteCatalogSlugId(item.slug, subcategory.id)}
                        onClick={() => setHoveredItem(null)}
                      >
                        {subcategory.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </div>
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
