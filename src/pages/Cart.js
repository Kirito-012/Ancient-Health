
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cart = () => {
    const { cart, loading, updateQuantity, removeFromCart, clearCart, user } = useCart()
    const navigate = useNavigate()
    const [selectedAddressId, setSelectedAddressId] = useState('')

    // Set default address when user data loads
    React.useEffect(() => {
        if (user && user.addresses && user.addresses.length > 0 && !selectedAddressId) {
            const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0]
            setSelectedAddressId(defaultAddr._id)
        }
    }, [user, selectedAddressId])

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return
        updateQuantity(productId, newQuantity)
    }

    const handleCheckout = () => {
        if (!user) {
            toast.error('Please login to checkout')
            navigate('/login')
            return
        }

        if (!user.addresses || user.addresses.length === 0) {
            toast.error('Add an Address to proceed')
            navigate('/profile')
            return
        }

        if (!selectedAddressId) {
            toast.error('Please select a shipping address')
            return
        }

        const shippingAddress = user.addresses.find(a => a._id === selectedAddressId)

        if (!shippingAddress) {
            toast.error('Selected address is invalid')
            return
        }

        // Navigate to checkout with the selected address
        navigate('/checkout', { state: { shippingAddress } })
    }

    if (loading && cart.items.length === 0) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2d5f4f]'></div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />

            <div className='pt-32 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-8'>Your Cart</h1>

                {cart.items.length === 0 ? (
                    <div className='text-center py-20 bg-white rounded-2xl shadow-sm'>
                        <svg className='w-24 h-24 text-gray-300 mx-auto mb-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                        </svg>
                        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Your cart is empty</h2>
                        <p className='text-gray-500 mb-8'>Looks like you haven't added any items yet.</p>
                        <Link to='/shop' className='inline-block px-8 py-3 bg-[#2d5f4f] text-white font-semibold rounded-lg hover:bg-[#1e4035] transition-colors'>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* Cart Items */}
                        <div className='lg:col-span-2 space-y-6'>
                            {cart.items.map((item) => (
                                <div key={item.productId} className='bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6 transition-all hover:shadow-md'>
                                    <div className='w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden'>
                                        <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex-1 text-center sm:text-left'>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-1'>{item.title}</h3>
                                        <p className='text-[#2d5f4f] font-bold text-lg'>₹{item.price.toFixed(2)}</p>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <div className='flex items-center border border-gray-300 rounded-lg'>
                                            <button
                                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                                className='px-3 py-1 hover:bg-gray-100 text-gray-600 transition-colors'
                                                disabled={item.quantity <= 1}
                                            >-</button>
                                            <span className='px-3 py-1 font-medium text-gray-900 border-x border-gray-300 min-w-[3rem] text-center'>{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                                className='px-3 py-1 hover:bg-gray-100 text-gray-600 transition-colors'
                                                disabled={item.quantity >= item.stock}
                                            >+</button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            className='p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors'
                                            title="Remove item"
                                        >
                                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className='flex justify-end'>
                                <button
                                    onClick={clearCart}
                                    className='text-red-600 font-medium hover:text-red-700 underline text-sm'
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>

                        {/* Order Summary & Address */}
                        <div className='lg:col-span-1 space-y-6'>
                            <div className='bg-white rounded-xl shadow-sm p-6 sticky top-24'>
                                <h2 className='text-xl font-bold text-gray-900 mb-6'>Order Summary</h2>

                                <div className='space-y-4 mb-6 border-b border-gray-100 pb-6'>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Total Items</span>
                                        <span className='font-medium'>{cart.totalItems}</span>
                                    </div>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Subtotal</span>
                                        <span className='font-medium'>₹{cart.totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Shipping</span>
                                        <span className='text-green-600 font-medium'>Free</span>
                                    </div>
                                </div>

                                <div className='flex justify-between text-lg font-bold text-gray-900 mb-8'>
                                    <span>Total</span>
                                    <span>₹{cart.totalPrice.toFixed(2)}</span>
                                </div>

                                {/* Shipping Address Selection */}
                                <div className='space-y-4 mb-6'>
                                    <div className="flex justify-between items-center">
                                        <h3 className='font-semibold text-gray-900'>Shipping Address</h3>
                                        {user && user.addresses && user.addresses.length > 0 && (
                                            <Link
                                                to="/profile"
                                                className="text-sm font-medium text-[#2d5f4f] hover:text-[#1e4035] hover:underline transition-colors"
                                            >
                                                + Add New Address
                                            </Link>
                                        )}
                                    </div>

                                    {user && user.addresses && user.addresses.length > 0 ? (
                                        <div className="space-y-3">
                                            {user.addresses.map((addr) => (
                                                <div
                                                    key={addr._id}
                                                    onClick={() => setSelectedAddressId(addr._id)}
                                                    className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-200 flex items-start gap-3 ${selectedAddressId === addr._id
                                                        ? 'border-[#2d5f4f] bg-green-50/50 shadow-sm'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="mt-1">
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedAddressId === addr._id
                                                            ? 'border-[#2d5f4f]'
                                                            : 'border-gray-400'
                                                            }`}>
                                                            {selectedAddressId === addr._id && (
                                                                <div className="w-2.5 h-2.5 rounded-full bg-[#2d5f4f]" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-sm text-gray-600">
                                                        <div className="flex justify-between items-start">
                                                            <p className="font-medium text-gray-900">{addr.name}</p>
                                                            {addr.isDefault && (
                                                                <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">Default</span>
                                                            )}
                                                        </div>
                                                        <p className="mt-0.5">{addr.address}</p>
                                                        {addr.landmark && <p className="text-gray-500 text-xs mt-0.5">Near {addr.landmark}</p>}
                                                        <p className="mt-0.5">{addr.city}, {addr.state} - {addr.pincode}</p>
                                                        <p className="mt-1 font-medium text-gray-700">Ph: {addr.phone}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                            <p className="text-sm text-gray-500 mb-3">No saved addresses found.</p>
                                            <Link
                                                to="/profile"
                                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#2d5f4f] bg-green-50 hover:bg-green-100 transition-colors"
                                            >
                                                + Add New Address
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className='w-full py-4 bg-gradient-to-r from-[#2d5f4f] to-[#3e7a70] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2'
                                >
                                    Proceed to Checkout
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                                    </svg>
                                </button>
                                <p className='text-xs text-gray-500 text-center mt-4'>
                                    Secure Checkout powered by Razorpay
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default Cart
