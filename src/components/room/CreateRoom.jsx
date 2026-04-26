import React, { useState } from 'react'
import { InputField, SelectField } from '../form/FormFields'
import { LayOutSkeleton } from '../common/PageSkeleton'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
export const CreateRoom = () => {
    const [room, setRoom] = useState({
        type: '',
        price: '',
        amenities: '',
        roomNumber: '',
        isAvailable: ''
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setRoom(({ ...room, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/rooms/`, 
                room,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});

            // console.log('Success:', response.data);

            alert('Room Added succesfully!');

        } catch (error) {
            // Axios errors are handled here
            console.error('Error saving room:', error.response?.data || error.message);
        }
    };
    return (
        <LayOutSkeleton bgImage={'https://images.pexels.com/photos/7380282/pexels-photo-7380282.jpeg'}>
            <div className="absolute inset-0 top-30 flex items-center justify-center px-4 ">
                <div className="backdrop-blur-sm border border-white/15 rounded-2xl p-6 md:p-4 shadow-2xl w-full max-w-4xl">

                    <div className="mb-2">
                        <h2 className="text-xl font-bold text-[#ecedee] tracking-tight">Add Room details </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-white p-4">
                        {/* Room Type */}
                        <SelectField
                            defaultOpt='Select room type'
                            onChange={handleChange}
                            options={["single", "double", "suite", "deluxe"]}
                            label={'Room Type'}
                            name={"type"}
                            value={room.type}
                            error={errors.type}
                        />

                        {/* Price */}
                        <InputField
                            label={'Price per Night'}
                            type='number'
                            name={'price'}
                            value={room.price}
                            onChange={handleChange}
                            placeholder='e.g. 150'
                            error={errors.price}
                        />

                        {/* Amenities */}
                        <InputField
                            label={'Amenities'}
                            type='text'
                            name={'amenities'}
                            value={room.amenities}
                            onChange={handleChange}
                            placeholder='WiFi, AC, TV'
                            error={errors.amenities}
                        />

                        {/* Room Number */}
                        <InputField
                            label={'Room Number'}
                            type='number'
                            name={'roomNumber'}
                            value={room.roomNumber}
                            onChange={handleChange}
                            placeholder='Room Number 00'
                            error={errors.roomNumber}
                        />

                        {/* Availability */}
                        <SelectField
                            defaultOpt='Select Availability'
                            onChange={handleChange}
                            options={["true", "false"]}
                            label={'Room Available'}
                            name={"isAvailable"}
                            value={room.isAvailable}
                            error={errors.isAvailable}
                        />

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-[#ecedee] text-[#042053] font-bold text-sm tracking-tight py-3 rounded-lg hover:bg-white transition-all duration-200 shadow-lg mt-2 uppercase"
                            >
                                Add Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </LayOutSkeleton>
    )
}
