import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const PuritySection = () => {
    const sectionRef = useRef(null)
    const leftRef = useRef(null)

    useEffect(() => {
        if (window.innerWidth < 1024) return

        let rafId = null
        let lastTop = null
        let lastBottom = null

        const update = () => {
            const section = sectionRef.current
            const left = leftRef.current
            if (!section || !left) return

            const { top, bottom } = section.getBoundingClientRect()
            if (top === lastTop && bottom === lastBottom) return
            lastTop = top
            lastBottom = bottom

            const offset = 96
            const leftH = left.offsetHeight

            if (top <= offset && bottom > leftH + offset) {
                left.style.transform = `translateY(${offset - top}px)`
            } else if (bottom <= leftH + offset) {
                left.style.transform = `translateY(${bottom - leftH - offset}px)`
            } else {
                left.style.transform = 'translateY(0)'
            }
        }

        const onScroll = () => {
            if (rafId) return
            rafId = requestAnimationFrame(() => {
                update()
                rafId = null
            })
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <section className='relative py-20 lg:py-24 bg-[#fdfbf7] text-[#1f2937]'>
            {/* Grain Overlay */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.05]' style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}}></div>

            {/* Static decorative glows — no animation to avoid main-thread layout work */}
            <div className='absolute top-20 right-0 w-[500px] h-[500px] bg-[#d4a574]/8 rounded-full blur-[100px] pointer-events-none'></div>
            <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2d5f4f]/8 rounded-full blur-[100px] pointer-events-none'></div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Quote Section - Minimalist Design */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='max-w-4xl mx-auto text-center mb-24'
                >
                    <div className='mb-8'>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='inline-block w-16 h-1 bg-gradient-to-r from-[#2d5f4f] to-[#d4a574] rounded-full'
                        ></motion.div>
                    </div>
                    <blockquote className='mb-8'>
                        <p className='text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0f1c18] leading-relaxed italic mb-6'>
                            "Nature does not hurry, yet everything is accomplished"
                        </p>
                        <footer className='text-[#d4a574] text-lg font-serif tracking-widest uppercase text-xs font-medium'>
                            — Ancient Wisdom
                        </footer>
                    </blockquote>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 64 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='inline-block w-16 h-1 bg-gradient-to-r from-[#d4a574] to-[#2d5f4f] rounded-full'
                    ></motion.div>
                </motion.div>

                {/* Sticky-left + scrolling-right section */}
                <div ref={sectionRef} className='lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start'>

                    {/* LEFT — JS-pinned (CSS sticky breaks inside Lenis) */}
                    <div ref={leftRef} className='mb-16 lg:mb-0'>
                        <p className='text-xs tracking-[0.3em] uppercase text-[#d4a574] font-sans mb-6'>
                            Why Ancient Health
                        </p>
                        <h2 className='text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0f1c18] leading-[1.05] mb-8'>
                            We don't{' '}
                            <span className='italic text-[#d4a574]'>manufacture</span>{' '}
                            wellness.{' '}
                            We <span className='italic text-[#d4a574]'>gather</span> it.
                        </h2>
                        <p className='text-[#0f1c18]/55 font-sans text-base leading-relaxed max-w-sm'>
                            Most wellness brands source from the same handful of distributors. We go further — literally. Here's what sets every Ancient Health product apart.
                        </p>
                    </div>

                    {/* RIGHT — scrolling points */}
                    <div className='space-y-0'>
                        {[
                            {
                                num: '01',
                                icon: (
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M5 3l7 4 7-4M5 3v14l7 4 7-4V3' />
                                    </svg>
                                ),
                                title: 'We climb for it.',
                                body: 'Our gatherers ascend to 16,000ft in the Garhwal Himalayas to collect herbs and resins at source — not from a wholesale market.',
                            },
                            {
                                num: '02',
                                icon: (
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' />
                                    </svg>
                                ),
                                title: 'Every batch, lab-tested.',
                                body: 'Heavy metals, microbial counts, potency — all verified by a third-party lab. Reports ship in every box and live on every product page.',
                            },
                            {
                                num: '03',
                                icon: (
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' />
                                    </svg>
                                ),
                                title: 'Nothing added, ever.',
                                body: 'No fillers, no flow agents, no synthetic preservatives. What you read on the label is everything inside the jar — nothing more.',
                            },
                            {
                                num: '04',
                                icon: (
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                                    </svg>
                                ),
                                title: 'Fair to the source.',
                                body: 'Local gatherers are paid well above the regional average. Their knowledge and livelihoods are what make every product possible.',
                            },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6, delay: idx * 0.05 }}
                                className='border-t border-[#0f1c18]/10 py-10 flex gap-6'
                            >
                                {/* Number */}
                                <span className='text-xs font-sans text-[#d4a574] tracking-widest pt-1 w-6 flex-shrink-0'>
                                    {item.num}
                                </span>

                                {/* Content */}
                                <div className='flex-1'>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <span className='text-[#d4a574]'>{item.icon}</span>
                                        <h3 className='font-serif text-xl text-[#0f1c18]'>{item.title}</h3>
                                    </div>
                                    <p className='text-[#0f1c18]/55 font-sans text-sm leading-relaxed'>
                                        {item.body}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                        {/* closing border */}
                        <div className='border-t border-[#0f1c18]/10'></div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default PuritySection
