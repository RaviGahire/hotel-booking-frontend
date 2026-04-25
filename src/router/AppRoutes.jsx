import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import { HomePage } from '../pages/public/HomePage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { CustomerDashboard } from '../components/dashboard/CustomerDashboard'
import { AdminDashboard } from '../components/dashboard/AdminDashboard'
import { VendorDashboard } from '../components/dashboard/VendorDashboard'
import { BookingPage } from '../pages/public/BookingPage'
import { HotelDetailPage } from '../pages/public/HotelDetailPage'

export const AppRoutes = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/customer' element={<CustomerDashboard />} />
                    <Route path='/admin' element={<AdminDashboard />} />
                    <Route path='/vendor' element={<VendorDashboard />} />
                    <Route path='/hotels' element={<HotelDetailPage />} />
                    <Route path='/booking' element={<BookingPage />} />
                </Routes>
            </MainLayout>
        </Router>
    )
}
