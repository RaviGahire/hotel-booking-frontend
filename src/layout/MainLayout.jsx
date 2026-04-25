import React from 'react'
import { Header } from '../components/common/Header'

export const MainLayout = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <main>
        {children}
      </main>
    </>
  )
}
