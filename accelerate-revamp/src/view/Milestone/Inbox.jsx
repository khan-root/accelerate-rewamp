import React from 'react'
import { inboxToggle } from '../../utils/milestonUtils'
import { motion } from 'framer-motion'
import {IoIosSend} from 'react-icons/io'

const Inbox = (props) => {
    const { toggleInboxState, handleToggleInboxState } = props
    console.log('toggleInboxState', toggleInboxState)
  return (
    <div className='h-[500px] w-full overflow-y-auto border border-red-600 flex flex-col'>
        <div className='flex items-center gap-4 py-3 bg-customBlue-600'>

            {inboxToggle.map((ele)=>(
                <div key={ele.id} 
                    className={`${
                        toggleInboxState?.state === ele.id? "text-white" : "hover:text-customBlack/60 text-customBlack-200"
                    } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                onClick={() => handleToggleInboxState(ele)}
                >
                    {toggleInboxState?.state === ele.id && (
                    <motion.span
                        layoutId={`bubble-inbox`}
                        className="absolute inset-0 z-10 bg-[#8bc9f8]"
                        style={{ borderRadius: 9999 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    )}
                    <span className='relative cursor-pointer text-[12px] z-20 font-semibold' >{ele.title}</span>
                </div>
            ))}
        </div>
        <div className='flex-1 border border-yellow-900 overflow-y-auto'>
            <span>
                lorem10000
            </span>
        </div>
        <div className='flex items-center gap-3'>
            <div className='w-[80%]'>
                <textarea 
                    rows="4" 
                    name="description"
                    className='text-[#333333] text-[12px] rounded-md   py-[10px] px-[17px] border border-[#cccccc] outline-none resize-none w-full focus:border-customBlue-100'
                    placeholder='Type your message here'
                    
                >
            </textarea>
            </div>
            <div className='flex items-center justify-center'>
                <span className='h-10 w-10 flex items-center justify-center text-[20px] text-white rounded-full bg-customBlue-500'><IoIosSend /></span>
            </div>
        </div>
    </div>
  )
}

export default Inbox