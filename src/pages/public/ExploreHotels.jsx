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

                {/* Hotel cards */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredHotels.length > 0 ? (
                        filteredHotels.map((hotel) => (
                            <div
                                key={hotel._id}
                                className="group backdrop-blur-xl bg-white/30 rounded-md overflow-hidden border border-white/40 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Image Container */}
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={'https://media.istockphoto.com/id/1028621094/photo/service-bell-on-hotel-reception-desk.jpg?s=2048x2048&w=is&k=20&c=-YJfkchCeNBeSOyAgj6PdWO1turxXOjCoLjOLbtRRRY='}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 backdrop-blur-md bg-white/70 px-3 py-1 rounded-full shadow-sm">
                                        <span className="text-xs font-bold tracking-wider text-slate-900 flex items-center gap-1">
                                            ⭐ {hotel.rating}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold text-slate-900 leading-tight tracking-tight mb-1">
                                            {hotel.name}
                                        </h3>
                                        <p className="flex items-center gap-1.5 text-slate-600 text-sm font-medium tracking-wide">
                                            <span className="text-blue-500/80 text-base">📍</span>
                                            {hotel.location?.city}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/hotel/${hotel._id}`)}
                                        className="w-full py-3 bg-slate-900 text-white rounded-2xl text-sm font-semibold tracking-wide uppercase hover:bg-black active:scale-95 transition-all"
                                    >
                                        Explore Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-32">
                            <h3 className="text-slate-400 text-2xl font-light tracking-tight italic">
                                No hotels found matching your search.
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </LayOutSkeleton>
    );
}
