import type { ButtonHTMLAttributes } from 'react'
import { memo } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {
  className?: string
  disabled?: boolean
  fullWidth?: boolean
}

const buttonStyles = cva(
  'font-normal leading-6 text-center no-underline align-middle cursor-pointer transition ease-in-out duration-150',
  {
    variants: {
      theme: {},
      size: {
        default: 'p-2'
      },
      fullWidth: {
        true: 'w-full',
        false: ''
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50'
      }
    },
    defaultVariants: {
      size: 'default',
      fullWidth: false
    }
  }
)

export const Button = memo((props: ButtonProps) => {
  const { className, children, theme, size, fullWidth, disabled, ...otherProps } = props

  return (
    <button
      type='button'
      className={clsx(buttonStyles({ theme, size, fullWidth, disabled }), className)}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
})
