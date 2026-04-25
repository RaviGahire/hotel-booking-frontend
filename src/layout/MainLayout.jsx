import React from 'react'
import { Header } from '../components/common/Header'

export const MainLayout = ({ children }) => {
  return (
    <main aria-label='main-section'>
      {children}
    </main>

  )
}
