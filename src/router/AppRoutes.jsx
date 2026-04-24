import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import { HomePage } from '../pages/HomePage'
import { About } from '../pages/About'
import { Contact } from '../pages/Contact'
import { BookingForm } from '../components/form/Book'
import { Login } from '../components/form/Login'
import { Register } from '../components/form/Register'

export const AppRoutes = () => {
    return (
        <Router>
           <MainLayout>
             <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/book' element={<BookingForm/>}/>
            </Routes>
           </MainLayout>
        </Router>
    )
}
