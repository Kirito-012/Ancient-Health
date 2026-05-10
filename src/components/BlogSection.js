import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { stripHtml } from '../utils/textUtils'

const readTime = (content) => {
    const words = stripHtml(content || '').split(/\s+/).filter(Boolean).length
    return `${Math.max(1, Math.round(words / 200))} min read`
}

const BlogSection = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const sectionRef = useRef(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    observer.disconnect()
                    fetch(`${process.env.REACT_APP_API_URL}/api/blogs?limit=6&sort=-createdAt`)
                        .then(r => r.json())
                        .then(data => setBlogs((data.data || []).slice(0, 6)))
                        .catch(err => console.error('BlogSection fetch error:', err))
                        .finally(() => setLoading(false))
                }
            },
            { rootMargin: '300px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className='relative bg-[#0f1c18] text-[#e8e6e3] py-20 lg:py-28'>
            {/* Grain */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.03]' style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}}></div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

                {/* Header row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='flex items-end justify-between mb-10'
                >
                    <div>
                        <p className='text-[#d4a574] text-xs tracking-[0.35em] uppercase font-sans mb-3'>
                            The Journal
                        </p>
                        <h2 className='text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white leading-tight'>
                            From the <span className='italic text-[#d4a574]'>source.</span>
                        </h2>
                    </div>
                    <Link
                        to='/blog'
                        className='hidden lg:flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-sans text-white/40 hover:text-[#d4a574] transition-colors duration-300 pb-1 border-b border-white/10 hover:border-[#d4a574]/40'
                    >
                        Read the Journal <ArrowRight className='w-3.5 h-3.5' />
                    </Link>
                </motion.div>

                {/* Blog cards */}
                {loading ? (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className='rounded-2xl bg-white/5 animate-pulse aspect-[4/5]'></div>
                        ))}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        {blogs.map((blog, idx) => (
                            <motion.div
                                key={blog._id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: idx * 0.1 }}
                                className={idx >= 3 ? 'hidden md:block' : ''}
                            >
                                <Link
                                    to={`/blog/${blog.slug}`}
                                    className='group block'
                                >
                                    {/* Image */}
                                    <div className='relative rounded-2xl overflow-hidden aspect-[4/3] mb-5'>
                                        {blog.image ? (
                                            <img
                                                src={blog.image}
                                                alt={blog.imageAlt || blog.title}
                                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                                loading="lazy"
                                                decoding="async"
                                                width="600"
                                                height="450"
                                            />
                                        ) : (
                                            <div className='w-full h-full bg-white/5'></div>
                                        )}
                                        {/* Dark gradient overlay */}
                                        <div className='absolute inset-0 bg-gradient-to-t from-[#0f1c18]/60 via-transparent to-transparent'></div>

                                        {/* Category chip — top left */}
                                        {blog.category?.name && (
                                            <div className='absolute top-4 left-4'>
                                                <span className='px-3 py-1 bg-[#0f1c18]/70 backdrop-blur-sm text-white/70 text-[10px] tracking-[0.2em] uppercase font-sans rounded-full border border-white/10'>
                                                    {blog.category.name}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Text */}
                                    <h3 className='font-serif text-white text-xl lg:text-2xl leading-snug mb-2 group-hover:text-[#d4a574] transition-colors duration-300'>
                                        {blog.title}
                                    </h3>
                                    <p className='text-white/35 text-xs font-sans'>
                                        {readTime(blog.content)} · By {blog.author || 'the Ancient Health team'}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Mobile CTA */}
                <div className='mt-10 lg:hidden text-center'>
                    <Link
                        to='/blog'
                        className='inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-sans text-white/40 hover:text-[#d4a574] transition-colors duration-300'
                    >
                        Read the Journal <ArrowRight className='w-3.5 h-3.5' />
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default BlogSection
