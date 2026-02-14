import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e) => {
		if (e.target.name === 'phone') {
			// Only allow numbers
			const value = e.target.value.replace(/\D/g, '')
			if (value.length <= 10) {
				setFormData({
					...formData,
					phone: value,
				})
			}
		} else {
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
			})
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Validate passwords match
		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match!')
			return
		}

		if (formData.phone.length !== 10) {
			toast.error('Please enter a valid 10-digit phone number')
			return
		}

		setIsLoading(true)

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/auth/signup`,
				{
					phone: formData.phone,
					email: formData.email,
					password: formData.password,
				}
			)

			if (response.data.success) {
				const { token, user } = response.data.data

				// Store token
				localStorage.setItem('token', token)

				toast.success(`Account created successfully! Welcome!`, {
					position: 'top-right',
					autoClose: 2000,
				})

				// Redirect to home or admin based on role
				setTimeout(() => {
					if (user.role === 'admin') {
						navigate('/admin')
					} else {
						navigate('/')
					}
				}, 1000)
			}
		} catch (error) {
			console.error('Signup error:', error)
			const errorMessage =
				error.response?.data?.message || 'Signup failed. Please try again.'
			toast.error(errorMessage, {
				position: 'top-right',
				autoClose: 4000,
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
			<ToastContainer />

			<div className='w-full max-w-md'>
				<div className='bg-white rounded-2xl shadow-2xl p-8 border border-slate-200'>
					<div className='text-center mb-8'>
						<h1 className='text-3xl font-bold text-slate-800 mb-2'>
							Create Account
						</h1>
						<p className='text-slate-600'>Sign up to get started</p>
					</div>

					<form onSubmit={handleSubmit}>
						<div className='mb-6'>
							<label className='block text-sm font-semibold text-slate-700 mb-2'>
								Phone Number
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<img
										src="https://flagcdn.com/w20/in.png"
										alt="Indian Flag"
										className="w-5 h-auto mr-2"
									/>
									<span className="text-gray-500 font-medium">+91</span>
								</div>
								<input
									type='tel'
									name='phone'
									value={formData.phone}
									onChange={handleChange}
									className='w-full pl-20 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
									placeholder='Enter your phone number'
									required
								/>
							</div>
						</div>

						<div className='mb-6'>
							<label className='block text-sm font-semibold text-slate-700 mb-2'>
								Email Address
							</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
								placeholder='Enter your email'
								required
							/>
						</div>

						<div className='mb-6'>
							<label className='block text-sm font-semibold text-slate-700 mb-2'>
								Password
							</label>
							<input
								type='password'
								name='password'
								value={formData.password}
								onChange={handleChange}
								className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
								placeholder='Enter your password'
								minLength='6'
								required
							/>
						</div>

						<div className='mb-6'>
							<label className='block text-sm font-semibold text-slate-700 mb-2'>
								Confirm Password
							</label>
							<input
								type='password'
								name='confirmPassword'
								value={formData.confirmPassword}
								onChange={handleChange}
								className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
								placeholder='Confirm your password'
								minLength='6'
								required
							/>
						</div>

						<button
							type='submit'
							disabled={isLoading}
							className={`w-full py-3 rounded-lg font-semibold transition ${isLoading
								? 'bg-slate-400 cursor-not-allowed'
								: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
								}`}>
							{isLoading ? (
								<span className='flex items-center justify-center gap-2'>
									<svg
										className='animate-spin h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
									</svg>
									Creating account...
								</span>
							) : (
								'Sign Up'
							)}
						</button>
					</form>

					<div className='mt-6 text-center'>
						<p className='text-sm text-slate-600'>
							Already have an account?{' '}
							<a
								href='/login'
								className='text-blue-600 hover:text-blue-700 font-semibold'>
								Sign in
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Signup
