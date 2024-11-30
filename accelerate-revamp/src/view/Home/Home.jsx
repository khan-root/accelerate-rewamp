import React, { useEffect } from 'react'
import dashboardAnimation from '../../assets/images/dashboard.gif'
import { Button } from '@material-tailwind/react'
import Calendar from './Calendar'
import useHomeServices from '../../viewModel/homeViewModel/homeServices'
const Home = () => {

    const {calendarData,getInComingTasks, getCalendarTaskLabel} = useHomeServices()

    useEffect(()=>{
        getInComingTasks()
    },[])
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

        <div className='border border-customBlue-300 flex justify-between p-4 w-[70%] rounded-lg'>
            <Calendar 
                calendarData = {calendarData}
                getCalendarTaskLabel = {getCalendarTaskLabel}
            />
        </div>
    </div>
  )
}

export default Home