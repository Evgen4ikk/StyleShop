import Image from 'next/image'

import { Categorylist } from '@/app/home/components/Categorylist/Categorylist'
import { Typography } from '@/components/ui/Typography'

export default function Home() {
  return (
    <div>
      <Image src='/banner_sheaker.jpg' alt='logo' width={1280} height={299} />
      <Typography variant='typography32_medium' className='mt-5'>
        Категории:
      </Typography>
      <Categorylist />
    </div>
  )
}
