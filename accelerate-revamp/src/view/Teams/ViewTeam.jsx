import React from 'react'
import { viewTeamDataToggle } from '../../utils/teamUtils'

import { motion } from 'framer-motion'
import useTabToggle from '../../services/__tabToggleService'
import { FaXmark } from 'react-icons/fa6'
import CustomButton from '../../components/CustomButton'


const ViewTeam = (props) => {
    const {viewTeamValue, addNewMember, handleInviteMember,handleBulkEmailInvite ,handleRemoveEmailInvite,handleNewMember} = props 
    const teamInfo = viewTeamValue?.teamInfo
    const members = viewTeamValue?.data?.accepted
    const pending = viewTeamValue?.data?.pending
    const oneid = "10464716"
    const {tabToggleState, currentState} = useTabToggle()

    console.log('teamInfo', teamInfo)
  return (
    <div className='space-y-6'>
        <div className='flex items-center gap-4'>

            {(oneid === teamInfo.oneid ? viewTeamDataToggle : [viewTeamDataToggle[0]]).map((ele)=>(
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
        <div>
            {currentState === 1 ? 
                <div className='flex items-center flex-wrap gap-4'>
                    {members?.map((ele, i)=>(
                        <div key={i} className='flex items-center gap-3'>
                            <img src={ele?.img} alt='test' className='h-[55px]' />
                            <span>{ele?.full_name}</span>
                        </div>
                    ))}
                </div>            
            :
            currentState === 2 ? 
                <div className='flex items-center flex-wrap gap-4'>
                    {pending?.length > 0 ?
                    
                    pending?.map((ele, i)=>(
                        <div key={i} className='flex items-center gap-3'>
                            {/* <img src='' alt='test'  /> */}
                            <span>{ele?.full_name}</span>
                        </div>
                    ))
                    :

                    <div className='text-[16px] text-customBlack-400 font-semibold'>
                        <span>Not Exists</span>
                    </div>
                }
                </div>            
            :
                currentState === 3 ?
                <div className='space-y-3'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-[#698592] text-[15px]'>Invite With</label>
                        <label className='text-[#698592] text-[13px] font-semibold'>Press 'Enter' after typing an email to add more emails.</label>
                       
                        
                        
                        <div className='space-y-1 h-full'>
                            <input 
                                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                                type='text' 
                                value={addNewMember.email}
                                name='email' 
                                onChange={handleInviteMember}
                                placeholder='xyz@gmail.com'
                                onKeyPress={handleBulkEmailInvite}
                            />
                        </div>

                        <div className='flex items-center gap-2 flex-wrap'>
                            {addNewMember?.emailList?.map((ele, i)=>(
                                <div key={i} className='flex items-center justify-between gap-2 bg-customBlue-100 rounded-full p-2'>
                                    <span className='text-white text-[13px]'>{ele}</span>
                                    <span className='h-5 w-5 flex items-center justify-center text-white bg-red-600 rounded-full'
                                        onClick={()=>handleRemoveEmailInvite(i)}
                                    ><FaXmark /></span>
                                </div>
                            ))}

                            
                        </div>

                    </div>
                    <div>
                        <CustomButton 
                            title="Add / Invite"
                            onClick={()=>handleNewMember(teamInfo.id)}
                            loading={addNewMember.loading}
                        />
                    </div>
                </div>
            :
            null
            }
        </div>
    </div>
  )
}

export default ViewTeam
