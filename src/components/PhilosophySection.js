import React, { useRef } from 'react'
// eslint-disable-next-line
import { motion, useScroll, useTransform } from 'framer-motion'

const philosophyContent = [
    {
        title: "Origins",
        heading: "Born from the Earth",
        text: "Our journey begins where the air is thin and the earth is pure. High in the Himalayas, nature has preserved its most potent secrets for millennia. We don't just source ingredients; we honor the ancient soil that births them.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop" // Reliable Foggy Mountains
    },
    {
        title: "Ritual",
        heading: "The Art of Preparation",
        text: "True wellness is a slow process. We reject industrial shortcuts in favor of traditional methods—sun-drying, stone-grinding, and hand-blending. Every jar is a testament to patience, ensuring that the vital energy (Prana) of the herb remains intact.",
        image: "https://images.pexels.com/photos/5480239/pexels-photo-5480239.jpeg" // Reliable Dark Herbs/Mortar (Previous high quality one)
    },
    {
        title: "Harmony",
        heading: "Balance Within",
        text: "We believe the body is a microcosm of the universe. Our formulations are designed not just to treat symptoms, but to restore elemental balance. It is a dialogue between nature and your inner self, guiding you back to a state of wholeness.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop" // Golden hour/Meditation/Serenity (Updated to be more appropriate than texture)
    }
]

const PhilosophySection = () => {
    const containerRef = useRef(null)
    // eslint-disable-next-line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    return (
        <section ref={containerRef} className="relative bg-[#0f1c18]">
            {philosophyContent.map((item, index) => (
                <PhilosophyBlock key={index} item={item} index={index} total={philosophyContent.length} />
            ))}
        </section>
    )
}

const PhilosophyBlock = ({ item, index, total }) => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image Parallax/Fixed */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#0f1c18]/40 z-10"></div> {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c18] via-transparent to-[#0f1c18] z-20"></div>
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-60"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-30 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

                {/* Text Content - Alternating sides for visual interest */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2 lg:row-start-1' : ''}`}
                >
                    <div className="flex items-center gap-4">
                        <span className="text-[#d4a574] font-serif text-lg italic">0{index + 1}</span>
                        <div className="h-[1px] w-12 bg-[#d4a574]/50"></div>
                        <span className="text-white/60 uppercase tracking-[0.3em] text-xs font-medium">{item.title}</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-serif text-[#e8e6e3] leading-tight">
                        {item.heading}
                    </h2>

                    <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-lg">
                        {item.text}
                    </p>
                </motion.div>

                {/* Empty column for spacing in alternating layout */}
                <div></div>
            </div>
        </div>
    )
}

export default PhilosophySection
