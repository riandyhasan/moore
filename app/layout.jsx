import Header from '@src/components/Layout/Header'
import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'm00re',
  description: 'Solusi untuk penghematan energi listrik',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
