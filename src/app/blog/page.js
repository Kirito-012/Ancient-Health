import Blog from '../../views/Blog'

const API_URL = process.env.REACT_APP_API_URL || 'https://api.ancienthealth.in'
const SITE_URL = 'https://www.ancienthealth.in'

export const metadata = {
  title: 'Blog | Ayurvedic Wellness & Himalayan Health Tips',
  description: 'Explore articles on Ayurvedic wellness, Himalayan botanicals, and holistic health. Expert insights from the Ancient Health team.',
  keywords: ['Ayurveda blog', 'wellness tips', 'Himalayan health', 'herbal remedies', 'holistic living'],
  alternates: { canonical: `${SITE_URL}/blog/` },
  openGraph: {
    type: 'website',
    title: 'Blog | Ayurvedic Wellness & Himalayan Health Tips',
    description: 'Explore articles on Ayurvedic wellness, Himalayan botanicals, and holistic health.',
    url: `${SITE_URL}/blog/`,
    images: [{ url: '/og-image.jpeg', width: 1200, height: 630, alt: 'Ancient Health Blog' }],
  },
}

async function getBlogs() {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
      next: { revalidate: 300 },
    })
    const data = await res.json()
    return data.success ? data.data : []
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs()

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Ancient Health Blog',
    url: `${SITE_URL}/blog/`,
    description: 'Articles on Ayurvedic wellness, Himalayan botanicals, and holistic health.',
    publisher: {
      '@type': 'Organization',
      name: 'Ancient Health',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo192.png`,
      },
    },
    blogPost: blogs.slice(0, 10).map((b) => ({
      '@type': 'BlogPosting',
      headline: b.title,
      url: `${SITE_URL}/blog/${b.slug}/`,
      datePublished: b.date || b.createdAt,
      image: b.image || b.coverImage,
      author: {
        '@type': 'Organization',
        name: 'Ancient Health',
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Blog />
    </>
  )
}
