import React from "react";
import { LayOutSkeleton } from "../../components/common/PageSkeleton";
import { useContext } from "react";
import { ContextData } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export const HotelDetailPage = () => {
  const { hotels } = useContext(ContextData)
  console.log(hotels)


  return (
    <>
      <HotelGrid data={hotels} />
    </>
  );
};


const HotelGrid = ({ data }) => {
  const nav = useNavigate()


  return (
    <LayOutSkeleton bgImage={'https://images.pexels.com/photos/6836370/pexels-photo-6836370.jpeg'}>
      <div className="absolute top-31  left-0 right-0 px-4 md:px-10 overflow-y-auto max-h-[calc(100vh-7rem)]">

        {/* Header */}
        <div className="mb-3 text-center">
          <p className="text-[#01060b] text-xs font-semibold tracking-widest uppercase mb-1">
            Available
          </p>
          <h2 className="text-2xl uppercase md:text-3xl font-bold text-[#ecedee] tracking-tight">
            Hotels
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8 px-2">
          {data?.map((hotel) => (
            <div
              key={hotel._id || hotel.name}
              className="group backdrop-blur-sm border cursor-pointer border-white/15 
          rounded-2xl overflow-hidden 
          hover:border-white/30 
          transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={hotel.images?.[0]?.url}
                  alt={hotel.name}
                  className="w-full h-full object-cover 
              group-hover:scale-105 transition-transform duration-500"
                />
                {/* Rating badge */}
                <div className="absolute top-3 right-3 
            bg-[#042053]/70 backdrop-blur-sm 
            border border-white/20
            text-[#ecedee] text-xs font-bold 
            px-2 py-1 rounded-lg flex items-center gap-1">
                  ★ {hotel.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-base font-bold text-[#fefefe] tracking-tight truncate">
                  {hotel.name}
                </h2>

                <p className="text-xs text-[#000102] flex items-center gap-1">
                  {hotel.location?.city}, {hotel.location?.country}
                </p>

                <p className="text-xs text-[#ecedee]/60 line-clamp-2 leading-relaxed">
                  {hotel.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {hotel.amenities?.slice(0, 3).map((item, i) => (
                    <span
                      key={i}
                      className="text-xs text-[#ecedee]/70 
                  bg-white/10 border border-white/15
                  px-2 py-0.5 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-2 mt-auto border-t border-white/10">
                  <div>
                    <p className="text-xs text-[#ecedee]/40 font-medium">Per night</p>
                    <p className="text-sm font-bold text-[#ecedee]">
                      ₹{hotel?.price || "Not"}
                    </p>
                  </div>
                  <button
                    onClick={() => nav('/booking', {
                      state: { hotelId: hotel._id }
                    })}
                    className="text-xs cursor-pointer 
                bg-[#ecedee] text-[#042053]
                font-bold px-4 py-1.5 rounded-lg
                hover:bg-white transition-all duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayOutSkeleton>

  );
};

export default HotelGrid;