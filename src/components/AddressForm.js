import React, { useState, useEffect, useCallback, useRef } from 'react'
import { toast } from 'react-toastify'

const INDIAN_STATES = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
]

const AddressForm = ({ initialData, onSubmit, onCancel, submitLabel = 'Save Address', title = 'Add New Address', loading = false }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        landmark: '',
        city: '',
        state: '',
        pincode: ''
    })
    const [pincodeLoading, setPincodeLoading] = useState(false)
    const [pincodeError, setPincodeError] = useState('')
    const [cityAutoFilled, setCityAutoFilled] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const pincodeTimerRef = useRef(null)

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                phone: initialData.phone || '',
                address: initialData.address || '',
                landmark: initialData.landmark || '',
                city: initialData.city || '',
                state: initialData.state || '',
                pincode: initialData.pincode || ''
            })
        }
    }, [initialData])

    const lookupPincode = useCallback(async (pincode) => {
        if (pincode.length !== 6) {
            setPincodeError('')
            return
        }
        setPincodeLoading(true)
        setPincodeError('')
        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            const data = await res.json()
            if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
                const po = data[0].PostOffice[0]
                const apiState = po.State
                // Match to our dropdown list (case-insensitive)
                const matchedState = INDIAN_STATES.find(
                    s => s.toLowerCase() === apiState.toLowerCase()
                ) || apiState
                setFormData(prev => ({
                    ...prev,
                    city: po.District,
                    state: matchedState
                }))
                setCityAutoFilled(true)
                setFormErrors(prev => ({ ...prev, pincode: '', city: '', state: '' }))
            } else {
                setPincodeError('Invalid pincode. Please enter a valid Indian pincode.')
                setCityAutoFilled(false)
            }
        } catch {
            setPincodeError('Could not verify pincode. Please check your connection.')
            setCityAutoFilled(false)
        } finally {
            setPincodeLoading(false)
        }
    }, [])

    const handlePincodeChange = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 6)
        setFormData(prev => ({ ...prev, pincode: digits }))
        setPincodeError('')
        if (digits.length < 6) {
            setCityAutoFilled(false)
        }
        // Debounce the API call
        if (pincodeTimerRef.current) clearTimeout(pincodeTimerRef.current)
        if (digits.length === 6) {
            pincodeTimerRef.current = setTimeout(() => lookupPincode(digits), 500)
        }
    }

    const validateForm = () => {
        const errors = {}
        if (!formData.name.trim()) errors.name = 'Full name is required.'
        if (formData.phone.length !== 10) errors.phone = 'Enter a valid 10-digit phone number.'
        if (!formData.address.trim()) errors.address = 'Address is required.'
        if (!formData.city.trim()) errors.city = 'City is required.'
        if (!formData.state) errors.state = 'Please select a state.'
        if (formData.pincode.length !== 6) errors.pincode = 'Pincode must be 6 digits.'
        if (pincodeError) errors.pincode = pincodeError
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateForm()) return
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 bg-gradient-to-br from-gray-50 to-green-50/20 border-2 border-[#2d5f4f]/20 rounded-2xl p-8 shadow-inner">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#2d5f4f] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                {title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all placeholder-gray-400 hover:border-gray-300 ${formErrors.name ? 'border-red-400' : 'border-gray-200'}`}
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value })
                            if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, name: '' }))
                        }}
                    />
                    {formErrors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{formErrors.name}</p>}
                </div>

                {/* Phone Number */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3.5 text-gray-500 font-medium">+91</span>
                        <input
                            type="tel"
                            placeholder="9876543210"
                            maxLength="10"
                            className={`w-full pl-14 pr-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all placeholder-gray-400 hover:border-gray-300 ${formErrors.phone ? 'border-red-400' : 'border-gray-200'}`}
                            value={formData.phone}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '')
                                setFormData({ ...formData, phone: val })
                                if (val.length === 10) setFormErrors(prev => ({ ...prev, phone: '' }))
                            }}
                        />
                    </div>
                    {formErrors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{formErrors.phone}</p>}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <textarea
                        rows="3"
                        placeholder="Flat No, Building, Street Area"
                        className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all placeholder-gray-400 resize-none hover:border-gray-300 ${formErrors.address ? 'border-red-400' : 'border-gray-200'}`}
                        value={formData.address}
                        onChange={(e) => {
                            setFormData({ ...formData, address: e.target.value })
                            if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, address: '' }))
                        }}
                    />
                    {formErrors.address && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{formErrors.address}</p>}
                </div>

                {/* Landmark */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Landmark <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input
                        type="text"
                        placeholder="Near..."
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all placeholder-gray-400 hover:border-gray-300"
                        value={formData.landmark}
                        onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    />
                </div>

                {/* Pincode — placed before city/state so auto-fill flows naturally */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pincode
                        <span className="ml-2 text-xs text-[#2d5f4f] font-normal">City &amp; State will auto-fill</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g. 400001"
                            maxLength="6"
                            className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all placeholder-gray-400 hover:border-gray-300 pr-10 ${formErrors.pincode || pincodeError ? 'border-red-400' : formData.pincode.length === 6 && !pincodeError && !pincodeLoading ? 'border-green-400' : 'border-gray-200'}`}
                            value={formData.pincode}
                            onChange={(e) => handlePincodeChange(e.target.value)}
                        />
                        {pincodeLoading && (
                            <div className="absolute right-3 top-3.5">
                                <svg className="animate-spin h-5 w-5 text-[#2d5f4f]" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        )}
                        {!pincodeLoading && formData.pincode.length === 6 && !pincodeError && cityAutoFilled && (
                            <div className="absolute right-3 top-3.5">
                                <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                    </div>
                    {(pincodeError || formErrors.pincode) && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {pincodeError || formErrors.pincode}
                        </p>
                    )}
                    {cityAutoFilled && !pincodeError && (
                        <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            City and State auto-filled from pincode
                        </p>
                    )}
                </div>

                {/* City */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City / District</label>
                    <input
                        type="text"
                        placeholder="City"
                        className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all placeholder-gray-400 hover:border-gray-300 ${formErrors.city ? 'border-red-400' : 'border-gray-200'}`}
                        value={formData.city}
                        onChange={(e) => {
                            setFormData({ ...formData, city: e.target.value })
                            setCityAutoFilled(false)
                            if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, city: '' }))
                        }}
                    />
                    {formErrors.city && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{formErrors.city}</p>}
                </div>

                {/* State Dropdown */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                    <select
                        className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-[#2d5f4f] focus:border-[#2d5f4f] outline-none transition-all hover:border-gray-300 appearance-none cursor-pointer ${formErrors.state ? 'border-red-400' : 'border-gray-200'} ${!formData.state ? 'text-gray-400' : 'text-gray-900'}`}
                        value={formData.state}
                        onChange={(e) => {
                            setFormData({ ...formData, state: e.target.value })
                            if (e.target.value) setFormErrors(prev => ({ ...prev, state: '' }))
                        }}
                    >
                        <option value="">Select State / UT</option>
                        {INDIAN_STATES.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    {formErrors.state && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{formErrors.state}</p>}
                </div>
            </div>
            <div className="mt-8 flex justify-end gap-4 border-t-2 border-gray-200 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 text-gray-700 hover:bg-gray-100 font-semibold rounded-xl transition-all border-2 border-gray-200 hover:border-gray-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading || pincodeLoading}
                    className="px-8 py-3 bg-gradient-to-r from-[#2d5f4f] to-[#1e4035] text-white font-semibold rounded-xl hover:from-[#1e4035] hover:to-[#2d5f4f] shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </span>
                    ) : submitLabel}
                </button>
            </div>
        </form>
    )
}

export default AddressForm
