import Home from '../views/Home'

export const metadata = {
  title: 'Ancient Health | Pure Himalayan Botanicals & Ayurvedic Remedies',
  description: 'Discover pure, hand-harvested botanicals from the heart of the Himalayas. Ancient Health brings you ethically sourced Ayurvedic remedies for modern wellness.',
  keywords: ['Ayurvedic remedies', 'Himalayan botanicals', 'natural health', 'herbal medicine', 'holistic wellness', 'ancient health'],
  alternates: { canonical: 'https://www.ancienthealth.in/' },
  openGraph: {
    type: 'website',
    title: 'Ancient Health | Pure Himalayan Botanicals & Ayurvedic Remedies',
    description: 'Discover pure, hand-harvested botanicals from the heart of the Himalayas. Ancient Health brings you ethically sourced Ayurvedic remedies for modern wellness.',
    url: 'https://www.ancienthealth.in/',
    images: [{ url: '/og-image.jpeg', width: 1200, height: 630, alt: 'Ancient Health' }],
  },
  twitter: {
    title: 'Ancient Health | Pure Himalayan Botanicals & Ayurvedic Remedies',
    description: 'Discover pure, hand-harvested botanicals from the heart of the Himalayas.',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ancient Health',
  url: 'https://www.ancienthealth.in',
  logo: 'https://www.ancienthealth.in/logo192.png',
  description: 'Pure, hand-harvested botanicals from the heart of the Himalayas. Ethically sourced Ayurvedic remedies for modern wellness.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://www.ancienthealth.in/contact/',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ancient Health',
  url: 'https://www.ancienthealth.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.ancienthealth.in/shop/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Home />
    </>
  )
}
