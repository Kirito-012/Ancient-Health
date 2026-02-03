import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/logo.png"
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Wellness', path: '/wellness' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'hidden'
                }`}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-20 lg:h-24'>
                    {/* Logo */}
                    <Link
                        to='/'
                        className='flex items-center space-x-3 group'>
                        <div className='relative'>
                            <img
                                src={logo}
                                alt='Ancient Health'
                                className='h-12 lg:h-16 w-auto transition-transform duration-300 group-hover:scale-105'
                            />
                            <div className='absolute -inset-2 bg-gradient-to-r from-[#2d5f4f]/20 to-[#3e7a70]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex items-center space-x-1'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 group ${isScrolled
                                    ? 'text-gray-700 hover:text-[#2d5f4f]'
                                    : 'text-white hover:text-[#d4a574]'
                                    }`}>
                                <span className='relative z-10'>{link.name}</span>
                                <div className='absolute inset-0 bg-gradient-to-r from-[#2d5f4f]/10 to-[#3e7a70]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                <div
                                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 transition-all duration-300 ${isScrolled ? 'bg-[#2d5f4f]' : 'bg-[#d4a574]'
                                        }`}></div>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className='hidden lg:flex items-center space-x-4'>
                        {/* Search Icon */}
                        <button
                            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isScrolled
                                ? 'text-gray-700 hover:bg-gray-100'
                                : 'text-white hover:bg-white/10'
                                }`}>
                            <svg
                                className='w-5 h-5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                />
                            </svg>
                        </button>

                        {/* Cart Icon with Badge */}
                        <button
                            className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 ${isScrolled
                                ? 'text-gray-700 hover:bg-gray-100'
                                : 'text-white hover:bg-white/10'
                                }`}>
                            <svg
                                className='w-5 h-5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                                />
                            </svg>
                            <span className='absolute -top-1 -right-1 bg-[#d4a574] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                                0
                            </span>
                        </button>

                        {/* CTA Button */}
                        <Link
                            to='/shop'
                            className='relative px-6 py-2.5 bg-gradient-to-r from-[#2d5f4f] to-[#3e7a70] text-white font-medium rounded-full overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#2d5f4f]/30'>
                            <span className='relative z-10'>Shop Collection</span>
                            <div className='absolute inset-0 bg-gradient-to-r from-[#1e4035] to-[#2d5f4f] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-white hover:bg-white/10'
                            }`}>
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            ) : (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                    ? 'max-h-screen opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                <div className='bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg'>
                    <div className='px-4 py-6 space-y-3'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className='block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gradient-to-r hover:from-[#2d5f4f]/10 hover:to-[#3e7a70]/10 hover:text-[#2d5f4f] transition-all duration-300'>
                                {link.name}
                            </Link>
                        ))}
                        <div className='pt-4 border-t border-gray-200 space-y-3'>
                            <button className='w-full px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-between'>
                                <span>Search</span>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                    />
                                </svg>
                            </button>
                            <button className='w-full px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-between'>
                                <span>Cart</span>
                                <div className='flex items-center space-x-2'>
                                    <span className='bg-[#d4a574] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                                        0
                                    </span>
                                    <svg
                                        className='w-5 h-5'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                                        />
                                    </svg>
                                </div>
                            </button>
                            <Link
                                to='/shop'
                                onClick={() => setIsMobileMenuOpen(false)}
                                className='block w-full px-4 py-3 bg-gradient-to-r from-[#2d5f4f] to-[#3e7a70] text-white font-medium rounded-lg text-center hover:shadow-lg transition-all duration-300'>
                                Shop Collection
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
