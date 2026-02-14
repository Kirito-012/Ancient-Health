import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Shop = () => {
    const { addToCart } = useCart()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        fetchProducts()
        // eslint-disable-next-line
    }, [currentPage])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/products?page=${currentPage}&limit=12`
            )
            const data = await response.json()

            if (data.success) {
                setProducts(data.data)
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
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-white to-gray-50'>
            <Navbar />

            {/* Hero Section */}
            <div className='relative pt-32 pb-20 bg-gradient-to-r from-[#2d5f4f] to-[#3e7a70] overflow-hidden'>
                <div className='absolute inset-0 opacity-10'>
                    <div className='absolute inset-0' style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                    <div className='text-center'>
                        <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
                            Our Products
                        </h1>
                        <p className='text-xl text-white/90 max-w-2xl mx-auto'>
                            Discover our collection of premium Ayurvedic wellness products
                        </p>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                {loading ? (
                    <div className='flex justify-center items-center min-h-[400px]'>
                        <div className='text-center'>
                            <div className='inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2d5f4f] mb-4'></div>
                            <p className='text-gray-600 text-lg'>Loading products...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className='flex justify-center items-center min-h-[400px]'>
                        <div className='text-center bg-red-50 border border-red-200 rounded-lg p-8 max-w-md'>
                            <svg className='w-16 h-16 text-red-500 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            <p className='text-red-700 text-lg font-medium'>{error}</p>
                        </div>
                    </div>
                ) : products.length === 0 ? (
                    <div className='flex justify-center items-center min-h-[400px]'>
                        <div className='text-center'>
                            <svg className='w-24 h-24 text-gray-300 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                            </svg>
                            <p className='text-gray-600 text-xl'>No products available</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Products Grid */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className='group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#2d5f4f]/30 transform hover:-translate-y-2'
                                >
                                    {/* Product Image */}
                                    <div className='relative overflow-hidden bg-gray-100 aspect-square'>
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={product.images[0].url}
                                                alt={product.title}
                                                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                            />
                                        ) : (
                                            <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200'>
                                                <svg className='w-20 h-20 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Offer Badge */}
                                        {product.offer > 0 && (
                                            <div className='absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg'>
                                                {product.offer}% OFF
                                            </div>
                                        )}

                                        {/* Stock Badge */}
                                        {product.stock <= 0 && (
                                            <div className='absolute inset-0 bg-black/60 flex items-center justify-center'>
                                                <span className='bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-lg'>
                                                    Out of Stock
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className='p-6'>
                                        {/* Product Title */}
                                        <h3 className='text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-[#2d5f4f] transition-colors duration-300'>
                                            {product.title}
                                        </h3>

                                        {/* Brand */}
                                        {product.brand && (
                                            <p className='text-sm text-gray-500 mb-3'>
                                                {product.brand}
                                            </p>
                                        )}

                                        {/* Rating */}
                                        {product.ratings > 0 && (
                                            <div className='flex items-center mb-3'>
                                                <div className='flex text-yellow-400'>
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-4 h-4 ${i < Math.floor(product.ratings) ? 'fill-current' : 'fill-gray-300'}`}
                                                            viewBox='0 0 20 20'
                                                        >
                                                            <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className='ml-2 text-sm text-gray-600'>
                                                    ({product.ratings.toFixed(1)})
                                                </span>
                                            </div>
                                        )}

                                        {/* Price */}
                                        <div className='flex items-baseline mb-4'>
                                            {product.offer > 0 ? (
                                                <>
                                                    <span className='text-2xl font-bold text-[#2d5f4f]'>
                                                        ₹{(product.price * (1 - product.offer / 100)).toFixed(2)}
                                                    </span>
                                                    <span className='ml-2 text-lg text-gray-400 line-through'>
                                                        ₹{product.price.toFixed(2)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className='text-2xl font-bold text-[#2d5f4f]'>
                                                    ₹{product.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.stock <= 0}
                                            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${product.stock <= 0
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-[#2d5f4f] to-[#3e7a70] text-white hover:shadow-lg hover:shadow-[#2d5f4f]/30 hover:scale-105 active:scale-95'
                                                }`}
                                        >
                                            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className='flex justify-center items-center mt-12 space-x-2'>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === 1
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-[#2d5f4f] border border-[#2d5f4f] hover:bg-[#2d5f4f] hover:text-white'
                                        }`}
                                >
                                    Previous
                                </button>

                                <div className='flex space-x-2'>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${currentPage === index + 1
                                                ? 'bg-gradient-to-r from-[#2d5f4f] to-[#3e7a70] text-white shadow-lg'
                                                : 'bg-white text-gray-700 border border-gray-300 hover:border-[#2d5f4f] hover:text-[#2d5f4f]'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === totalPages
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-[#2d5f4f] border border-[#2d5f4f] hover:bg-[#2d5f4f] hover:text-white'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default Shop
