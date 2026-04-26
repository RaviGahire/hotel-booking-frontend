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
import { AddHotel } from '../components/hotel/AddHotel'
import { UpdateHotel } from '../components/hotel/UpdateHotel'
import { PaymentForm } from '../components/payment/PaymentForm'
import { ExploreHotels } from '../pages/public/ExploreHotels'
import { Deals } from '../pages/public/Deals'
import { CreateRoom } from '../components/room/CreateRoom'

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
                    <Route path='/add-hotel' element={<AddHotel />} />
                    <Route path='/update-hotel/:hotelId' element={<UpdateHotel />} />
                    <Route path='/confirm-payment' element={<PaymentForm />} />
                    <Route path='/explore' element={<ExploreHotels/>} />
                    <Route path='/deals' element={<Deals/>} />
                    <Route path='/add-room' element={<CreateRoom/>} />
                </Routes>
            </MainLayout>
        </Router>
    )
}
