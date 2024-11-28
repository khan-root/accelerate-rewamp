import React, { useState } from 'react'
import { DMYT } from '../../services/__dateTimeServices'
import { LuClock5 } from 'react-icons/lu'
import { HiDotsVertical } from 'react-icons/hi'
import { motion } from 'framer-motion'
import useMouseHoverService from '../../services/__mouseHoverService'

const TeamsList = (props) => {
    const {ele} = props
    const oneid = 10268458
    const {isHovered, handleMouseEnter, handleMouseLeave} = useMouseHoverService()
    
  return (
    <div className='flex flex-col gap-2'>
        <motion.div whileHover={{scale:1.05}} transition={{ duration: 0.3 }} className='w-full h-[200px] rounded-lg flex items-center justify-center gap-2 cursor-pointer relative' style={{backgroundColor:ele?.color_code}}
            onMouseEnter={handleMouseEnter} // Trigger on hover
            onMouseLeave={handleMouseLeave} // Trigger on hover end
        >
            <span className='text-8xl text-white'>{ele.name[0]}</span>
            {isHovered && ele?.oneid == oneid && (
                <motion.div
                    className='text-2xl text-white absolute right-2 top-3 z-4'
                    whileHover={{
                        scale: 1.3,
                        transition: { duration: 0.2 }, // Smooth transition
                    }}
                >
                        <HiDotsVertical />
                </motion.div>
            )} 
        </motion.div>
        <div className='flex flex-col items-center gap-1'>
            <span className='text-customBlack-400 text-[17px] text-center'>{ele?.name}</span>
            <span className='text-customBlack-400 text-[17px] text-center'>added By: {ele?.owner_name}</span>
            <div className='flex flex-row items-center gap-2'>
                <span><LuClock5 /></span>
                <span className='text-customBlack-400 text-[13px]'>{DMYT(ele?.entry_time)}</span>
            </div>
        </div>
    </div>
  )
}

export default TeamsList