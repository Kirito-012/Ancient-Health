import React from 'react'

const PuritySection = () => {
    return (
        <section className='relative py-16 lg:py-20 overflow-hidden'>
            {/* Background with gradient */}
            <div className='absolute inset-0 bg-gradient-to-b from-[#f8faf9] via-white to-[#f8faf9]'></div>

            {/* Decorative elements */}
            <div className='absolute top-20 right-0 w-[500px] h-[500px] bg-[#2d5f4f]/5 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4a574]/5 rounded-full blur-3xl'></div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Quote Section - Minimalist Design */}
                <div className='max-w-4xl mx-auto text-center mb-24'>
                    <div className='mb-8'>
                        <div className='inline-block w-16 h-1 bg-gradient-to-r from-[#2d5f4f] to-[#d4a574] rounded-full'></div>
                    </div>
                    <blockquote className='mb-8'>
                        <p className='text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 leading-relaxed italic mb-6'>
                            "Nature does not hurry, yet everything is accomplished"
                        </p>
                        <footer className='text-[#2d5f4f] text-lg font-medium tracking-wide'>
                            — Ancient Wisdom
                        </footer>
                    </blockquote>
                    <div className='inline-block w-16 h-1 bg-gradient-to-r from-[#d4a574] to-[#2d5f4f] rounded-full'></div>
                </div>

                {/* Main Content */}
                <div className='text-center mb-20'>
                    <span className='inline-block text-sm font-semibold tracking-widest text-[#2d5f4f] uppercase mb-4'>
                        Pure • Natural • Timeless
                    </span>
                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
                        Crafted by Nature,
                        <span className='block mt-2 text-gradient'>Perfected by Tradition</span>
                    </h2>
                    <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                        Every product is a testament to the purity of the Himalayas and the wisdom of ancient healing practices
                    </p>
                </div>

                {/* Feature Flow - Unique Design */}
                <div className='relative max-w-6xl mx-auto mb-20'>
                    {/* Connecting Line */}
                    <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#2d5f4f]/20 via-[#d4a574]/20 to-[#2d5f4f]/20 hidden lg:block'></div>

                    <div className='space-y-12'>
                        {[
                            {
                                icon: (
                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' />
                                    </svg>
                                ),
                                title: '100% Pure',
                                description: 'No synthetic additives, preservatives, or fillers',
                                number: '01'
                            },
                            {
                                icon: (
                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                                    </svg>
                                ),
                                title: 'Ancient Wisdom',
                                description: 'Time-tested remedies passed through generations',
                                number: '02'
                            },
                            {
                                icon: (
                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                ),
                                title: 'Sustainably Sourced',
                                description: 'Ethically harvested from pristine mountain regions',
                                number: '03'
                            },
                            {
                                icon: (
                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                                    </svg>
                                ),
                                title: 'Lab Verified',
                                description: 'Rigorously tested for purity and potency',
                                number: '04'
                            },
                        ].map((feature, index) => (
                            <div key={index} className='relative'>
                                {/* Desktop: Alternating Layout */}
                                <div className={`hidden lg:grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'direction-rtl'}`}>
                                    {index % 2 === 0 ? (
                                        <>
                                            {/* Left Content */}
                                            <div className='text-right pr-12'>
                                                <div className='inline-block'>
                                                    <h3 className='text-2xl font-bold text-gray-900 mb-2 flex items-center justify-end space-x-3'>
                                                        <span>{feature.title}</span>
                                                        <div className='w-10 h-10 bg-gradient-to-br from-[#2d5f4f] to-[#3e7a70] rounded-full flex items-center justify-center text-white flex-shrink-0'>
                                                            {feature.icon}
                                                        </div>
                                                    </h3>
                                                    <p className='text-gray-600'>{feature.description}</p>
                                                </div>
                                            </div>
                                            {/* Right Number Badge */}
                                            <div className='pl-12'>
                                                <div className='text-8xl font-bold text-[#2d5f4f]/10'>{feature.number}</div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Left Number Badge */}
                                            <div className='text-right pr-12'>
                                                <div className='text-8xl font-bold text-[#2d5f4f]/10'>{feature.number}</div>
                                            </div>
                                            {/* Right Content */}
                                            <div className='pl-12'>
                                                <div className='inline-block'>
                                                    <h3 className='text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-3'>
                                                        <div className='w-10 h-10 bg-gradient-to-br from-[#2d5f4f] to-[#3e7a70] rounded-full flex items-center justify-center text-white flex-shrink-0'>
                                                            {feature.icon}
                                                        </div>
                                                        <span>{feature.title}</span>
                                                    </h3>
                                                    <p className='text-gray-600'>{feature.description}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Mobile: Simple Stacked Layout */}
                                <div className='lg:hidden flex items-start space-x-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm'>
                                    <div className='w-12 h-12 bg-gradient-to-br from-[#2d5f4f] to-[#3e7a70] rounded-full flex items-center justify-center text-white flex-shrink-0'>
                                        {feature.icon}
                                    </div>
                                    <div className='flex-1'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-1'>{feature.title}</h3>
                                        <p className='text-sm text-gray-600'>{feature.description}</p>
                                    </div>
                                    <div className='text-4xl font-bold text-[#2d5f4f]/10'>{feature.number}</div>
                                </div>

                                {/* Center Dot Connector */}
                                <div className='hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-[#2d5f4f] to-[#d4a574] rounded-full border-4 border-white shadow-lg z-10'></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PuritySection
