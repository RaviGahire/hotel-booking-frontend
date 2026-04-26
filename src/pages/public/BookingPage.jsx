import React, { useState } from 'react'
import { InputField, SelectField } from '../../components/form/FormFields'
import { useLocation, useNavigate } from 'react-router-dom'
import { LayOutSkeleton } from '../../components/common/PageSkeleton'
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const BookingPage = () => {
  //Hotel Id
  const location = useLocation();
  const hotelId = location.state?.hotelId;
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})

  // console.log("Hotel id" , hotelId)
  const [booking, setBooking] = useState({
    hotelId: hotelId,
    checkIn: "",
    checkOut: "",
    totalAmount: "",
  })
  // console.log(booking)

  const handleChange = (e) => {
    const { name, value } = e.target
    setBooking({ ...booking, [name]: value })

  }

  const validate = (booking) => {
    const errorData = {};
    if (!booking.checkIn) {
      errorData.checkIn = "check-In date required";
    }
    if (!booking.checkOut) {
      errorData.checkOut = "check-Out date required";
    }
    if (!booking.totalAmount) {
      errorData.totalAmount = "Amount is required";
    }

    setErrors(errorData);
    return errorData;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    //error handler
    const err = validate(booking);
    const error = Object.keys(err);
    // console.log(error)
    if (error.length) return;
    // console.log(booking)

    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${API_URL}/booking/hotel/${hotelId}`,
        booking,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(res)
      if (res?.data?.success) {
        alert("Booking successfull")
        navigate('/confirm-payment', {
          state: {
            bookingId: res?.data?.booking?._id,
            amount: res?.data?.booking?.totalAmount
          }
        }

        )
      } else {
        alert(res?.data?.message || "Something went wrong")
      }

    } catch (error) {
      alert(error.response?.data?.message || "An error occurred")
      console.log(error)
    }
  }

  return (
    <LayOutSkeleton bgImage={'https://images.pexels.com/photos/33561760/pexels-photo-33561760.jpeg'} >
      <div className="absolute inset-0 top-30 flex items-center justify-center px-4 ">
        <div className="backdrop-blur-sm border border-white/15 rounded-2xl
    p-6 md:p-8 shadow-2xl w-full max-w-4xl">

          {/* Header */}
          <div className="mb-2">
            <p className="text-black text-xs font-semibold tracking-widest uppercase mb-1">
              Reserve Your Stay
            </p>
            <h2 className="text-2xl font-bold text-[#ecedee] tracking-tight">
              Book Room Now
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <InputField
              label="Check-in Date"
              name="checkIn"
              type="date"
              value={booking.checkIn}
              onChange={handleChange}
              error={errors.checkIn}
            />
            <InputField
              label="Check-out Date"
              name="checkOut"
              type="date"
              value={booking.checkOut}
              onChange={handleChange}
              error={errors.checkOut}
            />
            <InputField
              label="Amount"
              name="totalAmount"
              type="number"
              value={booking.totalAmount}
              onChange={handleChange}
              error={errors.totalAmount}
            />
            {/* <SelectField
              label="status"
              name="status"
              options={["confirmed", "cancelled", "completed"]}
              type="text"
              value={booking.status}
              onChange={handleChange}
              error={errors.status}
            /> */}

            <button
              type="submit"
              className="w-full cursor-pointer
          bg-[#ecedee] text-[#042053]
          font-bold text-sm tracking-tight
          py-2.5 rounded-lg
          hover:bg-white transition-all duration-200
          shadow-md mt-1"
            >
              Confirm Booking
            </button>

          </form>
        </div>

      </div>
    </LayOutSkeleton>
  )
}
