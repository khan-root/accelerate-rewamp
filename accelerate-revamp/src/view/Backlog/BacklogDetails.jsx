
import { backlogViewToggleData } from '../../utils/backlogUtils'
import { LuLayoutList } from 'react-icons/lu'
import {RxCounterClockwiseClock} from 'react-icons/rx'
import { motion } from 'framer-motion'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import useTabToggle from '../../services/__tabToggleService'

const BacklogDetails = () => {
    const {tabToggleState, currentState} = useTabToggle()
  return (
    <div className='space-y-6'>
        <div className='text-[20px] text-customBlack-300'>
            <span>Blocking Management</span>
        </div>
        <div className='flex items-center justify-between'>
            
            <div className='flex items-center gap-4'>
                {backlogViewToggleData?.map((ele)=>(
                    <div key={ele.id} 
                        className={`${
                            currentState === ele.id? "text-white" : "hover:text-customBlack/60 text-customBlack-200 border-[.5px] border-customBlack-400"
                        } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                        style={{
                            WebkitTapHighlightColor: "transparent",
                        }}
                    onClick={() => tabToggleState(ele.id)}
                    >
                        {currentState === ele.id && (
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
            <div className='flex flex-row gap-3'>
                <button className='px-2 py-1 cursor-pointer text-customRed-300 bg-customRed-200 rounded-lg border border-customRed-300 text-[12px]'>Export Backlog</button>
                <button className='px-2 py-1 cursor-pointer text-customBlue-100 bg-customBlue-600 rounded-lg border border-customBlue-100 text-[12px]'>Add Backlog</button>
            </div>

        </div>
        <div className='grid grid-cols-4 gap-4'>
            <div className='flex w-[270px] h-[120px] border border-customBlue-100 rounded-lg bg-customBlue-600 gap-2'>
                <div className='flex-[.4] flex items-center justify-center'>
                    <span className='h-14 w-14 flex items-center justify-center bg-customBlue-100 text-customBlue-600 text-[20px] rounded-full'><LuLayoutList /></span>
                </div>
                <div className='flex-1 flex items-center '>
                    <div className='flex flex-col items-center '>
                        <span className='text-center text-[20px] font-semibold'>5</span>
                        <span className='text-center'>Total Backlog Tasks</span>
                    </div>
                </div>
            </div>
            <div className='flex w-[270px] h-[120px] border border-customYellow-100 rounded-lg bg-customYellow-200 gap-2'>
                <div className='flex-[.4] flex items-center justify-center'>
                    <span className='h-14 w-14 flex items-center justify-center bg-customYellow-100 text-customYellow-200 text-[20px] rounded-full'><RxCounterClockwiseClock /></span>
                </div>
                <div className='flex-1 flex items-center '>
                    <div className='flex flex-col items-center '>
                        <span className='text-center text-[20px] font-semibold'>5</span>
                        <span className='text-center'>Pending Tasks</span>
                    </div>
                </div>
            </div>
            <div className='flex w-[270px] h-[120px] border border-customPurple-100 rounded-lg bg-customPurple-200 gap-2'>
                <div className='flex-[.4] flex items-center justify-center'>
                    <span className='h-14 w-14 flex items-center justify-center bg-customPurple-100 text-customPurple-200 text-[20px] rounded-full'><IoMdCheckmarkCircleOutline /></span>
                </div>
                <div className='flex-1 flex items-center '>
                    <div className='flex flex-col items-center '>
                        <span className='text-center text-[20px] font-semibold'>5</span>
                        <span className='text-center'>In Progress Tasks</span>
                    </div>
                </div>
            </div>
            <div className='flex w-[270px] h-[120px] border border-customGreen-400 rounded-lg bg-customGreen-300 gap-2'>
                <div className='flex-[.4] flex items-center justify-center'>
                    <span className='h-14 w-14 flex items-center justify-center bg-customGreen-400 text-customGreen-300 text-[20px] rounded-full'><LuLayoutList /></span>
                </div>
                <div className='flex-1 flex items-center '>
                    <div className='flex flex-col items-center '>
                        <span className='text-center text-[20px] font-semibold'>5</span>
                        <span className='text-center'>Total Backlog Tasks</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BacklogDetails