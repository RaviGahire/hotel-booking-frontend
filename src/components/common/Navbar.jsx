import { IconMenu2, IconX, IconUser, IconChevronDown } from '@tabler/icons-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { ContextData } from '../../context/Context'

const navLinks = [
  { title: "Hotels", path: '/hotels' },
  { title: "Explore", path: '/explore' },
  { title: "Deals", path: '/deals' },
  { title: "About", path: '/about' },
]

const authTabs = [
  { title: "Register", path: '/register' },
  { title: "Login", path: '/login' },
]

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { loggedInUser } = useContext(ContextData)

  return (
    <nav className="relative z-[100] flex items-center justify-between px-1 py-1">

      {/* Left — Logo + Nav Links */}
      <div className="flex items-center gap-6">

        {/* Logo */}
        <div className="text-base font-bold text-white 
          bg-white/15 border border-white/25 
          px-3 py-1.5 rounded-md tracking-tight backdrop-blur-sm">
          Logo
        </div>

        {/* Desktop nav links — next to logo */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200
                ${isActive
                  ? 'text-white bg-white/20'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Right — Auth / User */}
      <div className="hidden md:flex items-center gap-2">
        {loggedInUser ? (
          <div className="flex items-center gap-2 
            bg-white/10 border border-white/20 
            px-3 py-1.5 rounded-md cursor-pointer hover:bg-white/20 transition-all duration-200">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <IconUser size={13} className="text-white" />
            </div>
            <span className="text-white/90 text-sm font-medium">{loggedInUser.name}</span>
            <IconChevronDown size={14} className="text-white/60" />
          </div>
        ) : (
          <>
            <NavLink to="/register"
              className={({ isActive }) =>
                `text-sm font-semibold px-4 py-1.5 rounded-md transition-all duration-200
                text-white/80 hover:text-white hover:bg-white/10
                ${isActive ? 'bg-white/10 text-white' : ''}`
              }>
              Register
            </NavLink>
            <NavLink to="/login"
              className={({ isActive }) =>
                `text-sm font-semibold px-4 py-1.5 rounded-md transition-all duration-200
                bg-[#ecedee] text-[#042053] hover:bg-white
                ${isActive ? 'ring-2 ring-white/40' : ''}`
              }>
              Login
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-white/80 hover:text-white 
          bg-white/10 border border-white/20 
          p-1.5 rounded-md transition-all duration-200 hover:bg-white/20 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <IconX size={18} stroke={2} /> : <IconMenu2 size={18} stroke={2} />}
      </button>

      {/* Mobile Dropdown */}
      <div className={`md:hidden absolute top-full left-0 right-0 mt-2 
        bg-[#042053]/95 backdrop-blur-md 
        border border-white/10 rounded-lg 
        shadow-xl overflow-hidden
        transition-all duration-300 ease-in-out
        ${menuOpen ? 'opacity-100 translate-y-0 max-h-96' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'}`}
      >
        <div className="flex flex-col p-3 gap-1">
          {/* Nav links section */}
          <p className="text-white/30 text-xs font-semibold uppercase tracking-widest px-2 pt-1 pb-1">Explore</p>
          {navLinks.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium px-3 py-2 rounded-md transition-all duration-200
                ${isActive ? 'text-white bg-white/20' : 'text-white/70 hover:text-white hover:bg-white/10'}`
              }
            >
              {item.title}
            </NavLink>
          ))}

          {/* Divider */}
          <div className="border-t border-white/10 my-2" />

          {/* Auth links */}
          {!loggedInUser ? (
            <div className="flex flex-col gap-1">
              {authTabs.map((item, i) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-semibold px-3 py-2 rounded-md transition-all text-center duration-200
                    ${i === authTabs.length - 1
                      ? `bg-[#ecedee] text-[#042053] hover:bg-white ${isActive ? 'ring-2 ring-white/30' : ''}`
                      : `text-white/80 hover:text-white hover:bg-white/10 ${isActive ? 'bg-white/10' : ''}`
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2">
              <IconUser size={14} className="text-white/60" />
              <span className="text-white/80 text-sm">{loggedInUser.name}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}