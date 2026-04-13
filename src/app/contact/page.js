import Contact from '../../views/Contact'

const SITE_URL = 'https://www.ancienthealth.in'

export const metadata = {
  title: 'Contact Us | Ancient Health',
  description: 'Get in touch with Ancient Health. We are here to help with any questions about our Ayurvedic products, orders, or wellness journey.',
  keywords: ['contact Ancient Health', 'customer support', 'Ayurveda enquiry', 'help'],
  alternates: { canonical: `${SITE_URL}/contact/` },
  openGraph: {
    type: 'website',
    title: 'Contact Us | Ancient Health',
    description: 'Get in touch with Ancient Health for product queries, orders, and wellness support.',
    url: `${SITE_URL}/contact/`,
    images: [{ url: '/og-image.jpeg', width: 1200, height: 630, alt: 'Contact Ancient Health' }],
  },
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Ancient Health',
  url: `${SITE_URL}/contact/`,
  description: 'Contact page for Ancient Health - Ayurvedic wellness products.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Ancient Health',
    url: SITE_URL,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
  },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Contact />
    </>
  )
}
