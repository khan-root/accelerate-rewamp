import React from 'react'
import useTabToggle from '../../services/__tabToggleService'
import { statisticsToggleData } from '../../utils/statisticsUtils'
import { motion } from 'framer-motion'
import IndividualStatistics from './IndividualStatistics'
import OrganizationnStatistics from './OrganizationnStatistics'

const Statistics = () => {
    const {tabToggleState, currentState} = useTabToggle()

  return (
    <div className='px-10 py-5 space-y-6'>
        <div className='text-[20px] text-customBlack-300'>
            <span>Statistics</span>
        </div>
        <div className='flex items-center gap-4'>

            {statisticsToggleData.map((ele)=>(
                <div key={ele.id} 
                    className={`${
                        currentState === ele.id? "text-white" : "hover:text-customBlack/60 text-customBlack-200"
                    } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                onClick={() => tabToggleState(ele.id)}
                >
                    {currentState === ele.id && (
                    <motion.span
                        layoutId={`bubble-workflow`}
                        className="absolute inset-0 z-10 bg-[#8bc9f8]"
                        style={{ borderRadius: 9999 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    )}
                    <span className='relative cursor-pointer text-[14px] z-20' >{ele.title}</span>
                </div>
            ))}
        </div>
        {currentState === 1 ? 

            <IndividualStatistics />

        
        :
        currentState === 2 ?

            <OrganizationnStatistics />

        :
        null
    
        }
    </div>
  )
}

export default Statistics