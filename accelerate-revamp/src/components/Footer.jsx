import React from 'react'
import footerLogo from '../assets/images/footerLogo.png'
const Footer = () => {
  return (
    <div className='bg-customGray-100 flex items-center justify-center py-2'>
        <div className='flex flex-row items-center gap-2'>
            <img src={footerLogo} alt='footer' />
            <span>Copyright © 2024 All rights reserved</span>
            <span>-</span>
            <span>A Product of</span>
            <span>Veevo Tech</span>
        </div>
    </div>
  )
}

export default Footer