import React from 'react'
import { FaTrash } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const Starred = (props) => {
    const { data,handleRemoveFromFav } = props
  return (
    <div className='bg-customBlue-600 rounded-lg flex items-center gap-3 py-4 justify-between px-2'>
        <div className='flex items-center flex-col'>
            <img className='w-[40px] object-contain' src={data?.dp} alt={`${data.id, data.task_id}`} />
            <span className='text-[10px]'>{data?.name}</span>
        </div>
        
        <div className='flex-1'> 
            <span>{data?.comment}</span>
        </div>
        <div>
            <motion.span whileHover={{scale:1.1}} className='text-customRed-300 cursor-pointer' onClick={()=>handleRemoveFromFav(data)}>
                <FaTrash />
            </motion.span>
        </div>
    </div>
  )
}

export default Starred