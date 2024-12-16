import React from 'react'
import { GoTasklist } from 'react-icons/go'
import { IoBarChart, IoRocket } from 'react-icons/io5'
import useProjectsServices from '../../viewModel/projectsViewModel/projectsServices'
import { projectToggleData } from '../../utils/projectsUtils'
import { motion } from 'framer-motion'
import { CgSearch } from 'react-icons/cg'
import ProjectsList from './ProjectsList'
import { FaPlus } from 'react-icons/fa6'
import useAddProjectServices from '../../viewModel/projectsViewModel/addProjectServices'
import CustomDrawer from '../../components/CustomDrawer'
import AddProject from './AddProject'
import useProjectDetailsServices from '../../viewModel/projectsViewModel/projectDetailsServices'
import { Outlet, useParams } from 'react-router-dom'
import ConfirmationDialog from '../../components/ConfirmationDialog'
import { Progress } from '@material-tailwind/react'

const Projects = () => {
  const { projectState, toggleProjectsState, handleChangeSerachProjects, projects, projectLoading} = useProjectsServices()
  const { addProjectValue, handleAddProject, toggleAddProject,toggleGeneralTemplateViewAdd,
    handleAddOwnerToggle,handleAddWorkFlowToggle,
    handleChangeAddProject,addExtraPhase,removePhase,
    addWorkFlow,addOwner,handleSelectAddProject,
    handleSelectTemplate,handleColorPickerToggle,pickerRef,
    handleAddNewProject,projectActionValue,
    handleChangeProjectAction,
    updateProjectColor,
    handleProjectActionList,
    toggleEditProject , handleUpdateProject,
    handleToggleDeleteProject,
    handleConfirmDeleteProject,
    handleToggleCloseProject,
    handleConfirmClosedProject,
    handleFavProject
   } = useAddProjectServices()

   const {projectDetails} = useProjectDetailsServices()

   const params = useParams()

  const projectsData = projects?.projects_details
  const graphTask = projects?.graph?.tasks
  return (
    <>
    {params?.id ? <Outlet 
      

    /> : 
    
      <>
      
      <div className='px-10 py-5 space-y-6 '>
        <div className='text-[20px] text-customBlack-300'>
          <span>Projects</span>
        </div>
        <div className='grid grid-cols-12 border-[.5px] border-customBlack-400 rounded-lg py-6 px-8 items-center gap-6'>
          <div className='col-span-6 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div>
                <span className='bg-customPink-100 h-20 w-20 flex items-center justify-center text-white text-[30px] rounded-lg'>
                  <IoRocket />
                </span>
              </div>
              <div className='flex flex-col items-center gap-1 text-customBlack-300'>
                <span className='text-[18px]'>Projects</span>
                <span className='text-[16px]'> {projectsData?.total} Total</span>
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
                <span className='text-[18px]'>{projectsData?.active} Active</span>
                <span className='text-[16px]'> {projectsData?.total - projectsData?.active} Inactive</span>
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
                <span className='text-[16px]'> {projectsData?.total_tasks} Total</span>
              </div>
            </div>
          </div>
          <div className='col-span-6 grid grid-cols-3 gap-5'>
            <div className='text-[12px] space-y-3'>
              <span>{graphTask?.PENDING_TASKS} Tasks Pending</span>
              <Progress value={graphTask?.PENDING_TASKS} color="yellow" />
            </div>
            <div className='text-[12px] space-y-3'>
              <span>{graphTask?.COMPLETED_TASKS} Tasks Completed</span>
              <Progress value={graphTask?.COMPLETED_TASKS} color="green" />
            </div>
            <div className='text-[12px] space-y-3'>
              <span>{graphTask?.OVERDUE_TASKS} Tasks Overdue</span>
              <Progress value={graphTask?.OVERDUE_TASKS} color="red" />
            </div>
            <div className='text-[12px] space-y-3'>
              <span>{graphTask?.CANCELED_TASKS} Tasks Cancelled</span>
              <Progress value={graphTask?.CANCELED_TASKS} color="" />
            </div>
            <div className='text-[12px] space-y-3'>
              <span>{graphTask?.REJECTED_BY_MANAGER} Tasks Rejected</span>
              <Progress value={graphTask?.REJECTED_BY_MANAGER} color="" />
            </div>
            <div className='text-[12px] space-y-3'>
              <span>{graphTask?.PAUSED} Tasks Paused</span>
              <Progress value={graphTask?.PAUSED} color="" />
            </div>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative flex items-center">
              <span className="absolute w-5 h-5 top-2.5 left-2.5 text-customBlue-500"><CgSearch /></span>        
              <input
                className="w-full bg-transparent placeholder:text-customBlack-400 text-customBlack-700 text-sm border-b border-b-customBlack-300  pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-b-customBlack-400 hover:border-b-customBlack-300  focus:shadow-bottom"
                placeholder="Search" 
                onChange={handleChangeSerachProjects}
                name='serach'
                value={projectState?.serach}
              />
            </div>
          </div>
          <div className='flex items-center gap-4'>
              {projectToggleData.map((ele)=>(
                  <div key={ele.id} 
                      className={`${
                          projectState.state === ele.value? "text-white" : "hover:text-customBlack/60 text-customBlack-200 border-[.5px] border-customBlack-400"
                      } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                      style={{
                          WebkitTapHighlightColor: "transparent",
                      }}
                  onClick={() => toggleProjectsState(ele)}
                  >
                      {projectState.state === ele.value && (
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
        <div className='grid grid-cols-6 gap-6'>
          


            {(projectState.state === "active" || projectState.state === "all_projects" || projectState.state === "my_projects") &&
              <div className='border-dashed border-[1px] border-customBlack-400 rounded-lg flex items-center justify-center cursor-pointer'
                onClick={handleAddProject}
              >
                <span className='text-[25px]'><FaPlus /></span>
              </div>
            }
            {projectsData?.data?.map((ele)=>(
              <ProjectsList 
                key={ele?.id}
                ele = {ele}
                projectDetails= {projectDetails}
                projectActionValue= {projectActionValue}
                handleChangeProjectAction= {handleChangeProjectAction}
                updateProjectColor= {updateProjectColor}
                handleProjectActionList= {handleProjectActionList}
                handleFavProject= {handleFavProject}
              />
            ))}
        </div>
      </div>
        
      {addProjectValue.show &&
        <CustomDrawer 
          open = {addProjectValue.show}
          closeDrawer = {toggleAddProject}
          compo ={
            <AddProject 
              addProjectValue = {addProjectValue}
              toggleGeneralTemplateViewAdd = {toggleGeneralTemplateViewAdd}
              handleAddOwnerToggle = {handleAddOwnerToggle}
              handleAddWorkFlowToggle = {handleAddWorkFlowToggle}
              addExtraPhase = {addExtraPhase}
              handleChangeAddProject = {handleChangeAddProject}
              removePhase = {removePhase}
              addWorkFlow = {addWorkFlow}
              addOwner = {addOwner}
              handleSelectAddProject = {handleSelectAddProject}
              handleSelectTemplate = {handleSelectTemplate}
              handleColorPickerToggle = {handleColorPickerToggle}
              pickerRef = {pickerRef}
              handleAddNewProject = {handleAddNewProject}


            />
          }
          title="Create Project"
          widthSize = {1150}
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
      {(projectActionValue?.deleteProject || projectActionValue.closeProject ) &&
        <ConfirmationDialog 
          openDialog={
            projectActionValue?.deleteProject ?
            projectActionValue?.deleteProject :
            projectActionValue?.closeProject ?
            projectActionValue?.closeProject :
            null

          }
          handleOpen={
            projectActionValue?.deleteProject ?
            handleToggleDeleteProject :
            projectActionValue?.closeProject ?
            handleToggleCloseProject :
            null
            
          }
          title={
              projectActionValue?.deleteProject ?
              "Delete Project" :
              projectActionValue?.closeProject ?
              "Close Project" :
              null
          }
          message={
              projectActionValue?.deleteProject ?
              "Are you sure you want to delete this project ?" :
              projectActionValue?.closeProject ?
              "Are you sure you want to close this project ?" :
              null
          }
          handleConfirm= {
            projectActionValue?.deleteProject ?
            handleConfirmDeleteProject :
            projectActionValue?.closeProject ?
            handleConfirmClosedProject :
            null
            
          }
          loading={projectActionValue.loadingState}
        />
      }
      </>
      }

      
    </>
  )
}

export default Projects