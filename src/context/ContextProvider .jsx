import React, { useEffect, useState } from 'react'
import { ContextData } from './Context'
import { FetchUsers } from '../hooks/FetchUsers'


export const ContextProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState({})

    console.log(loggedInUser)

    useEffect(() => {
        ; (
            async () => {
                // endpoint method data
                const currentUser = await FetchUsers('auth/users/me')
                // console.log(currentUser)
                setLoggedInUser(currentUser)
            }
        )()


    }, [])


    return (
        <ContextData.Provider value={{ loggedInUser, }}>
            {children}
        </ContextData.Provider>
    )
}
