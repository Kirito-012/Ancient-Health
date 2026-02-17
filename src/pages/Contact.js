import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { Mail, MapPin, Instagram, Twitter, Linkedin, Send } from 'lucide-react'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [openFaqIndex, setOpenFaqIndex] = useState(null)
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
            toast.success('Your message has been received.')
            setFormData({ name: '', email: '', message: '' })
        }, 1500)
    }

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index)
    }

    const faqData = [
        { q: "Origins of Ingredients", a: "Sourced directly from the untouched valleys of the Himalayas, ensuring absolute purity. Our gathering process respects ancient traditions and sustainable practices." },
        { q: "Shipping Globally", a: "We traverse borders. Shipping is available to most nations worldwide with express delivery options. Standard shipping takes 5-7 business days, while express delivery arrives in 2-3 days." },
        { q: "Purity Guarantee", a: "100% organic, tested, and verified. Nothing artificial enters our sanctuary. Each batch undergoes rigorous testing by third-party laboratories to ensure the highest quality standards." },
        { q: "Product Certifications", a: "All our products are certified organic, non-GMO, and cruelty-free. We hold certifications from leading international organic certification bodies." },
        { q: "Return Policy", a: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, return it for a full refund or exchange. Products must be unopened and in original condition." },
        { q: "Consultation Services", a: "Free wellness consultations are available with every purchase. Our Ayurvedic practitioners can help you choose the right products for your specific needs and goals." },
        { q: "Wholesale Opportunities", a: "We partner with select retailers and wellness centers. Contact us for wholesale pricing and partnership opportunities. Minimum order quantities apply." }
    ]

    return (
        <div className='min-h-screen bg-[#0f1c18] text-[#e8e6e3] font-sans selection:bg-[#d4a574] selection:text-[#0f1c18] overflow-hidden'>
            <Navbar />

            {/* Grain Overlay */}
            <div className='fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

            {/* Immersive Hero */}
            <section className='relative h-screen flex items-center justify-center overflow-hidden'>
                <div className='absolute inset-0 z-0'>
                    <div className='absolute inset-0 bg-gradient-to-b from-[#0f1c18]/30 via-[#0f1c18]/60 to-[#0f1c18] z-10'></div>
                    <motion.div style={{ y: y1 }} className='absolute inset-0'>
                        {/* Placeholder for a high-quality, dark, moody nature image */}
                        <img
                            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop"
                            alt="Misty Forest"
                            className="w-full h-full object-cover opacity-60 scale-110"
                        />
                    </motion.div>
                </div>

                <div className='relative z-20 text-center px-4 max-w-4xl mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <div className='mb-6'>
                            <span className='inline-block text-[#d4a574] text-sm tracking-[0.3em] uppercase border border-[#d4a574]/30 px-5 py-2 rounded-full backdrop-blur-sm'>
                                The Sanctuary
                            </span>
                        </div>
                        <h1 className='text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight mb-8 text-white'>
                            Connection
                        </h1>
                        <p className='text-lg md:text-xl text-white/70 font-light max-w-xl mx-auto leading-relaxed'>
                            We invite you to pause, breathe, and reach out. Whether for guidance or simply to share your journey, our doors are open.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area - Editorial Layout */}
            <div className='relative z-10 py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>

                {/* Rotating Golden Orb Halo */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#d4a574]/10 via-[#8c6a46]/5 to-transparent rounded-full blur-[120px] animate-spin-slow pointer-events-none z-0'></div>

                {/* Editorial Card Component */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className='relative z-10'
                >
                    {/* Card Container */}
                    <div className='relative bg-[#0f1c18]/60 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl'>
                        {/* Internal Grain Texture */}
                        <div className='absolute inset-0 opacity-[0.05] pointer-events-none bg-[url("https://grainy-gradients.vercel.app/noise.svg")] z-0'></div>

                        {/* Decorative Top Line */}
                        <div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4a574]/50 to-transparent z-10'></div>

                        <div className='grid lg:grid-cols-12 min-h-[600px] relative z-10'>

                            {/* LEFT COLUMN: Context & Info (Span 5) */}
                            <div className='lg:col-span-5 p-10 lg:p-16 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.01]'>
                                <div>
                                    <span className='inline-block text-[#d4a574] text-xs tracking-[0.3em] uppercase mb-6 border border-[#d4a574]/30 px-4 py-2 rounded-full'>Contact</span>
                                    <h2 className='text-4xl md:text-5xl font-serif text-white mb-6 leading-tight'>
                                        Start a <br /> Conversation
                                    </h2>
                                    <p className='text-white/60 font-light leading-relaxed max-w-md'>
                                        Whether you seek guidance on our elixirs or wish to share your journey, our sanctuary is open.
                                    </p>
                                </div>

                                <div className='mt-12 space-y-8'>
                                    <div className='flex items-start space-x-4 group'>
                                        <div className='p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#d4a574]/40 transition-colors'>
                                            <MapPin className="w-5 h-5 text-white/70 group-hover:text-[#d4a574] transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className='text-white text-sm font-medium uppercase tracking-widest mb-1'>Studio</h4>
                                            <p className='text-white/50 text-sm font-light'>123 Wellness Way, Himalaya City</p>
                                        </div>
                                    </div>

                                    <div className='flex items-start space-x-4 group'>
                                        <div className='p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#d4a574]/40 transition-colors'>
                                            <Mail className="w-5 h-5 text-white/70 group-hover:text-[#d4a574] transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className='text-white text-sm font-medium uppercase tracking-widest mb-1'>Digital</h4>
                                            <p className='text-white/50 text-sm font-light'>support@ancienthealth.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-12 pt-8 border-t border-white/10'>
                                    <div className='flex space-x-6'>
                                        <button className='text-white/40 hover:text-[#d4a574] transition-colors'><Instagram className="w-5 h-5" /></button>
                                        <button className='text-white/40 hover:text-[#d4a574] transition-colors'><Twitter className="w-5 h-5" /></button>
                                        <button className='text-white/40 hover:text-[#d4a574] transition-colors'><Linkedin className="w-5 h-5" /></button>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: The Form (Span 7) */}
                            <div className='lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-white/[0.05]'>
                                <form onSubmit={handleSubmit} className='space-y-8'>
                                    {/* Name & Email Row */}
                                    <div className='grid md:grid-cols-2 gap-6'>
                                        {/* Name Field */}
                                        <div className='group relative'>
                                            <input
                                                type='text'
                                                name='name'
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className='block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pt-6 text-base text-white placeholder-transparent focus:border-[#d4a574]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all duration-300 peer'
                                                placeholder='Full Name'
                                            />
                                            <label className='absolute left-5 top-4 text-white/40 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#d4a574] peer-focus:tracking-wider peer-valid:top-1.5 peer-valid:text-[10px] peer-valid:text-[#d4a574]/70 peer-valid:tracking-wider pointer-events-none uppercase'>
                                                Full Name
                                            </label>
                                        </div>

                                        {/* Email Field */}
                                        <div className='group relative'>
                                            <input
                                                type='email'
                                                name='email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className='block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pt-6 text-base text-white placeholder-transparent focus:border-[#d4a574]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all duration-300 peer'
                                                placeholder='Email Address'
                                            />
                                            <label className='absolute left-5 top-4 text-white/40 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#d4a574] peer-focus:tracking-wider peer-valid:top-1.5 peer-valid:text-[10px] peer-valid:text-[#d4a574]/70 peer-valid:tracking-wider pointer-events-none uppercase'>
                                                Email Address
                                            </label>
                                        </div>
                                    </div>

                                    {/* Message Field */}
                                    <div className='group relative'>
                                        <textarea
                                            name='message'
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows='6'
                                            className='block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pt-6 text-base text-white placeholder-transparent focus:border-[#d4a574]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#d4a574]/20 transition-all duration-300 resize-none peer'
                                            placeholder='Your Message'
                                        ></textarea>
                                        <label className='absolute left-5 top-4 text-white/40 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#d4a574] peer-focus:tracking-wider peer-valid:top-1.5 peer-valid:text-[10px] peer-valid:text-[#d4a574]/70 peer-valid:tracking-wider pointer-events-none uppercase'>
                                            Your Message
                                        </label>
                                        {/* Character hint */}
                                        <div className='mt-2 text-right'>
                                            <span className='text-xs text-white/30'>{formData.message.length} characters</span>
                                        </div>
                                    </div>

                                    {/* Info Cards */}
                                    <div className='grid md:grid-cols-2 gap-4 pt-4'>
                                        <div className='flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl'>
                                            <div className='mt-0.5'>
                                                <svg className='w-5 h-5 text-[#d4a574]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className='text-white text-sm font-medium mb-0.5'>Response Time</h4>
                                                <p className='text-white/50 text-xs font-light'>We typically respond within 24 hours</p>
                                            </div>
                                        </div>

                                        <div className='flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl'>
                                            <div className='mt-0.5'>
                                                <svg className='w-5 h-5 text-[#d4a574]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className='text-white text-sm font-medium mb-0.5'>Privacy First</h4>
                                                <p className='text-white/50 text-xs font-light'>Your data is encrypted and secure</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className='pt-6'>
                                        <button
                                            type='submit'
                                            disabled={isSubmitting}
                                            className='group relative w-full bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-[#d4a574]/30 disabled:opacity-50 disabled:cursor-not-allowed'
                                        >
                                            {/* Sliding Background */}
                                            <div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>

                                            {/* Content */}
                                            <span className='relative z-10 flex items-center justify-center space-x-3 px-10 py-4'>
                                                <span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
                                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                                </span>
                                                <Send className="w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-all duration-500 transform group-hover:translate-x-1" />
                                            </span>
                                        </button>

                                        {/* Additional Info */}
                                        <p className='text-center text-xs text-white/40 mt-4 font-light'>
                                            By submitting, you agree to our communication terms
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Aesthetic FAQ Divider */}
            <div className='w-full h-[1px] bg-white/10 max-w-7xl mx-auto'></div>

            {/* Minimalist FAQ */}
            <section className='py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className='mb-16'
                >
                    <h2 className='text-3xl md:text-4xl font-serif text-white text-center'>Common Queries</h2>
                </motion.div>

                <div className='space-y-0'>
                    {faqData.map((item, i) => (
                        <motion.div
                            key={i}
                            className='border-b border-white/10'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <button
                                onClick={() => toggleFaq(i)}
                                className='w-full flex justify-between items-center py-8 cursor-pointer text-left group'
                            >
                                <span className='text-xl text-white/80 font-light group-hover:text-[#d4a574] transition-colors'>{item.q}</span>
                                <motion.span
                                    animate={{ rotate: openFaqIndex === i ? 45 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='text-white/40 group-hover:text-[#d4a574] transition-colors text-2xl font-thin'
                                >
                                    +
                                </motion.span>
                            </button>

                            <AnimatePresence initial={false}>
                                {openFaqIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        className='overflow-hidden'
                                    >
                                        <div className='pb-8 text-white/50 leading-relaxed font-light pr-8'>
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Contact
