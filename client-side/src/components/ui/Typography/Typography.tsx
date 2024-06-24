import clsx from 'clsx'

type TypographyVariant =
  // Regular
  | 'typography32_regular'
  | 'typography24_regular'
  | 'typography20_regular'
  | 'typography16_regular'
  | 'typography14_regular'
  | 'typography12_regular'
  // Medium
  | 'typography32_medium'
  | 'typography24_medium'
  | 'typography20_medium'
  | 'typography16_medium'
  | 'typography14_medium'
  | 'typography12_medium'
  // Semibold
  | 'typography32_semibold'
  | 'typography24_semibold'
  | 'typography20_semibold'
  | 'typography16_semibold'
  | 'typography14_semibold'
  | 'typography12_semibold'
  // Bold
  | 'typography32_bold'
  | 'typography24_bold'
  | 'typography20_bold'
  | 'typography16_bold'
  | 'typography14_bold'
  | 'typography12_bold'

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p'

const variantClasses: Record<TypographyVariant, string> = {
  // Regular
  typography32_regular: 'text-[32px] font-regular tracking-tight',
  typography24_regular: 'text-[24px] font-regular tracking-tight',
  typography20_regular: 'text-[20px] font-regular tracking-tight',
  typography16_regular: 'text-[16px] font-regular tracking-tight',
  typography14_regular: 'text-[14px] font-regular tracking-tight',
  typography12_regular: 'text-[12px] font-regular tracking-tight',
  // Medium
  typography32_medium: 'text-[32px] font-medium tracking-tight',
  typography24_medium: 'text-[24px] font-medium tracking-tight',
  typography20_medium: 'text-[20px] font-medium tracking-tight',
  typography16_medium: 'text-[16px] font-medium tracking-tight',
  typography14_medium: 'text-[14px] font-medium tracking-tight',
  typography12_medium: 'text-[12px] font-medium tracking-tight',
  // Semibold
  typography32_semibold: 'text-[32px] font-semibold tracking-tight',
  typography24_semibold: 'text-[24px] font-semibold tracking-tight',
  typography20_semibold: 'text-[20px] font-semibold tracking-tight',
  typography16_semibold: 'text-[16px] font-semibold tracking-tight',
  typography14_semibold: 'text-[14px] font-semibold tracking-tight',
  typography12_semibold: 'text-[12px] font-semibold tracking-tight',
  // Bold
  typography32_bold: 'text-[32px] font-bold tracking-tight',
  typography24_bold: 'text-[24px] font-bold tracking-tight',
  typography20_bold: 'text-[20px] font-bold tracking-tight',
  typography16_bold: 'text-[16px] font-bold tracking-tight',
  typography14_bold: 'text-[14px] font-bold tracking-tight',
  typography12_bold: 'text-[12px] font-bold tracking-tight'
}

export type TypographyProps<Tag extends TypographyTag> = React.ComponentProps<Tag> & {
  variant: TypographyVariant
  clickable?: boolean
  tag?: TypographyTag
  children: React.ReactNode
}

export const Typography = <Tag extends TypographyTag = 'div'>(props: TypographyProps<Tag>) => {
  const { variant, tag = 'div', children, className, clickable, ...otherProps } = props

  const Component = tag

  const mods: Record<string, boolean | string | undefined> = {
    'cursor-pointer': clickable
  }

  const classes = [className, variantClasses[variant]]

  return (
    <Component className={clsx(mods, classes)} {...otherProps}>
      {children}
    </Component>
  )
}
