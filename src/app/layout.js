import '../index.css'
import Providers from './Providers'

export const metadata = {
  metadataBase: new URL('https://www.ancienthealth.in'),
  title: {
    default: 'Ancient Health | Pure Himalayan Botanicals & Ayurvedic Remedies',
    template: '%s | Ancient Health',
  },
  description: 'Discover pure, hand-harvested botanicals from the heart of the Himalayas. Ancient Health brings you ethically sourced Ayurvedic remedies for modern wellness.',
  keywords: ['Ayurvedic remedies', 'Himalayan botanicals', 'natural health', 'herbal medicine', 'holistic wellness'],
  authors: [{ name: 'Ancient Health' }],
  openGraph: {
    siteName: 'Ancient Health',
    type: 'website',
    images: [{ url: '/og-image.jpeg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpeg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
