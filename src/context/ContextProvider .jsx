import React, { useEffect, useState } from 'react'
import { ContextData } from './Context'
import { FetchAllBackendData } from '../hooks/FetchAllBackendData'



export const ContextProvider = ({ children }) => {

  const [loggedInUser, setLoggedInUser] = useState({});
  const [hotels, setHotels] = useState([]);
  const [mybooking, setMyBooking] = useState({})

  // console.log(mybooking)


  const logout = () => {
    localStorage.removeItem("token");
    setLoggedInUser(null);
    alert("Logged out succesfully")
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await FetchAllBackendData("auth/users/me");
        const hotelsData = await FetchAllBackendData("admin/hotels");
        const myBookings = await FetchAllBackendData("booking/my-bookings");

        setLoggedInUser(user?.data?.data);
        setHotels(hotelsData?.data?.data);
        setMyBooking(myBookings?.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <ContextData.Provider value={{ logout, hotels, loggedInUser,mybooking }}>
      {children}
    </ContextData.Provider>
  );
};