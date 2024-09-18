'use client'

import { type FC, useState } from 'react'
import Link from 'next/link'

import { useGetSubcategorySlugQuery } from '@/api/hooks/useGetSubcategorySlugQuery'
import { Typography } from '@/components/ui/Typography'
import { CATEGORIES } from '@/consts/consts'
import { getRouteCatalogSlug, getRouteCatalogSlugId } from '@/consts/router'
import type { Subcategory } from '@/types/Subcategory'

import styles from './Navbar.module.css'

export const Navbar: FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const getSubcategorySlug = useGetSubcategorySlugQuery({
    config: { params: { slug: hoveredItem ?? '' } },
    options: {
      enabled: !!hoveredItem
    }
  })

  return (
    <ul className={styles.Navbar}>
      {CATEGORIES.map((item) => (
        <li key={item.name} className={styles.item} onMouseEnter={() => setHoveredItem(item.slug)}>
          <Link href={getRouteCatalogSlug(item.slug)} onClick={() => setHoveredItem(null)}>
            {item.name}
          </Link>
          {hoveredItem === item.slug && item.haveSubcategories && (
            <ul
              className={styles.subcategories}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ display: hoveredItem === item.slug ? 'block' : 'none' }}
            >
              <div className={styles.subcategories_wrapper}>
                <Typography variant='typography20_medium'>{item.name}</Typography>
                <div className={styles.subcategories__list}>
                  {getSubcategorySlug.data?.map((subcategory: Subcategory) => (
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
