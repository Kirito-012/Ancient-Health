
import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], totalItems: 0, totalPrice: 0 })
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (token) {
            fetchCart()
            fetchUser()
        } else {
            setCart({ items: [], totalItems: 0, totalPrice: 0 })
            setUser(null)
        }
        // eslint-disable-next-line
    }, [token])

    const login = (newToken) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setCart({ items: [], totalItems: 0, totalPrice: 0 })
        setUser(null)
        toast.info('Logged out')
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data.success) {
                setUser(response.data.data.user)
            }
        } catch (err) {
            console.error('Fetch user error:', err)
            if (err.response?.status === 401) {
                logout()
            }
        }
    }

    const fetchCart = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data.success) {
                setCart(response.data.data)
            }
        } catch (err) {
            console.error('Fetch cart error:', err)
            if (err.response?.status === 401) {
                logout() // Auto logout on invalid token
            }
        } finally {
            setLoading(false)
        }
    }

    const addToCart = async (productId, quantity = 1) => {
        if (!token) {
            toast.error('Please login to add items to cart')
            navigate('/login')
            return false
        }
        try {
            setLoading(true)
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/cart/add`,
                { productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.data.success) {
                setCart(response.data.data)
                return true
            }
        } catch (err) {
            console.error('Add to cart error:', err)
            const msg = err.response?.data?.message || 'Failed to add to cart'
            toast.error(msg)
            return false
        } finally {
            setLoading(false)
        }
    }

    const updateQuantity = async (productId, quantity) => {
        try {
            setLoading(true)

            // Check if quantity is increasing
            const currentItem = cart.items.find(item => item.productId === productId)
            const isIncreasing = currentItem && quantity > currentItem.quantity

            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/cart/update`,
                { productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.data.success) {
                setCart(response.data.data)
                if (isIncreasing) {
                    toast.success('Product quantity updated')
                }
            }
        } catch (err) {
            console.error('Update quantity error:', err)
            toast.error(err.response?.data?.message || 'Failed to update quantity')
        } finally {
            setLoading(false)
        }
    }

    const removeFromCart = async (productId) => {
        try {
            setLoading(true)
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/cart/remove/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.data.success) {
                setCart(response.data.data)
                toast.success('Item removed from cart')
            }
        } catch (err) {
            console.error('Remove from cart error:', err)
            toast.error('Failed to remove item')
        } finally {
            setLoading(false)
        }
    }

    const clearCart = async () => {
        try {
            setLoading(true)
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/cart/clear`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.data.success) {
                setCart(response.data.data)
                toast.success('Cart cleared successfully')
            }
        } catch (err) {
            console.error('Clear cart error:', err)
            toast.error('Failed to clear cart')
        } finally {
            setLoading(false)
        }
    }

    const value = {
        cart,
        user,
        loading,
        token, // Expose token if needed
        login,
        logout,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchUser
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContext
