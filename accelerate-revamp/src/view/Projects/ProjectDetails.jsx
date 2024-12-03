import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProjectDetailsServices from '../../viewModel/projectsViewModel/projectDetailsServices'
import { projectDetailsToggleData } from '../../utils/projectsUtils'
import useTabToggle from '../../services/__tabToggleService'
import { motion } from 'framer-motion'
import CustomButton from '../../components/CustomButton'
import { FaPlus, FaSort } from 'react-icons/fa6'
import { Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import { MdFilterAlt } from 'react-icons/md'
import ProjectTable from './ProjectTable'

const ProjectDetails = () => {

    const {gettingProjectTasks, projectTasksData} = useProjectDetailsServices()
    const projectInfo = projectTasksData?.data?.project_info
    const tasksData = projectTasksData?.data?.project_tasks

    // console.log('tasksData', tasksData)

    const params = useParams()
    useEffect(()=>{
        gettingProjectTasks(params.id)
    },[])


    const {tabToggleState, currentState} = useTabToggle()

  return (
    <div className='ps-5 pt-10 grid grid-cols-12'>
        <div className='col-span-3 shadow-lg rounded-[14px] h-[450px]'>
            <div className="">
                <div style={{backgroundColor:projectInfo?.view_background}} className='p-4 h-[200px] rounded-tl-[7px] rounded-tr-[7px]'>
                    <span>{projectInfo?.name}</span>
                    
                </div>
                <div className='p-4 rounded-bl-[7px] rounded-br-[7px]'>
                    <div className='border-b border-b-customBlack-300 flex items-center gap-4 text-customBlack-400 text-[16px] py-2'>
                        <span>Creator</span>
                        <span className='text-[13px] text-customBlack-200'>{projectInfo?.creator_name}</span>
                    </div>
                    <div className='border-b border-b-customBlack-300 flex items-center gap-4 text-customBlack-400 text-[16px] py-2'>
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
                    </div>
                </div>
            </div>
        </div>
        <div className='col-span-9 h-[calc(100vh-132px)] overflow-y-auto ps-3 space-y-5'>
            <div className='flex items-center gap-4 justify-center'>
                <div className='text-customBlack-200'>
                    <span>Show Task In</span>
                </div>
                <div className='flex items-center gap-4'>

                    {projectDetailsToggleData.map((ele)=>(
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
            </div>
            <div className='flex items-center justify-between pe-12'>
                <div>
                    <CustomButton 
                        icon={<FaPlus />}
                        title="Add Task"

                    />
                </div>
                <div className='flex items-center gap-2'>
                    <Menu>
                        <MenuHandler className="cursor-pointer border border-customBlack-400 text-customBlack-400 flex flex-row items-center gap-1 px-3 py-1 rounded-xl text-[13px]">
                            <div className=''>

                                <span><MdFilterAlt /></span>
                                <span>Filter</span>
                            </div>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem className="flex items-center gap-2">
                               
                        
                                <Typography variant="small" className="font-medium">
                                    My Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2 ">
                               
                                <Typography variant="small" className="font-medium">
                                    Log Out
                                </Typography>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuHandler className="cursor-pointer border border-customBlack-400 text-customBlack-400 flex flex-row items-center gap-1 px-3 py-1 rounded-xl text-[13px]">
                            <div className=''>

                                <span><FaSort /></span>
                                <span>Filter Assigned By</span>
                            </div>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem className="flex items-center gap-2">
                               
                        
                                <Typography variant="small" className="font-medium">
                                    My Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2 ">
                               
                                <Typography variant="small" className="font-medium">
                                    Log Out
                                </Typography>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
            <div>
                <ProjectTable 
                    tasksData = {tasksData}
                />
            </div>
            
            
        </div>
    </div>
  )
}

export default ProjectDetails