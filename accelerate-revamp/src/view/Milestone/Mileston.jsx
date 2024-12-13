import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useMilestoneServices from '../../viewModel/milestoneViewModel/milestoneServices'
import { FaCheck, FaPlus, FaRegTrashCan} from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { GoMilestone, GoTasklist } from 'react-icons/go'
import { IoCalendarClearOutline } from 'react-icons/io5'
import { DMYT } from '../../services/__dateTimeServices'
import { LuMoveRight } from 'react-icons/lu'
import { CiStar } from 'react-icons/ci'
import { Typography } from '@material-tailwind/react'
import MilestonesList from './MilestonesList'
import useAddMilestoneServices from '../../viewModel/milestoneViewModel/AddMilestoneServices'
import CustomDrawer from '../../components/CustomDrawer'
import AddMilstone from './AddMilstone'
import ConfirmationDialog from '../../components/ConfirmationDialog'
import useMilestoneActionService from '../../viewModel/milestoneViewModel/milestoneActionServices'
import RejectMilestone from './RejectMilestone'
import useAddUserTaskMileston from '../../viewModel/milestoneViewModel/AddUserMilestone'
import CustomDialog from '../../components/CustomDialog'
import AddMemberMileston from './AddMemberMileston'
import Inbox from './Inbox'
import useInboxServices from '../../viewModel/milestoneViewModel/inboxServices'

const Mileston = () => {

    const params = useParams()

    const {gettingMileStones,milstones, toggleCompleteTask, completeTaskValue,handleConfirmTaskComplete,
        deleteMemberTask,toggleDeleteMemberTask,handleConfirmRemoveEmpTask
    } = useMilestoneServices()


    useEffect(()=>{
        const id = params.id
        gettingMileStones(id)
    },[])



    
    const taskDetails = milstones?.task_detail
    const employeeDetails = milstones?.employees_detail
    const taskMilestones = milstones?.task_milestones


    const {addMilestoneValue, toggleAddMilestone,addMoreMileStoneHandler,removeMilestoneHandler,multipleMSChangeHandler,
        handleAddMilestone,
        editSingleMilestone
    } = useAddMilestoneServices(params.id,employeeDetails)

    const {toggleMilestonReject, milestoneActionValue,handleChangMilestonAction,handleConfirmReject,
        handleRatingClick,handleMouseLeave ,handleMouseMove, ratingValue, handleSubmitRating,
        handlePickCompleteMilestone,handleRemoveMilestone,handleConfirmRemoveMilestone
    } = useMilestoneActionService()



    const { addMemberToTask, toggleAddMemmberToTask,handleSelectAddMemberToTask, removeTaskMemeberLsit, handleAddMemberToTask} = useAddUserTaskMileston(params.id, employeeDetails)

    const {toggleInboxState, handleToggleInboxState} = useInboxServices(params.id)

  return (
    <>
        <div className='ps-10 pe-2 py-5 grid grid-cols-12 gap-2 '>
            <div className='col-span-3 shadow-lg rounded-[14px] h-auto'>
                <div className="sticky top-5 z-10 bg-white">
                    <div style={{backgroundColor:taskDetails?.view_background}} className='p-4 h-[200px] rounded-tl-[7px] rounded-tr-[7px] flex items-center justify-center text-white text-wrap text-center'>
                        <span>{taskDetails?.project_name}</span>
                        
                    </div>
                    <div className='p-4 rounded-bl-[7px] rounded-br-[7px]'>
                        <div className='border-b border-b-customGray-400 py-2 flex items-center justify-center '>
                            <motion.div whileHover={{scale:1.06}} className='flex items-center justify-center gap-2 text-customBlack-400 text-[16px] w-fit cursor-pointer'
                                onClick={toggleAddMemmberToTask}
                            >
                                <span className='h-5 w-5 flex items-center justify-center border border-customGray-300 rounded-full text-[12px]'><FaPlus /></span>
                                <span className='text-[13px] text-customBlack-200'>Add member to task</span>
                            </motion.div>
                        </div>
                        <div className="h-[calc(100vh-400px)] max-h-fit overflow-y-auto">
                            {employeeDetails?.map((ele)=>(
                                <div key={ele?.id} className='border-b border-b-customGray-400 py-2 ps-2 flex items-center justify-between'>
                                    <div className='flex items-center gap-4'>
                                        <img src={ele?.dp} className='h-10' alt={`profile-${ele?.id}`} />
                                        <div>
                                            <span>{ele?.name}</span>
                                        </div>
                                    </div>
                                    <div className='pe-2'>
                                        <motion.span whileHover={{scale:1.1}} className='h-6 w-6 flex items-center justify-center text-white text-[12px] rounded-full bg-customRed-100 cursor-pointer overflow-hidden'
                                            onClick={()=>toggleDeleteMemberTask(ele,taskDetails)}
                                        ><FaRegTrashCan /></motion.span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> 
                </div>
            </div>
            <div className='col-span-6 ps-3 space-y-2'>
                <div className='space-y-3'>
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
                            <motion.span 
                                className='cursor-pointer'
                                whileHover={{
                                    scale:1.1
                                }}
                                onClick={()=>toggleAddMilestone(employeeDetails)}
                            >
                                <FaPlus />
                            </motion.span>
                            <motion.span
                                className='cursor-pointer'
                                whileHover={{
                                    scale:1.1
                                }}
                            >
                                <CiStar />
                            </motion.span>
                            <motion.span className='border border-customGray-300 h-5 w-5 flex items-center justify-center rounded-full text-[12px] cursor-pointer'
                                whileHover={{
                                    scale:1.1
                                }}
                                onClick={()=>toggleCompleteTask(params.id)}
                            >
                                <FaCheck />
                            </motion.span>
                        </div>
                    </div>
                    <div className='sticky top-1 z-10 bg-white'>
                        <div className='flex items-center justify-evenly border border-customGray-400 rounded-xl py-3'>
                            <div className="flex flex-col items-center gap-4">
                                <span>Milestones</span>
                                <div 
                                    style={{
                                        width: 90,
                                        height: 90,
                                        position: "relative",

                                    }}
                                    className='border-[5px] border-[#f0f0f0] rounded-full flex items-center justify-center'
                                >
                                    <span className='text-[#1aafd0] text-[40px]'><GoMilestone /></span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span>Progress</span>
                                <CircularProgress percentage={10} color="#3BE8B0"/>
                            </div>
                            <div className="flex flex-col items-center">
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
                                toggleMilestonReject ={ toggleMilestonReject }
                                milestoneActionValue ={ milestoneActionValue }
                                handleRatingClick ={ handleRatingClick }
                                handleMouseLeave ={ handleMouseLeave }
                                handleMouseMove ={ handleMouseMove }
                                ratingValue ={ ratingValue }
                                handleSubmitRating ={ handleSubmitRating }
                                handlePickCompleteMilestone ={ handlePickCompleteMilestone }
                                handleRemoveMilestone ={ handleRemoveMilestone }
                                editSingleMilestone ={ editSingleMilestone }
                            />
                        ))}
                    </div>
                    </div>
                
                
            </div>
            <div className='col-span-3 border border-black h-[calc(100vh-140px)] flex items-end sticky top-5'>
                <Inbox 
                    toggleInboxState ={toggleInboxState} 
                    handleToggleInboxState = {handleToggleInboxState}
                />      
            </div>
        </div>
        {(addMilestoneValue?.show || addMilestoneValue.update) &&
            <CustomDrawer 
                open={addMilestoneValue?.show ? addMilestoneValue?.show : addMilestoneValue?.update ? addMilestoneValue?.update : null}
                compo={
                    <AddMilstone 
                        addMilestoneValue ={addMilestoneValue}
                        addMoreMileStoneHandler ={addMoreMileStoneHandler}
                        removeMilestoneHandler ={removeMilestoneHandler}
                        multipleMSChangeHandler ={multipleMSChangeHandler}
                        handleAddMilestone ={handleAddMilestone}
                    />
                }
                closeDrawer={addMilestoneValue.show ? toggleAddMilestone : addMilestoneValue.update ? editSingleMilestone : null}
                widthSize={800}
                title={addMilestoneValue.show ? "Add Milestone" :  'Update Milestone'}
            />
        }
        {/*  deleteMemberTask,toggleDeleteMemberTask */}
        {
            (completeTaskValue.show || deleteMemberTask.show) && 
            <ConfirmationDialog 
                openDialog = {
                    completeTaskValue.show ? completeTaskValue.show :
                    deleteMemberTask.show ? deleteMemberTask.show :
                    null
                }
                handleOpen = {
                    completeTaskValue.show ?
                    toggleCompleteTask :
                    deleteMemberTask.show ?
                    toggleDeleteMemberTask :
                    null

                }
                title ={
                    completeTaskValue.show ?
                    "Complete This Task" :
                    deleteMemberTask.show ?
                    "Remove Emoloyee":
                    null
                }
                message = {
                    completeTaskValue.show ?
                    "Are you sure to complete this task and complete all milestone under the task ? ":
                     deleteMemberTask.show ?
                     "Are you sure you want to remove this employee ? " :
                     null
                }
                handleConfirm={
                    completeTaskValue.show ? 
                    handleConfirmTaskComplete :
                    deleteMemberTask.show ?
                    handleConfirmRemoveEmpTask :
                    null
                }
                loading = {
                    completeTaskValue.show ? 
                    completeTaskValue.loading :
                    deleteMemberTask.show ? 
                    deleteMemberTask.loading :
                    null
                }
            
            />
        }


        {(milestoneActionValue?.reject || milestoneActionValue.remove)&&
            <ConfirmationDialog 
                openDialog={
                    milestoneActionValue?.reject ? 
                    milestoneActionValue?.reject :
                    milestoneActionValue?.remove ?
                    milestoneActionValue?.remove :
                    null
                }
                handleOpen={
                    milestoneActionValue?.reject ?
                    toggleMilestonReject :
                    milestoneActionValue?.remove ?
                    handleRemoveMilestone :
                    null
                }
                title={ 
                    milestoneActionValue?.reject ?
                    "Reject Milestone" :
                    milestoneActionValue?.remove ?
                    "Remove Milestone" :
                    null
                }
                message={
                    milestoneActionValue?.reject ?
                        <RejectMilestone 
                            milestoneActionValue = {milestoneActionValue}
                            handleChangMilestonAction = {handleChangMilestonAction}
                        />
                    :
                    milestoneActionValue?.remove ?
                        "Are you sure to delete ? "
                    :
                    null
                }
                handleConfirm={
                    milestoneActionValue?.reject ?
                    handleConfirmReject :
                    milestoneActionValue?.remove ?
                    handleConfirmRemoveMilestone :
                    null

                }
                loading={
                    milestoneActionValue.reject ?
                    milestoneActionValue.loading === "rejecting" :
                    milestoneActionValue.remove ?
                    milestoneActionValue.loading === "delete_milestone" :
                    null

                }
            
            />
        }

        {addMemberToTask?.show && 
            <CustomDialog 
                openDialog = {addMemberToTask.show}
                handleOpen={toggleAddMemmberToTask}
                title="Add Members To The Task"
                compo={<AddMemberMileston 
                    addMemberToTask= {addMemberToTask}
                    handleSelectAddMemberToTask= {handleSelectAddMemberToTask}
                    removeTaskMemeberLsit= {removeTaskMemeberLsit}
                    handleAddMemberToTask= {handleAddMemberToTask}
                />}
                size="md"
                outsidePress={false}
            
            
            />
        }
    </>
  )
}

export default Mileston


const CircularProgress = ({ percentage, color }) => {
    const radius = 40; // Radius of the circle
    const strokeWidth = 5; // Width of the progress bar
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div
            style={{
                width: 100,
                height: 100,
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
                    top: "59%",
                    left: "62%",
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



