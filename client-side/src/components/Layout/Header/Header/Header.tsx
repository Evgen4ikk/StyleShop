'use client'

import { useState } from 'react'
import { IoCartOutline, IoHeartOutline } from 'react-icons/io5'
import { PiSignIn } from 'react-icons/pi'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { getRouteHome } from '@/consts/router'

import { Navbar } from '../Navbar/Navbar'

import styles from './Header.module.css'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <div className={styles.header}>
      <Link href={getRouteHome()} className={styles.logo}>
        StyleShop.
      </Link>
      <Navbar />
      <div>
        <Button className={styles.button}>
          <IoCartOutline size={22} />
        </Button>
        <Button className={styles.button}>
          <IoHeartOutline size={22} />
        </Button>
        <Button className={styles.button} onClick={() => setIsOpen(true)}>
          <PiSignIn size={22} />
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          Вход
        </Modal>
      </div>
    </div>
  )
}
