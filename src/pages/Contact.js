import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'
import { toast } from 'react-toastify'
import { Mail, MapPin, Instagram, Twitter, Linkedin, Send } from 'lucide-react'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
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
                        <span className='block text-[#d4a574] text-sm md:text-base tracking-[0.3em] uppercase mb-6'>The Sanctuary</span>
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
                            <div className='lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center'>
                                <form onSubmit={handleSubmit} className='space-y-12'>
                                    <div className='grid md:grid-cols-2 gap-10'>
                                        <div className='group relative'>
                                            <input
                                                type='text'
                                                name='name'
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className='block w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-transparent focus:border-[#d4a574] focus:outline-none transition-all duration-300 peer'
                                                placeholder='Name'
                                            />
                                            <label className='absolute left-0 top-4 text-white/40 text-lg transition-all duration-300 peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#d4a574] peer-active:-top-4 peer-active:text-xs peer-valid:-top-4 peer-valid:text-xs peer-valid:text-[#d4a574] pointer-events-none'>
                                                Your Name
                                            </label>
                                            <div className='absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4a574] transition-all duration-500 group-hover:w-full peer-focus:w-full'></div>
                                        </div>

                                        <div className='group relative'>
                                            <input
                                                type='email'
                                                name='email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className='block w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-transparent focus:border-[#d4a574] focus:outline-none transition-all duration-300 peer'
                                                placeholder='Email'
                                            />
                                            <label className='absolute left-0 top-4 text-white/40 text-lg transition-all duration-300 peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#d4a574] peer-active:-top-4 peer-active:text-xs peer-valid:-top-4 peer-valid:text-xs peer-valid:text-[#d4a574] pointer-events-none'>
                                                Email Address
                                            </label>
                                            <div className='absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4a574] transition-all duration-500 group-hover:w-full peer-focus:w-full'></div>
                                        </div>
                                    </div>

                                    <div className='group relative'>
                                        <textarea
                                            name='message'
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows='1'
                                            className='block w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-transparent focus:border-[#d4a574] focus:outline-none transition-all duration-300 peer resize-none min-h-[100px]'
                                            placeholder='Message'
                                            onInput={(e) => {
                                                e.target.style.height = 'auto';
                                                e.target.style.height = e.target.scrollHeight + 'px';
                                            }}
                                        ></textarea>
                                        <label className='absolute left-0 top-4 text-white/40 text-lg transition-all duration-300 peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#d4a574] peer-active:-top-4 peer-active:text-xs peer-valid:-top-4 peer-valid:text-xs peer-valid:text-[#d4a574] pointer-events-none'>
                                            Tell us your story
                                        </label>
                                        <div className='absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4a574] transition-all duration-500 group-hover:w-full peer-focus:w-full'></div>
                                    </div>

                                    <div className='pt-8 flex justify-end'>
                                        <button
                                            type='submit'
                                            disabled={isSubmitting}
                                            className='group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-[#d4a574]/30'
                                        >
                                            <div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
                                            <span className='relative z-10 flex items-center space-x-3'>
                                                <span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
                                                    {isSubmitting ? 'Sending...' : 'Send Raven'}
                                                </span>
                                                <Send className="w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </span>
                                        </button>
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
                    {[
                        { q: "Origins of Ingredients", a: "Sourced directly from the untouched valleys of the Himalayas, ensuring absolute purity." },
                        { q: "Shipping Globally", a: "We traverse borders. Shipping is available to most nations worldwide." },
                        { q: "Purity Guarantee", a: "100% organic, tested, and verified. Nothing artificial enters our sanctuary." }
                    ].map((item, i) => (
                        <div key={i} className='group border-b border-white/10'>
                            <details className='group'>
                                <summary className='flex justify-between items-center py-8 cursor-pointer list-none'>
                                    <span className='text-xl text-white/80 font-light group-hover:text-[#d4a574] transition-colors'>{item.q}</span>
                                    <span className='text-white/40 group-hover:text-[#d4a574] transition-transform duration-300 group-open:rotate-45 text-2xl font-thin'>+</span>
                                </summary>
                                <div className='pb-8 text-white/50 leading-relaxed font-light'>
                                    {item.a}
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Contact
