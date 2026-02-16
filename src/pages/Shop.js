import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import shop_bg from "../assets/shop_bg.png"

import { motion, AnimatePresence } from 'framer-motion'

const Shop = () => {
    const { addToCart } = useCart()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [activeCategory, setActiveCategory] = useState('All')
    const [categories, setCategories] = useState(['All'])
    const [categoriesLoading, setCategoriesLoading] = useState(true)

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchProducts()
        // eslint-disable-next-line
    }, [currentPage, activeCategory]) // Refetch when category changes

    const fetchCategories = async () => {
        try {
            setCategoriesLoading(true)
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/categories`
            )
            const data = await response.json()

            if (data.success && data.data) {
                // Extract category names and prepend 'All'
                const categoryNames = data.data.map(cat => cat.name)
                setCategories(['All', ...categoryNames])
            } else {
                // Fallback to just 'All' if fetch fails
                console.warn('Failed to fetch categories, using default')
                setCategories(['All'])
            }
        } catch (err) {
            console.error('Error fetching categories:', err)
            // Fallback to just 'All' on error
            setCategories(['All'])
        } finally {
            setCategoriesLoading(false)
        }
    }

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/products?page=${currentPage}&limit=100`
            )
            const data = await response.json()

            if (data.success) {
                // Client-side filtering based on selected category
                let filteredProducts = data.data
                if (activeCategory !== 'All') {
                    filteredProducts = data.data.filter(p =>
                        p.category && p.category.name === activeCategory
                    )
                }
                setProducts(filteredProducts)
                setTotalPages(data.pagination.pages)
            } else {
                setError('Failed to fetch products')
            }
        } catch (err) {
            console.error('Error fetching products:', err)
            setError('Failed to load products. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const handleAddToCart = (product) => {
        addToCart(product._id, 1)
        toast.success(`${product.title} added to cart!`)
    }

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }

    const heroTextVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    }

    return (
        <div className='min-h-screen bg-[#f8faf9]'>
            <Navbar />

            {/* Premium Hero Section */}
            <div className='relative h-[60vh] flex items-center justify-center overflow-hidden'>
                {/* Background Image with Darker Overlay */}
                <div className='absolute inset-0 z-0'>
                    <div className='absolute inset-0 bg-black/40 z-10'></div>
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0f1c18] via-transparent to-black/40 z-20'></div>
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        src={shop_bg}
                        alt='Himalayan Shop'
                        className='w-full h-full object-cover'
                    />
                </div>

                <div className='relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
                        }}
                    >
                        <motion.span
                            variants={heroTextVariants}
                            className='inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#e8c9a0] text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-sm'
                        >
                            Pure & Potent
                        </motion.span>
                        <motion.h1
                            variants={heroTextVariants}
                            className='text-5xl md:text-7xl font-bold text-white mb-6 font-playfair drop-shadow-lg'
                        >
                            Wellness Shop
                        </motion.h1>
                        <motion.p
                            variants={heroTextVariants}
                            className='text-xl text-gray-100 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md'
                        >
                            Hand-harvested remedies from the heart of the Himalayas, delivered to your doorstep.
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-30'>
                <div className='flex flex-col lg:flex-row gap-12'>
                    {/* Sidebar - Category Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='w-full lg:w-1/4'
                    >
                        <div className='bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-36'>
                            <h3 className='text-xl font-bold text-[#1e4035] mb-6 font-playfair border-b border-gray-100 pb-4'>
                                Categories
                            </h3>
                            {categoriesLoading ? (
                                <ul className='space-y-3'>
                                    {[...Array(5)].map((_, i) => (
                                        <li key={i}>
                                            <div className='w-full h-12 bg-gray-100 rounded-xl animate-pulse'></div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <ul className='space-y-3'>
                                    {categories.map((category) => (
                                        <li key={category}>
                                            <button
                                                onClick={() => {
                                                    setActiveCategory(category)
                                                    setCurrentPage(1)
                                                }}
                                                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${activeCategory === category
                                                    ? 'bg-[#1B2B26] text-white shadow-lg shadow-[#2d5f4f]/30'
                                                    : 'text-gray-600 hover:bg-[#f4f7f6] hover:text-[#2d5f4f]'
                                                    }`}
                                            >
                                                <span className='font-medium'>{category}</span>
                                                {activeCategory === category && (
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Filter Banner */}
                            <div className='mt-8 p-6 bg-[#f4f7f6] rounded-2xl border border-[#2d5f4f]/10'>
                                <p className='text-sm text-gray-500 mb-2 uppercase tracking-wide font-semibold'>Guaranteed</p>
                                <div className='flex items-center space-x-2 text-[#2d5f4f] font-bold'>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>100% Organic</span>
                                </div>
                                <div className='flex items-center space-x-2 text-[#2d5f4f] font-bold mt-2'>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Lab Tested</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Products Grid */}
                    <div className='w-full lg:w-3/4'>
                        {loading ? (
                            <div className='flex justify-center items-center min-h-[400px] bg-white rounded-3xl shadow-sm'>
                                <div className='text-center'>
                                    <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2d5f4f] border-t-transparent mb-4'></div>
                                    <p className='text-gray-500 font-medium'>Curating wellness...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className='bg-red-50 border border-red-100 rounded-3xl p-12 text-center'>
                                <p className='text-red-600 font-medium'>{error}</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className='bg-white rounded-3xl p-12 text-center shadow-sm'>
                                <p className='text-gray-500 text-lg'>No products found in this category.</p>
                                <button
                                    onClick={() => setActiveCategory('All')}
                                    className='mt-4 text-[#2d5f4f] font-semibold hover:underline'
                                >
                                    View all products
                                </button>
                            </div>
                        ) : (
                            <>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
                                >
                                    <AnimatePresence>
                                        {products.map((product) => (
                                            <motion.div
                                                key={product._id}
                                                variants={itemVariants}
                                                layout
                                                className='group relative bg-gradient-to-b from-white to-[#f8faf9] rounded-3xl overflow-hidden border border-gray-100 hover:border-[#2d5f4f]/20 hover:shadow-2xl transition-all duration-500'
                                            >
                                                {/* Badge */}
                                                {product.offer > 0 && (
                                                    <div className='absolute top-4 right-4 z-10'>
                                                        <span className='inline-block px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg'>
                                                            {product.offer}% OFF
                                                        </span>
                                                    </div>
                                                )}
                                                {product.stock <= 0 && (
                                                    <div className='absolute top-4 left-4 z-10'>
                                                        <span className='inline-block px-3 py-1 bg-gray-800 text-white text-xs font-bold rounded-full shadow-lg'>
                                                            Out of Stock
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Product Image */}
                                                <div className='relative aspect-square p-8 bg-white overflow-hidden'>
                                                    <div className='absolute inset-0 bg-gradient-to-br from-[#2d5f4f]/0 to-[#3e7a70]/0 group-hover:from-[#2d5f4f]/5 group-hover:to-[#3e7a70]/5 transition-all duration-500'></div>
                                                    {/* Custom Out of Stock Overlay */}
                                                    {product.stock <= 0 && (
                                                        <div className='absolute inset-0 bg-white/60 z-10 backdrop-blur-[1px]'></div>
                                                    )}

                                                    {product.images && product.images.length > 0 ? (
                                                        <img
                                                            src={product.images[0].url}
                                                            alt={product.title}
                                                            className='relative w-full h-full object-contain group-hover:scale-110 transition-transform duration-700'
                                                        />
                                                    ) : (
                                                        <div className='w-full h-full flex items-center justify-center bg-gray-50 rounded-2xl'>
                                                            <svg className='w-12 h-12 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Product Info */}
                                                <div className='p-6'>
                                                    <div className='mb-2'>
                                                        {/* Category Badge */}
                                                        {product.category && (
                                                            <div className='mb-2'>
                                                                <span className='inline-block px-3 py-1 bg-gradient-to-r from-[#2d5f4f]/10 to-[#3e7a70]/10 text-[#2d5f4f] text-xs font-semibold rounded-full border border-[#2d5f4f]/20'>
                                                                    {product.category.name}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {/* Star Rating */}
                                                        {product.ratings > 0 && (
                                                            <div className='flex items-center space-x-1 mb-2'>
                                                                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                                                <span className='text-xs font-bold text-gray-500'>{product.ratings.toFixed(1)}</span>
                                                            </div>
                                                        )}
                                                        <h3 className='text-lg font-bold text-[#1e4035] leading-tight group-hover:text-[#2d5f4f] transition-colors line-clamp-2 min-h-[3rem]'>
                                                            {product.title}
                                                        </h3>
                                                    </div>

                                                    <p className='text-gray-500 text-sm mb-4 line-clamp-2 min-h-[2.5rem]'>
                                                        {product.description || 'Premium Ayurvedic formulation for daily wellness.'}
                                                    </p>

                                                    {/* Price and CTA */}
                                                    <div className='flex items-center justify-between mt-4 border-t border-gray-100 pt-4'>
                                                        <div className='flex flex-col'>
                                                            {product.offer > 0 ? (
                                                                <>
                                                                    <span className='text-xs text-gray-400 line-through'>₹{product.price.toFixed(2)}</span>
                                                                    <span className='text-xl font-bold text-[#2d5f4f]'>
                                                                        ₹{(product.price * (1 - product.offer / 100)).toFixed(2)}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span className='text-xl font-bold text-[#2d5f4f]'>
                                                                    ₹{product.price.toFixed(2)}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <button
                                                            onClick={() => handleAddToCart(product)}
                                                            disabled={product.stock <= 0}
                                                            className={`p-3 rounded-full transition-all duration-300 group/btn shadow-sm ${product.stock <= 0
                                                                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                                : 'bg-gradient-to-br from-[#2d5f4f]/10 to-[#3e7a70]/10 text-[#2d5f4f] hover:from-[#2d5f4f] hover:to-[#3e7a70] hover:text-white hover:scale-110 hover:shadow-[#2d5f4f]/30'
                                                                }`}
                                                        >
                                                            <svg
                                                                className='w-5 h-5'
                                                                fill='none'
                                                                stroke='currentColor'
                                                                viewBox='0 0 24 24'>
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    strokeWidth={2}
                                                                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Hover overlay border */}
                                                <div className='absolute inset-0 border-2 border-[#2d5f4f] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className='flex justify-center items-center mt-16 space-x-2'>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentPage === 1
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-[#2d5f4f] hover:bg-[#2d5f4f] hover:text-white border border-[#2d5f4f]'
                                                }`}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                        </button>

                                        <div className='flex space-x-2'>
                                            {[...Array(totalPages)].map((_, index) => (
                                                <button
                                                    key={index + 1}
                                                    onClick={() => setCurrentPage(index + 1)}
                                                    className={`w-10 h-10 rounded-full font-bold transition-all ${currentPage === index + 1
                                                        ? 'bg-[#2d5f4f] text-white shadow-lg shadow-[#2d5f4f]/30'
                                                        : 'bg-white text-gray-500 hover:text-[#2d5f4f]'
                                                        }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentPage === totalPages
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-[#2d5f4f] hover:bg-[#2d5f4f] hover:text-white border border-[#2d5f4f]'
                                                }`}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Shop
