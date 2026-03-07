import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Plus, Minus, Truck, RefreshCw, ShieldCheck, ChevronDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'
import { formatPrice } from '../utils/formatPrice'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.bubble.css'

const ProductDetail = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()

    // State definitions
    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // UI states
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null)
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                // Use the search API to find product by slug or ID
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?slug=${slug}&limit=1`)
                const data = await response.json()

                if (data.success && data.data && data.data.length > 0) {
                    const fetchedProduct = data.data[0]
                    setProduct(fetchedProduct)

                    // Set default variant if variants exist
                    if (fetchedProduct.hasVariants && fetchedProduct.variants?.length > 0) {
                        setSelectedVariant(fetchedProduct.variants[0])
                    }

                    // Fetch related products from the same category
                    if (fetchedProduct.category) {
                        fetchRelatedProducts(fetchedProduct.category._id || fetchedProduct.category, fetchedProduct._id)
                    }
                } else {
                    // Fallback to fetch by ID just in case slug was actually an ID
                    const idResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${slug}`)
                    const idData = await idResponse.json()

                    if (idData.success) {
                        setProduct(idData.data)
                        if (idData.data.hasVariants && idData.data.variants?.length > 0) {
                            setSelectedVariant(idData.data.variants[0])
                        }
                        if (idData.data.category) {
                            fetchRelatedProducts(idData.data.category._id || idData.data.category, idData.data._id)
                        }
                    } else {
                        setError('Product not found')
                    }
                }
            } catch (err) {
                console.error('Error fetching product:', err)
                setError('Failed to load product details')
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
        // Reset scroll position when slug changes
        window.scrollTo(0, 0)
    }, [slug])

    const fetchRelatedProducts = async (categoryId, currentProductId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?category=${categoryId}&limit=5`)
            const data = await response.json()
            if (data.success) {
                // Filter out the current product and take only 4
                const filtered = data.data.filter(p => p._id !== currentProductId).slice(0, 4)
                setRelatedProducts(filtered)
            }
        } catch (err) {
            console.error('Error fetching related products:', err)
        }
    }

    // Cart handlers
    const handleQuantityChange = (amount) => {
        const currentStock = selectedVariant ? (selectedVariant.stock || 0) : (product?.stock || 0)

        setQuantity(prev => {
            const next = prev + amount
            if (next < 1) return 1
            if (next > currentStock) {
                toast.warning(`Only ${currentStock} units available`)
                return currentStock
            }
            return next
        })
    }

    const handleAddToCart = async () => {
        if (!product) return

        setIsAddingToCart(true)
        try {
            // Note: If variant support exists in cart context, pass selectedVariant info
            const success = await addToCart(product._id, quantity, selectedVariant?._id)

            if (success) {
                toast.success(
                    <div
                        onClick={() => navigate('/cart')}
                        className="flex items-center justify-between gap-4 cursor-pointer group"
                    >
                        <div className="flex flex-col">
                            <span className="font-serif text-[#1e4035] font-bold text-sm">{product.title}</span>
                            <span className="text-xs text-[#2d5f4f]/80">Added {quantity} to your cart</span>
                        </div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2d5f4f]/10 group-hover:bg-[#2d5f4f] transition-colors duration-300">
                            <svg className="w-4 h-4 text-[#2d5f4f] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>,
                    {
                        icon: "🌿",
                        style: {
                            background: '#ffffff',
                            border: '1px solid rgba(45, 95, 79, 0.15)',
                            borderRadius: '12px',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                            padding: '16px',
                            cursor: 'pointer'
                        },
                        progressStyle: {
                            background: 'linear-gradient(to right, #2d5f4f, #1e4035)',
                            height: '3px'
                        }
                    }
                )
            }
        } finally {
            setIsAddingToCart(false)
        }
    }

    const toggleDropdown = (index) => {
        setActiveDropdownIndex(activeDropdownIndex === index ? null : index)
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-[#f8faf9] flex flex-col'>
                <Navbar />
                <div className='flex-1 flex justify-center items-center'>
                    <div className='text-center'>
                        <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2d5f4f] border-t-transparent mb-4'></div>
                        <p className='text-gray-500 font-medium'>Summoning ancient wisdom...</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className='min-h-screen bg-[#f8faf9] flex flex-col'>
                <Navbar />
                <div className='flex-1 flex flex-col justify-center items-center p-8'>
                    <div className='w-24 h-24 bg-red-50 text-red-400 rounded-full flex items-center justify-center mb-6'>
                        <ShieldCheck className='w-12 h-12' />
                    </div>
                    <h2 className='text-3xl font-serif text-[#1e4035] mb-4'>Product Not Found</h2>
                    <p className='text-gray-500 mb-8 max-w-md text-center'>{error || "The artifact you seek is currently unavailable or has been moved."}</p>
                    <button
                        onClick={() => navigate('/shop')}
                        className='px-8 py-3 bg-[#2d5f4f] text-white rounded-full hover:bg-[#1e4035] transition-colors font-semibold shadow-lg'
                    >
                        Return to Shop
                    </button>
                </div>
                <Footer />
            </div>
        )
    }

    // Determine current display values based on variants
    const currentPrice = selectedVariant ? selectedVariant.price : product.price
    const currentStock = selectedVariant ? selectedVariant.stock : product.stock
    const currentImages = (selectedVariant && selectedVariant.images?.length > 0)
        ? selectedVariant.images
        : product.images

    // Safety check for empty images
    const displayImages = currentImages?.length > 0 ? currentImages : [{ url: '/placeholder-image.png' }] // Default empty state later

    // Calculates discounted price if offer exists
    const discount = product.offer || 0
    const finalPrice = discount > 0 ? currentPrice * (1 - discount / 100) : currentPrice

    return (
        <div className='min-h-screen bg-[#f8faf9] flex flex-col selection:bg-[#2d5f4f]/20'>
            <Navbar forceDarkNav={true} />

            <main className='flex-1 pb-20'>
                {/* Hero Product Section */}
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16'>
                    <div className='flex flex-col lg:flex-row gap-12 xl:gap-20'>

                        {/* LEFT SIDE: Image Gallery */}
                        <div className='w-full lg:w-1/2 flex flex-col gap-4'>
                            {/* Main Image */}
                            <div className='relative aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm flex items-center justify-center p-8 group'>
                                <div className='absolute inset-0 bg-gradient-to-br from-[#2d5f4f]/5 to-transparent mix-blend-multiply opacity-50'></div>

                                {discount > 0 && (
                                    <div className='absolute top-6 left-6 z-20'>
                                        <span className='inline-flex items-center justify-center w-14 h-14 bg-[#d4a574] text-[#0f1c18] font-bold text-sm tracking-tight rounded-full shadow-lg rotate-12 group-hover:rotate-0 transition-transform duration-500'>
                                            -{discount}%
                                        </span>
                                    </div>
                                )}

                                {displayImages[activeImageIndex] && (
                                    <motion.img
                                        key={activeImageIndex} // forces re-render animation when index changes
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        src={displayImages[activeImageIndex].url || displayImages[activeImageIndex]}
                                        alt={product.title}
                                        className='relative z-10 w-full h-full object-contain filter drop-shadow-xl'
                                    />
                                )}
                            </div>

                            {/* Thumbnail Scroll */}
                            {displayImages.length > 1 && (
                                <div className='flex gap-4 overflow-x-auto pb-2 scrollbar-hide py-1'>
                                    {displayImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden bg-white border-2 transition-all duration-300 flex items-center justify-center p-2 ${activeImageIndex === idx
                                                ? 'border-[#2d5f4f] shadow-md ring-2 ring-[#2d5f4f]/20 ring-offset-1'
                                                : 'border-gray-100 hover:border-gray-300 hover:shadow-sm opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <img
                                                src={img.url || img}
                                                alt={`${product.title} thumbnail ${idx + 1}`}
                                                className='w-full h-full object-contain mix-blend-multiply'
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* RIGHT SIDE: Product Info */}
                        <div className='w-full lg:w-1/2 flex flex-col'>
                            <div className='mb-8'>
                                {/* Category Badge */}
                                {product.category && (
                                    <div className='mb-4'>
                                        <span className='inline-block px-3 py-1 bg-[#2d5f4f]/10 text-[#2d5f4f] text-xs font-bold uppercase tracking-widest rounded-full border border-[#2d5f4f]/20 backdrop-blur-sm'>
                                            {product.category.name}
                                        </span>
                                    </div>
                                )}

                                {/* Title */}
                                <h1 className='text-3xl md:text-5xl font-serif text-[#1e4035] leading-tight mb-4 font-playfair pr-10'>
                                    {product.title}
                                </h1>

                                {/* Reviews snippet */}
                                <div className='flex items-center gap-4 mb-6'>
                                    <div className='flex items-center gap-1 bg-[#fef9c3] px-2.5 py-1 rounded-md border border-yellow-200'>
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className='text-sm font-bold text-yellow-800 tracking-wide'>{product.ratings ? product.ratings.toFixed(1) : "4.9"}</span>
                                    </div>
                                    <button className='text-sm text-gray-400 hover:text-[#2d5f4f] transition-colors underline decoration-dashed underline-offset-4'>
                                        Read Trusted Reviews
                                    </button>
                                </div>

                                {/* Pricing */}
                                <div className='flex flex-col gap-1 mb-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm'>
                                    <div className='flex items-end gap-3 flex-wrap'>
                                        <span className='text-4xl font-bold text-[#2d5f4f] tracking-tight'>
                                            ₹{formatPrice(finalPrice)}
                                        </span>
                                        {discount > 0 && (
                                            <>
                                                <span className='text-xl text-gray-400 line-through mb-1'>
                                                    ₹{formatPrice(currentPrice)}
                                                </span>
                                                <span className='text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md mb-1.5'>
                                                    {discount}% OFF
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <p className='text-xs text-gray-400 font-medium uppercase tracking-wider mt-1'>
                                        MRP (Inclusive of all taxes)
                                    </p>
                                </div>

                                {/* Variants (If Exist) */}
                                {product.hasVariants && product.variants?.length > 0 && (
                                    <div className='mb-8'>
                                        <h3 className='text-sm font-bold text-[#1e4035] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2'>Available Options</h3>
                                        <div className='flex flex-wrap gap-3'>
                                            {product.variants.map((variant, idx) => (
                                                <button
                                                    key={variant._id || idx}
                                                    onClick={() => {
                                                        setSelectedVariant(variant)
                                                        setQuantity(1) // Reset quantity on variant swap
                                                    }}
                                                    className={`px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all duration-300 ${selectedVariant?._id === variant._id
                                                        ? 'border-[#2d5f4f] bg-[#2d5f4f]/5 text-[#2d5f4f] shadow-sm ring-4 ring-[#2d5f4f]/10'
                                                        : 'border-gray-200 bg-white text-gray-600 hover:border-[#2d5f4f]/50 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {variant.attributes.map(a => a.value).join(' / ')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stock Status */}
                                <div className='mb-6'>
                                    {currentStock > 10 ? (
                                        <p className='flex items-center gap-2 text-sm font-semibold text-emerald-600'>
                                            <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
                                            In Stock & Ready to Ship
                                        </p>
                                    ) : currentStock > 0 ? (
                                        <p className='flex items-center gap-2 text-sm font-semibold text-amber-600'>
                                            <span className='w-2 h-2 rounded-full bg-amber-500 animate-pulse'></span>
                                            Only {currentStock} Left - Order Soon
                                        </p>
                                    ) : (
                                        <p className='flex items-center gap-2 text-sm font-semibold text-red-600'>
                                            <span className='w-2 h-2 rounded-full bg-red-500'></span>
                                            Out of Stock
                                        </p>
                                    )}
                                </div>

                                {/* Add to Cart Row */}
                                <div className='flex gap-4 mb-8'>
                                    <div className='flex items-center border-2 border-gray-200 rounded-2xl bg-white focus-within:border-[#2d5f4f] transition-colors p-1'>
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className='w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#2d5f4f] hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-50'
                                            disabled={currentStock <= 0}
                                        >
                                            <Minus className='w-4 h-4' />
                                        </button>
                                        <span className='w-12 text-center font-bold text-gray-800'>{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className='w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#2d5f4f] hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-50'
                                            disabled={currentStock <= 0}
                                        >
                                            <Plus className='w-4 h-4' />
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        disabled={currentStock <= 0 || isAddingToCart}
                                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#2d5f4f]/20 transition-all duration-300 ${currentStock <= 0
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                            : 'bg-[#2d5f4f] text-white hover:bg-[#1e4035] hover:-translate-y-1'
                                            }`}
                                    >
                                        {isAddingToCart ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Add to Cart
                                                <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Trust Badges */}
                                <div className='grid grid-cols-3 gap-4 mb-10 py-6 border-y border-gray-100'>
                                    <div className='flex flex-col items-center justify-center text-center gap-2'>
                                        <div className='w-12 h-12 rounded-full bg-[#d4a574]/10 flex items-center justify-center text-[#d4a574] mb-1'>
                                            <Truck className='w-6 h-6' />
                                        </div>
                                        <span className='text-[10px] font-bold uppercase tracking-wider text-gray-500'>Free shipping<br />above 499</span>
                                    </div>
                                    <div className='flex flex-col items-center justify-center text-center gap-2'>
                                        <div className='w-12 h-12 rounded-full bg-[#2d5f4f]/10 flex items-center justify-center text-[#2d5f4f] mb-1'>
                                            <RefreshCw className='w-6 h-6' />
                                        </div>
                                        <span className='text-[10px] font-bold uppercase tracking-wider text-gray-500'>Up to 10 day<br />returns</span>
                                    </div>
                                    <div className='flex flex-col items-center justify-center text-center gap-2'>
                                        <div className='w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-1'>
                                            <ShieldCheck className='w-6 h-6' />
                                        </div>
                                        <span className='text-[10px] font-bold uppercase tracking-wider text-gray-500'>100% Organic<br />& Natural</span>
                                    </div>
                                </div>

                                {/* Dynamic Description Dropdowns */}
                                {product.descriptionDropdowns && product.descriptionDropdowns.length > 0 && (
                                    <div className='flex flex-col gap-3'>
                                        {product.descriptionDropdowns.map((dropdown, index) => (
                                            <div key={index} className='bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm'>
                                                <button
                                                    onClick={() => toggleDropdown(index)}
                                                    className='w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors'
                                                >
                                                    <span className='font-bold text-[#1e4035] tracking-wide'>{dropdown.heading}</span>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${activeDropdownIndex === index ? 'bg-[#2d5f4f] text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                                                        <ChevronDown className='w-4 h-4' />
                                                    </div>
                                                </button>

                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        height: activeDropdownIndex === index ? 'auto' : 0,
                                                        opacity: activeDropdownIndex === index ? 1 : 0
                                                    }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    className='overflow-hidden bg-[#fafcfb]'
                                                >
                                                    <div className='px-6 py-5 border-t border-gray-100 text-gray-600 prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:text-[#2d5f4f] prose-a:text-[#d4a574]'>
                                                        <ReactQuill
                                                            value={dropdown.content}
                                                            readOnly={true}
                                                            theme="bubble"
                                                            className='-mx-3 pointer-events-none'
                                                        />
                                                    </div>
                                                </motion.div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MIDDLE: Optional Video Section */}
                {product.videoSection && product.videoSection.video && product.videoSection.video.url && (
                    <div className='w-full bg-[#1e4035] py-20 lg:py-32 my-12 relative overflow-hidden'>
                        {/* Motif Backgrounds */}
                        <div className='absolute top-0 right-0 w-96 h-96 bg-[#2d5f4f] blur-[150px] opacity-50 rounded-full pointer-events-none'></div>
                        <div className='absolute bottom-0 left-0 w-96 h-96 bg-[#d4a574]/20 blur-[150px] opacity-50 rounded-full pointer-events-none'></div>

                        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10%' }}
                                transition={{ duration: 0.8 }}
                                className='text-center mb-12'
                            >
                                <span className='text-sm font-serif tracking-[0.2em] text-[#d4a574] uppercase mb-4 inline-block drop-shadow-md'>Visual Experience</span>
                                <h2 className='text-3xl md:text-5xl font-serif text-white font-playfair'>{product.videoSection.heading || 'Watch it in action'}</h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className='max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-black flex items-center justify-center relative group'
                            >
                                <video
                                    src={product.videoSection.video.url}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] ease-out'
                                ></video>
                                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                            </motion.div>
                        </div>
                    </div>
                )}

                {/* BOTTOM: Brand USP Section */}
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative'>
                    <div className='absolute inset-0 bg-gradient-to-b from-white via-[#f0f5f3] to-white opacity-50 z-0 pointer-events-none'></div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className='relative z-10 max-w-4xl mx-auto text-center'
                    >
                        <ShieldCheck className='w-16 h-16 mx-auto text-[#d4a574] mb-8 opacity-80' />
                        <h2 className='text-4xl lg:text-5xl font-serif text-[#1e4035] mb-8 font-playfair'>The Ancient Health Promise</h2>
                        <p className='text-lg lg:text-xl text-gray-600 leading-relaxed font-light mb-12'>
                            We are committed to bringing you the purest, most potent formulations. Unlike commercial counterparts, every element is <strong className='font-semibold text-[#2d5f4f]'>responsibly sourced, traditionally crafted</strong>, and <strong className='font-semibold text-[#2d5f4f]'>scientifically validated</strong> to match the premium standards of ancient Ayurvedic principles.
                        </p>

                        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4'>
                            {[
                                { title: 'Cold Pressed', desc: 'Preserving bio-active nutrients' },
                                { title: 'Lab Certified', desc: 'Tested for maximum purity' },
                                { title: 'Cruelty Free', desc: 'Never tested on animals' },
                                { title: 'Eco Conscious', desc: 'Sustainable harvesting practices' },
                            ].map((usp, i) => (
                                <div key={i} className='flex flex-col items-center gap-2'>
                                    <div className='w-2 h-2 rounded-full bg-[#d4a574] mb-2'></div>
                                    <h4 className='font-bold text-[#1e4035] uppercase tracking-wider text-xs'>{usp.title}</h4>
                                    <p className='text-xs text-gray-500'>{usp.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* BOTTOM: Related Products */}
                {relatedProducts.length > 0 && (
                    <div className='bg-white py-20 border-t border-gray-100'>
                        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                            <div className='flex items-center justify-between mb-12'>
                                <div>
                                    <h2 className='text-3xl font-serif text-[#1e4035] mb-2 font-playfair'>Explore Treasury</h2>
                                    <p className='text-gray-500'>Complementary rituals from the same collection.</p>
                                </div>
                                <button
                                    onClick={() => navigate('/shop')}
                                    className='hidden sm:flex px-6 py-2 border-2 border-[#2d5f4f] text-[#2d5f4f] font-bold uppercase tracking-wider rounded-full hover:bg-[#2d5f4f] hover:text-white transition-colors text-xs items-center gap-2'
                                >
                                    View All
                                    <ArrowLeft className='w-4 h-4 rotate-180' />
                                </button>
                            </div>

                            {/* Reuse similar card design from FeaturedProducts */}
                            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                                {relatedProducts.map((relProduct) => (
                                    <div
                                        key={relProduct._id}
                                        onClick={() => navigate(`/shop/${relProduct.slug || relProduct._id}`)}
                                        className='group relative bg-[#f8faf9] rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-100 hover:border-[#2d5f4f]/30 hover:shadow-xl transition-all duration-300 cursor-pointer'
                                    >
                                        <div className='relative aspect-square p-6 bg-white overflow-hidden flex items-center justify-center'>
                                            <div className='absolute inset-0 bg-gradient-to-br from-[#2d5f4f]/0 to-[#3e7a70]/0 group-hover:from-[#2d5f4f]/5 group-hover:to-[#3e7a70]/5 transition-all duration-500'></div>
                                            {relProduct.images && relProduct.images.length > 0 ? (
                                                <img
                                                    src={relProduct.images[0].url}
                                                    alt={relProduct.title}
                                                    className='relative w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-multiply'
                                                />
                                            ) : (
                                                <div className='w-full h-full bg-gray-50 rounded-xl'></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default ProductDetail
