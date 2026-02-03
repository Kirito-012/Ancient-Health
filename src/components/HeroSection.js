import React from 'react'
import { Link } from 'react-router-dom'
import heroBg from '../assets/hero-bg.png'

const HeroSection = () => {
    return (
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            {/* Background Image with Overlay */}
            <div className='absolute inset-0 z-0'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#1e4035]/80 via-[#2d5f4f]/70 to-[#3e7a70]/60 z-10'></div>
                <img
                    src={heroBg}
                    alt='Himalayan Mountains'
                    className='w-full h-full object-cover'
                />
            </div>

            {/* Decorative Elements */}
            <div className='absolute top-20 left-10 w-72 h-72 bg-[#d4a574]/10 rounded-full blur-3xl animate-float'></div>
            <div className='absolute bottom-20 right-10 w-96 h-96 bg-[#3e7a70]/10 rounded-full blur-3xl animate-float' style={{ animationDelay: '1s' }}></div>

            {/* Content */}
            <div className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40'>
                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                    {/* Left Content */}
                    <div className='text-white space-y-6 animate-fade-in-up'>
                        {/* Tagline */}
                        <div className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5'>
                            <div className='w-2 h-2 bg-[#d4a574] rounded-full animate-pulse'></div>
                            <span className='text-sm font-medium tracking-widest text-[#e8c9a0] uppercase'>
                                Sourced from the Himalayas
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight'>
                            <span className='block'>Himalayan Purity,</span>
                            <span className='block mt-2 bg-gradient-to-r from-[#d4a574] via-[#e8c9a0] to-[#d4a574] bg-clip-text text-transparent'>
                                Ancient Wisdom
                            </span>
                        </h1>

                        {/* Description */}
                        <p className='text-lg sm:text-xl text-gray-200 leading-relaxed max-w-xl'>
                            Experience nature's finest wellness products, ethically sourced from pristine Himalayan peaks and crafted with time-honored traditions.
                        </p>

                        {/* CTA Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 pt-6'>
                            <Link
                                to='/shop'
                                className='group relative px-8 py-4 bg-gradient-to-r from-[#d4a574] to-[#e8c9a0] text-[#1e4035] font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4a574]/50 hover:scale-105'>
                                <span className='relative z-10 flex items-center justify-center space-x-2'>
                                    <span>Shop Collection</span>
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
                                </span>
                                <div className='absolute inset-0 bg-gradient-to-r from-[#c99563] to-[#d4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            </Link>

                            <Link
                                to='/about'
                                className='group px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105 flex items-center justify-center space-x-2'>
                                <span>Our Story</span>
                                <svg
                                    className='w-5 h-5 transition-transform group-hover:rotate-45'
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

                        {/* Trust Indicators */}
                        <div className='flex items-center space-x-6 sm:space-x-8 pt-8 border-t border-white/20'>
                            <div className='text-center'>
                                <div className='text-2xl sm:text-3xl font-bold text-[#d4a574]'>100%</div>
                                <div className='text-xs sm:text-sm text-gray-300 mt-1'>Pure & Natural</div>
                            </div>
                            <div className='w-px h-12 bg-white/20'></div>
                            <div className='text-center'>
                                <div className='text-2xl sm:text-3xl font-bold text-[#d4a574]'>2500+</div>
                                <div className='text-xs sm:text-sm text-gray-300 mt-1'>Customers</div>
                            </div>
                            <div className='w-px h-12 bg-white/20'></div>
                            <div className='text-center'>
                                <div className='text-2xl sm:text-3xl font-bold text-[#d4a574]'>30+</div>
                                <div className='text-xs sm:text-sm text-gray-300 mt-1'>Products</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Feature Cards */}
                    <div className='hidden lg:grid grid-cols-2 gap-6 animate-fade-in-up' style={{ animationDelay: '0.2s' }}>
                        {/* Card 1 */}
                        <div className='group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                            <div className='w-14 h-14 bg-gradient-to-br from-[#d4a574] to-[#e8c9a0] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                                <svg
                                    className='w-7 h-7 text-[#1e4035]'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-white font-semibold text-lg mb-2'>
                                Ancient Wisdom
                            </h3>
                            <p className='text-gray-300 text-sm'>
                                Time-tested remedies passed down through generations
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className='group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl mt-8'>
                            <div className='w-14 h-14 bg-gradient-to-br from-[#d4a574] to-[#e8c9a0] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                                <svg
                                    className='w-7 h-7 text-[#1e4035]'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-white font-semibold text-lg mb-2'>
                                Sustainably Sourced
                            </h3>
                            <p className='text-gray-300 text-sm'>
                                Ethically harvested from pristine Himalayan regions
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className='group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                            <div className='w-14 h-14 bg-gradient-to-br from-[#d4a574] to-[#e8c9a0] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                                <svg
                                    className='w-7 h-7 text-[#1e4035]'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-white font-semibold text-lg mb-2'>
                                Lab Tested
                            </h3>
                            <p className='text-gray-300 text-sm'>
                                Certified pure and free from harmful additives
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className='group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl mt-8'>
                            <div className='w-14 h-14 bg-gradient-to-br from-[#d4a574] to-[#e8c9a0] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                                <svg
                                    className='w-7 h-7 text-[#1e4035]'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-white font-semibold text-lg mb-2'>
                                Holistic Wellness
                            </h3>
                            <p className='text-gray-300 text-sm'>
                                Nurturing body, mind, and spirit naturally
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce'>
                <div className='flex flex-col items-center space-y-2 text-white/60'>
                    <span className='text-xs font-medium tracking-wider'>SCROLL</span>
                    <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 14l-7 7m0 0l-7-7m7 7V3'
                        />
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
