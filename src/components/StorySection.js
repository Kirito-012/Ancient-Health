import React from 'react'
import storyJourney from '../assets/story-journey.png'
import storyCraft from '../assets/story-craft.png'

const StorySection = () => {
    return (
        <section className='relative py-16 lg:py-20 bg-gradient-to-b from-white via-[#f8faf9] to-white overflow-hidden'>
            {/* Decorative elements */}
            <div className='absolute top-0 left-1/4 w-96 h-96 bg-[#2d5f4f]/5 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 right-1/4 w-80 h-80 bg-[#d4a574]/5 rounded-full blur-3xl'></div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Section Header */}
                <div className='text-center mb-20'>
                    <div className='inline-block mb-4'>
                        <span className='text-sm font-semibold tracking-widest text-[#2d5f4f] uppercase'>
                            Our Journey
                        </span>
                    </div>
                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
                        From Mountain Peaks
                        <span className='block mt-2 text-gradient'>To Your Wellness</span>
                    </h2>
                </div>

                {/* Journey Timeline - Unique Design */}
                <div className='relative'>
                    {/* Vertical connecting line - hidden on mobile */}
                    <div className='hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2d5f4f]/20 via-[#2d5f4f]/40 to-[#2d5f4f]/20 transform -translate-x-1/2'></div>

                    {/* Story Point 1 - The Discovery */}
                    <div className='relative mb-20 lg:mb-32'>
                        <div className='grid lg:grid-cols-2 gap-12 items-center'>
                            {/* Content - Left */}
                            <div className='lg:text-right order-2 lg:order-1'>
                                <div className='inline-block lg:float-right lg:max-w-lg'>
                                    <div className='mb-6'>
                                        <span className='inline-block px-4 py-2 bg-gradient-to-r from-[#2d5f4f]/10 to-[#3e7a70]/10 text-[#2d5f4f] font-semibold rounded-full text-sm'>
                                            Chapter One
                                        </span>
                                    </div>
                                    <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
                                        The Discovery
                                    </h3>
                                    <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                                        Our story begins in the remote villages of the Himalayas, where ancient healing traditions have been preserved for millennia. Inspired by the wisdom of local healers and the pristine purity of mountain botanicals, we embarked on a mission to share these treasures with the world.
                                    </p>
                                    <div className='flex items-center justify-end space-x-4 text-sm text-gray-500'>
                                        <div className='flex items-center space-x-2'>
                                            <svg className='w-5 h-5 text-[#2d5f4f]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                            </svg>
                                            <span>Himalayan Villages</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Image - Right */}
                            <div className='order-1 lg:order-2'>
                                <div className='relative group'>
                                    <div className='absolute -inset-4 bg-gradient-to-r from-[#2d5f4f]/20 to-[#3e7a70]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500'></div>
                                    <div className='relative rounded-3xl overflow-hidden shadow-2xl'>
                                        <img
                                            src={storyJourney}
                                            alt='Himalayan Journey'
                                            className='w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700'
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent'></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline dot */}
                        <div className='hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <div className='w-6 h-6 bg-gradient-to-br from-[#2d5f4f] to-[#3e7a70] rounded-full border-4 border-white shadow-lg'></div>
                        </div>
                    </div>

                    {/* Story Point 2 - The Craft */}
                    <div className='relative mb-20 lg:mb-32'>
                        <div className='grid lg:grid-cols-2 gap-12 items-center'>
                            {/* Image - Left */}
                            <div className='order-1'>
                                <div className='relative group'>
                                    <div className='absolute -inset-4 bg-gradient-to-r from-[#d4a574]/20 to-[#2d5f4f]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500'></div>
                                    <div className='relative rounded-3xl overflow-hidden shadow-2xl'>
                                        <img
                                            src={storyCraft}
                                            alt='Traditional Craft'
                                            className='w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700'
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent'></div>
                                    </div>
                                </div>
                            </div>

                            {/* Content - Right */}
                            <div className='order-2'>
                                <div className='max-w-lg'>
                                    <div className='mb-6'>
                                        <span className='inline-block px-4 py-2 bg-gradient-to-r from-[#d4a574]/10 to-[#2d5f4f]/10 text-[#2d5f4f] font-semibold rounded-full text-sm'>
                                            Chapter Two
                                        </span>
                                    </div>
                                    <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
                                        The Craft
                                    </h3>
                                    <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                                        We partner with local artisans who have mastered traditional preparation methods passed down through generations. Every product is crafted with meticulous care, honoring time-tested techniques that preserve the natural potency and purity of each ingredient.
                                    </p>
                                    <div className='flex items-center space-x-4 text-sm text-gray-500'>
                                        <div className='flex items-center space-x-2'>
                                            <svg className='w-5 h-5 text-[#2d5f4f]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                            </svg>
                                            <span>Time-Honored Methods</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline dot */}
                        <div className='hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <div className='w-6 h-6 bg-gradient-to-br from-[#d4a574] to-[#2d5f4f] rounded-full border-4 border-white shadow-lg'></div>
                        </div>
                    </div>

                    {/* Story Point 3 - The Promise */}
                    <div className='relative'>
                        <div className='max-w-6xl mx-auto'>
                            <div className='relative bg-gradient-to-br from-[#1e4035] via-[#2d5f4f] to-[#3e7a70] rounded-3xl overflow-hidden shadow-2xl'>
                                {/* Decorative Background Pattern */}
                                <div className='absolute inset-0 opacity-10'>
                                    <div className='absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl'></div>
                                    <div className='absolute bottom-0 left-0 w-80 h-80 bg-[#d4a574] rounded-full blur-3xl'></div>
                                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full'>
                                        <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
                                            <defs>
                                                <pattern id='promise-pattern' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'>
                                                    <circle cx='20' cy='20' r='1.5' fill='white' opacity='0.3' />
                                                </pattern>
                                            </defs>
                                            <rect width='100%' height='100%' fill='url(#promise-pattern)' />
                                        </svg>
                                    </div>
                                </div>

                                {/* Decorative Corner Accents */}
                                <div className='absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/20 rounded-tl-3xl'></div>
                                <div className='absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/20 rounded-br-3xl'></div>

                                <div className='relative px-8 py-16 lg:px-16 lg:py-20'>
                                    {/* Header */}
                                    <div className='text-center mb-12'>
                                        <div className='mb-6'>
                                            <span className='inline-flex items-center px-5 py-2.5 bg-white/15 text-white font-semibold rounded-full text-sm backdrop-blur-md border border-white/20 shadow-lg'>
                                                <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                                </svg>
                                                Our Promise
                                            </span>
                                        </div>
                                        <h3 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight'>
                                            Purity You Can Trust
                                        </h3>
                                        <p className='text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto'>
                                            Every product carries our commitment to absolute purity, sustainable practices, and the preservation of ancient wellness wisdom. From the highest peaks to your home, we ensure nothing but nature's best.
                                        </p>
                                    </div>

                                    {/* Enhanced Stats Grid */}
                                    <div className='grid sm:grid-cols-3 gap-6 lg:gap-8 mt-16'>
                                        {/* Stat 1 - Pure & Natural */}
                                        <div className='group relative'>
                                            <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                                            <div className='relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl'>
                                                <div className='flex justify-center mb-4'>
                                                    <div className='w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300'>
                                                        <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className='text-5xl lg:text-6xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300'>100%</div>
                                                <div className='text-white/90 font-medium text-base mb-1'>Pure & Natural</div>
                                                <div className='text-white/60 text-sm'>No artificial additives</div>
                                            </div>
                                        </div>

                                        {/* Stat 2 - Happy Customers */}
                                        <div className='group relative'>
                                            <div className='absolute inset-0 bg-gradient-to-br from-[#d4a574]/20 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                                            <div className='relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl'>
                                                <div className='flex justify-center mb-4'>
                                                    <div className='w-16 h-16 bg-gradient-to-br from-[#d4a574]/30 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300'>
                                                        <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className='text-5xl lg:text-6xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300'>2500+</div>
                                                <div className='text-white/90 font-medium text-base mb-1'>Happy Customers</div>
                                                <div className='text-white/60 text-sm'>Trusted worldwide</div>
                                            </div>
                                        </div>

                                        {/* Stat 3 - Altitude Sourcing */}
                                        <div className='group relative'>
                                            <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                                            <div className='relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl'>
                                                <div className='flex justify-center mb-4'>
                                                    <div className='w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300'>
                                                        <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className='text-5xl lg:text-6xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300'>5000m</div>
                                                <div className='text-white/90 font-medium text-base mb-1'>Altitude Sourcing</div>
                                                <div className='text-white/60 text-sm'>Himalayan peaks</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className='mt-12 pt-8 border-t border-white/10'>
                                        <div className='flex items-center justify-center space-x-8 text-white/70'>
                                            <div className='flex items-center space-x-2'>
                                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                                </svg>
                                                <span className='text-sm font-medium'>Certified Organic</span>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                                </svg>
                                                <span className='text-sm font-medium'>Lab Tested</span>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                                </svg>
                                                <span className='text-sm font-medium'>Sustainably Sourced</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline end dot */}
                        <div className='hidden lg:block absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2'>
                            <div className='w-6 h-6 bg-gradient-to-br from-[#2d5f4f] to-[#d4a574] rounded-full border-4 border-white shadow-lg animate-pulse'></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StorySection
