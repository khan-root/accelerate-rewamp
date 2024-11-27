import React from 'react'
import { GoTasklist } from 'react-icons/go'
import { IoBarChart, IoRocket } from 'react-icons/io5'
import useProjectsServices from '../../viewModel/projectsViewModel/projectsServices'
import { projectToggleData } from '../../utils/projectsUtils'
import { motion } from 'framer-motion'
import { CgSearch } from 'react-icons/cg'

const Projects = () => {
  const { projectState, toggleProjectsState} = useProjectsServices()
  return (
    <div className='px-10 py-5 space-y-6 '>
      <div className='text-[20px] text-customBlack-300'>
        <span>Projects</span>
      </div>
      <div className='grid grid-cols-12 border-[.5px] border-customBlack-400 rounded-lg py-6 px-8'>
        <div className='col-span-6 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div>
              <span className='bg-customPink-100 h-20 w-20 flex items-center justify-center text-white text-[30px] rounded-lg'>
                <IoRocket />
              </span>
            </div>
            <div className='flex flex-col items-center gap-1 text-customBlack-300'>
              <span className='text-[18px]'>Projects</span>
              <span className='text-[16px]'> 30 Total</span>
            </div>
          </div>
          <div className='w-[1px] h-[70%] bg-customBlack-300'></div>
          <div className='flex items-center gap-4'>
            <div>
              <span className='bg-customPurple-100 h-20 w-20 flex items-center justify-center text-white text-[30px] rounded-lg'>
                <IoBarChart />
              </span>
            </div>
            <div className='flex flex-col items-center gap-1 text-customBlack-300'>
              <span className='text-[18px]'>28 Active</span>
              <span className='text-[16px]'> 2 Inactive</span>
            </div>
          </div>
          <div className='w-[1px] h-[70%] bg-customBlack-300'></div>
          <div className='flex items-center gap-4'>
            <div>
              <span className='bg-customBlue-500 h-20 w-20 flex items-center justify-center text-white text-[30px] rounded-lg'>
                <GoTasklist />
              </span>
            </div>
            <div className='flex flex-col items-center gap-1  text-customBlack-300'>
              <span className='text-[18px]'>Tasks</span>
              <span className='text-[16px]'> 572 Total</span>
            </div>
          </div>
        </div>
        <div className='col-span-6'>right</div>
      </div>
      <div className='flex gap-4 items-center'>
        <div class="w-full max-w-sm min-w-[200px]">
          <div class="relative flex items-center">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute w-5 h-5 top-2.5 left-2.5 text-customBlack-600">
              <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
            </svg> */}
            <span className="absolute w-5 h-5 top-2.5 left-2.5 text-customBlue-500"><CgSearch /></span>
        
            <input
            class="w-full bg-transparent placeholder:text-customBlack-400 text-customBlack-700 text-sm border-b border-b-customBlack-300  pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-b-customBlack-400 hover:border-b-customBlack-300  focus:shadow-bottom"
            placeholder="Search" 
            />
          </div>
        </div>
        <div className='flex items-center gap-4'>
            {projectToggleData.map((ele)=>(
                <div key={ele.id} 
                    className={`${
                        projectState.state === ele.id? "text-white" : "hover:text-customBlack/60 text-customBlack-200 border-[.5px] border-customBlack-400"
                    } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                onClick={() => toggleProjectsState(ele)}
                >
                    {projectState.state === ele.id && (
                    <motion.span
                        layoutId={`bubble-projects`}
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
    </div>
  )
}

export default Projects