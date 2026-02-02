import React from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {
	const navigate = useNavigate()
	const token = localStorage.getItem('token')

	const handleLogout = () => {
		localStorage.removeItem('token')
		window.location.reload()
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
			<div className='container mx-auto px-4 py-8'>
				<div className='flex justify-between items-center mb-12'>
					<h1 className='text-4xl font-bold text-slate-800'>
						Product Management System
					</h1>
					<div className='flex gap-4'>
						{token ? (
							<>
								<button
									onClick={() => navigate('/admin')}
									className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg'>
									Go to Admin
								</button>
								<button
									onClick={handleLogout}
									className='px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition shadow-lg'>
									Logout
								</button>
							</>
						) : (
							<>
								<button
									onClick={() => navigate('/login')}
									className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg'>
									Login
								</button>
								<button
									onClick={() => navigate('/signup')}
									className='px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-lg'>
									Sign Up
								</button>
							</>
						)}
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
					<div className='bg-white rounded-2xl shadow-lg p-8 border border-slate-200'>
						<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
							<svg
								className='w-8 h-8 text-blue-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
								/>
							</svg>
						</div>
						<h3 className='text-xl font-bold text-slate-800 mb-2'>
							Manage Products
						</h3>
						<p className='text-slate-600'>
							Add, edit, and manage your product catalog with ease
						</p>
					</div>

					<div className='bg-white rounded-2xl shadow-lg p-8 border border-slate-200'>
						<div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4'>
							<svg
								className='w-8 h-8 text-purple-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
								/>
							</svg>
						</div>
						<h3 className='text-xl font-bold text-slate-800 mb-2'>
							Categories
						</h3>
						<p className='text-slate-600'>
							Organize products with customizable color-coded categories
						</p>
					</div>

					<div className='bg-white rounded-2xl shadow-lg p-8 border border-slate-200'>
						<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
							<svg
								className='w-8 h-8 text-green-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
								/>
							</svg>
						</div>
						<h3 className='text-xl font-bold text-slate-800 mb-2'>
							Secure Admin
						</h3>
						<p className='text-slate-600'>
							Role-based access control ensures only admins can manage products
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
