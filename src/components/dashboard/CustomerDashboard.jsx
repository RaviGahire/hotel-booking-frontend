import { useState } from "react";
import { ContextData } from '../../context/Context'
import { useContext } from 'react'


export const CustomerDashboard = () => {
    const [profilePic, setProfilePic] = useState(null);
    const { loggedInUser } = useContext(ContextData)
    const [bookings, setBookings] = useState([
        {
            id: 1,
            hotel: "Grand Palace",
            room: "Deluxe Room",
            date: "2026-04-20",
        },
        {
            id: 2,
            hotel: "Sea View Resort",
            room: "Suite",
            date: "2026-05-02",
        },
    ]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 p-6">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Profile Section */}
                <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-6">
                    <div className="relative">
                        <img
                            src={
                                profilePic ||
                                loggedInUser?.avatar
                            }
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border"
                        />
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="absolute bottom-0 left-0 opacity-0 w-full h-full cursor-pointer"
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">{loggedInUser?.fullName}</h2>
                        <p className="text-gray-500">{loggedInUser?.email}</p>
                        <p className="text-sm text-gray-400 mt-1">
                            {loggedInUser?.role}
                        </p>
                    </div>
                </div>

                {/* Booked Rooms */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4">Booked Rooms</h3>

                    {bookings.length === 0 ? (
                        <p className="text-gray-500">No bookings yet</p>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                            {bookings.map((item) => (
                                <div
                                    key={item.id}
                                    className="border rounded-xl p-4 hover:shadow transition"
                                >
                                    <h4 className="font-semibold">{item.hotel}</h4>
                                    <p className="text-gray-600">{item.room}</p>
                                    <p className="text-sm text-gray-400">
                                        Date: {item.date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
