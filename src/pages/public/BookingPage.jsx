import React, { useState } from 'react'
import { InputField, SelectField } from '../../components/form/FormFields'

export const BookingPage = () => {
  const [booking, setBooking] = useState({
    roomId: "",
    checkIn: "",
    checkOut: "",
    totalAmount: "",
    status: "pending",
  })

  const handleSubmit = (e) => {
    e.preventDefault();

  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setBooking({ ...booking, [name]: value })

  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded border w-full max-w-md space-y-4"
      >
        <h2 className="text-lg font-semibold text-center">Book Now</h2>

        <InputField
          label="Full Name"
          name="name"
          value={booking.fullName}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={booking.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <SelectField
          label="Room Type"
          name="roomType"
          value={booking.roomType}
          onChange={handleChange}
          options={["Standard", "Deluxe", "standard"]}
        />

        <InputField
          label="Date"
          name="date"
          type="date"
          value={booking.date}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded text-sm"
        >
          Book Now
        </button>
      </form>

    </div>
  )
}
