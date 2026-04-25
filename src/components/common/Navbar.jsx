import { IconMenu2 } from '@tabler/icons-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const tabs = [
 
        { title: "Register", path: '/register' },
        { title: "Login", path: '/login' }
        
    ]

    return (
     <nav className="relative z-100 flex items-center justify-between ">
  
  {/* Logo */}
<div className="text-lg md:text-xl font-bold text-white bg-[#042053] px-2 py-1 rounded-md ">
  {/* <div className="w-12 h-12 md:w-16 md:h-16">
    <img
      src="https://mcflyworld.com/branding/01KMG0514GTBEC08PAS5YN1D08.png"
      alt="mcflyworld"
      className="w-full h-full object-contain"
    />
  </div> */}
  Logo
</div>

  {/* Nav Links */}
  <div
    className={`absolute md:static top-full left-0 w-full md:w-auto 
    bg-white md:bg-transparent shadow-md md:shadow-none
    flex flex-col md:flex-row items-center gap-6 
    px-6 py-4 md:p-0
    transition-all duration-300 ease-in-out
    ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"}`}
  >
    {tabs.map((item) => (
      <NavLink
        key={item.title}
        to={item.path}
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `text-white hover:text-neutral-300 font-medium transition px-2 py-1 bg-[#042053]/80 rounded-md duration-200 ${
            isActive ? "text-black" : null
          }`
        }
      >
        {item.title}
      </NavLink>
    ))}
  </div>

  {/* Menu Icon */}
  <button
    className="md:hidden text-gray-800 cursor-pointer "
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <IconMenu2 stroke={2} />
  </button>

</nav>
    )
}
