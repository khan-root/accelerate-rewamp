import React from 'react'
import { toggleDataWorkFlowTemplate } from '../../utils/workFlowsUtils'
import {motion} from 'framer-motion'

const ViewTemplate = (props) => {
    const {viewTemplate,handleToggleSubViewTemplate} = props
    console.log('viewTemplate', viewTemplate)
    const prevFlowData = viewTemplate?.prevFlowData
  return (
    <div className='space-y-4'>
        <div className='flex items-center gap-10'>
            <div className='p-4 rounded-lg' style={{backgroundColor:prevFlowData.color_code}}>
                <img src={prevFlowData?.icon} alt={`img-${prevFlowData.id}`}  className='h-[50px] w-[50px]'/>
            </div>
            <span className='text-black-100 text-[20px]'>{prevFlowData?.name}</span>
        </div>
        <div className='flex items-center gap-4'>
            {toggleDataWorkFlowTemplate.map((ele)=>(
                <div key={ele.id} 
                    className={`${
                        viewTemplate?.toggleState === ele.id? "text-white" : "hover:text-black/60 text-black-200"
                    } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                    onClick={() => handleToggleSubViewTemplate(ele.id)}
                >
                    {viewTemplate?.toggleState === ele.id && (
                    <motion.span
                        layoutId={`bubble-workflow-view`}
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
            viewTemplate?.toggleState === 1 ?

            <div>
                list
            </div> 
            :
            viewTemplate?.toggleState === 2 ?

            <div>
                flow
            </div>

            :
            null
        }
    </div>
  )
}

export default ViewTemplate