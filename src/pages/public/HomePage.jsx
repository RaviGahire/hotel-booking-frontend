import React from "react";
import { Navbar } from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <Hero />
    </>
  );
};

// Hero section
export const Hero = () => {
const nav = useNavigate()




  return (
    <>
      <section className="relative w-full h-screen overflow-hidden">
        {/* Hero */}
        <div className="relative md:max-w-7xl mx-auto w-full h-full flex justify-center items-center">
          <HorizontalScale className={" absolute top-0 w-screen mx-auto"} />
          <HorizontalScale className={" absolute bottom-0 w-screen mx-auto"} />
          <VerticalScale className={"absolute left-0 h-screen mx-auto"} />
          <VerticalScale className={"absolute right-0 h-screen mx-auto"} />
          <div className="p-3 md:p-10 size-full flex flex-col justify-between">
            {/* Hero content */}
            <div
              className="relative p-3 md:p-10 size-full shadow-xl 
              select-none pointer-events-none 
              bg-[url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1332&auto=format&fit=crop')] 
              bg-cover bg-center mask-radial-from-95% mask-b-from-90% mask-t-from-95%"
            >
              <Navbar />
              <Line className="mask-b-from-10% absolute inset-x-0 top-0 hidden md:block" />
              <Line className="mask-t-from-10% absolute inset-x-0 bottom-0 hidden md:block" />
            </div>
            {/* headings */}
            <div className="flex flex-col gap-4 max-w-2xl px-2 md:px-8 absolute bottom-30 text-[#ecedee]">
              <h1 className="capitalize text-5xl md:text-7xl tracking-tight font-bold ">Discover comfort Across the india.</h1>
              <p className="font-semibold text-xl text-[#042053]">Discover a smarter way to book hotels. Compare top properties, explore real experiences, and secure your stay in just a few clicks</p>
              
              <div className="flex justify-between gap-2 max-w-50">
                <button onClick={()=>{nav("/hotels")}} className="bg-[#042053] font-semibold tracking-tight text-md text-white py-2 px-2 rounded-md hover:bg-[#073386] cursor-pointer transition-all duration-200">Book Now</button>
              {/* <button onClick={()=>{nav("/hotel-list")}} className="bg-[#042053] font-semibold tracking-tight text-md text-white py-2 px-2 rounded-md hover:bg-[#073386] cursor-pointer transition-all duration-200">Explore</button> */}
              </div>
 
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const HorizontalScale = ({ className }) => (
  <div
    className={`h-5 md:h-10 w-full 
  bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] 
  bg-size-[10px_10px] border-y border-(--pattern) ${className}`}
  />
);

export const VerticalScale = ({ className }) => (
  <div
    className={`h-full w-5 md:w-10
  bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] 
  bg-size-[10px_10px] border-x border-(--pattern) ${className}`}
  />
);

export const Line = ({ className }) => (
  <div
    className={`h-7 md:h-14 w-full
  bg-[repeating-linear-gradient(to_bottom,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_0.5rem)] ${className}`}
  />
);
