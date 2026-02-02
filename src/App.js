import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
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

const App = () => {
	return (
		<Router>
			<Routes>
				{/* Homepage */}
				<Route
					path='/'
					element={<Home />}
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
	)
}

export default App
