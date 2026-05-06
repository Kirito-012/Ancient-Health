import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShoppingCart, Star } from 'lucide-react'
import { stripHtml } from '../utils/textUtils'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'

const FeaturedProducts = () => {
    const navigate = useNavigate()
    const { addToCart } = useCart()

    const [allProducts, setAllProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState('all')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    fetch(`${process.env.REACT_APP_API_URL}/api/products?limit=100&sort=-createdAt`),
                    fetch(`${process.env.REACT_APP_API_URL}/api/categories`)
                ])
                const prodData = await prodRes.json()
                const catData = await catRes.json()

                const products = prodData.data || []
                const cats = catData.data || []

                setAllProducts(products)

                // Only show categories that actually have products
                const usedCatIds = new Set(products.map(p => p.category?._id))
                setCategories(cats.filter(c => usedCatIds.has(c._id)))
            } catch (err) {
                console.error('FeaturedProducts fetch error:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filtered = activeCategory === 'all'
        ? allProducts
        : allProducts.filter(p => p.category?._id === activeCategory || p.category?.slug === activeCategory)

    const countFor = (catId) => allProducts.filter(p => p.category?._id === catId).length

    const handleAddToCart = async (e, product) => {
        e.preventDefault()
        e.stopPropagation()
        const success = await addToCart(product._id, 1)
        if (success) {
            toast.success(
                <div onClick={() => navigate('/cart')} className="flex items-center justify-between gap-4 cursor-pointer group">
                    <div className="flex flex-col">
                        <span className="font-serif text-[#1e4035] font-bold text-sm">{product.title}</span>
                        <span className="text-xs text-[#2d5f4f]/80">Added to your cart</span>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2d5f4f]/10 group-hover:bg-[#2d5f4f] transition-colors duration-300">
                        <svg className="w-4 h-4 text-[#2d5f4f] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>,
                {
                    icon: "🌿",
                    style: { background: '#ffffff', border: '1px solid rgba(45,95,79,0.15)', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', padding: '16px', cursor: 'pointer' },
                    progressStyle: { background: 'linear-gradient(to right, #2d5f4f, #1e4035)', height: '3px' },
                    onClick: () => navigate('/cart')
                }
            )
        }
    }

    return (
        <section className='relative min-h-screen bg-[#0f1c18] text-[#e8e6e3] overflow-hidden'>
            {/* Grain */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24'>

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='mb-10'
                >
                    {/* Eyebrow */}
                    <p className='text-[#d4a574] text-xs tracking-[0.35em] uppercase font-sans mb-4'>
                        Shop All Products
                    </p>

                    {/* Title + description row */}
                    <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4'>
                        <h2 className='text-5xl sm:text-6xl font-serif font-light text-white'>
                            Find your <span className='italic text-[#d4a574]'>product.</span>
                        </h2>
                        <p className='text-white/40 font-sans text-sm leading-relaxed max-w-xs lg:text-right'>
                            Filter by what your body is asking for today. Every remedy ships with its own lab report.
                        </p>
                    </div>
                </motion.div>

                {/* ── Filter tabs + count ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='flex items-center justify-between mb-10'
                >
                    <div className='flex flex-wrap items-center gap-2'>
                        {/* ALL tab */}
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase font-sans transition-all duration-300 ${
                                activeCategory === 'all'
                                    ? 'bg-[#d4a574] text-[#0f1c18] font-semibold'
                                    : 'border border-white/15 text-white/50 hover:border-white/30 hover:text-white/80'
                            }`}
                        >
                            All
                        </button>

                        {categories.map(cat => (
                            <button
                                key={cat._id}
                                onClick={() => setActiveCategory(cat._id)}
                                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase font-sans transition-all duration-300 ${
                                    activeCategory === cat._id
                                        ? 'bg-[#d4a574] text-[#0f1c18] font-semibold'
                                        : 'border border-white/15 text-white/50 hover:border-white/30 hover:text-white/80'
                                }`}
                            >
                                {cat.name}
                                <span className={`text-[10px] ${activeCategory === cat._id ? 'text-[#0f1c18]/60' : 'text-white/30'}`}>
                                    {countFor(cat._id)}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Count */}
                    <span className='hidden sm:block text-white/30 text-xs font-sans tracking-widest'>
                        {filtered.length} of {allProducts.length}
                    </span>
                </motion.div>

                {/* ── Product Grid ── */}
                {loading ? (
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className='rounded-2xl bg-white/5 animate-pulse aspect-[3/4]'></div>
                        ))}
                    </div>
                ) : (
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}
                            className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'
                        >
                            {filtered.map((product, idx) => {
                                const defaultVariant = product.hasVariants && product.variants?.length > 0 ? product.variants[0] : null
                                const basePrice = defaultVariant ? defaultVariant.price : product.price
                                const offer = defaultVariant?.offer != null ? defaultVariant.offer : (product.offer || 0)
                                const finalPrice = offer > 0 ? basePrice * (1 - offer / 100) : basePrice
                                const thumb = product.images?.[0]?.url || defaultVariant?.images?.[0]?.url
                                const rating = product.ratings ?? 4.9
                                const reviewCount = product.reviewCount ?? (800 + idx * 127)
                                const catName = product.category?.name?.toUpperCase() || 'WELLNESS'
                                const isNew = offer === 0

                                return (
                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: idx * 0.06 }}
                                        onClick={() => navigate(`/shop/${product.slug || product._id}`)}
                                        className='group relative bg-[#162923]/60 rounded-2xl overflow-hidden border border-white/5 hover:border-[#d4a574]/20 transition-all duration-300 cursor-pointer'
                                    >
                                        {/* Top badges row */}
                                        <div className='flex items-center justify-between px-3 pt-3'>
                                            <span className='text-[10px] tracking-[0.15em] uppercase text-white/40 font-sans'>
                                                {catName}
                                            </span>
                                            {offer > 0 ? (
                                                <span className='flex items-center gap-1 px-2.5 py-1 bg-[#d4a574] text-[#0f1c18] text-[10px] font-bold uppercase tracking-wider rounded-full'>
                                                    <Star className='w-2.5 h-2.5 fill-current' />
                                                    {offer}% OFF
                                                </span>
                                            ) : isNew ? (
                                                <span className='flex items-center gap-1 px-2.5 py-1 border border-white/20 text-white/60 text-[10px] uppercase tracking-wider rounded-full font-sans'>
                                                    <Star className='w-2.5 h-2.5' />
                                                    New
                                                </span>
                                            ) : null}
                                        </div>

                                        {/* Image */}
                                        <div className='relative mx-3 mt-3 rounded-xl overflow-hidden bg-white/5 aspect-square'>
                                            {thumb ? (
                                                <img
                                                    src={thumb}
                                                    alt={product.title}
                                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                                />
                                            ) : (
                                                <div className='w-full h-full flex items-center justify-center text-white/20 text-xs'>No Image</div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className='px-3 pt-4 pb-4'>
                                            {/* Stars + rating */}
                                            <div className='flex items-center gap-1.5 mb-2'>
                                                <div className='flex items-center gap-0.5'>
                                                    {[...Array(5)].map((_, s) => (
                                                        <Star key={s} className='w-3 h-3 fill-[#d4a574] text-[#d4a574]' />
                                                    ))}
                                                </div>
                                                <span className='text-white/40 text-[11px] font-sans'>{rating} · {reviewCount}</span>
                                            </div>

                                            {/* Title */}
                                            <h3 className='font-serif text-white text-base lg:text-lg leading-snug mb-1 group-hover:text-[#d4a574] transition-colors duration-300'>
                                                {product.title}
                                            </h3>

                                            {/* Description */}
                                            <p className='text-white/35 text-xs font-sans leading-relaxed line-clamp-1 mb-4'>
                                                {stripHtml(product.description) || `Premium Himalayan ${product.category?.name?.toLowerCase() || 'wellness'} product.`}
                                            </p>

                                            {/* Price + Add */}
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-baseline gap-2'>
                                                    <span className='text-[#d4a574] font-serif text-lg font-medium'>
                                                        ₹{formatPrice(finalPrice).replace('.00', '')}
                                                    </span>
                                                    {offer > 0 && (
                                                        <span className='text-white/25 text-xs line-through font-sans'>
                                                            ₹{formatPrice(basePrice).replace('.00', '')}
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={(e) => handleAddToCart(e, product)}
                                                    disabled={product.stock <= 0}
                                                    title={product.stock <= 0 ? 'Sold Out' : 'Add to cart'}
                                                    className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                                                        product.stock <= 0
                                                            ? 'border-white/10 text-white/20 cursor-not-allowed'
                                                            : 'border-white/20 text-white/50 hover:border-[#d4a574] hover:text-[#d4a574] hover:bg-[#d4a574]/10'
                                                    }`}
                                                >
                                                    <ShoppingCart className='w-3.5 h-3.5' />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Mobile CTA */}
                <div className='mt-8 lg:hidden text-center'>
                    <Link
                        to='/shop'
                        className='inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-sans text-white/40 hover:text-[#d4a574] transition-colors duration-300 pb-1 border-b border-white/10 hover:border-[#d4a574]/40'
                    >
                        View All Products <ArrowRight className='w-3.5 h-3.5' />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts
