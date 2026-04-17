import type { Metadata } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'

const fontSans = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontSerif = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Dent Luna',
  description: 'Your trusted dental care',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  return (
    <html lang={locale}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Dent Luna" />
      </head>
      <body className={`${fontSans.variable} ${fontSerif.variable} antialiased`}>{children}</body>
    </html>
  )
}
