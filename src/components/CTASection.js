import React from 'react'
import { Link } from 'react-router-dom'

const CTASection = () => {
    return (
        <section className='relative py-16 lg:py-20 overflow-hidden'>
            {/* Simplified Background Gradient */}
            <div className='absolute inset-0 bg-gradient-to-br from-[#1e4035] via-[#2d5f4f] to-[#3e7a70]'>
                <div className='absolute inset-0 opacity-90 bg-[radial-gradient(circle_at_30%_20%,rgba(212,165,116,0.15),transparent_50%)]'></div>
            </div>

            {/* Subtle Pattern Overlay */}
            <div className='absolute inset-0 opacity-[0.02]'>
                <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
                    <defs>
                        <pattern id='cta-grid' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'>
                            <circle cx='30' cy='30' r='1.5' fill='white' />
                        </pattern>
                    </defs>
                    <rect width='100%' height='100%' fill='url(#cta-grid)' />
                </svg>
            </div>

            <div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center'>
                    {/* Heading */}
                    <h2 className='text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight'>
                        Ready to Experience
                        <span className='block mt-2 bg-gradient-to-r from-[#d4a574] via-[#e8c9a0] to-[#d4a574] bg-clip-text text-transparent'>
                            Ancient Wellness?
                        </span>
                    </h2>

                    {/* Description */}
                    <p className='text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-8'>
                        Join thousands who have discovered the transformative power of pure, Himalayan botanicals.
                    </p>

                    {/* CTA Buttons */}
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-10'>
                        <Link
                            to='/shop'
                            className='group relative inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#2d5f4f] font-bold rounded-full hover:bg-[#d4a574] hover:text-white transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-[#d4a574]/50 w-full sm:w-auto justify-center'>
                            <span>Explore Products</span>
                            <svg
                                className='w-5 h-5 transition-transform group-hover:translate-x-1'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2.5}
                                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                                />
                            </svg>
                        </Link>

                        <Link
                            to='/about'
                            className='group inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center'>
                            <span>Our Story</span>
                            <svg
                                className='w-5 h-5 transition-transform group-hover:translate-x-1'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M13 7l5 5m0 0l-5 5m5-5H6'
                                />
                            </svg>
                        </Link>
                    </div>

                    {/* Compact Trust Indicators */}
                    <div className='flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm pt-6 border-t border-white/10'>
                        <div className='flex items-center space-x-2'>
                            <svg className='w-5 h-5 text-[#d4a574]' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                            <span className='font-medium'>100% Natural</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <svg className='w-5 h-5 text-[#d4a574]' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                            <span className='font-medium'>Free Shipping</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <svg className='w-5 h-5 text-[#d4a574]' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                            <span className='font-medium'>Money-Back Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTASection
