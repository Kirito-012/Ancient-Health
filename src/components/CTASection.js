import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const pillars = [
    { num: '01', title: 'Gathered at altitude', sub: 'Garhwal Himalayas · 16,000ft' },
    { num: '02', title: 'Lab-verified purity', sub: 'Third-party tested, every batch' },
    { num: '03', title: 'Nothing added', sub: 'Zero fillers · zero synthetics' },
    { num: '04', title: 'Fair to the source', sub: 'Ethically paid gatherers' },
]

const CTASection = () => {
    return (
        <section className='relative bg-[#0f1c18] overflow-hidden'>
            {/* Grain */}
            <div className='absolute inset-0 pointer-events-none opacity-[0.03] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            {/* Top rule */}
            <div className='absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4a574]/30 to-transparent'></div>

            {/* ── Full-bleed display block ── */}
            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-0'>

                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className='text-[#d4a574] text-xs tracking-[0.35em] uppercase font-sans mb-6'
                >
                    Ancient Health · Est. 2024
                </motion.p>

                {/* Display headline — massive, full-width */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    className='mb-12'
                >
                    <h2 className='font-serif font-light text-white leading-[0.95] tracking-tight'
                        style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}>
                        Pure nature.
                        <br />
                        <span className='italic text-[#d4a574]'>Proven</span> science.
                    </h2>
                </motion.div>

                {/* CTA row — inline with rule */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className='flex items-center justify-between border-t border-white/[0.06] pt-8 pb-20 lg:pb-28'
                >
                    <p className='text-white/35 font-sans text-sm leading-relaxed max-w-xs hidden sm:block'>
                        Hand-harvested Himalayan botanicals,<br />
                        third-party tested and bottled pure.
                    </p>

                    <Link
                        to='/shop'
                        className='group ml-auto flex items-center gap-4 bg-[#d4a574] hover:bg-[#c49460] transition-colors duration-300 rounded-full pl-8 pr-5 py-4 cursor-pointer'
                    >
                        <span className='text-[#0f1c18] text-xs tracking-[0.25em] uppercase font-sans font-semibold whitespace-nowrap'>
                            Shop the Apothecary
                        </span>
                        <span className='w-8 h-8 rounded-full bg-[#0f1c18]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f1c18]/25 transition-colors duration-300'>
                            <ArrowUpRight className='w-4 h-4 text-[#0f1c18]' />
                        </span>
                    </Link>
                </motion.div>

            </div>

            {/* ── Pillars strip — dark bg with top border ── */}
            <div className='border-t border-white/[0.06]'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-2 lg:grid-cols-4'>
                        {pillars.map((p, idx) => (
                            <motion.div
                                key={p.num}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
                                className={`py-8 px-6 flex flex-col gap-2 ${idx < pillars.length - 1 ? 'border-r border-white/[0.06]' : ''} ${idx >= 2 ? 'border-t border-white/[0.06] lg:border-t-0' : ''}`}
                            >
                                <span className='text-[10px] font-sans text-[#d4a574] tracking-[0.3em]'>{p.num}</span>
                                <p className='font-serif text-white text-base leading-snug'>{p.title}</p>
                                <p className='text-white/30 font-sans text-xs leading-relaxed'>{p.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    )
}

export default CTASection
