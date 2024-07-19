import type { ForwardRefRenderFunction, InputHTMLAttributes } from 'react'
import React, { forwardRef, memo } from 'react'
import clsx from 'clsx'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'size'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  label?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const {
    className,
    value = '',
    onChange,
    type = 'text',
    placeholder,
    readonly,
    label,
    children,
    ...otherProps
  } = props

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div>
      {label && (
        <label htmlFor='input' className=''>
          {label}
        </label>
      )}
      <div className='flex'>
        <input
          id='input'
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={clsx('', className)}
          readOnly={readonly}
          placeholder={placeholder}
          {...otherProps}
          ref={ref}
        />
        {children}
      </div>
    </div>
  )
}

export const Input = memo(forwardRef(InputComponent))
