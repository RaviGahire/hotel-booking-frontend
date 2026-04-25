import React, { useEffect, useState } from 'react'
import { ContextData } from './Context'
import { FetchAllBackendData } from '../hooks/FetchAllBackendData'
import { useNavigate } from 'react-router-dom'


export const ContextProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState({})
    const [hotel, setHotel] = useState({})

    // console.log(loggedInUser)
    // console.log(hotel)

    //Logout Global
    const logout = () => {
        localStorage.removeItem("token")
    }

    useEffect(() => {
        ; (
            async () => {
                // endpoint method data
                const currentUser = await FetchAllBackendData('auth/users/me')
                // console.log(currentUser)
                setLoggedInUser(currentUser)
                //fetch all hotel data
                const hotelsdata = await  FetchAllBackendData('admin/hotels')
                setHotel(hotelsdata)
                
            }
        )()


    }, [loggedInUser,hotel])


    return (
        <ContextData.Provider value={{ loggedInUser, logout,hotel }}>
            {children}
        </ContextData.Provider>
    )
}
