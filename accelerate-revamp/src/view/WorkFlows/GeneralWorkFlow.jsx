import React from 'react'
import { motion } from 'framer-motion'


const GeneralWorkFlow = (props) => {
    const {generalData} = props
    console.log('generalData', generalData)
  return (
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-10'>
        {generalData?.map((ele, i)=>(
            <div key={i} className='h-40 w-48 '>
                <div className='flex flex-col items-center gap-4'>
                    <motion.div style={{backgroundColor:ele?.color_code}} className='flex items-center justify-center h-full w-full p-4 rounded-lg cursor-pointer'
                        whileHover={{
                            scale:1.1
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <img src={ele?.icon} alt={`workflow-${i}`}/>
                    </motion.div>
                    <span className='text-center'>{ele?.name}</span>
                </div>
            </div>
        ))}
    </div>
  )
}

export default GeneralWorkFlow