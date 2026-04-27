export const SITE_URL  = 'https://www.ancienthealth.in'
export const SITE_NAME = 'Ancient Health'
export const LOGO_URL  = `${SITE_URL}/logo192.png`

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 192,
    height: 192,
  },
  description:
    'Pure, hand-harvested botanicals from the heart of the Himalayas. Ethically sourced Ayurvedic remedies for modern wellness.',
  sameAs: [],
})

export const buildWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/shop?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
})

const stripHtmlForSchema = (html) => {
  if (!html) return ''
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500)
}

export const buildProductSchema = (product, pageUrl) => {
  if (!product) return null

  const discount   = product.offer || 0
  const basePrice  = product.price || 0
  const finalPrice = discount > 0
    ? parseFloat((basePrice * (1 - discount / 100)).toFixed(2))
    : basePrice

  const availability = product.stock > 0
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock'

  const primaryImage = product.images?.[0]?.url || null

  let offerBlock

  if (product.hasVariants && product.variants?.length > 0) {
    const variantOffers = product.variants.map((v) => {
      const vPrice = v.price || basePrice
      const vFinalPrice = discount > 0
        ? parseFloat((vPrice * (1 - discount / 100)).toFixed(2))
        : vPrice
      return {
        '@type': 'Offer',
        url: pageUrl,
        priceCurrency: 'INR',
        price: vFinalPrice,
        availability: v.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@type': 'Organization', name: SITE_NAME },
        ...(v.images?.[0]?.url && { image: v.images[0].url }),
      }
    })

    const prices   = product.variants.map((v) => v.price || basePrice)
    const applyD   = (p) => discount > 0 ? parseFloat((p * (1 - discount / 100)).toFixed(2)) : p

    offerBlock = {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: applyD(Math.min(...prices)),
      highPrice: applyD(Math.max(...prices)),
      offerCount: variantOffers.length,
      offers: variantOffers,
    }
  } else {
    offerBlock = {
      '@type': 'Offer',
      url: pageUrl,
      priceCurrency: 'INR',
      price: finalPrice,
      availability,
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: SITE_NAME },
    }
  }

  const ratingBlock = (product.ratings && product.reviewCount)
    ? {
        '@type': 'AggregateRating',
        ratingValue: product.ratings.toFixed(1),
        reviewCount: product.reviewCount,
        bestRating: '5',
        worstRating: '1',
      }
    : null

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    ...(product.description && { description: stripHtmlForSchema(product.description) }),
    url: pageUrl,
    sku: product._id,
    brand: { '@type': 'Brand', name: SITE_NAME },
    ...(product.category?.name && { category: product.category.name }),
    ...(primaryImage && { image: product.images.map((img) => img.url) }),
    offers: offerBlock,
    ...(ratingBlock && { aggregateRating: ratingBlock }),
  }
}

export const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const buildFaqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
})

export const buildItemListSchema = (products, pageUrl) => {
  if (!products?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: pageUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => {
      const discount   = product.offer || 0
      const basePrice  = product.price || 0
      const finalPrice = discount > 0
        ? parseFloat((basePrice * (1 - discount / 100)).toFixed(2))
        : basePrice
      return {
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/shop/${product.slug || product._id}`,
        name: product.title,
        item: {
          '@type': 'Product',
          name: product.title,
          url: `${SITE_URL}/shop/${product.slug || product._id}`,
          ...(product.images?.[0]?.url && { image: product.images[0].url }),
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: finalPrice,
            availability: product.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          },
        },
      }
    }),
  }
}
