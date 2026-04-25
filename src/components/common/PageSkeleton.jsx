import React from 'react'
import { Navbar } from './Navbar'

export const PageSkeleton = ({ bgImage, children }) => {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            <div className="relative md:max-w-7xl mx-auto w-full h-full flex justify-center items-center">
                <HorizontalScale className="absolute top-0 w-screen mx-auto" />
                <HorizontalScale className="absolute bottom-0 w-screen mx-auto" />
                <VerticalScale className="absolute left-0 h-screen mx-auto" />
                <VerticalScale className="absolute right-0 h-screen mx-auto" />
                <div className="p-3 md:p-10 size-full flex flex-col justify-between">
                    <div
                        className="relative p-3 md:p-10 size-full shadow-xl 
                        bg-cover bg-center 
                        mask-radial-from-95% mask-b-from-90% mask-t-from-95%"
                        style={{ backgroundImage: `url('${bgImage}')` }}
                    >
                        {/* Navbar */}
                        <Navbar />
                        <Line className="mask-b-from-10% absolute inset-x-0 top-0 hidden md:block" />
                        <Line className="mask-t-from-10% absolute inset-x-0 bottom-0 hidden md:block" />
                    </div>
                    {/* Main Containt*/}
                    {children}
                </div>
            </div>
        </section>
    )
}

export const LayOutSkeleton = ({ bgImage, children }) => {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            <div className="relative md:max-w-7xl mx-auto w-full h-full flex justify-center items-center">
                <HorizontalScale className="absolute top-0 w-screen mx-auto" />
                <HorizontalScale className="absolute bottom-0 w-screen mx-auto" />
                <VerticalScale className="absolute left-0 h-screen mx-auto" />
                <VerticalScale className="absolute right-0 h-screen mx-auto" />
                <div className="p-3 md:p-10 size-full flex flex-col justify-between">
                    <div
                        className="relative p-3 md:p-10 size-full shadow-xl 
                        bg-cover bg-center 
                        mask-radial-from-95% mask-b-from-90% mask-t-from-95%"
                        style={{ backgroundImage: `url('${bgImage}')` }}
                    >
                        {/* Navbar sits on top of every page */}
                        <Navbar />
                        <Line className="mask-b-from-10% absolute inset-x-0 top-0 hidden md:block" />
                        <Line className="mask-t-from-10% absolute inset-x-0 bottom-0 hidden md:block" />
                    </div>
                    {children}
                </div>
            </div>
        </section>
    )
}

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