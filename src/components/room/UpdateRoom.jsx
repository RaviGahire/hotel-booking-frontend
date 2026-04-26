import React, { useState } from 'react'
import { InputField, SelectField } from '../form/FormFields'

API_URL = import.meta.env.VITE_API_URL
export const UpdateRoom = () => {
      const [room, setRoom] = useState({
            type: '',
            price: '',
            amenities: '',
            roomNumber: '',
            isAvailable: ''
        })
        const [errors, setErrors] = useState({})
    
        const handleChange = (e) => {
    
        }
    
        const handleSubmit = async (e)=>{
    
        }
  return (
     <div>
              <div>
                  <h2>Create Room</h2>
                  <form onSubmit={handleSubmit}>
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
                      <button type="submit" className="btn-submit">
                          Save Room
                      </button>
                  </form>
              </div>
          </div>
  )
}
