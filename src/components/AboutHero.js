import React from 'react'

import aboutBg from '../assets/about_bg.jpg'

const AboutHero = () => {
    return (
        <section className='relative min-h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden py-20 lg:py-0'>
            {/* Background Image with Overlay */}
            <div className='absolute inset-0 z-0'>
                <div className='absolute inset-0 bg-gradient-to-b from-[#0f1c18]/80 via-[#162923]/70 to-[#0f1c18] z-10'></div>
                <img
                    src={aboutBg}
                    alt='Himalayan Landscape'
                    className='w-full h-full object-cover scale-110 animate-pulse-slow' // Slow pulse for subtle movement
                />
            </div>

            {/* Decorative Elements */}
            <div className='absolute top-20 left-10 w-64 h-64 bg-[#d4a574]/20 rounded-full blur-3xl animate-float hidden sm:block'></div>
            <div className='absolute bottom-20 right-10 w-80 h-80 bg-[#3e7a70]/20 rounded-full blur-3xl animate-float hidden sm:block' style={{ animationDelay: '1.5s' }}></div>

            {/* Content */}
            <div className='relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                <div className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 mb-6 sm:mb-8 animate-fade-in-up'>
                    <div className='w-2 h-2 bg-[#d4a574] rounded-full animate-pulse'></div>
                    <span className='text-xs sm:text-sm font-medium tracking-widest text-[#e8c9a0] uppercase'>
                        Since 1985
                    </span>
                </div>

                <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 animate-fade-in-up' style={{ animationDelay: '0.2s' }}>
                    Rooted in
                    <span className='block mt-2 text-[#d4a574]'>Ancient Wisdom</span>
                </h1>

                <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto animate-fade-in-up' style={{ animationDelay: '0.4s' }}>
                    We bridge the gap between time-honored Himalayan traditions and modern wellness, bringing you nature's purest remedies.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce'>
                <div className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2'>
                    <div className='w-1 h-2 bg-[#d4a574] rounded-full animate-scroll-down'></div>
                </div>
            </div>
        </section>
    )
}

export default AboutHero
