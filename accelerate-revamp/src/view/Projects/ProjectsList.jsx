import React from 'react'
import { calculateDaysLeft } from '../../services/__projectsServices'
import { motion } from 'framer-motion'

const ProjectsList = (props) => {
    const {ele,projectDetails} = props
  return (
   <motion.div className='w-full h-[200px] rounded-lg flex flex-col gap-2 cursor-pointer' style={{backgroundColor:ele?.view_background}}
    whileHover={{scale:1.05}} transition={{ duration: 0.3 }}
    onClick={()=>projectDetails(ele)}
   >
        <div  className='flex-1'></div>
        <div className='flex items-center justify-center text-wrap text-center'>
            <span className='text-white'>{ele?.name}</span>

        </div>
        <div className='flex-1 p-2 flex flex-col items-center gap-1'>
            <span className="text-[12px] text-center text-white">{ele?.proj_progress}% Progress</span>
            <div className="w-full border border-white bg-transparent  rounded-full h-4">
                <div
                    className="bg-white  h-full rounded-full"
                    style={{ width: `${ele?.proj_progress}%` }}
                ></div>
                </div>
        </div>
        <div className='flex-1 flex justify-end text-white text-[13px] pe-4'>
            <span>{calculateDaysLeft(ele?.closing_date)}</span>
        </div>
    </motion.div>
  )
}

export default ProjectsList