import React, { useEffect } from 'react'
import useWorkFlowsServices from '../../viewModel/workFlowsViewModel/workFlowsServices'
import { motion } from 'framer-motion'
import { toggleDataWorkFlows } from '../../utils/workFlowsUtils'
import GeneralWorkFlow from './GeneralWorkFlow'
import UserWorkFlows from './UserWorkFlows'



const WorkFlows = () => {
    
    const {workFlows, gettingWorkFlows, handleToggleStateValue, toggleStateValue} = useWorkFlowsServices()

    const generalData = workFlows?.general_array
    const userData = workFlows?.user_array

    useEffect(()=>{
        gettingWorkFlows()
    },[])

  return (
    <div className='px-10 py-5 space-y-6'>
        <div className='text-[20px] text-black-300'>
            <span>WorkFlows</span>
        </div>
        <div className='space-y-10'>
            <div className='flex items-center gap-4'>
                {toggleDataWorkFlows.map((ele)=>(
                    <div key={ele.id} 
                        className={`${
                            toggleStateValue === ele.id? "text-white" : "hover:text-black/60 text-black-200"
                        } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                        style={{
                            WebkitTapHighlightColor: "transparent",
                        }}
                    onClick={() => handleToggleStateValue(ele.id)}
                    >
                        {toggleStateValue === ele.id && (
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

            {
                toggleStateValue === 1 ? 
                    <GeneralWorkFlow 
                        generalData= {generalData}
                    />
                    :
                    toggleStateValue == 2 ?
                    
                    <UserWorkFlows 
                        userData= {userData}
                    />
                :
                null

            }
        </div>

    </div>
  )
}

export default WorkFlows