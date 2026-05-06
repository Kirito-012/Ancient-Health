'use client'

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { blogCache } from '../utils/blogUtils'
import JsonLd from '../components/JsonLd'
import { buildBreadcrumbSchema } from '../utils/schemaUtils'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HTMLContent from '../components/HTMLContent'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, BookOpen, Share2, Copy, ChevronRight } from 'lucide-react'

const SITE_URL = 'https://www.ancienthealth.in'
const SITE_NAME = 'Ancient Health'
const LOGO_URL = `${SITE_URL}/logo192.png`

// Simple markdown-to-JSX renderer (handles headings, bold, italic, lists, paragraphs)
const renderContent = (raw) => {
    if (!raw) return null
    const lines = raw.split('\n')
    const elements = []
    let listItems = []
    let key = 0

    const isHeadingLine = (line = '') => /^(#{1,3})\s+/.test(line.trim())

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={key++} className="my-5 space-y-2 pl-5">
                    {listItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[#1B2B26]/80 text-base leading-relaxed">
                            <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d4a574]" />
                            <span>{inlineFormat(item)}</span>
                        </li>
                    ))}
                </ul>
            )
            listItems = []
        }
    }

    const inlineFormat = (text) => {
        // Bold
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>')
        return <span dangerouslySetInnerHTML={{ __html: text }} />
    }

    lines.forEach((line, index) => {
        const prevNonEmptyLine = [...lines.slice(0, index)].reverse().find(l => l.trim() !== '') || ''
        const nextNonEmptyLine = lines.slice(index + 1).find(l => l.trim() !== '') || ''
        const prevIsHeading = isHeadingLine(prevNonEmptyLine)
        const nextIsHeading = isHeadingLine(nextNonEmptyLine)

        if (/^### /.test(line)) {
            flushList()
            elements.push(
                <h3
                    key={key++}
                    className={`text-lg sm:text-[1.2rem] font-serif font-semibold text-[#2d5f4f] leading-[1.35] border-l-2 border-[#d4a574]/55 pl-3 ${prevIsHeading ? 'mt-3' : 'mt-8'} ${nextIsHeading ? 'mb-2' : 'mb-4'}`}
                >
                    {line.replace(/^### /, '')}
                </h3>
            )
        } else if (/^## /.test(line)) {
            flushList()
            elements.push(
                <h2
                    key={key++}
                    className={`text-2xl sm:text-[2.15rem] font-serif font-semibold text-[#1B2B26] leading-[1.18] ${prevIsHeading ? 'pt-1 mt-3' : 'pt-4 mt-12'} ${nextIsHeading ? 'mb-2 pb-2' : 'mb-6 pb-3'} border-b border-[#d4a574]/28`}
                >
                    {line.replace(/^## /, '')}
                </h2>
            )
        } else if (/^# /.test(line)) {
            flushList()
            elements.push(
                <h2
                    key={key++}
                    className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2B26] leading-[1.1] pt-6 mt-10 ${nextIsHeading ? 'mb-3' : 'mb-7'}`}
                >
                    {line.replace(/^# /, '')}
                </h2>
            )
        } else if (/^[-*] /.test(line)) {
            listItems.push(line.replace(/^[-*] /, ''))
        } else if (line.trim() === '') {
            flushList()
        } else {
            flushList()
            elements.push(
                <p key={key++} className="text-[#1B2B26]/80 text-base leading-[1.9] text-justify my-4">
                    {inlineFormat(line)}
                </p>
            )
        }
    })
    flushList()
    return elements
}

const hasHTMLTags = (raw = '') => /<\/?[a-z][\s\S]*>/i.test(raw)

const stripLeadingH1 = (html) => html.replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, '')

// Split HTML after the Nth closing </p> tag — safe block-level boundary
const splitHTMLAfterParagraph = (html, n = 3) => {
    let count = 0
    let idx = -1
    let searchFrom = 0
    while (count < n) {
        const found = html.indexOf('</p>', searchFrom)
        if (found === -1) break
        count++
        idx = found + 4
        searchFrom = idx
    }
    if (idx === -1 || idx >= html.length) return [html, '']
    return [html.slice(0, idx), html.slice(idx)]
}

const BlogDetail = () => {
    const { slug } = useParams()
    const [blog, setBlog] = useState(null)
    const [recentBlogs, setRecentBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [copied, setCopied] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        fetchBlog()
        // eslint-disable-next-line
    }, [slug])

    // Imperatively set meta description so it always reflects the blog data
    useEffect(() => {
        const content = blog?.metaDescription || 'Ancient Health - Pure & Potent Hand-harvested remedies from the heart of the Himalayas.'
        let meta = document.querySelector('meta[name="description"]')
        if (!meta) {
            meta = document.createElement('meta')
            meta.setAttribute('name', 'description')
            document.head.appendChild(meta)
        }
        meta.setAttribute('content', content)
    }, [blog])

    // Reading progress bar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const fetchBlog = async () => {
        try {
            setLoading(true)

            // Resolve slug → _id via cache, or fetch all blogs as fallback
            let blogs = blogCache.blogs
            if (!blogs) {
                const listRes = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs`)
                const listData = await listRes.json()
                if (!listData.success) { setError('Blog post not found.'); return }
                blogs = listData.data
                blogCache.blogs = blogs
                blogCache.categories = ['All', ...new Set(blogs.map(b => b.category?.name).filter(Boolean))]
            }

            const match = blogs.find(b => b.slug === slug)
            if (!match) { setError('Blog post not found.'); return }

            const latestThree = blogs
                .filter(b => b.slug !== slug)
                .sort((a, b) => {
                    const aDate = new Date(a.date || a.createdAt || 0).getTime()
                    const bDate = new Date(b.date || b.createdAt || 0).getTime()
                    return bDate - aDate
                })
                .slice(0, 3)
            setRecentBlogs(latestThree)

            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${match._id}`)
            const data = await res.json()
            if (data.success) {
                setBlog(data.data)
            } else {
                setError('Blog post not found.')
            }
        } catch {
            setError('Failed to load blog post.')
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const canonicalUrl = `${SITE_URL}/blog/${slug}/`
    const pageTitle = blog ? `${blog.metaTitle || blog.title} | ${SITE_NAME}` : SITE_NAME
    const pageDescription = blog?.metaDescription || `Pure & Potent Hand-harvested remedies from the heart of the Himalayas.`
    const pageImage = blog?.image || `${SITE_URL}/og-image.jpeg`
    const pageAuthor = blog?.author || SITE_NAME
    const datePublished = blog?.date || blog?.createdAt || ''
    const dateModified = blog?.updatedAt || datePublished

    const jsonLd = blog ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: blog.title,
        description: pageDescription,
        image: pageImage,
        author: { '@type': 'Person', name: pageAuthor },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: LOGO_URL }
        },
        datePublished,
        dateModified,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl }
    } : null

    const breadcrumbSchema = blog ? buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Journal', url: `${SITE_URL}/blog/` },
        { name: blog.title, url: canonicalUrl },
    ]) : null

    return (
        <div className="min-h-screen bg-[#0f1c18]">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="author" content={pageAuthor} />
                <meta name="publisher" content={SITE_NAME} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:site_name" content={SITE_NAME} />
                {datePublished && <meta property="article:published_time" content={new Date(datePublished).toISOString()} />}
                {dateModified && <meta property="article:modified_time" content={new Date(dateModified).toISOString()} />}
                {blog?.category?.name && <meta property="article:section" content={blog.category.name} />}

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />

                {/* JSON-LD */}
                {jsonLd && (
                    <script type="application/ld+json">
                        {JSON.stringify(jsonLd)}
                    </script>
                )}
            </Helmet>
            <JsonLd schema={breadcrumbSchema} />

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent pointer-events-none">
                <motion.div
                    className="h-full bg-gradient-to-r from-[#d4a574] to-[#e8c49a]"
                    style={{ width: `${scrollProgress}%` }}
                    transition={{ duration: 0.05 }}
                />
            </div>

            <Navbar />

            {loading && (
                <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-[#d4a574]/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-white/50">Loading article...</p>
                </div>
            )}

            {error && !loading && (
                <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                    <BookOpen className="w-12 h-12 text-[#d4a574]/50" />
                    <p className="text-white/60">{error}</p>
                    <Link to="/blog" title="Back to Journal" className="text-[#d4a574] text-sm hover:underline">← Back to Journal</Link>
                </div>
            )}

            {!loading && blog && (
                <>
                    {/* ── Hero ── */}
                    <div className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            {blog.image ? (
                                <motion.img
                                    initial={{ scale: 1.08 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 1.2, ease: 'easeOut' }}
                                    src={blog.image}
                                    alt={blog.title}
                                    title={blog.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#1B2B26] to-[#0f1c18]" />
                            )}
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c18] via-[#0f1c18]/60 to-[#0f1c18]/20" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1c18]/40 to-transparent" />
                        </div>

                        {/* Hero Content */}
                        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
                            {/* Breadcrumbs */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-2 text-xs text-white/40 mb-6"
                            >
                                <Link to="/" title="Ancient Health - Home" className="hover:text-[#d4a574] transition-colors">Home</Link>
                                <ChevronRight className="w-3 h-3" />
                                <Link to="/blog" title="Journal" className="hover:text-[#d4a574] transition-colors">Journal</Link>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-white/60 line-clamp-1 max-w-[200px]">{blog.title}</span>
                            </motion.div>

                            {/* Category + Meta */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap items-center gap-3 mb-5"
                            >
                                {blog.category?.name && (
                                    <span className="px-3 py-1 rounded-full bg-[#d4a574] text-[#0f1c18] text-xs font-bold">
                                        {blog.category.name}
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5 text-xs text-white/50">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(blog.date)}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs text-white/50">
                                    <User className="w-3 h-3" />
                                    {blog.author}
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.7 }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight max-w-3xl"
                            >
                                {blog.title}
                            </motion.h1>
                        </div>
                    </div>

                    {/* ── Article Body (Light Section) ── */}
                    <div className="relative bg-[#f7f3ee]">
                        {/* Wavy separator */}
                        <div className="absolute top-0 left-0 right-0" style={{ transform: 'translateY(-1px)' }}>
                            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-16">
                                <path d="M0,60 L0,20 Q180,60 360,20 Q540,-20 720,20 Q900,60 1080,20 Q1260,-20 1440,20 L1440,60 Z" fill="#f7f3ee" />
                            </svg>
                        </div>

                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
                            <div className="flex gap-8 lg:gap-10 items-start">

                                {/* ── Main Article Column ── */}
                                <div className="flex-1 min-w-0">

                                    {/* Meta Description Intro */}
                                    {blog.metaDescription && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="mb-8 p-6 rounded-2xl bg-white border border-[#d4a574]/20 shadow-sm"
                                        >
                                            <p className="text-[#1B2B26]/70 text-base leading-relaxed italic font-serif">
                                                "{blog.metaDescription}"
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Divider */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="flex-1 h-px bg-[#d4a574]/20" />
                                        <span className="text-[#d4a574] text-lg">⟡</span>
                                        <div className="flex-1 h-px bg-[#d4a574]/20" />
                                    </div>

                                    {/* Article Text */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {hasHTMLTags(blog.content) ? (
                                            blog.infographicImage ? (() => {
                                                const [first, second] = splitHTMLAfterParagraph(stripLeadingH1(blog.content))
                                                return (
                                                    <>
                                                        <HTMLContent content={first} className="blog-rich-content" />
                                                        <div className="my-10 rounded-2xl overflow-hidden border border-[#d4a574]/20 shadow-md">
                                                            <img
                                                                src={blog.infographicImage}
                                                                alt={`${blog.title} infographic`}
                                                                title={`${blog.title} infographic`}
                                                                className="w-full h-auto block"
                                                            />
                                                        </div>
                                                        <HTMLContent content={second} className="blog-rich-content" />
                                                    </>
                                                )
                                            })() : <HTMLContent content={stripLeadingH1(blog.content)} className="blog-rich-content" />
                                        ) : renderContent(blog.content)}
                                    </motion.div>

                                    {/* End of article meta */}
                                    <div className="mt-12 pt-8 border-t border-[#d4a574]/20">
                                        <div className="bg-white rounded-2xl p-6 border border-[#d4a574]/15 shadow-sm">
                                            <p className="text-xs font-bold text-[#1B2B26]/40 uppercase tracking-widest mb-4">Written by</p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d4a574] to-[#8b6b43] flex items-center justify-center text-white font-bold text-base shadow-md">
                                                    {blog.author?.charAt(0) || 'A'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#1B2B26]">{blog.author}</p>
                                                    <p className="text-xs text-[#1B2B26]/50">{formatDate(blog.date)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <Link
                                            to="/blog"
                                            title="Back to Journal"
                                            className="mt-6 inline-flex items-center gap-2 text-[#1B2B26]/60 hover:text-[#2d5f4f] text-sm font-semibold transition-colors group"
                                        >
                                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                            Back to Journal
                                        </Link>
                                    </div>
                                </div>

                                {/* ── Sidebar ── */}
                                <aside className="w-72 flex-shrink-0 sticky top-24 hidden lg:flex flex-col gap-6">

                                    {/* Share card */}
                                    <div className="bg-white rounded-2xl p-6 border border-[#d4a574]/15 shadow-sm">
                                        <p className="text-xs font-bold text-[#1B2B26]/40 uppercase tracking-widest mb-4">Share Article</p>
                                        <button
                                            onClick={handleCopy}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#1B2B26] text-white text-sm font-semibold rounded-xl hover:bg-[#2d5f4f] transition-colors"
                                        >
                                            {copied ? (
                                                <>
                                                    <Copy className="w-4 h-4 text-[#d4a574]" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Share2 className="w-4 h-4" />
                                                    Copy Link
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Related articles */}
                                    {recentBlogs.length > 0 && (
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-4">
                                                <h3 className="text-lg font-serif text-[#1B2B26]">Recent Articles</h3>
                                                <Link to="/blog" title="View all blog articles" className="text-xs font-semibold text-[#2d5f4f] hover:text-[#1B2B26] transition-colors">
                                                    View all
                                                </Link>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                {recentBlogs.map((item) => (
                                                    <Link
                                                        key={item._id}
                                                        to={`/blog/${item.slug}`}
                                                        title={item.title}
                                                        className="group rounded-2xl overflow-hidden bg-white border border-[#d4a574]/15 hover:border-[#d4a574]/45 shadow-sm hover:shadow-md transition-all duration-300"
                                                    >
                                                        <div className="h-32 bg-[#1B2B26] overflow-hidden">
                                                            {item.image ? (
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.title}
                                                                    title={item.title}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-[#d4a574]/50">
                                                                    <BookOpen className="w-8 h-8" />
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="p-4">
                                                            <div className="flex items-center gap-2 text-[10px] text-[#1B2B26]/55 mb-2">
                                                                <span className="inline-flex items-center gap-1">
                                                                    <Calendar className="w-3 h-3" />
                                                                    {formatDate(item.date)}
                                                                </span>
                                                            </div>

                                                            <h4 className="text-sm font-serif text-[#1B2B26] leading-snug line-clamp-2 group-hover:text-[#2d5f4f] transition-colors">
                                                                {item.title}
                                                            </h4>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </aside>

                            </div>
                        </div>
                    </div>

                    {/* ── Dark Footer Banner ── */}
                    <div className="bg-[#0f1c18] relative overflow-hidden py-24">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTIsMTY1LDExNiwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
                            <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-[#d4a574]/5 rounded-full blur-[80px]" />
                        </div>

                        <div className="relative text-center max-w-2xl mx-auto px-4">
                            <span className="inline-block w-12 h-px bg-[#d4a574]/50 mb-6" />
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Explore More Wisdom</h3>
                            <p className="text-white/50 mb-8 leading-relaxed">
                                Journey deeper into ancient health traditions with our curated collection of articles.
                            </p>
                            <Link
                                to="/blog"
                                title="All journal articles"
                                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#d4a574]/50 text-[#d4a574] font-bold text-sm rounded-full hover:bg-[#d4a574] hover:text-[#0f1c18] transition-all duration-300"
                            >
                                <BookOpen className="w-4 h-4" />
                                All Articles
                            </Link>
                        </div>
                    </div>
                </>
            )}

            <Footer />
        </div>
    )
}

export default BlogDetail
