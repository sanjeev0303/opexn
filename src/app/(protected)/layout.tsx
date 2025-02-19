import React from 'react'

const ProtectedLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className='h-dvh w-screen bg-black'>
        {
            children
        }
    </div>
  )
}

export default ProtectedLayout
