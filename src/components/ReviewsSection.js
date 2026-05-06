import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
    {
        initial: 'P',
        name: 'Priya M.',
        location: 'Mumbai',
        verified: true,
        time: '2 weeks ago',
        product: 'AYURVEDIC HERBAL SOAP',
        title: 'My morning routine, transformed.',
        body: 'Three weeks in and my skin has never felt cleaner — no harsh chemicals, no residue. The lab report in the box sealed the deal for me. Worth every rupee.',
    },
    {
        initial: 'A',
        name: 'Arjun K.',
        location: 'Bangalore',
        verified: true,
        time: '1 month ago',
        product: 'RAW FOREST HONEY',
        title: 'You can taste the difference.',
        body: 'Tried four other "raw" honeys before this. Ancient Health is the only one that crystallised properly and tastes like actual flowers. Worth every rupee.',
    },
    {
        initial: 'R',
        name: 'Rhea S.',
        location: 'Delhi',
        verified: true,
        time: '3 weeks ago',
        product: 'HERBAL WELLNESS TEA',
        title: 'Finally sleeping deeply again.',
        body: 'I was skeptical of herbal teas — but after a week of the Herbal Wellness Tea before bed, I\'m falling asleep without a screen. Subtle, but real.',
    },
]

const ReviewsSection = () => {
    return (
        <section className='relative bg-[#0f1c18] text-[#e8e6e3] py-24 lg:py-32 overflow-hidden'>
            {/* Grain */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.03] z-10 bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            <div className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className='text-center mb-16'
                >
                    <p className='text-xs tracking-[0.35em] uppercase text-[#d4a574] font-sans mb-6'>
                        What Our Circle Says
                    </p>

                    {/* Big number headline */}
                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-6'>
                        <span className='text-[#d4a574] italic'>2,847</span>
                        <span className='text-white font-light'> verified reviews.</span>
                    </h2>

                    {/* Stars + rating */}
                    <div className='flex items-center justify-center gap-2'>
                        <div className='flex items-center gap-0.5'>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className='w-3.5 h-3.5 fill-[#d4a574] text-[#d4a574]' />
                            ))}
                        </div>
                        <span className='text-white font-serif text-sm'>4.9 / 5</span>
                        <span className='text-white/20 text-xs'>|</span>
                        <span className='text-white/40 text-xs font-sans'>Across all products</span>
                    </div>
                </motion.div>

                {/* Review cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className='relative bg-[#162923]/60 border border-white/10 rounded-2xl p-7 flex flex-col justify-between'
                        >
                            {/* Top row: stars + quote mark */}
                            <div className='flex items-start justify-between mb-5'>
                                <div className='flex items-center gap-0.5'>
                                    {[...Array(5)].map((_, s) => (
                                        <Star key={s} className='w-3.5 h-3.5 fill-[#d4a574] text-[#d4a574]' />
                                    ))}
                                </div>
                                <span className='text-[#d4a574]/20 font-serif text-4xl leading-none select-none'>"</span>
                            </div>

                            {/* Review text */}
                            <div className='flex-1 mb-6'>
                                <h3 className='font-serif text-white text-lg mb-3 leading-snug'>
                                    {review.title}
                                </h3>
                                <p className='text-white/45 text-sm font-sans leading-relaxed'>
                                    {review.body}
                                </p>
                            </div>

                            {/* Footer: avatar + name + product */}
                            <div className='flex items-center justify-between pt-5 border-t border-white/10'>
                                <div className='flex items-center gap-3'>
                                    {/* Avatar */}
                                    <div className='w-9 h-9 rounded-full bg-[#d4a574] flex items-center justify-center flex-shrink-0'>
                                        <span className='text-[#0f1c18] text-xs font-sans font-medium'>{review.initial}</span>
                                    </div>
                                    <div>
                                        <p className='text-white/80 text-sm font-sans font-medium leading-none mb-0.5'>
                                            {review.name}
                                            <span className='text-white/30 font-normal'> · {review.location}</span>
                                        </p>
                                        <div className='flex items-center gap-1.5'>
                                            {/* Verified check */}
                                            <svg className='w-3 h-3 text-[#d4a574]' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                            </svg>
                                            <span className='text-white/30 text-[11px] font-sans'>Verified · {review.time}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Product tag */}
                                <span className='text-[9px] tracking-[0.15em] uppercase text-[#d4a574] font-sans text-right leading-tight max-w-[80px]'>
                                    {review.product}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default ReviewsSection
