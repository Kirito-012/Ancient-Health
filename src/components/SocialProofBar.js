import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Leaf, MountainSnow, Award, Truck } from 'lucide-react'

const stats = [
    {
        icon: ShieldCheck,
        title: '3rd-Party Lab Tested',
        subtitle: 'Heavy metals, microbes, potency',
    },
    {
        icon: Leaf,
        title: '100% Organic',
        subtitle: 'No fillers, no synthetics',
    },
    {
        icon: MountainSnow,
        title: 'Sourced at 16,000ft',
        subtitle: 'Garhwal & Spiti, India',
    },
    {
        icon: Award,
        title: 'GMP Certified',
        subtitle: 'FSSAI · USDA · India Organic',
    },
    {
        icon: Truck,
        title: 'Free Shipping',
        subtitle: 'On orders over ₹499',
    },
]

const SocialProofBar = () => {
    return (
        <div className='bg-[#0d1a15] border-t border-white/5'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 items-start'>
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                            className={`flex items-start gap-2.5 ${idx === 4 ? 'col-span-2 sm:col-span-1 justify-center sm:justify-start' : ''}`}
                        >
                            {/* Icon circle */}
                            <div className='flex-shrink-0 w-8 h-8 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center'>
                                <stat.icon className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4a574]' strokeWidth={1.5} />
                            </div>

                            {/* Text */}
                            <div>
                                <p className='text-white/90 text-xs sm:text-sm font-sans font-medium leading-snug'>{stat.title}</p>
                                <p className='text-white/35 text-[11px] sm:text-xs font-sans mt-0.5 leading-snug'>{stat.subtitle}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SocialProofBar
