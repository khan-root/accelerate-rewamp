import React from 'react'
import CustomNavbar from './components/CustomNavbar'
import { Router } from './Routers'

const App = () => {
  return (
    <div className='font-poppins flex flex-col h-screen w-screen'>
      <div>
        <CustomNavbar />
      </div>
      <div className='flex-1'>
        <Router />
      </div>
      <div>
        <span>Footer</span>
      </div>

    </div>
  )
}

export default App