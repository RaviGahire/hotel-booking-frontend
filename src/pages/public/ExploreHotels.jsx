import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayOutSkeleton } from '../../components/common/PageSkeleton';
import { InputField, SelectField } from '../../components/form/FormFields';
import { ContextData } from '../../context/Context';
import { useContext } from 'react';

export const ExploreHotels = () => {
    const { hotels } = useContext(ContextData)
    const [hotelsData, setHotelsData] = useState(hotels);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState("All");



    // Dynamic Filtering Logic
    const filteredHotels = hotels.filter((hotel) => {
        const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCity = selectedCity === "All" || hotel.location?.city === selectedCity;
        return matchesSearch && matchesCity;
    });

    // Get unique cities for the filter dropdown
    const cities = ["All", ...new Set(hotels.map(h => h.location?.city))];

    return (
        <LayOutSkeleton bgImage={'https://media.istockphoto.com/id/146765403/photo/a-luxurious-florida-beach-hotel-during-sunrise.jpg?s=2048x2048&w=is&k=20&c=IvfMrAT6rGuIQ5sKj41ovSRdmhvs6WGRpV3VLle6EhA='}>
            <div className="absolute inset-0 max-w-300 mx-auto top-32 backdrop-blur-sm scroll-auto">
                {/* Search & City Filter */}
                <div className="mx-auto mb-4 px-5 md:px-8 py-2 ">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-1/2 text-white">
                            <InputField
                                type='text'
                                placeholder={'Search hotels'}
                                onChange={(e) => setSearchTerm(e.target.value)}

                            />
                        </div>

                        {/* City Dropdown */}
                        <div className="w-full md:w-1/4">
                            <SelectField
                                defaultOpt='Fiter By City'
                                options={[...cities]}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: Hotel Display */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHotels.length > 0 ? (
                        filteredHotels.map((hotel) => (
                            <div key={hotel._id} className="backdrop-blur-md rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow">
                                <img
                                    src={ 'https://media.istockphoto.com/id/1028621094/photo/service-bell-on-hotel-reception-desk.jpg?s=2048x2048&w=is&k=20&c=-YJfkchCeNBeSOyAgj6PdWO1turxXOjCoLjOLbtRRRY='}
                                    alt={hotel.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-slate-800">{hotel.name}</h3>
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                                            ⭐ {hotel.rating}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-4">📍 {hotel.location?.city}</p>
                                    <button
                                        onClick={() => navigate(`/hotel/${hotel._id}`)}
                                        className="w-full py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-slate-400 text-xl font-medium">No hotels found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </LayOutSkeleton>
    );
}
