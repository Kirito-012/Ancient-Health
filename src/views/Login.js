'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const Login = () => {
	const navigate = useNavigate()
	const { login, mergeLocalCart } = useCart()
	const [mode, setMode] = useState('login')
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [forgotData, setForgotData] = useState({
		email: '',
		otp: '',
	})
	const [changeData, setChangeData] = useState({
		password: '',
		confirmPassword: '',
	})
	const [isLoading, setIsLoading] = useState(false)
	const [isResending, setIsResending] = useState(false)
	const [resendTimer, setResendTimer] = useState(0)
	const [otpVerified, setOtpVerified] = useState(false)
	const [emailPrompt, setEmailPrompt] = useState('')

	React.useEffect(() => {
		if (resendTimer <= 0) return
		const timerId = setInterval(() => {
			setResendTimer((prev) => {
				if (prev <= 1) {
					clearInterval(timerId)
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(timerId)
	}, [resendTimer])

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleForgotChange = (e) => {
		const { name, value } = e.target
		setForgotData((prev) => ({
			...prev,
			[name]: name === 'otp' ? value.replace(/\D/g, '').slice(0, 6) : value,
		}))
		setEmailPrompt('')
	}

	const handleChangePasswordInput = (e) => {
		const { name, value } = e.target
		setChangeData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/auth/login`,
				formData,
			)

			if (response.data.success) {
				const { token, user } = response.data.data

				login(token)
				await mergeLocalCart(token)

				toast.success(`Welcome back, ${user.name}!`, {
					autoClose: 2000,
				})

				setTimeout(() => {
					const returnUrl = localStorage.getItem('returnUrl')
					if (returnUrl) {
						localStorage.removeItem('returnUrl')
						navigate(returnUrl)
					} else if (user.role === 'admin') {
						navigate('/admin')
					} else {
						navigate('/')
					}
				}, 1000)
			}
		} catch (error) {
			console.error('Login error:', error)
			const errorMessage =
				error.response?.data?.message || 'Login failed. Please try again.'
			toast.error(errorMessage, {
				autoClose: 4000,
			})
		} finally {
			setIsLoading(false)
		}
	}

	const handleResendMail = async () => {
		if (resendTimer > 0 || isResending) return
		if (!forgotData.email) {
			toast.error('Please enter your email')
			return
		}

		setIsResending(true)
		setEmailPrompt('')
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/auth/forgot-password/send-otp`,
				{ email: forgotData.email },
			)

			if (response.data.success) {
				setResendTimer(30)
				toast.success('OTP sent to your email', { autoClose: 2500 })
			}
		} catch (error) {
			const serverCode = error.response?.data?.code
			if (serverCode === 'EMAIL_NOT_SIGNED_UP') {
				setEmailPrompt('Email not signed up\nSign up first')
				toast.error('Email not signed up\nSign up first')
				return
			}

			toast.error(
				error.response?.data?.message || 'Failed to send OTP. Please try again.',
				{ autoClose: 3500 },
			)
		} finally {
			setIsResending(false)
		}
	}

	const handleForgotSubmit = async (e) => {
		e.preventDefault()
		if (!forgotData.email || !forgotData.otp) {
			toast.error('Please enter both email and OTP')
			return
		}

		setIsLoading(true)
		setEmailPrompt('')
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/auth/forgot-password/verify-otp`,
				{
					email: forgotData.email,
					otp: forgotData.otp,
				},
			)

			if (response.data.success) {
				setOtpVerified(true)
				setMode('change-password')
				toast.success('OTP verified. Please set your new password.', {
					autoClose: 2200,
				})
			}
		} catch (error) {
			const serverCode = error.response?.data?.code
			if (serverCode === 'EMAIL_NOT_SIGNED_UP') {
				setEmailPrompt('Email not signed up\nSign up first')
				toast.error('Email not signed up\nSign up first')
				return
			}

			toast.error(error.response?.data?.message || 'Invalid or expired OTP', {
				autoClose: 3500,
			})
		} finally {
			setIsLoading(false)
		}
	}

	const handleChangePasswordSubmit = async (e) => {
		e.preventDefault()
		if (!otpVerified) {
			toast.error('Please verify OTP first')
			setMode('forgot-password')
			return
		}

		if (!changeData.password || !changeData.confirmPassword) {
			toast.error('Please fill in both password fields')
			return
		}

		if (changeData.password !== changeData.confirmPassword) {
			toast.error('Passwords do not match')
			return
		}

		setIsLoading(true)
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/auth/forgot-password/reset`,
				{
					email: forgotData.email,
					otp: forgotData.otp,
					password: changeData.password,
				},
			)

			if (response.data.success) {
				toast.success('Password updated successfully. Please sign in.', {
					autoClose: 2500,
				})

				setMode('login')
				setFormData((prev) => ({
					...prev,
					email: forgotData.email,
					password: '',
				}))
				setForgotData({ email: '', otp: '' })
				setChangeData({ password: '', confirmPassword: '' })
				setOtpVerified(false)
				setResendTimer(0)
				setEmailPrompt('')
			}
		} catch (error) {
			toast.error(
				error.response?.data?.message || 'Failed to update password. Try again.',
				{ autoClose: 3500 },
			)
		} finally {
			setIsLoading(false)
		}
	}

	const goToForgotPassword = () => {
		setMode('forgot-password')
		setForgotData((prev) => ({ ...prev, email: formData.email || prev.email }))
		setEmailPrompt('')
	}

	const goToLogin = () => {
		setMode('login')
		setChangeData({ password: '', confirmPassword: '' })
		setOtpVerified(false)
		setEmailPrompt('')
	}

	return (
		<section className='relative min-h-screen flex items-center overflow-hidden bg-[#0f1c18] text-[#e8e6e3]'>
			<Navbar />

			<div className='absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

			<div className='absolute inset-0 z-0 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-b from-[#0f1c18]/30 via-[#0f1c18]/60 to-[#0f1c18] z-10'></div>
				<div className='absolute inset-0'>
					<img
						src='https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=60&w=1920&auto=format&fit=crop'
						alt='Ancient Mystical Forest'
						className='w-full h-full object-cover opacity-50 scale-105'
						style={{ willChange: 'transform' }}
						loading='eager'
						fetchPriority='high'
					/>
				</div>

				<motion.div
					animate={{ opacity: [0.3, 0.5, 0.3] }}
					transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
					className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[80px]'
					style={{ willChange: 'opacity' }}
				/>
			</div>

			<div className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
				<div className='max-w-md mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
						style={{ willChange: 'transform, opacity' }}
					>
						<div className='bg-[#0f1c18]/60 backdrop-blur-xl border border-white/10 rounded-3xl sm:rounded-[2rem] p-6 sm:p-12 overflow-hidden shadow-2xl transform-gpu'>
							<div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
							<div className='absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4a574]/20 to-transparent'></div>

							<div className='text-center mb-8 sm:mb-10'>
								<h1 className='text-3xl sm:text-5xl font-serif font-light text-white mb-2 sm:mb-3'>
									{mode === 'login'
										? 'Welcome Back'
										: mode === 'forgot-password'
											? 'Forgot Password?'
											: 'Change Password'}
								</h1>
								<p className='text-white/60 font-light'>
									{mode === 'login'
										? 'Sign in to continue your wellness journey'
										: mode === 'forgot-password'
											? 'Enter your email and OTP to continue'
											: 'Set your new password'}
								</p>
							</div>

							{mode === 'login' && (
								<form onSubmit={handleSubmit} className='space-y-6'>
									<div>
										<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
											Email Address
										</label>
										<input
											type='email'
											name='email'
											value={formData.email}
											onChange={handleChange}
											className='w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/30 text-white text-sm sm:text-base'
											placeholder='your@email.com'
											required
										/>
									</div>

									<div>
										<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
											Password
										</label>
										<input
											type='password'
											name='password'
											value={formData.password}
											onChange={handleChange}
											className='w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/30 text-white text-sm sm:text-base'
											placeholder='••••••••'
											required
										/>
									</div>

									<div className='text-right -mt-2'>
										<button
											type='button'
											onClick={goToForgotPassword}
											className='text-sm text-[#d4a574] hover:text-[#d4a574]/80 font-serif transition-colors border-b border-[#d4a574]/30 hover:border-[#d4a574]'
										>
											Forgot Password?
										</button>
									</div>

									<button
										type='submit'
										disabled={isLoading}
										className='group relative w-full px-6 py-3 sm:px-10 sm:py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-[#d4a574]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
									>
										<div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
										<span className='relative z-10 flex items-center justify-center space-x-3'>
											<span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
												{isLoading ? 'Signing in...' : 'Sign In'}
											</span>
											{!isLoading && (
												<svg
													className='w-4 h-4 text-[#d4a574] group-hover:text-[#0f1c18] transition-all duration-500 transform group-hover:translate-x-1'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M13 7l5 5m0 0l-5 5m5-5H6'
													/>
												</svg>
											)}
										</span>
									</button>
								</form>
							)}

							{mode === 'forgot-password' && (
								<form onSubmit={handleForgotSubmit} className='space-y-6'>
									<div>
										<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
											Email Address
										</label>
										<input
											type='email'
											name='email'
											value={forgotData.email}
											onChange={handleForgotChange}
											className='w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/30 text-white text-sm sm:text-base'
											placeholder='your@email.com'
											required
										/>
									</div>

									<div>
										<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
											OTP
										</label>
										<input
											type='text'
											name='otp'
											value={forgotData.otp}
											onChange={handleForgotChange}
											className='w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/30 text-white text-sm sm:text-base tracking-[0.2em]'
											placeholder='000000'
											maxLength={6}
											required
										/>
									</div>

									{emailPrompt && (
										<p className='text-red-300 text-sm whitespace-pre-line bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3'>
											{emailPrompt}
										</p>
									)}

									<div className='grid grid-cols-2 gap-3'>
										<button
											type='button'
											onClick={handleResendMail}
											disabled={isResending || resendTimer > 0}
											className='group relative w-full px-4 py-3 bg-transparent overflow-hidden rounded-full border border-[#d4a574]/30 disabled:opacity-50 disabled:cursor-not-allowed'
										>
											<div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
											<span className='relative z-10 uppercase tracking-[0.16em] text-[10px] font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
												{isResending
													? 'Sending...'
													: resendTimer > 0
														? `Resend Mail (${resendTimer}s)`
														: 'Resend Mail'}
											</span>
										</button>

										<button
											type='submit'
											disabled={isLoading}
											className='group relative w-full px-4 py-3 bg-transparent overflow-hidden rounded-full border border-[#d4a574]/30 disabled:opacity-50 disabled:cursor-not-allowed'
										>
											<div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
											<span className='relative z-10 uppercase tracking-[0.16em] text-[10px] font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
												{isLoading ? 'Checking...' : 'Submit'}
											</span>
										</button>
									</div>

									<div className='text-center'>
										<button
											type='button'
											onClick={goToLogin}
											className='text-sm text-[#d4a574] hover:text-[#d4a574]/80 font-serif transition-colors border-b border-[#d4a574]/30 hover:border-[#d4a574]'
										>
											Back to Sign In
										</button>
									</div>
								</form>
							)}

							{mode === 'change-password' && (
								<form onSubmit={handleChangePasswordSubmit} className='space-y-6'>
									<div>
										<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
											Password
										</label>
										<input
											type='password'
											name='password'
											value={changeData.password}
											onChange={handleChangePasswordInput}
											className='w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/30 text-white text-sm sm:text-base'
											placeholder='••••••••'
											required
										/>
									</div>

									<div>
										<label className='block text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest'>
											Confirm Password
										</label>
										<input
											type='password'
											name='confirmPassword'
											value={changeData.confirmPassword}
											onChange={handleChangePasswordInput}
											className='w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/30 text-white text-sm sm:text-base'
											placeholder='••••••••'
											required
										/>
									</div>

									<button
										type='submit'
										disabled={isLoading}
										className='group relative w-full px-6 py-3 sm:px-10 sm:py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 border border-[#d4a574]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
									>
										<div className='absolute inset-0 w-0 bg-[#d4a574] transition-all duration-[700ms] ease-out group-hover:w-full opacity-90'></div>
										<span className='relative z-10 flex items-center justify-center space-x-3'>
											<span className='uppercase tracking-[0.2em] text-xs font-serif text-[#d4a574] group-hover:text-[#0f1c18] transition-colors duration-500'>
												{isLoading ? 'Updating...' : 'Submit'}
											</span>
										</span>
									</button>

									<div className='text-center'>
										<button
											type='button'
											onClick={() => setMode('forgot-password')}
											className='text-sm text-[#d4a574] hover:text-[#d4a574]/80 font-serif transition-colors border-b border-[#d4a574]/30 hover:border-[#d4a574]'
										>
											Back
										</button>
									</div>
								</form>
							)}

							<div className='mt-8 text-center border-t border-white/5 pt-6'>
								{mode !== 'change-password' && (
									<p className='text-sm text-white/60'>
										Don't have an account?{' '}
										<a
											href='/signup'
											className='text-[#d4a574] hover:text-[#d4a574]/80 font-serif transition-colors border-b border-[#d4a574]/30 hover:border-[#d4a574]'
										>
											Sign up
										</a>
									</p>
								)}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}

export default Login
