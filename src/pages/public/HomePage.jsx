import React from "react";
import { Navbar } from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { PageSkeleton } from "../../components/common/PageSkeleton";

export const HomePage = () => {
  return (
    <>
      <PageSkeleton
        bgImage={
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1332&auto=format&fit=crop"
        }
      >
        {/* Hero Content */}
        <div className="flex flex-col gap-5 max-w-xl px-4 md:px-8 absolute bottom-16 md:bottom-24">
          {/* Badge */}
          <div
            className="flex items-center gap-2 w-fit 
    bg-white/10 border border-white/20 
    backdrop-blur-sm rounded-full 
    px-3 py-1"
          >
            <span className="w-2 h-2 rounded-full bg-[#ecedee] animate-pulse" />
            <span className="text-[#ecedee] text-xs font-semibold tracking-widest uppercase">
              Best Hotels Across India
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl 
    font-bold tracking-tight leading-[1.1]
    text-[#ecedee]"
          >
            Discover <br className="hidden md:block" />
            <span className="text-white">Comfort</span> Across{" "}
            <br className="hidden md:block" />
            the India.
          </h1>

          {/* Subtext */}
          <p
            className="text-sm md:text-base font-medium 
   text-[#042053]  max-w-md leading-relaxed"
          >
            Discover a smarter way to book hotels. Compare top properties,
            explore real experiences, and secure your stay in just a few clicks.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => nav("/hotels")}
              className="bg-[#ecedee] text-[#042053] 
        font-bold text-sm tracking-tight
        py-2.5 px-6 rounded-md 
        hover:bg-white transition-all duration-200 
        cursor-pointer shadow-md"
            >
              Book Now
            </button>
            <button
              onClick={() => nav("/hotel-list")}
              className="bg-transparent text-[#ecedee] 
        font-bold text-sm tracking-tight
        py-2.5 px-6 rounded-md 
        border border-[#ecedee]/40
        hover:bg-white/10 transition-all duration-200 
        cursor-pointer backdrop-blur-sm"
            >
              Explore →
            </button>
          </div>
        </div>
      </PageSkeleton>
    </>
  );
};
