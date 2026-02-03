import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <footer className='relative bg-gradient-to-b from-gray-50 to-white text-gray-900 overflow-hidden'>
            {/* Subtle Background Elements */}
            <div className='absolute inset-0'>
                <div className='absolute top-0 left-1/4 w-96 h-96 bg-[#2d5f4f]/3 rounded-full blur-3xl'></div>
                <div className='absolute bottom-0 right-1/4 w-80 h-80 bg-[#d4a574]/3 rounded-full blur-3xl'></div>
            </div>

            {/* Elegant Top Border */}
            <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent'></div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Main Footer Content */}
                <div className='py-16 lg:py-20'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8'>
                        {/* Brand Column - Wider */}
                        <div className='lg:col-span-4'>
                            <Link to='/' className='inline-block mb-6 group'>
                                <img src={logo} alt='Ancient Health' className='h-12 w-auto group-hover:scale-105 transition-transform duration-300' />
                            </Link>
                            <p className='text-gray-600 text-base leading-relaxed mb-8 max-w-sm'>
                                Bringing the ancient wisdom of the Himalayas to your wellness journey with pure, ethically sourced botanicals.
                            </p>

                            {/* Social Links */}
                            <div className='space-y-4'>
                                <p className='text-gray-500 text-xs uppercase tracking-wider font-semibold'>Follow Our Journey</p>
                                <div className='flex items-center space-x-3'>
                                    <a
                                        href='https://facebook.com'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='group relative w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200 hover:border-[#2d5f4f] hover:bg-[#2d5f4f] transition-all duration-300 hover:scale-110 shadow-sm'>
                                        <svg className='w-5 h-5 text-gray-600 group-hover:text-white transition-colors' fill='currentColor' viewBox='0 0 24 24'>
                                            <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                                        </svg>
                                    </a>
                                    <a
                                        href='https://instagram.com'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='group relative w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200 hover:border-[#2d5f4f] hover:bg-[#2d5f4f] transition-all duration-300 hover:scale-110 shadow-sm'>
                                        <svg className='w-5 h-5 text-gray-600 group-hover:text-white transition-colors' fill='currentColor' viewBox='0 0 24 24'>
                                            <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                                        </svg>
                                    </a>
                                    <a
                                        href='https://twitter.com'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='group relative w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200 hover:border-[#2d5f4f] hover:bg-[#2d5f4f] transition-all duration-300 hover:scale-110 shadow-sm'>
                                        <svg className='w-5 h-5 text-gray-600 group-hover:text-white transition-colors' fill='currentColor' viewBox='0 0 24 24'>
                                            <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                                        </svg>
                                    </a>
                                    <a
                                        href='https://linkedin.com'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='group relative w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200 hover:border-[#2d5f4f] hover:bg-[#2d5f4f] transition-all duration-300 hover:scale-110 shadow-sm'>
                                        <svg className='w-5 h-5 text-gray-600 group-hover:text-white transition-colors' fill='currentColor' viewBox='0 0 24 24'>
                                            <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className='lg:col-span-2'>
                            <h3 className='text-gray-900 font-bold text-sm uppercase tracking-wider mb-6 relative inline-block'>
                                Quick Links
                                <span className='absolute bottom-0 left-0 w-8 h-0.5 bg-[#2d5f4f]'></span>
                            </h3>
                            <ul className='space-y-3'>
                                <li>
                                    <Link to='/shop' className='text-gray-600 hover:text-[#2d5f4f] text-sm transition-all duration-200 inline-flex items-center group'>
                                        <span className='w-0 group-hover:w-2 h-px bg-[#2d5f4f] transition-all duration-200 mr-0 group-hover:mr-2'></span>
                                        Shop All
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/about' className='text-gray-600 hover:text-[#2d5f4f] text-sm transition-all duration-200 inline-flex items-center group'>
                                        <span className='w-0 group-hover:w-2 h-px bg-[#2d5f4f] transition-all duration-200 mr-0 group-hover:mr-2'></span>
                                        Our Story
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/blog' className='text-gray-600 hover:text-[#2d5f4f] text-sm transition-all duration-200 inline-flex items-center group'>
                                        <span className='w-0 group-hover:w-2 h-px bg-[#2d5f4f] transition-all duration-200 mr-0 group-hover:mr-2'></span>
                                        Wellness Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/contact' className='text-gray-600 hover:text-[#2d5f4f] text-sm transition-all duration-200 inline-flex items-center group'>
                                        <span className='w-0 group-hover:w-2 h-px bg-[#2d5f4f] transition-all duration-200 mr-0 group-hover:mr-2'></span>
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className='lg:col-span-3'>
                            <h3 className='text-gray-900 font-bold text-sm uppercase tracking-wider mb-6 relative inline-block'>
                                Customer Care
                                <span className='absolute bottom-0 left-0 w-8 h-0.5 bg-[#2d5f4f]'></span>
                            </h3>
                            <ul className='space-y-3'>
                                <li>
                                    <Link to='/faq' className='text-gray-600 hover:text-[#2d5f4f] text-sm transition-all duration-200 inline-flex items-center group'>
                                        <span className='w-0 group-hover:w-2 h-px bg-[#2d5f4f] transition-all duration-200 mr-0 group-hover:mr-2'></span>
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/shipping' className='text-gray-600 hover:text-[#2d5f4f] text-sm transition-all duration-200 inline-flex items-center group'>
                                        <span className='w-0 group-hover:w-2 h-px bg-[#2d5f4f] transition-all duration-200 mr-0 group-hover:mr-2'></span>
                                        Shipping & Delivery
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/returns' className='text-gray-600 hover:text-[#2d5f4f] text-sm transition-all duration-200 inline-flex items-center group'>
                                        <span className='w-0 group-hover:w-2 h-px bg-[#2d5f4f] transition-all duration-200 mr-0 group-hover:mr-2'></span>
                                        Returns & Refunds
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/track' className='text-gray-600 hover:text-[#2d5f4f] text-sm transition-all duration-200 inline-flex items-center group'>
                                        <span className='w-0 group-hover:w-2 h-px bg-[#2d5f4f] transition-all duration-200 mr-0 group-hover:mr-2'></span>
                                        Track Order
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className='lg:col-span-3'>
                            <h3 className='text-gray-900 font-bold text-sm uppercase tracking-wider mb-6 relative inline-block'>
                                Contact
                                <span className='absolute bottom-0 left-0 w-8 h-0.5 bg-[#2d5f4f]'></span>
                            </h3>
                            <ul className='space-y-4'>
                                <li className='flex items-start space-x-3 group'>
                                    <div className='w-9 h-9 bg-[#2d5f4f]/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2d5f4f]/10 transition-colors'>
                                        <svg className='w-4 h-4 text-[#2d5f4f]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className='text-gray-900 text-sm font-medium mb-0.5'>Our Location</p>
                                        <p className='text-gray-500 text-xs leading-relaxed'>
                                            Himalayan Region, India
                                        </p>
                                    </div>
                                </li>
                                <li className='flex items-start space-x-3 group'>
                                    <div className='w-9 h-9 bg-[#2d5f4f]/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2d5f4f]/10 transition-colors'>
                                        <svg className='w-4 h-4 text-[#2d5f4f]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className='text-gray-900 text-sm font-medium mb-0.5'>Email Us</p>
                                        <a href='mailto:hello@ancienthealth.com' className='text-gray-500 hover:text-[#2d5f4f] text-xs transition-colors'>
                                            hello@ancienthealth.com
                                        </a>
                                    </div>
                                </li>
                                <li className='flex items-start space-x-3 group'>
                                    <div className='w-9 h-9 bg-[#2d5f4f]/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2d5f4f]/10 transition-colors'>
                                        <svg className='w-4 h-4 text-[#2d5f4f]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className='text-gray-900 text-sm font-medium mb-0.5'>Call Us</p>
                                        <a href='tel:+911234567890' className='text-gray-500 hover:text-[#2d5f4f] text-xs transition-colors'>
                                            +91 123 456 7890
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='border-t border-gray-200 py-8'>
                    <div className='flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0'>
                        <div className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6'>
                            <p className='text-gray-500 text-sm'>
                                © {new Date().getFullYear()} Ancient Health. All rights reserved.
                            </p>
                            <div className='flex items-center space-x-4 text-gray-400 text-xs'>
                                <span className='flex items-center space-x-1.5'>
                                    <svg className='w-3.5 h-3.5 text-[#2d5f4f]' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                    </svg>
                                    <span>100% Secure</span>
                                </span>
                                <span className='flex items-center space-x-1.5'>
                                    <svg className='w-3.5 h-3.5 text-[#2d5f4f]' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                    </svg>
                                    <span>Certified Organic</span>
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center space-x-6'>
                            <Link to='/terms' className='text-gray-500 hover:text-[#2d5f4f] text-sm transition-colors'>
                                Terms
                            </Link>
                            <Link to='/privacy' className='text-gray-500 hover:text-[#2d5f4f] text-sm transition-colors'>
                                Privacy
                            </Link>
                            <Link to='/sitemap' className='text-gray-500 hover:text-[#2d5f4f] text-sm transition-colors'>
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
