'use client'

import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from '../../../admin/pages/AdminDashboard'
import AdminHome from '../../../admin/pages/AdminHome'
import AddProduct from '../../../admin/pages/AddProduct'
import ManageProducts from '../../../admin/pages/ManageProducts'
import AddCategory from '../../../admin/pages/AddCategory'
import ManageCategories from '../../../admin/pages/ManageCategories'
import AddBlog from '../../../admin/pages/AddBlog'
import ManageBlogs from '../../../admin/pages/ManageBlogs'
import Users from '../../../admin/pages/Users'
import AllOrders from '../../../admin/pages/AllOrders'
import CompletedOrders from '../../../admin/pages/CompletedOrders'
import ProtectedAdminRoute from '../../../components/ProtectedAdminRoute'
import { usePathname } from 'next/navigation'

export default function AdminPage() {
  const pathname = usePathname()
  // Strip the leading /admin to get the sub-path for MemoryRouter initial entry
  const initialEntry = pathname.replace(/^\/admin/, '') || '/'

  return (
    <MemoryRouter initialEntries={[initialEntry]} initialIndex={0}>
      <ProtectedAdminRoute>
        <Routes>
          <Route path="/" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/manage" element={<ManageProducts />} />
            <Route path="products/add-category" element={<AddCategory />} />
            <Route path="products/manage-categories" element={<ManageCategories />} />
            <Route path="blogs/add" element={<AddBlog />} />
            <Route path="blogs/manage" element={<ManageBlogs />} />
            <Route path="users" element={<Users />} />
            <Route path="orders/all" element={<AllOrders />} />
            <Route path="orders/completed" element={<CompletedOrders />} />
          </Route>
        </Routes>
      </ProtectedAdminRoute>
    </MemoryRouter>
  )
}
