import React, { useState } from 'react'
import { LayOutSkeleton } from '../common/PageSkeleton'
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import { InputField, TextareaField } from '../form/FormFields';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL
export const UpdateHotel = () => {
   const { hotelId } = useParams(); 
const navigate = useNavigate();
const location = useLocation();

// passed data 
const hotelData = location.state?.data;
const [editHotel, setEditHotel] = useState(hotelData || {});
const [errors, setErrors] = useState({});

const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setEditHotel((prev) => ({
        ...prev,
        [name]: type === 'file' ? files[0] : value
    }));
};

const validate = (data) => {
    const errorData = {};
    if (!data.name) errorData.name = "Hotel name is required";
    if (!data.location) errorData.location = "Location is required";
    
    if (!data.images) errorData.images = "At least one image is required";
    
    if (!data.amenities) errorData.amenities = "Please list at least one amenity";
    
    if (data.rating === '' || data.rating === null) {
        errorData.rating = "Rating is required";
    } else if (Number(data.rating) < 0 || Number(data.rating) > 5) {
        errorData.rating = "Rating must be between 0 and 5";
    }

    if (!data.description) {
        errorData.description = "Description is required";
    } else if (data.description.length < 20) {
        errorData.description = "Description should be at least 20 characters";
    }
    setErrors(errorData);
    return Object.keys(errorData).length === 0;
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(editHotel)) return;

    const formData = new FormData();
    formData.append('name', editHotel.name);
    formData.append('location', editHotel.location);
    
    // Only append images if it's a new File object
       if (editHotel.images instanceof File) {
        formData.append('images', editHotel.images);
    }
        formData.append('amenities', editHotel.amenities);
    formData.append('rating', editHotel.rating);
    formData.append('description', editHotel.description);

    try {
       
        const { data } = await axios.put(`${API_URL}/hotels/${hotelId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (data.success) {
            alert("Hotel updated successfully!");
            navigate('/vendor');
        }
    } catch (err) {
        console.error("Update failed", err.response?.data || err.message);
        alert(err.response?.data?.message || "Update failed");
    }
};
    return (
        <LayOutSkeleton bgImage={'https://images.pexels.com/photos/7380282/pexels-photo-7380282.jpeg'}>
            <div className="absolute inset-0 top-30 flex items-center justify-center px-4 ">
                <div className="backdrop-blur-sm border border-white/15 rounded-2xl p-6 md:p-4 shadow-2xl w-full max-w-4xl">
                    
                    <div className="mb-2">
                        <h2 className="text-xl font-bold text-[#ecedee] tracking-tight">Add Your Hotel</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-white p-4">
                        <InputField
                            label="Hotel Name"
                            name="name"
                            type="text"
                            value={editHotel.name}
                            onChange={handleChange}
                            error={errors.name}
                            placeholder={'Hotel Name'}
                        />
                        <InputField
                            label="Location"
                            name="location"
                            type="text"
                            value={editHotel.location}
                            onChange={handleChange}
                            error={errors.location}
                            placeholder={'Hotel location'}
                        />

                        {/* File Input: value prop is removed to prevent InvalidStateError */}
                        <InputField
                            label="Images"
                            name="images"
                            type="file"
                            onChange={handleChange}
                            error={errors.images}
                        />
                        
                        <InputField
                            label="Amenities"
                            name="amenities"
                            type='text'
                            value={editHotel.amenities}
                            onChange={handleChange}
                            error={errors.amenities}
                            placeholder={'Add Amenities'}
                        />

                        <div className="md:col-span-1">
                            <InputField
                                label="Rating"
                                name="rating"
                                type='number'
                                value={editHotel.rating}
                                onChange={handleChange}
                                error={errors.rating}
                                placeholder={'Give the rating'}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextareaField
                                label={"Description"}
                                name={'description'}
                                value={editHotel.description}
                                onChange={handleChange}
                                error={errors.description}
                                placeholder={"Add description"}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-[#ecedee] text-[#042053] font-bold text-sm tracking-tight py-3 rounded-lg hover:bg-white transition-all duration-200 shadow-lg mt-2 uppercase"
                            >
                                Update Hotel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </LayOutSkeleton>
    );
}
