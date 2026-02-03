import React from 'react'
import { Link } from 'react-router-dom'
import productHoney from '../assets/product-honey.png'
import productTea from '../assets/product-tea.png'
import productShilajit from '../assets/product-shilajit.png'
import productSalt from '../assets/product-salt.png'

const FeaturedProducts = () => {
    const products = [
        {
            id: 1,
            name: 'Himalayan Raw Honey',
            description: 'Pure, unprocessed honey from high-altitude Himalayan wildflowers',
            price: '$24.99',
            image: productHoney,
            badge: 'Bestseller',
        },
        {
            id: 2,
            name: 'Herbal Wellness Blend',
            description: 'Traditional tea blend with ancient healing herbs and flowers',
            price: '$18.99',
            image: productTea,
            badge: 'New',
        },
        {
            id: 3,
            name: 'Pure Shilajit Resin',
            description: 'Authentic Himalayan shilajit for vitality and rejuvenation',
            price: '$34.99',
            image: productShilajit,
            badge: 'Premium',
        },
        {
            id: 4,
            name: 'Pink Himalayan Salt',
            description: 'Mineral-rich salt crystals from ancient Himalayan deposits',
            price: '$12.99',
            image: productSalt,
            badge: null,
        },
    ]

    return (
        <section className='relative py-16 lg:py-20 bg-white overflow-hidden'>
            {/* Decorative background elements */}
            <div className='absolute top-0 left-0 w-96 h-96 bg-[#d4a574]/5 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 right-0 w-80 h-80 bg-[#2d5f4f]/5 rounded-full blur-3xl'></div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Section Header */}
                <div className='text-center mb-16'>
                    <div className='inline-block mb-4'>
                        <span className='text-sm font-semibold tracking-widest text-[#2d5f4f] uppercase'>
                            Our Collection
                        </span>
                    </div>
                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
                        Featured
                        <span className='block mt-2 text-gradient'>Products</span>
                    </h2>
                    <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                        Discover our most loved wellness essentials, sourced from the pristine Himalayas
                    </p>
                </div>

                {/* Products Grid */}
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className='group relative bg-gradient-to-b from-gray-50 to-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[#2d5f4f]/20 hover:shadow-2xl transition-all duration-500'>
                            {/* Badge */}
                            {product.badge && (
                                <div className='absolute top-4 right-4 z-10'>
                                    <span className='inline-block px-3 py-1 bg-gradient-to-r from-[#2d5f4f] to-[#3e7a70] text-white text-xs font-semibold rounded-full shadow-lg'>
                                        {product.badge}
                                    </span>
                                </div>
                            )}

                            {/* Product Image */}
                            <div className='relative aspect-square p-8 bg-gradient-to-br from-white to-gray-50 overflow-hidden'>
                                <div className='absolute inset-0 bg-gradient-to-br from-[#2d5f4f]/0 to-[#3e7a70]/0 group-hover:from-[#2d5f4f]/5 group-hover:to-[#3e7a70]/5 transition-all duration-500'></div>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='relative w-full h-full object-contain group-hover:scale-110 transition-transform duration-500'
                                />
                            </div>

                            {/* Product Info */}
                            <div className='p-6'>
                                <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2d5f4f] transition-colors'>
                                    {product.name}
                                </h3>
                                <p className='text-gray-600 text-sm mb-4 leading-relaxed'>
                                    {product.description}
                                </p>

                                {/* Price and CTA */}
                                <div className='flex items-center justify-between'>
                                    <span className='text-2xl font-bold text-[#2d5f4f]'>
                                        {product.price}
                                    </span>
                                    <button className='p-2 rounded-full bg-gradient-to-br from-[#2d5f4f]/10 to-[#3e7a70]/10 text-[#2d5f4f] hover:from-[#2d5f4f] hover:to-[#3e7a70] hover:text-white transition-all duration-300 hover:scale-110 group/btn'>
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

                            {/* Hover overlay */}
                            <div className='absolute inset-0 border-2 border-[#2d5f4f] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className='text-center'>
                    <Link
                        to='/shop'
                        className='inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#2d5f4f] to-[#3e7a70] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2d5f4f]/30 transition-all duration-300 hover:scale-105 group'>
                        <span>View All Products</span>
                        <svg
                            className='w-5 h-5 transition-transform group-hover:translate-x-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts
