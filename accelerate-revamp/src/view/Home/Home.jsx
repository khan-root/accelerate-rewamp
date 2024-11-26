import React from 'react'
import dashboardAnimation from '../../assets/images/dashboard.gif'
import { Button } from '@material-tailwind/react'
const Home = () => {
  return (
    <div className='px-10 py-5 space-y-6'>
        <div className='text-[20px] text-black-300'>
            <span>Dashboard</span>
        </div>
        <div className='bg-blue-200 border border-blue-300 flex justify-between p-4 w-[70%] rounded-lg'>
            <div className='flex flex-col gap-3'>
                <span className='text-black-400 text-[25px]'>Hi, Badar Khan</span>
                <span className='text-black-400 text-[18px]'>You have 0 tasks to deliver by today, Change the world - Keep going to your tasks.</span>
                <div>
                    <Button className='bg-blue-100 capitalize py-2 px-4 font-medium text-[12px] rounded-full' >Let's Start</Button>
                </div>
            </div>
            <img src={dashboardAnimation} alt='dashboard'
                style={{
                    height:"200px"
                }}
            />
        </div>
    </div>
  )
}

export default Home