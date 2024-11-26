import React from 'react'
import {motion} from 'framer-motion'
import { FaDiagramProject } from 'react-icons/fa6'
const UserWorkFlows = (props) => {
    const {userData} = props
  return (
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-16'>
        {userData?.map((ele, i)=>(
            <div key={i} className='h-40 w-48 '>
                <div className='flex flex-col items-center gap-4'>
                    <motion.div className='flex items-center justify-center bg-customBlue-100 h-full w-full p-8 rounded-lg cursor-pointer'
                        whileHover={{
                            scale:1.1
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className='text-7xl text-white'><FaDiagramProject /></span>
                    </motion.div>
                    <span className='text-center'>{ele?.name}</span>
                </div>
            </div>
        ))}
    </div>
  )
}

export default UserWorkFlows