import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const Discussion = (props) => {
    const {data,handleAddToStar,handleRemoveFromFav} = props
  return (
   <div className={`flex ${data.name === "Me" ? 'justify-end' : 'justify-start ps-1'}`}>
        <div className='bg-customBlue-600 rounded-lg flex w-[70%] py-4 justify-between px-2'>
            <div>
                <motion.span whileHover={{scale:1.04}} className={`cursor-pointer ${data?.is_notice === "1" ? 'text-customYellow-100' : 'text-customGray-300'}  `}
                    onClick={data?.is_notice === "1" ? ()=>handleRemoveFromFav(data) : ()=>handleAddToStar(data)}
                ><FaStar /></motion.span>
            </div>
            
            <div className='flex flex-row gap-2 px-2 items-center'>
                <div className='space-x-2 text-[13px]'>
                    <span>{data?.name}</span>
                    <span>{data?.comment}</span>
                </div>
                <img className='w-[40px] object-contain' src={data?.dp} alt={`${data.id, data.task_id}`} />
            </div>
        </div>
    </div>
  )
}

export default Discussion