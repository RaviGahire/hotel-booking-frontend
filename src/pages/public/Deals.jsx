import React from 'react'
import { LayOutSkeleton } from '../../components/common/PageSkeleton'

export const Deals = () => {
  return (
  <LayOutSkeleton bgImage={'https://images.pexels.com/photos/11262174/pexels-photo-11262174.jpeg'}>
   <div className="backdrop-blur-sm absolute inset-0 top-32 flex items-center justify-center">
    <h2 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl tracking-tighter uppercase">
        Under Construction
    </h2>
</div>
  </LayOutSkeleton>
  )
}
