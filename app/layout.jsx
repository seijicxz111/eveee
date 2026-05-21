import './globals.css'
import localFont from 'next/font/local'
import { Space_Mono } from 'next/font/google'

const daruma = localFont({
  src: '../public/fonts/DarumadropOne-Regular.ttf',
  variable: '--font-daruma',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space',
})

export const metadata = {
  title: 'eeve',
  description: 'CJ Steeve Cadenas — Web Developer & UI Designer.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${daruma.variable} ${spaceMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${daruma.variable} ${spaceMono.variable}`}>{children}</body>
    </html>
  )
}
