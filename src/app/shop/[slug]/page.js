import ProductDetail from '../../../views/ProductDetail'

const API_URL = process.env.REACT_APP_API_URL || 'https://api.ancienthealth.in'
const SITE_URL = 'https://www.ancienthealth.in'

async function getProduct(slug) {
  try {
    const res = await fetch(`${API_URL}/api/products/${slug}`, {
      next: { revalidate: 300 },
    })
    const data = await res.json()
    return data.success ? data.data : null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for could not be found.',
    }
  }

  const image = product.images?.[0] || `${SITE_URL}/og-image.jpeg`
  const price = product.hasVariants
    ? product.variants?.[0]?.price
    : product.price

  return {
    title: `${product.name} | Ancient Health`,
    description: product.description?.replace(/<[^>]*>/g, '').slice(0, 160) || `Buy ${product.name} from Ancient Health.`,
    keywords: [product.name, product.category?.name, 'Ayurvedic', 'Himalayan', 'herbal'].filter(Boolean),
    alternates: { canonical: `${SITE_URL}/shop/${slug}/` },
    openGraph: {
      type: 'og:product',
      title: product.name,
      description: product.description?.replace(/<[^>]*>/g, '').slice(0, 160),
      url: `${SITE_URL}/shop/${slug}/`,
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      title: product.name,
      description: product.description?.replace(/<[^>]*>/g, '').slice(0, 160),
      images: [image],
    },
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)

  const productSchema = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description?.replace(/<[^>]*>/g, ''),
    image: product.images || [],
    url: `${SITE_URL}/shop/${slug}/`,
    brand: {
      '@type': 'Brand',
      name: 'Ancient Health',
    },
    seller: {
      '@type': 'Organization',
      name: 'Ancient Health',
      url: SITE_URL,
    },
    ...(product.hasVariants && product.variants?.length > 0
      ? {
          offers: product.variants.map((v) => ({
            '@type': 'Offer',
            name: v.name,
            price: v.price,
            priceCurrency: 'INR',
            availability: v.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            url: `${SITE_URL}/shop/${slug}/`,
          })),
        }
      : {
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability: (product.stock || 0) > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            url: `${SITE_URL}/shop/${slug}/`,
          },
        }),
    ...(product.category && {
      category: product.category.name,
    }),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop/` },
      { '@type': 'ListItem', position: 3, name: product?.name || 'Product', item: `${SITE_URL}/shop/${slug}/` },
    ],
  }

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetail />
    </>
  )
}
