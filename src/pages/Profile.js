import { useState, useEffect, useCallback } from 'react'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
    const { user, logout, fetchUser, token } = useCart()
    const [view, setView] = useState('profile') // 'profile' or 'orders'
    const [orders, setOrders] = useState([])
    const [loadingOrders, setLoadingOrders] = useState(false)
    const [addressForm, setAddressForm] = useState(false)
    const [newAddress, setNewAddress] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        landmark: ''
    })
    const [editingAddressId, setEditingAddressId] = useState(null)
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    const fetchOrders = useCallback(async () => {
        try {
            setLoadingOrders(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success) {
                setOrders(data.data)
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to fetch orders')
        } finally {
            setLoadingOrders(false)
        }
    }, [token])

    useEffect(() => {
        if (view === 'orders' && user) {
            fetchOrders()
        }
    }, [view, user, fetchOrders])

    const handleAddAddress = async (e) => {
        e.preventDefault()
        setLoadingUpdate(true)
        try {
            let updatedAddresses
            if (editingAddressId) {
                // Update existing address
                updatedAddresses = user.addresses.map(addr =>
                    addr._id === editingAddressId ? { ...newAddress, _id: editingAddressId, isDefault: addr.isDefault } : addr
                )
            } else {
                // Add new address
                updatedAddresses = [...(user.addresses || []), newAddress]
            }

            const { data } = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/auth/profile`,
                { addresses: updatedAddresses },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (data.success) {
                toast.success(editingAddressId ? 'Address updated successfully' : 'Address added successfully')
                setAddressForm(false)
                setEditingAddressId(null)
                setNewAddress({ name: '', phone: '', address: '', city: '', state: '', pincode: '', landmark: '' })
                fetchUser() // Refresh user data
            }
        } catch (error) {
            console.error(error)
            toast.error(editingAddressId ? 'Failed to update address' : 'Failed to add address')
        } finally {
            setLoadingUpdate(false)
        }
    }

    const handleEditAddress = (addr) => {
        setNewAddress({
            name: addr.name,
            phone: addr.phone,
            address: addr.address,
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode,
            landmark: addr.landmark || ''
        })
        setEditingAddressId(addr._id)
        setAddressForm(true)
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDeleteAddress = async (addressId) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return
        try {
            const updatedAddresses = user.addresses.filter(a => a._id !== addressId)
            const { data } = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/auth/profile`,
                { addresses: updatedAddresses },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (data.success) {
                toast.success('Address deleted')
                fetchUser()
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to delete address')
        }
    }

    const handleSetDefault = async (addressId) => {
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/auth/profile`,
                { defaultAddressId: addressId },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (data.success) {
                toast.success('Default address updated')
                fetchUser()
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to set default address')
        }
    }

    const resetForm = () => {
        setAddressForm(false)
        setEditingAddressId(null)
        setNewAddress({ name: '', phone: '', address: '', city: '', state: '', pincode: '', landmark: '' })
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center bg-gray-50 pt-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d5f4f]"></div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                        <div className="bg-[#2d5f4f] px-4 py-5 sm:px-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-white">
                                    {user.name}
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-green-100">
                                    {user.email} | {user.phone || 'No phone added'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setView(view === 'editProfile' ? 'profile' : 'editProfile')}
                                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => setView(view === 'profile' ? 'orders' : 'profile')}
                                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {view === 'profile' ? 'My Orders' : 'My Profile'}
                                </button>
                                <button
                                    onClick={logout}
                                    className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {view === 'editProfile' && (
                        <div className="bg-white shadow rounded-lg p-6 mb-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Edit Profile</h2>
                            <ProfileEditForm user={user} onUpdate={() => {
                                fetchUser()
                                setView('profile')
                            }} />
                        </div>
                    )}

                    {view === 'profile' ? (
                        <div className="space-y-6">
                            {/* Saved Addresses */}
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-medium text-gray-900">Saved Addresses</h2>
                                    <button
                                        onClick={() => {
                                            if (addressForm) {
                                                resetForm()
                                            } else {
                                                setAddressForm(true)
                                            }
                                        }}
                                        className="text-[#2d5f4f] hover:text-[#1e4035] text-sm font-medium"
                                    >
                                        {addressForm ? 'Cancel' : '+ Add New'}
                                    </button>
                                </div>

                                {addressForm && (
                                    <form onSubmit={handleAddAddress} className="mb-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-6">{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {/* ... (fields remain same) */}
                                            <div className="md:col-span-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. John Doe"
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                                    value={newAddress.name}
                                                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="md:col-span-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-2 text-gray-500">+91</span>
                                                    <input
                                                        type="tel"
                                                        placeholder="9876543210"
                                                        required
                                                        maxLength="10"
                                                        className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                                        value={newAddress.phone}
                                                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value.replace(/\D/g, '') })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                                <textarea
                                                    rows="2"
                                                    placeholder="Flat No, Building, Street Area"
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all placeholder-gray-400 resize-none"
                                                    value={newAddress.address}
                                                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                                                <input
                                                    type="text"
                                                    placeholder="Near..."
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                                    value={newAddress.landmark}
                                                    onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                <input
                                                    type="text"
                                                    placeholder="City"
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                                    value={newAddress.city}
                                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                                <input
                                                    type="text"
                                                    placeholder="State"
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                                    value={newAddress.state}
                                                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                />
                                            </div>
                                            <div className="md:col-span-2 sm:col-span-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                                <input
                                                    type="text"
                                                    placeholder="123456"
                                                    required
                                                    maxLength="6"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                                    value={newAddress.pincode}
                                                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value.replace(/\D/g, '') })}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-5">
                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={loadingUpdate}
                                                className="px-6 py-2.5 bg-[#2d5f4f] text-white font-medium rounded-lg hover:bg-[#1e4035] shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {loadingUpdate ? 'Saving...' : (editingAddressId ? 'Update Address' : 'Save Address')}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {user.addresses && user.addresses.length > 0 ? (
                                        user.addresses.map((addr) => (
                                            <div key={addr._id} className={`border rounded-lg p-4 relative ${addr.isDefault ? 'border-[#2d5f4f] bg-green-50' : 'border-gray-200'}`}>
                                                {addr.isDefault && (
                                                    <span className="absolute top-2 right-2 bg-[#2d5f4f] text-white text-xs px-2 py-0.5 rounded-full">
                                                        Default
                                                    </span>
                                                )}
                                                <p className="font-medium text-gray-900">{addr.name}</p>
                                                <p className="text-gray-600 text-sm">{addr.address}</p>
                                                {addr.landmark && <p className="text-gray-600 text-sm">Near {addr.landmark}</p>}
                                                <p className="text-gray-600 text-sm">{addr.city}, {addr.state} - {addr.pincode}</p>
                                                <p className="text-gray-600 text-sm">Ph: {addr.phone}</p>

                                                <div className="mt-3 flex gap-3 text-sm">
                                                    {!addr.isDefault && (
                                                        <button
                                                            onClick={() => handleSetDefault(addr._id)}
                                                            className="text-[#2d5f4f] hover:underline"
                                                        >
                                                            Set Default
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleEditAddress(addr)}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAddress(addr._id)}
                                                        className="text-red-500 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm col-span-2 text-center py-4">No saved addresses.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">My Orders</h2>
                            {loadingOrders ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2d5f4f]"></div>
                                </div>
                            ) : orders.length > 0 ? (
                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-semibold text-[#2d5f4f]">Order #{order.orderNumber || order._id.slice(-6).toUpperCase()}</p>
                                                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs font-semibold capitalize
                                                     ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                                                        order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                            'bg-blue-100 text-blue-800'}`}>
                                                    {order.orderStatus}
                                                </span>
                                            </div>
                                            <div className="space-y-2 mt-2">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between text-sm">
                                                        <span className="text-gray-600">{item.title} x {item.quantity}</span>
                                                        <span className="font-medium">₹{item.price * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="border-t border-gray-100 mt-3 pt-2 flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Total Amount</span>
                                                <span className="font-bold text-gray-900">₹{order.totalAmount}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No orders found.</p>
                            )}
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    )
}

const ProfileEditForm = ({ user, onUpdate }) => {
    const { token } = useCart()
    const [formData, setFormData] = useState({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [changePassword, setChangePassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (changePassword) {
            if (formData.newPassword !== formData.confirmPassword) {
                toast.error('New passwords do not match')
                return
            }
            if (!formData.oldPassword) {
                toast.error('Please enter your current password')
                return
            }
        }

        setLoading(true)
        try {
            const payload = {
                name: formData.name,
                phone: formData.phone
            }

            if (changePassword) {
                payload.oldPassword = formData.oldPassword
                payload.newPassword = formData.newPassword
            }

            const { data } = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/auth/profile`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (data.success) {
                toast.success('Profile updated successfully')
                onUpdate()
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl animate-fade-in-up transition-all duration-500 ease-out">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Details */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Details</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all placeholder-gray-400"
                            placeholder="Enter full name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            disabled
                            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">+91</span>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                                maxLength="10"
                                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Password Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-medium text-gray-900">Security</h3>
                        <button
                            type="button"
                            onClick={() => setChangePassword(!changePassword)}
                            className="text-sm text-[#2d5f4f] hover:underline font-medium"
                        >
                            {changePassword ? 'Cancel Change' : 'Change Password'}
                        </button>
                    </div>

                    {changePassword ? (
                        <div className="space-y-4 animate-fade-in">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    value={formData.oldPassword}
                                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all"
                                    placeholder="Current password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all"
                                    placeholder="New password"
                                    minLength="6"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5f4f] focus:border-transparent outline-none transition-all"
                                    placeholder="Confirm new password"
                                    minLength="6"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <p className="text-sm text-gray-500">Password is secure</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-[#2d5f4f] text-white font-medium rounded-lg hover:bg-[#1e4035] shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? 'Saving Changes...' : 'Save Profile Changes'}
                </button>
            </div>
        </form>
    )
}

export default Profile
