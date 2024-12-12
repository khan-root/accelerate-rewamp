import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProjectDetailsServices from '../../viewModel/projectsViewModel/projectDetailsServices'
import { projectActonList, projectDetailsToggleData } from '../../utils/projectsUtils'
import useTabToggle from '../../services/__tabToggleService'
import { motion } from 'framer-motion'
import CustomButton from '../../components/CustomButton'
import { FaPlus, FaSort } from 'react-icons/fa6'
import { Button, Card, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import { MdFilterAlt } from 'react-icons/md'
import ProjectTable from './ProjectTable'
import useMilestoneServices from '../../viewModel/milestoneViewModel/milestoneServices'
import useAddTaskServices from '../../viewModel/projectsViewModel/AddTaskServices'
import CustomDrawer from '../../components/CustomDrawer'
import AddTask from './AddTask'
import ProjectWorkFlowView from './ProjectWorkFlowView'
import { DMYT } from '../../services/__dateTimeServices'
import { LuClock5 } from 'react-icons/lu'
import useMouseHoverService from '../../services/__mouseHoverService'
import { HiDotsVertical } from 'react-icons/hi'
import Wheel from '@uiw/react-color-wheel';
import useAddProjectServices from '../../viewModel/projectsViewModel/addProjectServices'
import AddProject from './AddProject'
import useBacklogServices from '../../viewModel/backlogViewModel/backlogServices'


const ProjectDetails = () => {

    const {gettingProjectTasks, projectTasksData, editProjectHandler, editProjectTaskValue,
        handleChangeEditTask ,handleSelectEditTask

    } = useProjectDetailsServices()
    const projectInfo = projectTasksData?.project_info
    const tasksData = projectTasksData?.project_tasks


   



    
    const {handleSinglTaskMileStone} = useMilestoneServices()

    const params = useParams()
    useEffect(()=>{
        gettingProjectTasks(params.id)
      
    },[])


    const {tabToggleState, currentState} = useTabToggle()

    const {addTaskHandle,addTaskValue,handleChangeAddTask,addMoreMileStone, removeMilestone,
        handleToggleSelectEmp,handleSelectAddTask,removeFromSelectedList,addToSelectedEmpList,
        removeFromTeamMemberSelect,handleMultipleMSChange,handleDragEnd,
        mapRef,autocompleteService,placesServiceRef,center,places,searchQuery,onLoadMap,
        onSearchChange,onSelectPlace,onMapClick,isLoaded,
        handleSubmitTask

    } = useAddTaskServices(params.id)

    const {isHovered, handleMouseEnter, handleMouseLeave} = useMouseHoverService()

    const {handleProjectActionList,addProjectValue,toggleEditProject,handleColorPickerToggle, pickerRef, 
        handleChangeAddProject,handleAddOwnerToggle,
        addOwner,handleSelectAddProject,handleUpdateProject

    } = useAddProjectServices()



    const {handleBacklogs} = useBacklogServices()

  return (
    <>
    <div className='ps-5 pt-10 grid grid-cols-12 gap-4'>
        <div className='col-span-3 shadow-lg rounded-[14px] h-[500px]'>
            <div className="">
                <div style={{backgroundColor:projectInfo?.view_background}} className='p-4 h-[250px] rounded-tl-[7px] rounded-tr-[7px] flex flex-col cursor-pointer relative'
                    onMouseEnter={handleMouseEnter} // Trigger on hover
                    onMouseLeave={handleMouseLeave} // Trigger on hover end
                >
                    <div className='flex items-top justify-end'>
                        {isHovered && (
                    <motion.div
                        className='text-2xl text-white absolute right-2 top-3 z-4'
                        whileHover={{
                            scale: 1.3,
                            transition: { duration: 0.2 }, // Smooth transition
                        }}

                        onClick={(e)=>e.stopPropagation()}
                    >
                        <Menu 
                        //    dismiss={
                        //         teamActionValue.showDialog ? { itemPress: false } : undefined
                        //     }
                            onClick={(e)=>e.stopPropagation()}
                            // portal={{ inert: true }}
                            dismiss={{
                                itemPress: false,
                            }}
                        >
                            <MenuHandler>
                                <Button
                                variant="text"
                                className="text-base font-normal capitalize tracking-normal text-white p-0 bg-none"
                                onClick={(e)=>e.stopPropagation()}
                                >
                                    <HiDotsVertical />
                                </Button>
                            </MenuHandler>
                            <MenuList className="hidden w-[32rem] grid-cols-7 gap-4 overflow-visible lg:grid -mt-1"
                            onClick={(e)=>e.stopPropagation()}
                            >
                                <Card
                                    className="col-span-3 flex h-full w-full items-center justify-center shadow-none"
                                >
                                    <Typography variant="h6" color="blue-gray" className="mb-1">Choose Color</Typography>
                                    
                                    <Wheel
                                        // color={teamActionValue?.color}
                                        // onChange={(e)=>handleChangeTeamAction(e)}
                                        // onClick={(e)=>e.stopPropagation()}
                                    />
                                    
                            
                                </Card>
                                 <ul className="col-span-4 flex w-full flex-col gap-2" onClick={(e)=>e.stopPropagation()}>
                                    {projectActonList.map(({ title, icon, id, color }) => (
                                        <MenuItem key={id}>
                                        
                                    
                                            <div className='flex items-center justify-between'>
                                                <Typography variant="h6" color="blue-gray" className="mb-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent the event from bubbling up
                                                        // handleTeamActionList(ele, id);
                                                    }}
                                                >
                                                    {title}
                                                </Typography>
                                                <span className={`${color}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent the event from bubbling up
                                                        handleProjectActionList(projectInfo, id);
                                                    }}
                                                >{icon}</span>
                                            </div>
                                        </MenuItem>
                                    ))}
                                    
                                    <div className='flex items-center justify-between'>
                                        <Button  className='text-white' onClick={(e)=>{e.stopPropagation()}}
                                            // loading={teamActionValue?.loadingState === "update-color"}
                                            
                                            >Update Color</Button>
                                    </div>
                                </ul> 
                            </MenuList>
                        </Menu>
                        
                    </motion.div>
                )} 
                    </div>
                    <div className='flex-1 flex items-center justify-center text-white text-[16px]'>
                        <span>{projectInfo?.name}</span>
                    </div>
                    <div className='flex items-end justify-end'>
                        <div className='flex flex-row items-center gap-2 text-white '>
                            <span><LuClock5 /></span>
                            {/* <span className=''>{DMYT(projectInfo?.creation_time_unix)}</span> */}
                        </div>
                    </div>
                    
                </div>
                <div className='p-4 rounded-bl-[7px] rounded-br-[7px]'>
                    <div className='border-b border-b-customBlack-300 flex items-center gap-4 text-customBlack-400 text-[16px] py-2'>
                        <span>Creator</span>
                        <span className='text-[13px] text-customBlack-200'>{projectInfo?.creator_name}</span>
                    </div>
                    <div className='border-b border-b-customBlack-300 flex items-center gap-4 text-customBlack-400 text-[16px] py-2'>
                        <span>Supervisor</span>
                        <span className='text-[13px] text-customBlack-200'>{projectInfo?.supervisor}</span>
                    </div>
                    <div className='border-b border-b-customBlack-300 flex flex-col gap-1 text-customBlack-400 text-[16px] py-2'>
                        <span>Project Description</span>
                        <span className='text-[13px] text-customBlack-200'>{projectInfo?.description}</span>
                    </div>
                    <div className='flex items-center gap-4 text-customBlack-400 text-[16px] pt-2'>
                        <span>Workflow</span>
                        <span className='text-[13px] text-customBlack-200'>{projectInfo?.template_name}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='col-span-9 h-[calc(100vh-132px)] overflow-y-auto ps-3 space-y-5'>
            <div className='flex items-center gap-4 justify-center'>
                <div className='text-customBlack-200'>
                    <span>Show Task In</span>
                </div>
                <div className='flex items-center gap-4'>

                    {projectDetailsToggleData.map((ele)=>(
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
            </div>
            {currentState === 1 ?
            <>
                <div className='flex items-center justify-between pe-12'>
                    <div className='flex items-center gap-10'>
                        <CustomButton 
                            icon={<FaPlus />}
                            title="Add Task"
                            onClick={()=>addTaskHandle(tasksData[0].id)}


                        />
                        <CustomButton 
                            title="Backlog"
                            onClick={()=>handleBacklogs(params.id)}
                        
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Menu>
                            <MenuHandler className="cursor-pointer border border-customBlack-400 text-customBlack-400 flex flex-row items-center gap-1 px-3 py-1 rounded-xl text-[13px]">
                                <div className=''>

                                    <span><MdFilterAlt /></span>
                                    <span>Filter</span>
                                </div>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem className="flex items-center gap-2">
                                
                            
                                    <Typography variant="small" className="font-medium">
                                        My Profile
                                    </Typography>
                                </MenuItem>
                                <MenuItem className="flex items-center gap-2 ">
                                
                                    <Typography variant="small" className="font-medium">
                                        Log Out
                                    </Typography>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuHandler className="cursor-pointer border border-customBlack-400 text-customBlack-400 flex flex-row items-center gap-1 px-3 py-1 rounded-xl text-[13px]">
                                <div className=''>

                                    <span><FaSort /></span>
                                    <span>Filter Assigned By</span>
                                </div>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem className="flex items-center gap-2">
                                
                            
                                    <Typography variant="small" className="font-medium">
                                        My Profile
                                    </Typography>
                                </MenuItem>
                                <MenuItem className="flex items-center gap-2 ">
                                
                                    <Typography variant="small" className="font-medium">
                                        Log Out
                                    </Typography>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                <div className='px-2'>
                    <ProjectTable 
                        tasksData = {tasksData}
                        editProjectHandler ={editProjectHandler}
                        editProjectTaskValue ={editProjectTaskValue}
                        handleChangeEditTask ={handleChangeEditTask}
                        handleSelectEditTask ={handleSelectEditTask}
                        handleSinglTaskMileStone ={handleSinglTaskMileStone}
                        addTaskHandle ={addTaskHandle}
                    />
                </div>
            </>
            :
            <div className='space-y-4'>
                <div>
                    <CustomButton 
                        icon={<FaPlus />}
                        title="Add Task"
                        onClick={addTaskHandle}
                    />
                </div>
               <div className="overflow-x-auto w-full py-5">
                    <div className="w-[calc(100vw-100px)]">
                        <ProjectWorkFlowView 
                            tasksData={tasksData}
                            handleSinglTaskMileStone ={handleSinglTaskMileStone}
                        />
                    </div>
                </div>
            </div>
            }
            
            
        </div>
    </div>

    {addTaskValue?.show && 
        <CustomDrawer 
            open={addTaskValue.show}
            compo={
                <AddTask 
                    addTaskValue = {addTaskValue}
                    handleChangeAddTask = {handleChangeAddTask}
                    addMoreMileStone = {addMoreMileStone}
                    removeMilestone = {removeMilestone}
                    handleToggleSelectEmp = {handleToggleSelectEmp}
                    handleSelectAddTask = {handleSelectAddTask}
                    removeFromSelectedList = {removeFromSelectedList}
                    addToSelectedEmpList = {addToSelectedEmpList}
                    removeFromTeamMemberSelect = {removeFromTeamMemberSelect}
                    handleMultipleMSChange = {handleMultipleMSChange}
                    handleDragEnd = {handleDragEnd}
                    mapRef = {mapRef}
                    autocompleteService={autocompleteService}
                    placesServiceRef={placesServiceRef}
                    center={center}
                    places={places}
                    searchQuery={searchQuery}
                    onLoadMap={onLoadMap}
                    onSearchChange={onSearchChange}
                    onSelectPlace={onSelectPlace}
                    onMapClick={onMapClick}
                    isLoaded={isLoaded}
                    handleSubmitTask={handleSubmitTask}

                />
            }
            title="Create Task"
            closeDrawer={addTaskHandle}
            widthSize={1300}
        
        />
    }

    {addProjectValue.update &&
        <CustomDrawer 
          open = {addProjectValue.update}
          closeDrawer = {toggleEditProject}
          compo ={
            <AddProject 
              handleUpdateProject = {handleUpdateProject}
              handleAddOwnerToggle = {handleAddOwnerToggle}
              handleChangeAddProject = {handleChangeAddProject}
              addOwner = {addOwner}
              handleSelectAddProject = {handleSelectAddProject}
              handleColorPickerToggle = {handleColorPickerToggle}
              pickerRef = {pickerRef}
              addProjectValue = {addProjectValue}


            />
          }
          title="Update Project"
          widthSize = {1150}
        />
      }
    
    </>
  )
}

export default ProjectDetails