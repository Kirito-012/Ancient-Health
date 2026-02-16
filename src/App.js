import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminHome from './admin/pages/AdminHome'
import AddProduct from './admin/pages/AddProduct'
import ManageProducts from './admin/pages/ManageProducts'
import AddCategory from './admin/pages/AddCategory'
import ManageCategories from './admin/pages/ManageCategories'
import AddBlog from './admin/pages/AddBlog'
import ManageBlogs from './admin/pages/ManageBlogs'
import Users from './admin/pages/Users'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import MyOrders from './pages/MyOrders'

import { CartProvider } from './context/CartContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ReactLenis } from 'lenis/react'

import ScrollToTop from './components/ScrollToTop'

const App = () => {
	return (
		<ReactLenis root>
			<CartProvider>
				<ToastContainer position='top-right' />
				<Router>
					<ScrollToTop />
					<Routes>
						{/* Homepage */}
						<Route
							path='/'
							element={<Home />}
						/>

						{/* Shop Page */}
						<Route
							path='/shop'
							element={<Shop />}
						/>

						{/* About Page */}
						<Route
							path='/about'
							element={<About />}
						/>

						{/* Contact Page */}
						<Route
							path='/contact'
							element={<Contact />}
						/>

						{/* Cart Page */}
						<Route
							path='/cart'
							element={
								<ProtectedRoute>
									<Cart />
								</ProtectedRoute>
							}
						/>

						{/* Profile Page */}
						<Route
							path='/profile'
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>

						{/* Checkout Page */}
						<Route
							path='/checkout'
							element={<Checkout />}
						/>

						{/* Order Success Page */}
						<Route
							path='/order-success/:orderId'
							element={<OrderSuccess />}
						/>

						{/* My Orders Page */}
						<Route
							path='/my-orders'
							element={<MyOrders />}
						/>

						{/* Login Page */}
						<Route
							path='/login'
							element={<Login />}
						/>

						{/* Signup Page */}
						<Route
							path='/signup'
							element={<Signup />}
						/>

						{/* Protected Admin Dashboard with nested routes */}
						<Route
							path='/admin'
							element={
								<ProtectedAdminRoute>
									<AdminDashboard />
								</ProtectedAdminRoute>
							}>
							<Route
								index
								element={<AdminHome />}
							/>
							<Route
								path='products/add'
								element={<AddProduct />}
							/>
							<Route
								path='products/manage'
								element={<ManageProducts />}
							/>
							<Route
								path='products/add-category'
								element={<AddCategory />}
							/>
							<Route
								path='products/manage-categories'
								element={<ManageCategories />}
							/>
							<Route
								path='blogs/add'
								element={<AddBlog />}
							/>
							<Route
								path='blogs/manage'
								element={<ManageBlogs />}
							/>
							<Route
								path='users'
								element={<Users />}
							/>
						</Route>

						{/* Catch all - redirect to home */}
						<Route
							path='*'
							element={
								<Navigate
									to='/'
									replace
								/>
							}
						/>
					</Routes>
				</Router>
			</CartProvider>
		</ReactLenis>
	)
}

export default App
