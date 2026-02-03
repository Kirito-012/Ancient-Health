import React from 'react'
import { Link } from 'react-router-dom'
import retreatImage from '../assets/story-harvest.png'

const WellnessRetreat = () => {
    const features = [
        {
            icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
            ),
            title: 'Himalayan Sanctuary',
            description: 'Nestled in pristine mountain valleys with breathtaking views'
        },
        {
            icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
            ),
            title: 'Holistic Healing',
            description: 'Ancient wellness practices combined with modern comfort'
        },
        {
            icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' />
                </svg>
            ),
            title: 'Personalized Programs',
            description: 'Tailored wellness journeys designed for your unique needs'
        },
        {
            icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                </svg>
            ),
            title: 'Expert Guidance',
            description: 'Experienced practitioners in yoga, meditation, and Ayurveda'
        }
    ]

    return (
        <section className='relative py-16 lg:py-20 bg-gradient-to-b from-white via-[#f8faf9] to-white overflow-hidden'>
            {/* Background Elements */}
            <div className='absolute inset-0'>
                <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-[#2d5f4f]/5 rounded-full blur-3xl'></div>
                <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4a574]/5 rounded-full blur-3xl'></div>
            </div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Section Header */}
                <div className='text-center mb-16'>
                    <div className='inline-block mb-4'>
                        <span className='text-sm font-semibold tracking-widest text-[#2d5f4f] uppercase'>
                            Escape • Rejuvenate • Transform
                        </span>
                    </div>
                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
                        Wellness Retreats
                        <span className='block mt-2 text-gradient'>in the Himalayas</span>
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        Escape the chaos and immerse yourself in transformative wellness experiences designed to restore balance and reconnect you with inner peace.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className='grid lg:grid-cols-2 gap-12 items-center mb-16'>
                    {/* Left - Image */}
                    <div className='relative group'>
                        <div className='absolute -inset-4 bg-gradient-to-r from-[#2d5f4f]/20 to-[#d4a574]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500'></div>
                        <div className='relative rounded-3xl overflow-hidden shadow-2xl'>
                            <img
                                src={retreatImage}
                                alt='Himalayan Wellness Retreat'
                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent'></div>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className='space-y-8'>
                        <div>
                            <h3 className='text-3xl font-bold text-gray-900 mb-4'>
                                Find Your Inner Peace
                            </h3>
                            <p className='text-gray-600 leading-relaxed'>
                                Our wellness retreats offer a sanctuary for busy professionals seeking rejuvenation. Experience the healing power of the Himalayas through curated programs that blend ancient wisdom with modern wellness practices—the perfect environment for deep restoration and transformation.
                            </p>
                        </div>

                        {/* Features List */}
                        <div className='space-y-4'>
                            {features.map((feature, index) => (
                                <div key={index} className='group flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-[#f8faf9] to-white border border-gray-100 hover:border-[#2d5f4f]/20 hover:shadow-lg transition-all duration-300'>
                                    <div className='w-11 h-11 bg-white rounded-xl flex items-center justify-center text-[#2d5f4f] flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300 border border-gray-100'>
                                        {feature.icon}
                                    </div>
                                    <div className='flex-1 pt-1'>
                                        <h4 className='font-semibold text-gray-900 mb-1 text-base'>{feature.title}</h4>
                                        <p className='text-sm text-gray-600 leading-relaxed'>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div>
                            <Link
                                to='/retreats'
                                className='inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#2d5f4f] to-[#3e7a70] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2d5f4f]/30 transition-all duration-300 hover:scale-105 group'>
                                <span>Explore Our Retreats</span>
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
                </div>

                {/* Bottom Stats */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-200'>
                    <div className='text-center'>
                        <div className='text-4xl font-bold text-[#2d5f4f] mb-2'>500+</div>
                        <div className='text-gray-600 text-sm'>Guests Transformed</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-4xl font-bold text-[#2d5f4f] mb-2'>7-21</div>
                        <div className='text-gray-600 text-sm'>Day Programs</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-4xl font-bold text-[#2d5f4f] mb-2'>100%</div>
                        <div className='text-gray-600 text-sm'>Organic Meals</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-4xl font-bold text-[#2d5f4f] mb-2'>4.9★</div>
                        <div className='text-gray-600 text-sm'>Guest Rating</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WellnessRetreat
