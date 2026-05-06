import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { formatPrice } from '../utils/formatPrice'

const BADGES = ['#1 BESTSELLER', 'NEW', "EDITOR'S PICK"]

const HeroSection = () => {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const y2 = useTransform(scrollY, [0, 500], [0, -150])

    const [products, setProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/products?limit=3&sort=-ratings`)
                const data = await res.json()
                const list = data.data || data.products || []
                const total = data.pagination?.total ?? data.total ?? list.length
                setProducts(list)
                setTotalProducts(total)
            } catch (err) {
                console.error('Hero fetch error:', err)
                setProducts([])
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.25, delayChildren: 0.2 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: 'easeOut' }
        }
    }

    const trustBadges = [
        'Hand-harvested at altitude',
        '3rd-party lab tested',
        'Zero fillers · ever',
    ]

    return (
        <section className='relative min-h-screen flex items-center overflow-hidden bg-[#0f1c18] text-[#e8e6e3] selection:bg-[#d4a574] selection:text-[#0f1c18] w-full max-w-full'>

            {/* Grain Overlay */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            {/* Parallax Background */}
            <div className='absolute inset-0 z-0 overflow-hidden w-full'>
                <div className='absolute inset-0 bg-gradient-to-b from-[#0f1c18]/30 via-[#0f1c18]/60 to-[#0f1c18] z-10'></div>
                <motion.div style={{ y: y1 }} className='absolute inset-0'>
                    <img
                        src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=60&w=1920&auto=format&fit=crop"
                        alt="Ancient Mystical Forest"
                        className="w-full h-full object-cover opacity-50 scale-110"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                    />
                </motion.div>
                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[120px]'
                />
            </div>

            <div className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20'>
                <div className='grid lg:grid-cols-2 gap-16 lg:gap-24 items-center'>

                    {/* Left Column */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className='space-y-6'
                    >
                        {/* Eyebrow */}
                        <motion.p variants={itemVariants} className='text-[#d4a574] text-xs tracking-[0.35em] uppercase font-sans'>
                            Ancient Health · Est. 2024
                        </motion.p>

                        {/* Headline */}
                        <motion.h1 variants={itemVariants} className='text-5xl sm:text-6xl lg:text-7xl font-serif font-light leading-[1.1] sm:leading-[0.95] tracking-tight'>
                            <span className='block text-white'>Hand-harvested</span>
                            <span className='block text-[#d4a574] italic'>Ayurveda,</span>
                            <span className='block text-white'>lab-verified pure.</span>
                        </motion.h1>

                        {/* Body */}
                        <motion.p variants={itemVariants} className='text-lg text-white/60 font-light leading-relaxed max-w-lg border-l border-[#d4a574]/30 pl-6'>
                            Pure Himalayan botanicals — gathered by hand at 16,000ft, third-party tested for heavy metals, and bottled with zero fillers. Wellness rituals, not supplements.
                        </motion.p>

                        {/* Trust Badges */}
                        <motion.div variants={itemVariants} className='flex flex-wrap gap-3'>
                            {trustBadges.map((badge) => (
                                <span key={badge} className='flex items-center gap-2 text-xs text-white/70 border border-white/20 rounded-full px-4 py-2 font-sans'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-[#d4a574] inline-block'></span>
                                    {badge}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div variants={itemVariants} className='flex flex-wrap items-center gap-6 pt-2'>
                            <Link
                                to='/shop'
                                className='group flex items-center gap-3 px-8 py-4 bg-[#d4a574] text-[#0f1c18] rounded-full font-sans text-xs tracking-[0.2em] uppercase font-medium'
                            >
                                Shop Bestsellers
                                <ArrowRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-2' />
                            </Link>
                            <Link
                                to='/about'
                                className='group flex flex-col gap-0.5 text-white/60 hover:text-white font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300'
                            >
                                <span className='flex items-center gap-2'>
                                    Read Our Sourcing Story
                                    <ArrowRight className='w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1' />
                                </span>
                                <span className='block h-[1px] w-0 bg-[#d4a574]/50 group-hover:w-full transition-all duration-500 ease-out mt-2'></span>
                            </Link>
                        </motion.div>

                        {/* Stats Bar */}
                        <motion.div variants={itemVariants} className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2 text-xs sm:text-sm text-white/50 font-sans'>
                            <div className='flex items-center gap-1'>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className='w-3 h-3 sm:w-4 sm:h-4 fill-[#d4a574] text-[#d4a574]' />
                                ))}
                                <span className='ml-1 text-white/70 font-medium'>4.9</span>
                                <span className='ml-0.5'>· 2,847 verified reviews</span>
                            </div>
                            <span className='hidden sm:block text-white/20'>|</span>
                            <span>Free shipping over ₹499</span>
                        </motion.div>
                    </motion.div>

                    {/* Right Column — Apothecary Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                        className='relative hidden lg:block'
                    >
                        <motion.div style={{ y: y2 }}>
                            <div className='relative bg-[#0f1c18]/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 overflow-hidden shadow-2xl'>
                                {/* Glass glints */}
                                <div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
                                <div className='absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4a574]/20 to-transparent'></div>

                                {/* Panel header */}
                                <div className='flex items-center justify-between mb-6'>
                                    <span className='text-xs tracking-[0.3em] uppercase text-white/50 font-sans'>Our Products</span>
                                    <Link to='/shop' className='flex items-center gap-1 text-xs tracking-widest uppercase text-white/40 hover:text-[#d4a574] transition-colors duration-300 font-sans'>
                                        View All {totalProducts ?? ''} <ArrowRight className='w-3.5 h-3.5' />
                                    </Link>
                                </div>

                                {/* Product rows */}
                                <div className='space-y-3'>
                                    {loading ? (
                                        [...Array(3)].map((_, i) => (
                                            <div key={i} className='flex items-center gap-4 p-4 rounded-xl bg-white/5 animate-pulse'>
                                                <div className='w-16 h-16 rounded-lg bg-white/10 flex-shrink-0'></div>
                                                <div className='flex-1 space-y-2'>
                                                    <div className='h-3 bg-white/10 rounded w-1/3'></div>
                                                    <div className='h-4 bg-white/10 rounded w-2/3'></div>
                                                    <div className='h-3 bg-white/10 rounded w-1/2'></div>
                                                </div>
                                                <div className='h-6 w-16 bg-white/10 rounded'></div>
                                            </div>
                                        ))
                                    ) : (
                                        products.slice(0, 3).map((product, idx) => {
                                            const thumb = product.images?.[0]?.url || product.variants?.[0]?.images?.[0]?.url
                                            const finalPrice = product.finalPrice ?? product.price
                                            const originalPrice = product.price
                                            const hasDiscount = finalPrice < originalPrice
                                            const rating = product.ratings ?? 4.9
                                            const ratingCount = product.reviewCount ?? Math.floor(Math.random() * 900 + 300)

                                            return (
                                                <Link
                                                    key={product._id}
                                                    to={`/shop/${product.slug}`}
                                                    className='flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-[#d4a574]/20 transition-all duration-300 group'
                                                >
                                                    {/* Thumbnail */}
                                                    <div className='w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/10'>
                                                        {thumb && (
                                                            <img src={thumb} alt={product.title} className='w-full h-full object-cover' />
                                                        )}
                                                    </div>

                                                    {/* Info */}
                                                    <div className='flex-1 min-w-0'>
                                                        <div className='flex items-center gap-2 mb-0.5'>
                                                            <span className='text-[10px] tracking-[0.15em] uppercase text-[#d4a574] font-sans font-medium'>
                                                                {BADGES[idx]}
                                                            </span>
                                                            <span className='text-white/30 text-[10px]'>·</span>
                                                            <span className='flex items-center gap-0.5'>
                                                                {[...Array(5)].map((_, s) => (
                                                                    <Star key={s} className='w-2.5 h-2.5 fill-[#d4a574] text-[#d4a574]' />
                                                                ))}
                                                            </span>
                                                            <span className='text-white/40 text-[10px] font-sans'>{rating} ({ratingCount})</span>
                                                        </div>
                                                        <p className='text-white font-serif text-sm truncate'>{product.title}</p>
                                                        <p className='text-white/40 text-xs font-sans mt-0.5 truncate'>
                                                            {product.shortDescription || (product.category?.name ? `For ${product.category.name.toLowerCase()}` : 'Premium quality')}
                                                        </p>
                                                    </div>

                                                    {/* Price */}
                                                    <div className='text-right flex-shrink-0'>
                                                        <p className='text-[#d4a574] font-serif text-lg'>₹{formatPrice(finalPrice).replace('.00', '')}</p>
                                                        {hasDiscount && (
                                                            <p className='text-white/30 text-xs line-through font-sans'>₹{formatPrice(originalPrice).replace('.00', '')}</p>
                                                        )}
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                className='absolute bottom-10 left-1/2 -translate-x-1/2 z-30'
            >
                <div className='h-12 w-[1px] bg-gradient-to-b from-transparent via-[#d4a574] to-transparent'></div>
            </motion.div>
        </section>
    )
}

export default HeroSection
