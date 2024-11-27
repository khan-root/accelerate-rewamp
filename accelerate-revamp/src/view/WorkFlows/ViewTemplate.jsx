import React from 'react'
import { toggleDataWorkFlowTemplate } from '../../utils/workFlowsUtils'
import {motion} from 'framer-motion'
import { FaDiagramProject } from 'react-icons/fa6'

const ViewTemplate = (props) => {
    const {viewTemplate,handleToggleSubViewTemplate} = props
    const prevFlowData = viewTemplate?.prevFlowData
  return (
    <div className='space-y-4'>
        <div className='flex items-center gap-10'>
            {prevFlowData?.color_code ? 
                <div className='p-4 rounded-lg' style={{backgroundColor:prevFlowData.color_code}}>
                    <img src={prevFlowData?.icon} alt={`img-${prevFlowData.id}`}  className='h-[50px] w-[50px]'/>
                </div>
                :
                <div className='flex items-center justify-center bg-customBlue-100 h-[50px] w-[50px] rounded-lg'>
                    <span className='text-[20px] text-white'><FaDiagramProject /></span>
                </div>
            }
            <span className='text-customBlack-100 text-[20px]'>{prevFlowData?.name}</span>
        </div>
        <div className='flex items-center gap-4'>
            {toggleDataWorkFlowTemplate.map((ele)=>(
                <div key={ele.id} 
                    className={`${
                        viewTemplate?.toggleState === ele.id? "text-white" : "hover:text-customBlack/60 text-customBlack-200"
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
                <div className='flex items-center text-[20px] text-customBlack-100 text-center'>
                    <div className='flex-[.2] text-center'>
                        <span className=''>Position</span>
                    </div>
                    <div className='flex-1 text-start'>
                        <span>Name</span>
                    </div>
                </div>
                <div className='space-y-1'>
                    {viewTemplate.data?.map((data, i)=>(
                        <div key={i} className='flex items-center text-[16px] text-customBlack-100'>
                            <div className='flex-[.2] text-center'>
                                <span className=''>{data?.position}</span>
                            </div>
                            <div className='flex-1 text-start'>
                                <span>{data?.name}</span>
                            </div>
                        </div>
                    ))}
                </div> 
            </div>
            :
            viewTemplate?.toggleState === 2 ?

            <div className="flex items-center gap-2 overflow-x-auto">
                {viewTemplate.data?.map((data, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 flex items-center text-[16px] text-customBlack-100 border border-customBlack text-white px-10 py-5 space-x-4 rounded-xl "
                        style={{ backgroundColor: prevFlowData?.color_code ? prevFlowData?.color_code : '#3da5f4' }}
                    >
                    <div className="flex items-center justify-center gap-2 text-white text-[16px] font-semibold">
                        <span>{data?.position}</span>
                        <span>-</span>
                        <span>{data?.name}</span>
                    </div>
                    </div>
                ))}
                </div>
            :
            null
        }
    </div>
  )
}

export default ViewTemplate