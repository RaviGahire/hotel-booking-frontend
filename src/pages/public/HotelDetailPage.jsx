import React from "react";
import { useContext } from "react";
import { ContextData } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export const HotelDetailPage = () => {
  const { hotel } = useContext(ContextData)
  // console.log(hotel)


  return (
    <>
    <HotelGrid data={hotel} />
    </>
  );
};


const HotelGrid = ({ data }) => {
 const nav=  useNavigate()
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        
        {data?.map((hotel) => (
          <div
            key={hotel._id || hotel.name}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={hotel.images?.[0]?.url}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{hotel.name}</h2>

              <p className="text-sm text-gray-500 line-clamp-2">
                {hotel.description}
              </p>
              <p className="text-sm text-gray-600">
                 {hotel.location?.city}, {hotel.location?.country}
              </p>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities?.slice(0, 3).map((item, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-yellow-500 font-medium">
                  {hotel.rating}
                </span>

                <button onClick={()=>{nav('/booking')}} className="text-sm cursor-pointer bg-black text-white px-3 py-1 rounded-lg">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelGrid;