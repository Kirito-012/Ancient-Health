import Shop from '../../views/Shop'

const API_URL = process.env.REACT_APP_API_URL || 'https://api.ancienthealth.in'

export const metadata = {
  title: 'Shop Ayurvedic Products | Ancient Health',
  description: 'Browse our collection of pure Himalayan botanicals and Ayurvedic herbal products. Ethically sourced, traditionally crafted for modern wellness.',
  keywords: ['Ayurvedic shop', 'herbal products', 'Himalayan botanicals', 'natural remedies', 'buy Ayurveda online'],
  alternates: { canonical: 'https://www.ancienthealth.in/shop/' },
  openGraph: {
    type: 'website',
    title: 'Shop Ayurvedic Products | Ancient Health',
    description: 'Browse our collection of pure Himalayan botanicals and Ayurvedic herbal products.',
    url: 'https://www.ancienthealth.in/shop/',
    images: [{ url: '/og-image.jpeg', width: 1200, height: 630, alt: 'Ancient Health Shop' }],
  },
}

async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products?sort=-createdAt&limit=12`, {
      next: { revalidate: 300 }, // revalidate every 5 minutes
    })
    const data = await res.json()
    return data.success ? data.data : []
  } catch {
    return []
  }
}

export default async function ShopPage() {
  const products = await getProducts()

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ayurvedic Products - Ancient Health',
    url: 'https://www.ancienthealth.in/shop/',
    numberOfItems: products.length,
    itemListElement: products.slice(0, 10).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.ancienthealth.in/shop/${p.slug}/`,
      name: p.name,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Shop />
    </>
  )
}
