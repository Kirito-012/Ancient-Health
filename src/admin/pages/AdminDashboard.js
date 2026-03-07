import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Menu } from 'lucide-react'

const AdminDashboard = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<div className='flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
			<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

			<div className='flex-1 flex flex-col w-full min-w-0 md:ml-64'>
				{/* Mobile Header */}
				<div className='md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 z-10'>
					<h1 className='text-lg font-bold text-slate-800 tracking-tight'>Admin Panel</h1>
					<button
						onClick={() => setIsSidebarOpen(true)}
						className='p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none'>
						<Menu className="w-6 h-6" />
					</button>
				</div>

				{/* Main Content Area */}
				<main className='flex-1 p-4 md:p-8 w-full max-w-[100vw] overflow-x-hidden'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default AdminDashboard
