'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import JsonLd from '../components/JsonLd'
import { buildProductSchema, buildBreadcrumbSchema, SITE_URL, SITE_NAME } from '../utils/schemaUtils'
import {
	ArrowLeft,
	Star,
	Plus,
	Minus,
	ShoppingCart,
	Truck,
	RefreshCw,
	ShieldCheck,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'
import { formatPrice } from '../utils/formatPrice'
import { stripHtml } from '../utils/textUtils'
import HTMLContent from '../components/HTMLContent'

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
	const [selectedVariantIdx, setSelectedVariantIdx] = useState(0)
	const [isAddingToCart, setIsAddingToCart] = useState(false)

	// Fetch product data
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true)
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/api/products/${slug}`,
				)
				const data = await response.json()

				if (data.success && data.data) {
					const fetchedProduct = data.data
					setProduct(fetchedProduct)

					setSelectedVariantIdx(0)

					if (fetchedProduct.category) {
						fetchRelatedProducts(
							fetchedProduct.category._id || fetchedProduct.category,
							fetchedProduct._id,
						)
					}
				} else {
					setError('Product not found')
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
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/api/products?sort=-createdAt&limit=5`,
			)
			const data = await response.json()
			if (data.success) {
				// Filter out the current product and take only 4
				const filtered = data.data
					.filter((p) => p._id !== currentProductId)
					.slice(0, 4)
				setRelatedProducts(filtered)
			}
		} catch (err) {
			console.error('Error fetching related products:', err)
		}
	}

	// Cart handlers
	const handleQuantityChange = (amount) => {
		const activeVariant = product?.hasVariants ? product?.variants?.[selectedVariantIdx] : null
		const currentStock = activeVariant
			? activeVariant.stock || 0
			: product?.stock || 0

		setQuantity((prev) => {
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
			const activeVariant = product?.hasVariants ? product?.variants?.[selectedVariantIdx] : null
			const success = await addToCart(
				product._id,
				quantity,
				activeVariant?._id,
			)

			if (success) {
				toast.success(
					<div
						onClick={() => navigate('/cart')}
						className='flex items-center justify-between gap-4 cursor-pointer group'>
						<div className='flex flex-col'>
							<span className='font-serif text-[#1e4035] font-bold text-sm'>
								{product.title}
							</span>
							<span className='text-xs text-[#2d5f4f]/80'>
								Added {quantity} to your cart
							</span>
						</div>
						<div className='flex items-center justify-center w-8 h-8 rounded-full bg-[#2d5f4f]/10 group-hover:bg-[#2d5f4f] transition-colors duration-300'>
							<svg
								className='w-4 h-4 text-[#2d5f4f] group-hover:text-white transition-colors duration-300'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M14 5l7 7m0 0l-7 7m7-7H3'
								/>
							</svg>
						</div>
					</div>,
					{
						icon: '🌿',
						style: {
							background: '#ffffff',
							border: '1px solid rgba(45, 95, 79, 0.15)',
							borderRadius: '12px',
							boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
							padding: '16px',
							cursor: 'pointer',
						},
						progressStyle: {
							background: 'linear-gradient(to right, #2d5f4f, #1e4035)',
							height: '3px',
						},
					},
				)
			}
		} finally {
			setIsAddingToCart(false)
		}
	}

	const handleAddToCartRelated = async (relProduct) => {
		const success = await addToCart(relProduct._id, 1)
		if (success) {
			toast.success(
				<div
					onClick={() => navigate('/cart')}
					className='flex items-center justify-between gap-4 cursor-pointer group'>
					<div className='flex flex-col'>
						<span className='font-serif text-[#1e4035] font-bold text-sm'>
							{relProduct.title}
						</span>
						<span className='text-xs text-[#2d5f4f]/80'>
							Added to your cart
						</span>
					</div>
					<div className='flex items-center justify-center w-8 h-8 rounded-full bg-[#2d5f4f]/10 group-hover:bg-[#2d5f4f] transition-colors duration-300'>
						<svg
							className='w-4 h-4 text-[#2d5f4f] group-hover:text-white transition-colors duration-300'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M14 5l7 7m0 0l-7 7m7-7H3'
							/>
						</svg>
					</div>
				</div>,
				{
					icon: '🌿',
					style: {
						background: '#ffffff',
						border: '1px solid rgba(45, 95, 79, 0.15)',
						borderRadius: '12px',
						boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
						padding: '16px',
						cursor: 'pointer',
					},
					progressStyle: {
						background: 'linear-gradient(to right, #2d5f4f, #1e4035)',
						height: '3px',
					},
					onClick: () => navigate('/cart'),
				},
			)
		}
	}

	if (loading) {
		return (
			<div className='min-h-screen bg-[#f8faf9] flex flex-col'>
				<Navbar />
				<div className='flex-1 flex justify-center items-center'>
					<div className='text-center'>
						<div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2d5f4f] border-t-transparent mb-4'></div>
						<p className='text-gray-500 font-medium'>
							Summoning ancient wisdom...
						</p>
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
					<h2 className='text-3xl font-serif text-[#1e4035] mb-4'>
						Product Not Found
					</h2>
					<p className='text-gray-500 mb-8 max-w-md text-center'>
						{error ||
							'The artifact you seek is currently unavailable or has been moved.'}
					</p>
					<button
						onClick={() => navigate('/shop')}
						className='px-8 py-3 bg-[#2d5f4f] text-white rounded-full hover:bg-[#1e4035] transition-colors font-semibold shadow-lg'>
						Return to Shop
					</button>
				</div>
				<Footer />
			</div>
		)
	}

	// Determine current display values based on variants
	const selectedVariant = product.hasVariants ? product.variants?.[selectedVariantIdx] : null
	const currentPrice = selectedVariant ? selectedVariant.price : product.price
	const currentStock = selectedVariant ? selectedVariant.stock : product.stock
	const currentImages =
		selectedVariant && selectedVariant.images?.length > 0
			? selectedVariant.images
			: product.images

	// Safety check for empty images
	const displayImages =
		currentImages?.length > 0
			? currentImages
			: [{ url: '/placeholder-image.png' }] // Default empty state later

	// Per-variant offer overrides product-level offer; falls back to product.offer
	const discount = selectedVariant && selectedVariant.offer != null
		? selectedVariant.offer
		: (product.offer || 0)
	const finalPrice =
		discount > 0 ? currentPrice * (1 - discount / 100) : currentPrice

	// SEO
	const productUrl = `${SITE_URL}/shop/${product.slug}`
	const primaryImage = product.images?.[0]?.url || `${SITE_URL}/og-image.jpeg`
	const metaDescription = product.description
		? product.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160)
		: `Buy ${product.title} from Ancient Health — pure Ayurvedic formulations.`
	const productSchema = buildProductSchema(product, productUrl)
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: 'Home', url: `${SITE_URL}/` },
		{ name: 'Shop', url: `${SITE_URL}/shop/` },
		{ name: product.title, url: productUrl },
	])

	return (
		<div className='min-h-screen bg-[#f8faf9] flex flex-col selection:bg-[#2d5f4f]/20'>
			<Helmet>
				<title>{product.title} | {SITE_NAME}</title>
				<meta name="description" content={metaDescription} />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href={productUrl} />
				<meta property="og:type" content="product" />
				<meta property="og:title" content={`${product.title} | ${SITE_NAME}`} />
				<meta property="og:description" content={metaDescription} />
				<meta property="og:image" content={primaryImage} />
				<meta property="og:url" content={productUrl} />
				<meta property="og:site_name" content={SITE_NAME} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={`${product.title} | ${SITE_NAME}`} />
				<meta name="twitter:description" content={metaDescription} />
				<meta name="twitter:image" content={primaryImage} />
			</Helmet>
			<JsonLd schema={[productSchema, breadcrumbSchema]} />
			<Navbar forceDarkNav={true} />

			<main className='flex-1 pb-20'>
				{/* Hero Product Section */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 lg:pt-28 lg:pb-16'>
					<div className='flex flex-col lg:flex-row gap-12 xl:gap-20 items-start'>
						{/* LEFT SIDE: Image Gallery */}
						<div className='w-full lg:w-1/2 flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start'>
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

								{displayImages.length > 1 && (
									<>
										<button
											onClick={(e) => {
												e.stopPropagation()
												setActiveImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
											}}
											className='absolute left-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-[#2d5f4f] hover:bg-[#2d5f4f] hover:text-white shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 ring-2 ring-transparent focus:ring-[#2d5f4f]'
											aria-label='Previous image'
										>
											<ChevronLeft className='w-6 h-6' />
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation()
												setActiveImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
											}}
											className='absolute right-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-[#2d5f4f] hover:bg-[#2d5f4f] hover:text-white shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 ring-2 ring-transparent focus:ring-[#2d5f4f]'
											aria-label='Next image'
										>
											<ChevronRight className='w-6 h-6' />
										</button>
									</>
								)}

								{displayImages[activeImageIndex] && (
									<motion.img
										key={activeImageIndex} // forces re-render animation when index changes
										initial={{ opacity: 0, scale: 1.05 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.5 }}
										src={
											displayImages[activeImageIndex].url ||
											displayImages[activeImageIndex]
										}
										alt={product.title}
										className='relative z-10 w-full h-full object-cover filter drop-shadow-xl transform-gpu will-change-transform backface-visibility-hidden'
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
												}`}>
											<img
												src={img.url || img}
												alt={`${product.title} thumbnail ${idx + 1}`}
												className='w-full h-full object-cover mix-blend-multiply'
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
									<div className='mb-3'>
										<span className='inline-block px-2.5 py-0.5 bg-[#2d5f4f]/10 text-[#2d5f4f] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#2d5f4f]/20'>
											{product.category.name}
										</span>
									</div>
								)}

								{/* Title */}
								<h1 className='text-2xl md:text-3xl font-serif text-[#1e4035] leading-tight mb-2 font-playfair pr-10'>
									{product.title}
								</h1>

								{/* Reviews snippet */}
								<div className='flex items-center gap-3 mb-4'>
									<div className='flex items-center gap-1 bg-[#fef9c3] px-2 py-0.5 rounded-md border border-yellow-200'>
										<Star className='w-3.5 h-3.5 fill-yellow-400 text-yellow-400' />
										<span className='text-xs font-bold text-yellow-800 tracking-wide'>
											{product.ratings ? product.ratings.toFixed(1) : '4.9'}
										</span>
									</div>
									<button className='text-xs text-gray-400 hover:text-[#2d5f4f] transition-colors underline decoration-dashed underline-offset-4'>
										Read Trusted Reviews
									</button>
								</div>

								{/* Pricing */}
								<div className='flex flex-col gap-0.5 mb-5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm'>
									<div className='flex items-end gap-2 flex-wrap'>
										<span className='text-3xl font-bold text-[#2d5f4f] tracking-tight'>
											₹{formatPrice(finalPrice)}
										</span>
										{discount > 0 && (
											<>
												<span className='text-base text-gray-400 line-through mb-0.5'>
													₹{formatPrice(currentPrice)}
												</span>
												<span className='text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded mb-1'>
													{discount}% OFF
												</span>
											</>
										)}
									</div>
									<p className='text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5'>
										MRP (Inclusive of all taxes)
									</p>
								</div>

								{/* Variants (If Exist) */}
								{product.hasVariants && product.variants?.length > 0 && (
									<div className='mb-5'>
										<h3 className='text-xs font-bold text-[#1e4035] uppercase tracking-wider mb-2.5 border-b border-gray-100 pb-1.5'>
											Available Options
										</h3>
										<div className='flex flex-wrap gap-2'>
											{product.variants.map((variant, idx) => {
												const variantOffer = variant.offer != null ? variant.offer : (product.offer || 0)
												return (
												<button
													key={idx}
													onClick={() => {
														setSelectedVariantIdx(idx)
														setQuantity(1)
													}}
													className={`flex flex-col items-center px-6 py-3 rounded-xl border-2 transition-all duration-300 ${
														selectedVariantIdx === idx
															? 'border-[#2d5f4f] bg-[#2d5f4f] text-white shadow-md shadow-[#2d5f4f]/20 ring-2 ring-[#2d5f4f]/10'
															: 'border-gray-200 bg-white text-gray-700 hover:border-[#2d5f4f]/50 hover:bg-[#2d5f4f]/5 hover:text-[#2d5f4f]'
													}`}>
													<span className='text-xs font-bold leading-tight'>
														{variant.attributes.map((a) => a.value).join(' / ')}
													</span>
													<div className='flex items-baseline gap-1 mt-0.5'>
														<span className={`text-[11px] font-bold ${selectedVariantIdx === idx ? 'text-white' : 'text-[#2d5f4f]'}`}>
															₹{formatPrice(variantOffer > 0 ? variant.price * (1 - variantOffer / 100) : variant.price)}
														</span>
														{variantOffer > 0 && (
															<span className={`text-[9px] font-medium line-through ${selectedVariantIdx === idx ? 'text-white/50' : 'text-gray-400'}`}>
																₹{formatPrice(variant.price)}
															</span>
														)}
													</div>
												</button>
												)
											})}
										</div>
									</div>
								)}

								{/* Stock Status */}
								<div className='mb-4'>
									{currentStock > 10 ? (
										<p className='flex items-center gap-2 text-xs font-semibold text-emerald-600'>
											<span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse'></span>
											In Stock & Ready to Ship
										</p>
									) : currentStock > 0 ? (
										<p className='flex items-center gap-2 text-xs font-semibold text-amber-600'>
											<span className='w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse'></span>
											Only {currentStock} Left - Order Soon
										</p>
									) : (
										<p className='flex items-center gap-2 text-xs font-semibold text-red-600'>
											<span className='w-1.5 h-1.5 rounded-full bg-red-500'></span>
											Out of Stock
										</p>
									)}
								</div>

								{/* Add to Cart Row */}
								<div className='flex gap-3 mb-6'>
									<div className='flex items-center border-2 border-gray-200 rounded-xl bg-white focus-within:border-[#2d5f4f] transition-colors p-0.5'>
										<button
											onClick={() => handleQuantityChange(-1)}
											className='w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#2d5f4f] hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50'
											disabled={currentStock <= 0}>
											<Minus className='w-3.5 h-3.5' />
										</button>
										<span className='w-9 text-center text-sm font-bold text-gray-800'>
											{quantity}
										</span>
										<button
											onClick={() => handleQuantityChange(1)}
											className='w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#2d5f4f] hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50'
											disabled={currentStock <= 0}>
											<Plus className='w-3.5 h-3.5' />
										</button>
									</div>

									<button
										onClick={handleAddToCart}
										disabled={currentStock <= 0 || isAddingToCart}
										className={`group relative overflow-hidden flex items-center justify-center gap-2.5 px-9 py-3 rounded-xl font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 ${currentStock <= 0
											? 'bg-gray-200 text-gray-400 cursor-not-allowed'
											: 'bg-gradient-to-br from-[#2d5f4f] via-[#264f43] to-[#1e4035] text-white shadow-lg shadow-[#2d5f4f]/30 hover:shadow-xl hover:shadow-[#2d5f4f]/40 hover:-translate-y-0.5 active:translate-y-0 ring-1 ring-white/10'
											}`}>
										{currentStock > 0 && (
											<span className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none'></span>
										)}
										{isAddingToCart ? (
											<div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
										) : (
											<>
												<ShoppingCart className='w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12' strokeWidth={2.4} />
												<span className='relative'>Add to Cart</span>
											</>
										)}
									</button>
								</div>

								{/* Trust Badges */}
								<div className='grid grid-cols-3 gap-3 my-12'>
									{/* Free Shipping */}
									<div className='flex flex-col items-center text-center gap-2 group'>
										<div className='relative w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-[#d4a574] to-[#c4905e] flex items-center justify-center text-white shadow-md shadow-[#d4a574]/40 ring-2 ring-[#d4a574]/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500'>
											<Truck className='w-5 h-5 lg:w-6 lg:h-6' strokeWidth={2.2} />
										</div>
										<div>
											<p className='text-[10px] lg:text-xs font-bold text-[#1e4035] uppercase tracking-wider leading-tight'>
												Free Shipping
											</p>
											<p className='text-[9px] lg:text-[10px] text-gray-500 font-medium mt-0.5'>
												on orders above ₹499
											</p>
										</div>
									</div>

									{/* Easy Returns */}
									<div className='flex flex-col items-center text-center gap-2 group'>
										<div className='relative w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-[#2d5f4f] to-[#1e4035] flex items-center justify-center text-white shadow-md shadow-[#2d5f4f]/40 ring-2 ring-[#2d5f4f]/10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500'>
											<RefreshCw className='w-5 h-5 lg:w-6 lg:h-6' strokeWidth={2.2} />
										</div>
										<div>
											<p className='text-[10px] lg:text-xs font-bold text-[#1e4035] uppercase tracking-wider leading-tight'>
												Easy Returns
											</p>
											<p className='text-[9px] lg:text-[10px] text-gray-500 font-medium mt-0.5'>
												up to 10 days
											</p>
										</div>
									</div>

									{/* 100% Organic */}
									<div className='flex flex-col items-center text-center gap-2 group'>
										<div className='relative w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/40 ring-2 ring-emerald-500/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500'>
											<ShieldCheck className='w-5 h-5 lg:w-6 lg:h-6' strokeWidth={2.2} />
										</div>
										<div>
											<p className='text-[10px] lg:text-xs font-bold text-[#1e4035] uppercase tracking-wider leading-tight'>
												100% Organic
											</p>
											<p className='text-[9px] lg:text-[10px] text-gray-500 font-medium mt-0.5'>
												& lab certified
											</p>
										</div>
									</div>
								</div>

								{/* Description Sections */}
								{product.descriptionDropdowns &&
									product.descriptionDropdowns.length > 0 && (
										<div className='flex flex-col gap-3'>
											{product.descriptionDropdowns.map((dropdown, index) => (
												<div key={index}>
													<h3 className='inline-block text-sm lg:text-base font-bold uppercase tracking-wider text-[#2d5f4f] mb-2 pb-1 border-b-2 border-[#d4a574]'>
														{dropdown.heading}
													</h3>
													<HTMLContent
														content={dropdown.content}
														className='text-gray-600 text-[13px] prose prose-sm max-w-none prose-p:leading-snug prose-p:my-1.5 prose-ul:my-1.5 prose-ul:leading-snug prose-li:my-0.5 prose-headings:text-[#2d5f4f] prose-headings:my-2 prose-a:text-[#d4a574] break-words whitespace-normal [&_*]:!whitespace-normal [&_*]:!break-words'
													/>
												</div>
											))}
										</div>
									)}
							</div>
						</div>
					</div>
				</div>

				{/* MIDDLE: Optional Video Section */}
				{product.videoSection &&
					product.videoSection.video &&
					product.videoSection.video.url && (
						<div className='w-full bg-[#1e4035] py-20 lg:py-32 my-12 relative overflow-hidden'>
							{/* Motif Backgrounds */}
							<div className='absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(45,95,79,0.3)_0%,_transparent_60%)] pointer-events-none transform-gpu'></div>
							<div className='absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(212,165,116,0.1)_0%,_transparent_60%)] pointer-events-none transform-gpu'></div>

							<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-10%' }}
									transition={{ duration: 0.8 }}
									className='text-center mb-12'>
									<span className='text-sm font-serif tracking-[0.2em] text-[#d4a574] uppercase mb-4 inline-block drop-shadow-md'>
										Visual Experience
									</span>
									<h2 className='text-3xl md:text-5xl font-serif text-white font-playfair'>
										{product.videoSection.heading || 'Watch it in action'}
									</h2>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.8, delay: 0.2 }}
									className='max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-black flex items-center justify-center relative group transform-gpu'>
									<video
										src={product.videoSection.video.url}
										autoPlay
										loop
										muted
										playsInline
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] ease-out transform-gpu will-change-transform backface-visibility-hidden'></video>
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
						className='relative z-10 max-w-4xl mx-auto text-center'>
						<ShieldCheck className='w-16 h-16 mx-auto text-[#d4a574] mb-8 opacity-80' />
						<h2 className='text-4xl lg:text-5xl font-serif text-[#1e4035] mb-8 font-playfair'>
							The Ancient Health Promise
						</h2>
						<p className='text-lg lg:text-xl text-gray-600 leading-relaxed font-light mb-12'>
							We are committed to bringing you the purest, most potent
							formulations. Unlike commercial counterparts, every element is{' '}
							<strong className='font-semibold text-[#2d5f4f]'>
								responsibly sourced, traditionally crafted
							</strong>
							, and{' '}
							<strong className='font-semibold text-[#2d5f4f]'>
								scientifically validated
							</strong>{' '}
							to match the premium standards of ancient Ayurvedic principles.
						</p>

						<div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4'>
							{[
								{
									title: 'Cold Pressed',
									desc: 'Preserving bio-active nutrients',
								},
								{ title: 'Lab Certified', desc: 'Tested for maximum purity' },
								{ title: 'Cruelty Free', desc: 'Never tested on animals' },
								{
									title: 'Eco Conscious',
									desc: 'Sustainable harvesting practices',
								},
							].map((usp, i) => (
								<div
									key={i}
									className='flex flex-col items-center gap-2'>
									<div className='w-2 h-2 rounded-full bg-[#d4a574] mb-2'></div>
									<h4 className='font-bold text-[#1e4035] uppercase tracking-wider text-xs'>
										{usp.title}
									</h4>
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
									<h2 className='text-3xl font-serif text-[#1e4035] mb-2 font-playfair'>
										Explore Treasury
									</h2>
									<p className='text-gray-500'>
										Complementary rituals from the same collection.
									</p>
								</div>
								<button
									onClick={() => navigate('/shop')}
									className='hidden sm:flex px-6 py-2 border-2 border-[#2d5f4f] text-[#2d5f4f] font-bold uppercase tracking-wider rounded-full hover:bg-[#2d5f4f] hover:text-white transition-colors text-xs items-center gap-2'>
									View All
									<ArrowLeft className='w-4 h-4 rotate-180' />
								</button>
							</div>

							<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
								{relatedProducts.map((relProduct) => (
									<motion.div
										key={relProduct._id}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, ease: 'easeOut' }}
										className='group relative bg-gradient-to-b from-white to-[#f8faf9] rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-100 hover:border-[#2d5f4f]/20 hover:shadow-2xl transition-all duration-500'>
										{/* Discount Badge */}
										{relProduct.offer > 0 && (
											<div className='absolute top-2 right-2 lg:top-4 lg:right-4 z-10'>
												<span className='inline-block px-2 py-0.5 lg:px-3 lg:py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] lg:text-xs font-bold rounded-full shadow-md lg:shadow-lg'>
													{relProduct.offer}% OFF
												</span>
											</div>
										)}
										{relProduct.stock <= 0 && (
											<div className='absolute top-2 left-2 lg:top-4 lg:left-4 z-10'>
												<span className='inline-block px-2 py-0.5 lg:px-3 lg:py-1 bg-gray-800 text-white text-[10px] lg:text-xs font-bold rounded-full shadow-md lg:shadow-lg'>
													Out of Stock
												</span>
											</div>
										)}

										{/* Product Image */}
										<div
											className='relative aspect-square p-4 lg:p-8 bg-white overflow-hidden cursor-pointer'
											onClick={() =>
												navigate(`/shop/${relProduct.slug || relProduct._id}`)
											}>
											<div className='absolute inset-0 bg-gradient-to-br from-[#2d5f4f]/0 to-[#3e7a70]/0 group-hover:from-[#2d5f4f]/5 group-hover:to-[#3e7a70]/5 transition-all duration-500'></div>
											{relProduct.stock <= 0 && (
												<div className='absolute inset-0 bg-white/60 z-10'></div>
											)}
											{relProduct.images && relProduct.images.length > 0 ? (
												<img
													src={relProduct.images[0].url}
													alt={relProduct.title}
													className='relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
												/>
											) : (
												<div className='w-full h-full flex items-center justify-center bg-gray-50 rounded-2xl'>
													<svg
														className='w-12 h-12 text-gray-300'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={1.5}
															d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
														/>
													</svg>
												</div>
											)}
										</div>

										{/* Product Info */}
										<div className='p-3 lg:p-6'>
											<div
												className='mb-1 lg:mb-2 cursor-pointer'
												onClick={() =>
													navigate(`/shop/${relProduct.slug || relProduct._id}`)
												}>
												{relProduct.category && (
													<div className='mb-1 lg:mb-2'>
														<span className='inline-block px-2 py-0.5 lg:px-3 lg:py-1 bg-gradient-to-r from-[#2d5f4f]/10 to-[#3e7a70]/10 text-[#2d5f4f] text-[10px] lg:text-xs font-semibold rounded-full border border-[#2d5f4f]/20'>
															{relProduct.category.name}
														</span>
													</div>
												)}
												{relProduct.ratings > 0 && (
													<div className='flex items-center space-x-1 mb-1 lg:mb-2'>
														<svg
															className='w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-current'
															viewBox='0 0 20 20'>
															<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
														</svg>
														<span className='text-[10px] lg:text-xs font-bold text-gray-500'>
															{relProduct.ratings.toFixed(1)}
														</span>
													</div>
												)}
												<h3 className='text-sm lg:text-lg font-bold text-[#1e4035] leading-tight group-hover:text-[#2d5f4f] transition-colors line-clamp-2 min-h-[2.5rem] lg:min-h-[3rem]'>
													{relProduct.title}
												</h3>
											</div>

											<p
												className='hidden lg:block text-gray-500 text-sm mb-4 line-clamp-2 min-h-[2.5rem] cursor-pointer'
												onClick={() =>
													navigate(`/shop/${relProduct.slug || relProduct._id}`)
												}>
												{stripHtml(relProduct.description) ||
													'Premium Ayurvedic formulation for daily wellness.'}
											</p>

											{/* Price and Add to Cart */}
											<div className='flex items-center justify-between mt-2 lg:mt-4 border-t border-gray-100 pt-2 lg:pt-4'>
												<div className='flex flex-col'>
													{relProduct.offer > 0 ? (
														<>
															<span className='text-[10px] lg:text-xs text-gray-400 line-through'>
																₹{relProduct.price.toFixed(2)}
															</span>
															<span className='text-sm lg:text-xl font-bold text-[#2d5f4f]'>
																₹
																{(
																	relProduct.price *
																	(1 - relProduct.offer / 100)
																).toFixed(2)}
															</span>
														</>
													) : (
														<span className='text-sm lg:text-xl font-bold text-[#2d5f4f]'>
															₹{relProduct.price.toFixed(2)}
														</span>
													)}
												</div>

												<button
													onClick={(e) => {
														e.stopPropagation()
														handleAddToCartRelated(relProduct)
													}}
													disabled={relProduct.stock <= 0}
													className={`p-2 lg:p-3 rounded-full transition-all duration-300 shadow-sm ${relProduct.stock <= 0
														? 'bg-gray-100 text-gray-300 cursor-not-allowed'
														: 'bg-gradient-to-br from-[#2d5f4f]/10 to-[#3e7a70]/10 text-[#2d5f4f] hover:from-[#2d5f4f] hover:to-[#3e7a70] hover:text-white hover:scale-110 hover:shadow-[#2d5f4f]/30'
														}`}>
													<svg
														className='w-4 h-4 lg:w-5 lg:h-5'
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
										<div className='absolute inset-0 border-2 border-[#2d5f4f] rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
									</motion.div>
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
