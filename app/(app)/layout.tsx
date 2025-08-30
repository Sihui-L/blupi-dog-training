import { Inter } from 'next/font/google'
import Providers from './providers'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blupi Dog Training - Professional Dog Training in London',
  description: 'Expert dog training services in London. Private sessions, group classes, and workshops for all dog breeds and ages.',
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}