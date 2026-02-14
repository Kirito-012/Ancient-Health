
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import axios from 'axios'
import logo from '../assets/logo.png'

const Checkout = () => {
    const { state } = useLocation()
    const { cart, token, clearCart, user } = useCart()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState('')
    const [address, setAddress] = useState(state?.shippingAddress || null)
    const [isNewAddress, setIsNewAddress] = useState(false)

    useEffect(() => {
        if (!token) {
            toast.error('Please login to continue')
            navigate('/login')
        }

        // Auto-select default address
        if (user && user.addresses && user.addresses.length > 0 && !address) {
            const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0]
            setSelectedAddressId(defaultAddr._id)
            setAddress(defaultAddr)
        } else if ((!user?.addresses || user.addresses.length === 0) && !address) {
            // No saved addresses, maybe redirect to add one or show form?
            // For now, if no address, we show empty state or redirect is handled.
            // But we changed logic: we want them to pick one.
            setIsNewAddress(true)
        }

    }, [token, navigate, user])

    const handleAddressSelect = (addrId) => {
        if (addrId === 'new') {
            setIsNewAddress(true)
            setSelectedAddressId('new')
            setAddress({ name: '', phone: '', address: '', city: '', state: '', pincode: '' })
        } else {
            setIsNewAddress(false)
            setSelectedAddressId(addrId)
            const selected = user.addresses.find(a => a._id === addrId)
            setAddress(selected)
        }
    }

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
                // image: logo, // Commented out to prevent Mixed Content Error (HTTP image in HTTPS iframe)
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
        <div className='min-h-screen bg-gray-50'>
            <Navbar />

            <div className='pt-32 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-8'>Review & Pay</h1>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Order Details */}
                    <div className='lg:col-span-2 space-y-6'>

                        {/* Shipping Address Review */}
                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-xl font-bold text-gray-900'>Shipping Address</h2>
                                <button
                                    onClick={() => navigate('/cart')}
                                    className='text-[#2d5f4f] hover:underline font-medium text-sm'
                                >
                                    Edit
                                </button>
                            </div>
                            <div className='text-gray-600 space-y-1'>
                                <p className='font-semibold text-gray-900'>{address.name}</p>
                                <p>{address.address}</p>
                                {address.landmark && <p>Near {address.landmark}</p>}
                                <p>{address.city}, {address.state} - {address.pincode}</p>
                                <p>Phone: {address.phone}</p>
                            </div>
                        </div>

                        {/* Order Items Review */}
                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <h2 className='text-xl font-bold text-gray-900 mb-4'>Order Items</h2>
                            <div className='space-y-4 divide-y divide-gray-100'>
                                {cart.items.map((item) => (
                                    <div key={item.productId} className='flex items-center gap-4 pt-4 first:pt-0'>
                                        <div className='w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0'>
                                            <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                                        </div>
                                        <div className='flex-1'>
                                            <h3 className='text-sm font-semibold text-gray-900'>{item.title}</h3>
                                            <p className='text-gray-500 text-sm'>Qty: {item.quantity}</p>
                                        </div>
                                        <p className='font-medium text-gray-900'>₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Payment Summary */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-xl shadow-sm p-6 sticky top-24'>
                            <h2 className='text-xl font-bold text-gray-900 mb-6'>Payment Details</h2>

                            <div className='space-y-3 mb-6 border-b border-gray-100 pb-6'>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Subtotal</span>
                                    <span>₹{cart.totalPrice.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Shipping</span>
                                    <span className='text-green-600'>Free</span>
                                </div>
                            </div>

                            <div className='flex justify-between text-xl font-bold text-gray-900 mb-8'>
                                <span>Total Amount</span>
                                <span>₹{cart.totalPrice.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className={`w-full py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#2d5f4f] to-[#3e7a70] hover:scale-[1.02]'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <div className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent'></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Pay ₹{cart.totalPrice.toFixed(2)}
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                                        </svg>
                                    </>
                                )}
                            </button>

                            <div className='mt-6 grid grid-cols-4 gap-2 opacity-60 grayscale'>
                                {/* Add payment icons placeholders if needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <Footer />
        </div >
    )
}

export default Checkout
