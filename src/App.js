import React, { Suspense, lazy } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
} from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { CartProvider } from './context/CartContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReactLenis } from 'lenis/react'
import ScrollToTop from './components/ScrollToTop'
import GlobalLoader from './components/GlobalLoader'
import ChatBot from './components/ChatBot'
import { CheckCircle2, AlertCircle, XCircle, Info, X } from 'lucide-react'

const Shop = lazy(() => import('./pages/Shop'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Cart = lazy(() => import('./pages/Cart'))
const Profile = lazy(() => import('./pages/Profile'))
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard'))
const AdminHome = lazy(() => import('./admin/pages/AdminHome'))
const AddProduct = lazy(() => import('./admin/pages/AddProduct'))
const ManageProducts = lazy(() => import('./admin/pages/ManageProducts'))
const AddCategory = lazy(() => import('./admin/pages/AddCategory'))
const ManageCategories = lazy(() => import('./admin/pages/ManageCategories'))
const AddBlog = lazy(() => import('./admin/pages/AddBlog'))
const ManageBlogs = lazy(() => import('./admin/pages/ManageBlogs'))
const Users = lazy(() => import('./admin/pages/Users'))
const AllOrders = lazy(() => import('./admin/pages/AllOrders'))
const CompletedOrders = lazy(() => import('./admin/pages/CompletedOrders'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const MyOrders = lazy(() => import('./pages/MyOrders'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const ProductDetail = lazy(() => import('./pages/ProductDetail')) // NEW
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const Shipping = lazy(() => import('./pages/Shipping'))

const TrailingSlashRedirect = () => {
	const { pathname, search, hash } = useLocation()

	if (pathname !== '/' && !pathname.endsWith('/')) {
		return (
			<Navigate
				to={`${pathname}/${search}${hash}`}
				replace
			/>
		)
	}

	return null
}

const App = () => {
	return (
		<HelmetProvider>
		<Helmet>
			<title>Ancient Health</title>
		</Helmet>
		<ReactLenis root>
			<GlobalLoader />
			<ToastContainer
				position='bottom-right'
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
				icon={({ type }) => {
					switch (type) {
						case 'success': return <CheckCircle2 className="w-5 h-5 text-[#d4a574]" />
						case 'error': return <XCircle className="w-5 h-5 text-red-400" />
						case 'warning': return <AlertCircle className="w-5 h-5 text-amber-400" />
						default: return <Info className="w-5 h-5 text-[#d4a574]" />
					}
				}}
				closeButton={({ closeToast }) => (
					<button onClick={closeToast} className="p-1 opacity-50 hover:opacity-100 transition-opacity">
						<X className="w-4 h-4 text-white/60" />
					</button>
				)}
				toastClassName={() =>
					'relative flex items-center justify-between p-4 min-w-[320px] rounded-lg overflow-hidden cursor-pointer bg-[#0f1c18] border border-[#d4a574]/20 shadow-2xl mb-4 mr-4 group hover:border-[#d4a574]/40 transition-all duration-300'
				}
				bodyClassName={() =>
					'text-sm font-sans font-medium text-[#e8e6e3] flex-1 flex items-center gap-3 px-2'
				}
				progressClassName="!bg-[#d4a574]"
			/>


			<Router>
				<CartProvider>
					<TrailingSlashRedirect />
					<ScrollToTop />
					<ChatBot />
					<Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin"></div></div>}>
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

						{/* Product Detail Page */}
						<Route
							path='/shop/:slug'
							element={<ProductDetail />}
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
							element={<Cart />}
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

						{/* Blog Pages */}
						<Route
							path='/blog'
							element={<Blog />}
						/>
						<Route
							path='/blog/:slug'
							element={<BlogDetail />}
						/>

						{/* Privacy Policy Page */}
						<Route
							path='/privacy-policy'
							element={<PrivacyPolicy />}
						/>

						{/* Terms & Conditions Page */}
						<Route
							path='/terms-conditions'
							element={<TermsConditions />}
						/>

						{/* Shipping & Returns Page */}
						<Route
							path='/shipping'
							element={<Shipping />}
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
							<Route
								path='orders/all'
								element={<AllOrders />}
							/>
							<Route
								path='orders/completed'
								element={<CompletedOrders />}
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
					</Suspense>
				</CartProvider>
			</Router>
		</ReactLenis>
		</HelmetProvider>
	)
}

export default App
