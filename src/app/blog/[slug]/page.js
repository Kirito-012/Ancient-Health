import BlogDetail from '../../../views/BlogDetail'

const API_URL = process.env.REACT_APP_API_URL || 'https://api.ancienthealth.in'
const SITE_URL = 'https://www.ancienthealth.in'
const SITE_NAME = 'Ancient Health'

async function getBlogBySlug(slug) {
  try {
    // Fetch all blogs to find the one matching slug
    const listRes = await fetch(`${API_URL}/api/blogs`, {
      next: { revalidate: 300 },
    })
    const listData = await listRes.json()
    if (!listData.success) return null

    const match = listData.data.find((b) => b.slug === slug)
    if (!match) return null

    const res = await fetch(`${API_URL}/api/blogs/${match._id}`, {
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
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for could not be found.',
    }
  }

  const image = blog.image || `${SITE_URL}/og-image.jpeg`
  const description = blog.metaDescription || blog.excerpt || blog.title

  return {
    title: `${blog.metaTitle || blog.title} | ${SITE_NAME}`,
    description: description.slice(0, 160),
    keywords: blog.tags || [blog.category?.name, 'Ayurveda', 'wellness'].filter(Boolean),
    alternates: { canonical: `${SITE_URL}/blog/${slug}/` },
    openGraph: {
      type: 'article',
      title: blog.metaTitle || blog.title,
      description: description.slice(0, 160),
      url: `${SITE_URL}/blog/${slug}/`,
      images: [{ url: image, alt: blog.title }],
      publishedTime: blog.date || blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author || SITE_NAME],
    },
    twitter: {
      title: blog.metaTitle || blog.title,
      description: description.slice(0, 160),
      images: [image],
    },
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  const datePublished = blog?.date || blog?.createdAt || ''
  const dateModified = blog?.updatedAt || datePublished

  const articleSchema = blog ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt || blog.title,
    image: blog.image || `${SITE_URL}/og-image.jpeg`,
    author: {
      '@type': 'Person',
      name: blog.author || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo192.png`,
      },
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}/`,
    },
    url: `${SITE_URL}/blog/${slug}/`,
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: blog?.title || 'Blog Post', item: `${SITE_URL}/blog/${slug}/` },
    ],
  }

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogDetail />
    </>
  )
}
