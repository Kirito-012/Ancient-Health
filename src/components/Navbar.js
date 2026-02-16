import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from "../assets/logo.png"
import { useCart } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, ShoppingBag, Search, Menu, X, ChevronRight } from 'lucide-react'

const Navbar = () => {
    const { cart, token, logout } = useCart()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const location = useLocation()


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30) // Trigger slightly later for better feel
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileOpen && !event.target.closest('.profile-dropdown-container')) {
                setIsProfileOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isProfileOpen])

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Wellness', path: '/wellness' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none">
            <motion.nav
                initial={false}
                animate={isScrolled ? {
                    width: '85%',
                    maxWidth: '1000px',
                    y: 20,
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(15, 28, 24, 0.85)',
                    backdropFilter: 'blur(24px)', // Heaviest blur for iOS glass feel
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                } : {
                    width: '100%',
                    maxWidth: '100%',
                    y: 0,
                    borderRadius: '0px',
                    backgroundColor: 'rgba(15, 28, 24, 0)', // Transparent
                    backdropFilter: 'blur(0px)',
                    boxShadow: 'none'
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // iOS-like spring ease
                className={`
                    pointer-events-auto
                    relative 
                    border border-transparent
                    ${isScrolled ? 'border-white/10' : ''}
                `}
            >
                <div className={`mx-auto px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20 lg:h-24'}`}>
                    <div className='relative flex items-center justify-between h-full'>

                        {/* Mobile Menu Button - Left */}
                        <div className='flex lg:hidden flex-1 justify-start'>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className='p-2 text-white/90 hover:text-[#d4a574] transition-colors'
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>

                        {/* Desktop Navigation - Left */}
                        <div className='hidden lg:flex flex-1 items-center justify-start space-x-1'>
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`
                                            relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full
                                            ${isActive
                                                ? 'text-[#d4a574] bg-white/5'
                                                : 'text-white/80 hover:text-white hover:bg-white/5'
                                            }
                                        `}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Logo - Absolute Center */}
                        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                            <Link to='/' className='block group'>
                                <div className='relative flex items-center justify-center'>
                                    <img
                                        src={logo}
                                        alt='Ancient Health'
                                        className={`w-auto transition-all duration-500 filter brightness-110 ${isScrolled ? 'h-8 lg:h-9' : 'h-10 lg:h-14'}`}
                                    />
                                    {/* Subtle Glow behind logo */}
                                    <div className='absolute -inset-4 bg-[#d4a574]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                                </div>
                            </Link>
                        </div>

                        {/* Right Side Actions - Right */}
                        <div className='flex flex-1 items-center justify-end space-x-2 lg:space-x-4'>
                            {/* Search - Desktop Only */}
                            <button className='hidden lg:flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300'>
                                <Search className="w-4 h-4" />
                            </button>

                            {/* Profile Dropdown */}
                            {token ? (
                                <div className="relative profile-dropdown-container hidden lg:block">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className='flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300'
                                    >
                                        <User className="w-4 h-4" />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-56 bg-[#162923]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden"
                                            >
                                                <div className="px-4 py-3 border-b border-white/5">
                                                    <p className="text-[10px] text-[#d4a574] uppercase tracking-widest font-bold">Account</p>
                                                </div>
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5 transition-colors"
                                                >
                                                    My Profile
                                                </Link>
                                                <Link
                                                    to="/my-orders"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5 transition-colors"
                                                >
                                                    My Orders
                                                </Link>
                                                <div className="border-t border-white/5 mt-1 pt-1">
                                                    <button
                                                        onClick={() => {
                                                            logout();
                                                            setIsProfileOpen(false);
                                                        }}
                                                        className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors flex items-center space-x-2"
                                                    >
                                                        <LogOut className="w-3 h-3" />
                                                        <span>Logout</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link to='/login' className='hidden lg:block px-4 py-2 text-xs font-bold text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all tracking-wide uppercase'>
                                    Login
                                </Link>
                            )}

                            {/* Cart */}
                            <Link to='/cart' className='group relative flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300'>
                                <ShoppingBag className="w-4 h-4" />
                                {cart?.totalItems > 0 && (
                                    <span className='absolute top-2 right-2 bg-[#d4a574] text-[#0f1c18] text-[8px] font-bold rounded-full h-3 w-3 flex items-center justify-center ring-2 ring-[#0f1c18]'>
                                        {cart.totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* Shop Button (Capsule Style) */}
                            <Link
                                to='/shop'
                                className={`hidden lg:block ml-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 ${isScrolled
                                    ? 'bg-white text-[#0f1c18] hover:bg-[#d4a574]'
                                    : 'bg-[#d4a574] text-[#0f1c18] hover:bg-white'
                                    }`}
                            >
                                Shop
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="lg:hidden absolute top-full left-0 w-full mt-2 mx-4 bg-[#162923]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                            style={{ width: 'calc(100% - 32px)', left: '16px' }} // Float menu as well
                        >
                            <div className="flex flex-col p-6 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between px-4 py-3 rounded-xl text-white/90 hover:bg-white/5 transition-all group"
                                    >
                                        <span className="text-sm font-medium">{link.name}</span>
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#d4a574] transition-all" />
                                    </Link>
                                ))}

                                <div className="h-px bg-white/10 my-2"></div>

                                {token ? (
                                    <>
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-4 py-3 rounded-xl text-xs font-bold text-[#d4a574] hover:bg-white/5 uppercase tracking-wide"
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-white/5 uppercase tracking-wide"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-4 py-3 rounded-xl text-xs font-bold text-[#d4a574] hover:bg-white/5 uppercase tracking-wide"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    )
}

export default Navbar
