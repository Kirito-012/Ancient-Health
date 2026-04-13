import About from '../../views/About'

const SITE_URL = 'https://www.ancienthealth.in'

export const metadata = {
  title: 'Our Story | Ancient Health',
  description: "Learn about Ancient Health's mission to bridge ancient Ayurvedic traditions with modern wellness through pure, ethically sourced Himalayan botanicals.",
  keywords: ['about Ancient Health', 'Himalayan botanicals', 'Ayurveda mission', 'ethical sourcing', 'ancient remedies story'],
  alternates: { canonical: `${SITE_URL}/about/` },
  openGraph: {
    type: 'website',
    title: 'Our Story | Ancient Health',
    description: "Learn about Ancient Health's mission to bridge ancient Ayurvedic traditions with modern wellness.",
    url: `${SITE_URL}/about/`,
    images: [{ url: '/og-image.jpeg', width: 1200, height: 630, alt: 'About Ancient Health' }],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ancient Health',
  url: SITE_URL,
  logo: `${SITE_URL}/logo192.png`,
  description: "Ancient Health bridges ancient Ayurvedic traditions with modern wellness through pure, ethically sourced Himalayan botanicals.",
  foundingDate: '2020',
  knowsAbout: ['Ayurveda', 'Himalayan botanicals', 'herbal medicine', 'holistic wellness'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: `${SITE_URL}/contact/`,
  },
}

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Our Story | Ancient Health',
  url: `${SITE_URL}/about/`,
  description: "Ancient Health's mission and story.",
  mainEntity: { '@type': 'Organization', name: 'Ancient Health', url: SITE_URL },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <About />
    </>
  )
}
