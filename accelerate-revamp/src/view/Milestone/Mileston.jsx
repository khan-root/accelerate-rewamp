import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useMilestoneServices from '../../viewModel/milestoneViewModel/milestoneServices'
import { FaPlus } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const Mileston = () => {

    const params = useParams()

    const {gettingMileStones,milstones} = useMilestoneServices()


    useEffect(()=>{
        const id = params.id
        gettingMileStones(id)
    },[])



    console.log('milstones', milstones)

    const taskDetails = milstones?.task_detail
    const employeeDetails = [milstones?.employees_detail]

  return (
    <div className='px-10 py-5 grid grid-cols-12'>
         <div className='col-span-3 shadow-lg rounded-[14px] h-auto'>
            <div className="">
                <div style={{backgroundColor:taskDetails?.view_background}} className='p-4 h-[200px] rounded-tl-[7px] rounded-tr-[7px] flex items-center justify-center'>
                    <span>{taskDetails?.project_name}</span>
                    
                </div>
                 <div className='p-4 rounded-bl-[7px] rounded-br-[7px]'>
                    <div className='border-b border-b-customGray-400 py-2 flex items-center justify-center '>
                        <motion.div whileHover={{scale:1.06}} className='flex items-center justify-center gap-2 text-customBlack-400 text-[16px] w-fit cursor-pointer'>
                            <span className='h-5 w-5 flex items-center justify-center border border-customGray-300 rounded-full text-[12px]'><FaPlus /></span>
                            <span className='text-[13px] text-customBlack-200'>Add member to task</span>
                        </motion.div>
                    </div>
                    <div className="h-[calc(100vh-400px)] max-h-fit overflow-y-auto">
                        {employeeDetails?.map((ele)=>(
                            <div key={ele.id} className='border-b border-b-customGray-400 py-2 ps-2'>
                                <div className='flex items-center gap-2'>
                                    <img src={ele?.dp} className='h-10' alt={`profile-${ele.name}`} />
                                    <div>
                                        <span>{ele?.name}</span>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                        ))}
                    </div>


                    {/*<div className='border-b border-b-customBlack-300 flex items-center gap-4 text-customBlack-400 text-[16px] py-2'>
                        <span>Supervisor</span>
                        <span className='text-[13px] text-customBlack-200'>{projectInfo?.supervisor}</span>
                    </div>
                    <div className='border-b border-b-customBlack-300 flex flex-col gap-1 text-customBlack-400 text-[16px] py-2'>
                        <span>Project Description</span>
                        <span className='text-[13px] text-customBlack-200'>{projectInfo?.description}</span>
                    </div>
                    <div className='flex items-center gap-4 text-customBlack-400 text-[16px] pt-2'>
                        <span>Workflow</span>
                        <span className='text-[13px] text-customBlack-200'>{projectInfo?.template_name}</span>
                    </div>*/}
                </div> 
            </div>
        </div>
        <div className='col-span-9'></div>
    </div>
  )
}

export default Mileston