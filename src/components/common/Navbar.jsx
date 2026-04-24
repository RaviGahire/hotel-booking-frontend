import { IconMenu2 } from '@tabler/icons-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    const [menuOpen , setMenuOpen] = useState(false)

    const tabs = [
        { title: "", path: '/' },
        { title: "Login", path: '/login' },
        { title: "Register", path: '/register' },
    ]

    return (
        <nav  >
            <div className='logo'>Logo</div>
            <div className={`nav-links ${menuOpen ? "open" : ""} `}>
                {
                    tabs.map((item) => (

                        <NavLink
                            key={item.title}
                            to={item.path}
                            onClick={()=>setMenuOpen(false)}
                            
                            >
                            {item.title}
                        </NavLink>
                    ))
                }
            </div>
            <div className="menu-icon" onClick={()=>setMenuOpen(!menuOpen)}>
                <IconMenu2 stroke={2} />
            </div>
        </nav>
    )
}
