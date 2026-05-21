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
      <body className={`${daruma.variable} ${spaceMono.variable}`}>
        {/* Hidden SVG filter definitions for sketchy/hand-drawn effect */}
        <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }} aria-hidden="true">
          <defs>
            <filter id="sketchy" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="3" seed="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feMorphology operator="dilate" radius="0.4" in="displaced" result="thick" />
              <feComposite in="thick" in2="SourceGraphic" operator="over" />
            </filter>
            <filter id="sketchy-strong" x="-8%" y="-8%" width="116%" height="116%">
              <feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="4" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feMorphology operator="dilate" radius="0.5" in="displaced" result="thick" />
              <feComposite in="thick" in2="SourceGraphic" operator="over" />
            </filter>
            <filter id="sketchy-text" x="-3%" y="-3%" width="106%" height="106%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="12" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  )
}
