import type { FC, ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

import styles from './Modal.module.css'

interface IModal {
  children?: ReactNode
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const Modal: FC<IModal> = (props) => {
  const { children, className, isOpen, onClose } = props

  const [isClosing, setIsClosing] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, 200)
    }
  }, [onClose])

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    },
    [closeHandler]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  const mods: Record<string, boolean> = {
    [styles.opened]: isOpen,
    [styles.isClosing]: isClosing
  }

  return (
    <div className={clsx(styles.modal, mods, [className])}>
      <div className={styles.overlay} onClick={closeHandler}>
        <div className={styles.content} onClick={onContentClick}>
          {children}
        </div>
      </div>
    </div>
  )
}
