import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { createClient } from '@/utils/supabase/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GlobalLoader from '@/components/GlobalLoader'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Todo board | Nextjs, Supabase',
  description: 'The fastest way to build apps with Next.js and Supabase'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="">
        <main className="flex min-h-screen flex-col items-center">
          <Header />
          {children}
          <GlobalLoader />
          <Footer />
        </main>
      </body>
    </html>
  )
}
