import React from 'react'
import { addMemberToTaskToggle } from '../../utils/milestonUtils'
import useTabToggle from '../../services/__tabToggleService'
import { motion } from 'framer-motion'
import CustomButton from '../../components/CustomButton'
import CustomSelect from '../../components/CustomSelect'
import { FaXmark } from 'react-icons/fa6'

const AddMemberMileston = (props) => {
    const {addMemberToTask,handleSelectAddMemberToTask, removeTaskMemeberLsit,handleAddMemberToTask} = props

    const teamMembers = addMemberToTask?.allUsersList?.team_members
    const employees = addMemberToTask?.allUsersList?.employees


    const {tabToggleState, currentState} = useTabToggle()
  return (
    <form className='flex flex-col gap-6' onSubmit={handleAddMemberToTask}>
        <div className='flex items-center gap-4'>

            {addMemberToTaskToggle.map((ele)=>(
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
        {currentState === 1 ?
            <div className='space-y-1 py-3 w-[60%]'>
                <label className='text-[#698592] text-[15px]'>Choose Members</label> 
                <CustomSelect 
                    placeHolderTitle="Member" 
                    options={teamMembers?.map((teamMember) => ({ value: teamMember.oneid, label:teamMember.full_name}))}
                    onChangeHandler={(selectedOption) => handleSelectAddMemberToTask(selectedOption, 'memberId')}
                    value={addMemberToTask?.memberId}
                />
            </div>
        :
        currentState === 2 ?
            <div>
                <div className='space-x-1 text-[13px] text-customBlue-100'>
                    <span>Please make sure you have already subscribed</span>
                    <a className='font-semibold'>Empleado</a>
                    <span>in the same organization on</span>
                    <a className='font-semibold'>OneID</a>
                </div>

                 <div className='space-y-1 py-3 w-[60%]'>
                    <label className='text-[#698592] text-[15px]'>Choose Employees</label> 
                    <CustomSelect 
                        placeHolderTitle="Employee" 
                        options={employees?.map((employee) => ({ value: employee.id, label:employee.name}))}
                        onChangeHandler={(selectedOption) => handleSelectAddMemberToTask(selectedOption, 'employeeId')}
                        value={addMemberToTask?.employeeId}
                    />
                </div>
            </div>
        :
        null
        }

        <div className='flex items-center gap-2 flex-wrap'>
            {addMemberToTask.selectedMembers?.map((ele, i)=>(
                <div key={i} className='flex items-center gap-3 justify-between text-[12px] bg-customBlue-100 text-white px-3 py-2 rounded-full'>
                    <span>{ele.name}</span>
                    <motion.span whileHover={{scale:1.1}} className='w-5 h-5 flex items-center justify-center text-[10px] bg-customRed-100 rounded-full cursor-pointer'
                        onClick={()=>removeTaskMemeberLsit(ele.id)}
                    ><FaXmark /></motion.span>
                </div>
            ))}
        </div>
        <div className='mt-4'>
            <CustomButton 
                title="Add Memeber"
                type="submit"
                loading = {addMemberToTask.loading}
            />
        </div>
    </form>
  )
}

export default AddMemberMileston