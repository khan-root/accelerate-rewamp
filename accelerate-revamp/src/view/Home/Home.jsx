import React, { useEffect } from 'react'
import dashboardAnimation from '../../assets/images/dashboard.gif'
import { Button } from '@material-tailwind/react'
import Calendar from './Calendar'
import useHomeServices from '../../viewModel/homeViewModel/homeServices'
import { taksToggleMainData, taksToggleSubData } from '../../utils/homeUtils'
import { motion } from 'framer-motion'
import { LuLayoutList } from 'react-icons/lu'
import { titleNameAlpha } from '../../services/__colorServices'
import { FaClockRotateLeft } from 'react-icons/fa6'
import { DDY } from '../../services/__dateTimeServices'
const Home = () => {

    const {calendarData,getInComingTasks, getCalendarTaskLabel,getCalendarTasks,gettingHomeTask,getCalendarTasksLabel,
        toggleState, toggleValue
    } = useHomeServices()

    useEffect(()=>{
        gettingHomeTask()
    },[])

    // console.log('toggleState', toggleValue.taskData)
  return (
    <div className='px-10 py-5 space-y-6'>
        <div className='text-[20px] text-customBlack-300'>
            <span>Dashboard</span>
        </div>
        <div className='bg-customBlue-200 border border-customBlue-300 flex justify-between p-4 w-[70%] rounded-lg'>
            <div className='flex flex-col gap-3'>
                <span className='text-customBlack-400 text-[25px]'>Hi, Badar Khan</span>
                <span className='text-customBlack-400 text-[18px]'>You have 0 tasks to deliver by today, Change the world - Keep going to your tasks.</span>
                <div>
                    <Button className='bg-customBlue-100 capitalize py-2 px-4 font-medium text-[12px] rounded-full' >Let's Start</Button>
                </div>
            </div>
            <img src={dashboardAnimation} alt='dashboard'
                style={{
                    height:"200px"
                }}
            />
        </div>

        <div className='flex items-center gap-4'>

            {taksToggleMainData.map((ele)=>(
                <div key={ele.id} 
                    className={`${
                        toggleValue.main === ele.id? "text-white" : "hover:text-customBlack/60 text-customBlack-200"
                    } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                onClick={() => toggleState('main', ele.id)}
                >
                    {toggleValue.main === ele.id && (
                    <motion.span
                        layoutId={`bubble-taskmain`}
                        className="absolute inset-0 z-10 bg-[#8bc9f8]"
                        style={{ borderRadius: 9999 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    )}
                    <span className='relative cursor-pointer text-[14px] z-20' >{ele.title}</span>
                </div>
            ))}
        </div>

        <div className='flex items-center gap-4'>

            {taksToggleSubData.map((ele)=>(
                <div key={ele.id} 
                    className={`${
                        toggleValue.sub === ele.id? "text-white" : "hover:text-customBlack/60 text-customBlack-200"
                    } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                onClick={() => toggleState('sub', ele.id)}
                >
                    {toggleValue.sub === ele.id && (
                    <motion.span
                        layoutId={`bubble-tasksub`}
                        className="absolute inset-0 z-10 bg-[#8bc9f8]"
                        style={{ borderRadius: 9999 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    )}
                    <span className='relative cursor-pointer text-[12px] z-20' >{ele.title}</span>
                </div>
            ))}
        </div>        
        <div className='border border-customBlue-300 p-4 w-[70%] rounded-lg'>

            {toggleValue?.taskData?.map((ele, i)=>{
                // const { bgColor } = titleNameAlpha(ele.project_name);
                return(
                    <div className='grid grid-cols-12 gap-2 py-2 border-b border-b-customGray-600' key={i}>
                        <div className='flex flex-row items-center gap-3 col-span-6'>
                            <span className='text-customBlue-100 text-[20px]'><LuLayoutList /></span>
                            <motion.span whileHover={{scale:1.04}} className='cursor-pointer'>{ele?.title}</motion.span>
                        </div>
                        <div className='col-span-4'>
                            <motion.span whileHover={{scale:1.1}} className='cursor-pointer' style={{color: ele?.view_background}}>{ele?.project_name}</motion.span>
                        </div>
                        <div className='col-span-2 flex items-center gap-2 justify-end text-customGray-500 text-[12px]'>
                            <span><FaClockRotateLeft /></span>
                            <span>{DDY(ele?.deadline_date)}</span>
                        </div>
                    </div>
                )
            })}
        </div>

        <div className='border border-customBlue-300 flex justify-between p-4 w-[70%] rounded-lg'>
            <Calendar 
                calendarData = {calendarData}
                getCalendarTaskLabel = {getCalendarTaskLabel}
                getCalendarTasks = {getCalendarTasks}
                getCalendarTasksLabel = {getCalendarTasksLabel}
            />
        </div>
    </div>
  )
}

export default Home