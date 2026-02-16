
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { useCart } from '../context/CartContext'

const MyOrders = () => {
    const { token } = useCart()
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
        fetchOrders()
        // eslint-disable-next-line
    }, [token])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data.success) {
                setOrders(response.data.data)
            } else {
                setError('Failed to fetch orders')
            }
        } catch (err) {
            console.error('Fetch orders error:', err)
            setError(err.response?.data?.message || 'Failed to load orders')
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800'
            case 'shipped': return 'bg-blue-100 text-blue-800'
            case 'processing': return 'bg-yellow-100 text-yellow-800'
            case 'cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />

            <div className='min-h-screen pt-32 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-8'>My Orders</h1>

                {loading ? (
                    <div className='flex justify-center py-12'>
                        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#2d5f4f]'></div>
                    </div>
                ) : error ? (
                    <div className='text-center py-12'>
                        <p className='text-red-500 mb-4'>{error}</p>
                        <button onClick={fetchOrders} className='text-[#2d5f4f] hover:underline'>Try Again</button>
                    </div>
                ) : orders.length === 0 ? (
                    <div className='text-center py-20 bg-white rounded-2xl shadow-sm'>
                        <svg className='w-20 h-20 text-gray-300 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                        </svg>
                        <h2 className='text-xl font-semibold text-gray-900 mb-2'>No orders yet</h2>
                        <p className='text-gray-500 mb-6'>Looks like you haven't placed any orders yet.</p>
                        <Link to='/shop' className='inline-block px-6 py-2 bg-[#2d5f4f] text-white font-semibold rounded-lg hover:bg-[#1e4035] transition-colors'>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {orders.map((order) => (
                            <div key={order._id} className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
                                <div className='p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50'>
                                    <div>
                                        <p className='text-sm text-gray-500'>Order Placed</p>
                                        <p className='font-medium text-gray-900'>{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>Total Amount</p>
                                        <p className='font-medium text-gray-900'>₹{order.totalAmount.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>Order ID</p>
                                        <p className='font-mono text-sm text-gray-900'>#{order.orderNumber}</p>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(order.orderStatus)}`}>
                                            {order.orderStatus}
                                        </span>
                                        {/* Future: Add View Details button */}
                                    </div>
                                </div>
                                <div className='p-6'>
                                    <div className='space-y-4'>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className='flex gap-4 items-center'>
                                                <div className='w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0'>
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                                                    ) : (
                                                        <div className='w-full h-full bg-gray-200'></div>
                                                    )}
                                                </div>
                                                <div className='flex-1'>
                                                    <h4 className='text-sm font-semibold text-gray-900 line-clamp-1'>{item.title}</h4>
                                                    <p className='text-xs text-gray-500'>Qty: {item.quantity}</p>
                                                </div>
                                                <p className='text-sm font-medium text-gray-900'>₹{item.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default MyOrders
