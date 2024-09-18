import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Header } from '@/components/Layout/Header'
import { Main } from '@/components/Layout/Main'
import { TanStackQueryProvider } from '@/components/providers'

import '../assets/globals.css'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StyleShop.',
  description: 'StyleShop - интернет-магазин обуви и одежды'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <TanStackQueryProvider>
          <Header />
          <Main>{children}</Main>
          {/* <Footer /> */}
        </TanStackQueryProvider>
      </body>
    </html>
  )
}
