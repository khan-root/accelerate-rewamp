import React from 'react'
import CustomNavbar from './components/CustomNavbar'
import { Router } from './Routers'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='relative font-poppins flex flex-col h-screen w-screen'>
      <div className='h-[60px] relative z-40'>
        <CustomNavbar />
      </div>
      <div className='flex-1 h-[calc(100vh-50px]) overflow-auto'>
        <Router />
      </div>
      <div className=''>
       <Footer />
      </div>

    </div>
  )
}

export default App