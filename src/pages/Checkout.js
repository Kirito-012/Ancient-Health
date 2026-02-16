
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import axios from 'axios'

const Checkout = () => {
    const { state } = useLocation()
    const { cart, token, clearCart, user } = useCart()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState(state?.shippingAddress || null)

    useEffect(() => {
        if (!token) {
            toast.error('Please login to continue')
            navigate('/login')
        }

        // Auto-select default address
        if (user && user.addresses && user.addresses.length > 0 && !address) {
            const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0]
            setAddress(defaultAddr)
        } else if ((!user?.addresses || user.addresses.length === 0) && !address) {
            // No saved addresses logic
        }

    }, [token, navigate, user, address])



    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true)
                return
            }
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })
    }

    const handlePayment = async () => {
        if (!address || !address.address) {
            toast.error('Please select or add a shipping address')
            return
        }

        const res = await loadRazorpay()
        if (!res) {
            toast.error('Razorpay SDK failed to load. Are you online?')
            return
        }

        try {
            setLoading(true)

            // 1. Create Order
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/orders/create`,
                { shippingAddress: address },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (!data.success) {
                toast.error('Failed to create order')
                setLoading(false)
                return
            }

            const { amount, razorpayOrderId, key } = data.data

            const options = {
                key: key,
                amount: Math.round(amount * 100), // Convert to paise
                currency: 'INR',
                name: "Ancient Health",
                description: "Purchase from Ancient Health",
                // image: 'https://placehold.co/512', // Placeholder to avoid mixed content error with local file
                order_id: razorpayOrderId,
                handler: async function (response) {
                    try {
                        // 2. Verify Payment
                        const verifyRes = await axios.post(
                            `${process.env.REACT_APP_API_URL}/api/orders/verify`,
                            {
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                                paymentMethod: 'Razorpay'
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        )

                        if (verifyRes.data.success) {
                            // Success!
                            clearCart()
                            navigate(`/order-success/${verifyRes.data.data._id}`)
                        } else {
                            toast.error(verifyRes.data.message || 'Payment Verification Failed')
                            setLoading(false)
                        }
                    } catch (error) {
                        console.error('Values:', response)
                        console.error('Verification Error:', error)
                        toast.error('Payment verification failed. Please contact support if money was deducted.')
                        setLoading(false)
                    }
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false)
                        console.log('Payment modal closed')
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: (() => {
                        const clean = address.phone.replace(/\D/g, '')
                        // If 10 digits, assume India and add +91
                        if (clean.length === 10) return `+91${clean}`
                        // If 12 digits starting with 91, add +
                        if (clean.length === 12 && clean.startsWith('91')) return `+${clean}`
                        // Otherwise return clean number with + if missing
                        return clean.length > 10 ? `+${clean}` : clean
                    })()
                },
                notes: {
                    address: `${address.address}, ${address.city}, ${address.state} - ${address.pincode}`
                },
                theme: {
                    color: "#2d5f4f"
                }
            }

            console.log('Razorpay Options:', options) // Debug log for user/dev to check prefill data

            const paymentObject = new window.Razorpay(options)

            paymentObject.on('payment.failed', function (response) {
                console.error('Payment Failed:', response.error)
                toast.error(`Payment Failed: ${response.error.description || 'Unknown error'}`)
                setLoading(false)
            })

            paymentObject.open()

        } catch (error) {
            console.error('Payment Error:', error)
            toast.error(
                error.response?.data?.error ||
                error.response?.data?.message ||
                'Something went wrong. Please check your connection.'
            )
        } finally {
            // We don't set loading to false here immediately because if payment is successful, 
            // we want to show loading until redirect.
            // But if user closes modal, we need to handle that.
            // Razorpay doesn't have a direct 'modal closed' event easily accessible without checking internal state or using a timeout.
            // However, payment.failed usually catches valid failures. 
            // For modal dismissal, standard integration might leave button loading. 
            // A common workaround is to set loading false after a long timeout or let the user refresh, 
            // but let's keep it simple for now and rely on payment.failed.
            // Actually, let's just remove the generic finally block to avoid premature State update during success redirect 
            // and handle setLoading(false) in error/failure cases explicitly.

            // Wait, removing finally block is risky if code crashes before opening modal.
            // Better to keep it but check if we are redirecting?
            // Let's set it to false only if NOT success. 
            // Better to keep it but rely on navigate to unmount.
            // If we just open modal, we are still on page.
            // If user closes modal, we are stuck in loading?
            // Razorpay 'modal.ondismiss' is undefined in standard checkout options usually unless specified?
            // Actually, options.modal.ondismiss is the way.

        }
    }

    if (!cart) return null

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-100'>
            <Navbar />

            <div className='flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-7xl mx-auto'>
                    {/* Simple Header */}
                    <div className='mb-8 mt-8'>
                        <div className='flex items-center gap-4 mb-2'>
                            <div className='h-16 w-16 rounded-2xl bg-gradient-to-br from-[#2d5f4f] to-[#1e4035] flex items-center justify-center shadow-lg'>
                                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold text-gray-900'>Review & Pay</h1>
                                <p className='text-gray-600 mt-0.5'>Confirm your order details and complete payment</p>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* Order Details */}
                        <div className='lg:col-span-2 space-y-6'>

                            {/* Shipping Address Review */}
                            <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50'>
                                <div className='flex justify-between items-center mb-4'>
                                    <div className='flex items-center gap-2'>
                                        <svg className='w-5 h-5 text-[#2d5f4f]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                        </svg>
                                        <h2 className='text-xl font-bold text-gray-900'>Shipping Address</h2>
                                    </div>
                                    <button
                                        onClick={() => navigate('/cart')}
                                        className='text-[#2d5f4f] hover:text-[#1e4035] font-semibold text-sm hover:underline transition-colors'
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className='bg-gradient-to-br from-[#2d5f4f]/5 to-green-50/50 rounded-xl p-4 text-gray-700'>
                                    <p className='font-bold text-gray-900 mb-1'>{address.name}</p>
                                    <p className='leading-relaxed'>{address.address}</p>
                                    {address.landmark && <p className='text-gray-600 text-sm mt-0.5'>📍 Near {address.landmark}</p>}
                                    <p className='mt-1'>{address.city}, {address.state} - {address.pincode}</p>
                                    <p className='font-medium mt-1 text-sm'>📞 {address.phone}</p>
                                </div>
                            </div>

                            {/* Order Items Review */}
                            <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50'>
                                <div className='flex items-center gap-2 mb-4'>
                                    <svg className='w-5 h-5 text-[#2d5f4f]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                                    </svg>
                                    <h2 className='text-xl font-bold text-gray-900'>Order Items</h2>
                                </div>
                                <div className='space-y-3'>
                                    {cart.items.map((item) => (
                                        <div key={item.productId} className='flex items-center gap-4 p-3 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors'>
                                            <div className='w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm'>
                                                <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                                            </div>
                                            <div className='flex-1'>
                                                <h3 className='font-bold text-gray-900'>{item.title}</h3>
                                                <p className='text-gray-600 text-sm mt-0.5'>Quantity: <span className='font-semibold text-gray-900'>{item.quantity}</span></p>
                                            </div>
                                            <p className='text-xl font-bold text-[#2d5f4f]'>₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Payment Summary */}
                        <div className='lg:col-span-1'>
                            <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-200/50'>
                                {/* Header */}
                                <div className='flex items-center gap-3 mb-6 pb-6 border-b-2 border-gray-100'>
                                    <div className='h-10 w-10 rounded-lg bg-gradient-to-br from-[#2d5f4f] to-[#1e4035] flex items-center justify-center shadow-lg'>
                                        <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' />
                                        </svg>
                                    </div>
                                    <h2 className='text-2xl font-bold text-gray-900'>Payment Summary</h2>
                                </div>

                                {/* Price Breakdown */}
                                <div className='space-y-4 mb-6 pb-6 border-b-2 border-gray-100'>
                                    <div className='flex justify-between items-center text-gray-600'>
                                        <span className='font-medium'>Subtotal</span>
                                        <span className='font-semibold text-gray-900'>₹{cart.totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-medium text-gray-600'>Shipping</span>
                                        <span className='inline-flex items-center gap-1 text-green-600 font-bold'>
                                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                            </svg>
                                            FREE
                                        </span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className='flex justify-between items-center mb-8 p-4 bg-gradient-to-br from-[#2d5f4f]/5 to-green-50/50 rounded-xl'>
                                    <span className='text-lg font-bold text-gray-900'>Total Amount</span>
                                    <span className='text-3xl font-bold text-[#2d5f4f]'>₹{cart.totalPrice.toFixed(2)}</span>
                                </div>

                                {/* Pay Button */}
                                <button
                                    onClick={handlePayment}
                                    disabled={loading}
                                    className={`group relative w-full py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden ${loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-[#2d5f4f] to-[#1e4035] hover:scale-[1.02] active:scale-[0.98]'
                                        }`}
                                >
                                    {!loading && <div className='absolute inset-0 bg-gradient-to-r from-[#1e4035] to-[#2d5f4f] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>}
                                    <div className='relative flex items-center gap-2'>
                                        {loading ? (
                                            <>
                                                <div className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent'></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                                                </svg>
                                                Pay ₹{cart.totalPrice.toFixed(2)}
                                            </>
                                        )}
                                    </div>
                                </button>

                                {/* Security Badge */}
                                <div className='flex items-center justify-center gap-2 mt-4 text-xs text-gray-500'>
                                    <svg className='w-4 h-4 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                    </svg>
                                    Secure payment powered by Razorpay
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Checkout
