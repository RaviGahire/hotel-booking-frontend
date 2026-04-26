import React, { useState } from "react";
import { LayOutSkeleton } from "../common/PageSkeleton";
import { ContextData } from "../../context/Context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UpdateProfile } from "../../pages/auth/UpdateProfile";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL
export const VendorDashboard = () => {
  const { loggedInUser, hotels ,logout } = useContext(ContextData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userImage, setUserImage] = useState('default-pic.jpg')

  // console.log(hotels)

  const handleDelete = async (hotelId) => {

    if (!hotelId) {
      alert("Hotel ID is missing");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this hotel? This action cannot be undone.");
    if (!confirmDelete) return;

    try {

      const res = await axios.delete(`${API_URL}/hotels/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.status === 200 || res.data.success) {

        alert("Hotel deleted successfully");
      }
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to delete hotel. Please try again.");
    }
  };

  return (
    <LayOutSkeleton bgImage={'https://images.pexels.com/photos/19922026/pexels-photo-19922026.jpeg'}>
      <div className="min-h-screen  px-10 absolute top-30 left-0 right-0 mx-w-7xl ">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Vendor Profile  */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-gray-800 border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="flex  flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 bg-slate-100 mb-4">
                    <img
                      src={loggedInUser?.avatar}
                      alt="Vendor Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-white">{loggedInUser?.fullName}</h2>
                  {/* Profile modal */}
                  <div>
                    <button className="uppercase text-green-400 cursor-pointer"
                      onClick={() => setIsModalOpen(true)}>Change Picture</button>
                    <UpdateProfile
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onUploadSuccess={(newUrl) => setUserImage(newUrl)}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Total Hotels</span>
                    <span className="font-semibold text-slate-400">{hotels.length || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Location</span>
                    <span className="font-semibold text-slate-400">Pune, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Vendor Actions & Tables  */}
            <div className="lg:col-span-8 space-y-6">

              {/* Header Action */}
              <div className="flex items-center justify-between bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800">Manage Inventory</h3>
                <Link to={'/add-hotel'} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md">
                  + Add Hotel
                </Link>
                  <Link to={'/add-room'} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md">
                  + Add Room
                </Link>
                {/* Logout */}
                 <button onClick={logout} className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md">
                  Logout
                </button> 
              </div>

              {/* Hotel Info Table */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-auto h-62">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Hotel Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">City</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Ratings</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {hotels.map((hotel) => (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-700">{hotel.name}</td>
                          <td className="px-6 py-4 text-slate-600">{hotel?.location?.city}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">{hotel?.rating}</span>
                          </td>
                          <td className="px-6 flex gap-3 py-4">
                            <Link to={`/update-hotel/${hotel._id}`}
                              state={{ data: hotel }}
                              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Edit</Link>
                            <button onClick={() => { handleDelete(hotel?._id) }} className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                          </td>
                        </tr>
                      ))

                      }
                      {/* More rows... */}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>
    </LayOutSkeleton>
  );
};