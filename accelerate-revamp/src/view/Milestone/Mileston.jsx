import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useMilestoneServices from '../../viewModel/milestoneViewModel/milestoneServices'
import { FaCheck, FaPlus} from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { GoMilestone, GoTasklist } from 'react-icons/go'
import { IoCalendarClearOutline } from 'react-icons/io5'
import { DMYT } from '../../services/__dateTimeServices'
import { LuMoveRight } from 'react-icons/lu'
import { CiStar } from 'react-icons/ci'
import { Typography } from '@material-tailwind/react'
import MilestonesList from './MilestonesList'

const Mileston = () => {

    const params = useParams()

    const {gettingMileStones,milstones} = useMilestoneServices()


    useEffect(()=>{
        const id = params.id
        gettingMileStones(id)
    },[])



    
    const taskDetails = milstones?.task_detail
    const employeeDetails = milstones?.employees_detail
    const taskMilestones = milstones?.task_milestones


    console.log('taskMilestones', taskMilestones)

  return (
    <div className='px-10 py-5 grid grid-cols-12 '>
         <div className='col-span-3 shadow-lg rounded-[14px] h-auto'>
            <div className="sticky top-0 z-10 bg-white">
                <div style={{backgroundColor:taskDetails?.view_background}} className='p-4 h-[200px] rounded-tl-[7px] rounded-tr-[7px] flex items-center justify-center text-white text-wrap text-center'>
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
                            <div key={ele?.id} className='border-b border-b-customGray-400 py-2 ps-2'>
                                <div className='flex items-center gap-4'>
                                    <img src={ele?.dp} className='h-10' alt={`profile-${ele?.name}`} />
                                    <div>
                                        <span>{ele?.name}</span>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div> 
            </div>
        </div>
        <div className='col-span-7 ps-3 space-y-5'>
            <div className='sticky top-0 z-10 bg-white space-y-5'>
                <div className='flex items-center gap-2'>
                    <div>
                        <span className='text-[60px]'><GoTasklist /></span>
                    </div>
                    <div className='flex flex-col text text-customBlack-400'>
                        <span className='text-[13px]'>{taskDetails?.title}</span>
                        <span className='text-[11px]'>{taskDetails?.task_type === "0" ? "Indoor" : "Client Visit"}</span>
                        <span className='text-[11px]'>{taskDetails?.description}</span>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className='flex items-center gap-1'>
                        <div className='flex flex-row items-center gap-2 text-[12px] text-customBlack-400'>
                            <div className='flex items-center gap-1'>
                                <span><IoCalendarClearOutline /></span>
                                <span>{taskDetails?.start_date && DMYT(taskDetails?.start_date)}</span>
                            </div>
                            <span>
                                <LuMoveRight />
                            </span>
                            <div className='flex items-center gap-1'>
                                <span><IoCalendarClearOutline /></span>
                                <span> {taskDetails?.deadline_date && DMYT(taskDetails?.deadline_date)}</span>
                            </div>
                        </div>
                        <span>
                            <FaPlus />
                        </span>
                        <span>
                            <CiStar />
                        </span>
                        <span className='border border-customGray-300 h-5 w-5 flex items-center justify-center rounded-full text-[12px]'>
                            <FaCheck />
                        </span>
                    </div>
                </div>
                <div className='flex items-center justify-evenly border border-customGray-400 rounded-xl py-3'>
                    <div className="flex flex-col items-center gap-2">
                        <span>Milestones</span>
                        <div 
                            style={{
                                width: 120,
                                height: 120,
                                position: "relative",

                            }}
                            className='border-[10px] border-[#f0f0f0] rounded-full flex items-center justify-center'
                        >
                            <span className='text-[#1aafd0] text-[50px]'><GoMilestone /></span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span>Progress</span>
                        <CircularProgress percentage={10} color="#3BE8B0"/>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span>Deadline</span>
                        <CircularProgress percentage={50} color="#FF8A9F"/>
                    </div>
                </div>
                <Typography variant='h5' className='text-customBlack-400'>Milestones</Typography>
                
            </div>
            <div className="">
                {taskMilestones?.map((taskMilestone, i)=>(
                    <MilestonesList 
                        key={taskMilestone.id}
                        data = {taskMilestone}
                        index = {i}
                    />
                ))}
            </div>
            
            
        </div>
    </div>
  )
}

export default Mileston


const CircularProgress = ({ percentage, color }) => {
    const radius = 50; // Radius of the circle
    const strokeWidth = 10; // Width of the progress bar
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div
            style={{
                width: 120,
                height: 120,
                position: "relative",
                cursor: "pointer",
            }}
            className="circular-progress"
        >
            <svg width="120" height="120">
                {/* Background Circle */}
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="progress-circle"
                    style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "50% 50%", // Rotate around the center
                        transition: "stroke-width 0.3s ease-in-out",
                    }}
                />
            </svg>
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: color,
                }}
            >
                {percentage}%
            </div>

            <style>
                {`
                .circular-progress:hover .progress-circle {
                    stroke-width: 14; /* Increase stroke width on hover */
                }
                `}
            </style>
        </div>
    );
};



