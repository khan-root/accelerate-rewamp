import { Checkbox, Radio, Typography } from '@material-tailwind/react'
import React from 'react'
import { generalTemplateData, projectAccessData, projectVisiblityData, taskCreationData } from '../../utils/projectsUtils'
import CustomSelect from '../../components/CustomSelect'
import { FaChevronRight, FaDiagramProject, FaLeftLong, FaPlus } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import CustomDialog from '../../components/CustomDialog'
import AddOwner from './AddOwner'
import AddProjectFlow from './AddProjectFlow'
import { Sketch } from '@uiw/react-color'
import CustomButton from '../../components/CustomButton'
const AddProject = (props) => {
  const {addProjectValue,toggleGeneralTemplateViewAdd,handleAddOwnerToggle,handleAddWorkFlowToggle,
    addExtraPhase,handleChangeAddProject,removePhase,
    addWorkFlow,
    addOwner,handleSelectAddProject,
    handleSelectTemplate,
    pickerRef,handleColorPickerToggle,
    handleAddNewProject
  } = props 


  const generalData = addProjectValue?.generalTemplates?.general_array
  const orgData = addProjectValue?.generalTemplates?.org_array
  const userData = addProjectValue?.generalTemplates?.user_array

  
  return (
    <>
      <form className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4' onSubmit={handleAddNewProject}>
        <div className='space-y-5'>
          <div className='grid grid-cols-2 items-center gap-4'>
            <div className='space-y-1'>
              <label className='text-[#698592] text-[15px]'>Project Name</label>  
              <input 
                  className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                  type='text' 
                  value={addProjectValue.name}
                  name='name' 
                  onChange={handleChangeAddProject}
                  placeholder='Project Name'
              />
            </div>
            <div className='space-y-1 relative'>
              <label className='text-[#698592] text-[15px]'>Select Project Color</label>
              <div>
                <div className='flex items-center gap-1'>
                  <span className='h-6 w-6 flex rounded-full' style={{backgroundColor:`${addProjectValue?.color}`}} onClick={handleColorPickerToggle}></span>
                  <span className='relative'
                    style={{
                      transition: 'transform 0.2s ease-in-out',
                      transform: addProjectValue.colorPicker ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  >
                    <FaChevronRight />
                  </span>
                </div>
                <div className='absolute top-14 z-10' ref={pickerRef}>
                {addProjectValue.colorPicker &&
                    <Sketch
                      onChange={handleChangeAddProject}
                    />
                  }
                  </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1'>
            <div className='space-y-1'>
              <label className='text-[#698592] text-[15px]'>Project Description</label>  
              <input 
                  className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                  type='text' 
                  value={addProjectValue.description}
                  name='description' 
                  onChange={handleChangeAddProject}
                  placeholder='Description'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 items-center gap-4'>
            <div className='space-y-1'>
              <label className='text-[#698592] text-[15px]'>Start Date</label>  
              <input 
                  className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                  type='date' 
                  value={addProjectValue.start_date}
                  name='start_date' 
                  onChange={handleChangeAddProject}
              />
            </div>
            <div className="relative space-y-1">
              <label className="text-[#698592] text-[15px]">End Date</label>
              <input
                className="w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100"
                type="date"
                value={addProjectValue.end_date}
                name="end_date"
                onChange={handleChangeAddProject}
                disabled={addProjectValue?.date_continue}
              />

              {/* Overlay */}
              {addProjectValue?.date_continue && (
                <div className="absolute inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center pointer-events-none">
                </div>
              )}
            </div>
          </div>
          <div className='flex justify-end'>
            <Checkbox
              color='blue' 
              label='Continous'
              name='date_continue'
              checked={!!addProjectValue?.date_continue}
              value={addProjectValue?.date_continue}
              onChange={handleChangeAddProject}
            />
          </div>
          <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>Project Visibility Privacy</label>
            <div className='flex items-center'>
              {projectVisiblityData.map((ele)=>(
                <Radio
                  key={ele.id}
                  color='blue' 
                  label={
                    <Typography 
                      className='text-nowrap'
                      
                    >{ele.title}</Typography>
                  }
                  name='privacy'
                  value={ ele.id }
                  onChange={handleChangeAddProject}
                  checked={addProjectValue.privacy == ele.id}
                />
              ))}
            </div>
          </div>
          <div className='grid grid-cols-2 items-center gap-4'>
            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <label className='text-[#698592] text-[15px]'>Project Owner</label>  
                <span className='h-5 w-5 bg-customBlue-100 text-white flex items-center justify-center cursor-pointer rounded-md'
                  onClick={handleAddOwnerToggle}
                ><FaPlus /></span>
              </div>
              <CustomSelect
                placeHolderTitle="Owner" 
                options={addProjectValue?.owners?.map((owner) => ({ value: owner.id, label:owner.customer_name}))} 
                onChangeHandler={(selectedOption) => handleSelectAddProject(selectedOption, 'ownerId')}
                value={addProjectValue?.ownerId}

              />
            </div>
            <div className='space-y-1'>
              <label className='text-[#698592] text-[15px]'>Project Manager/Supervisor</label>
              <CustomSelect 
                placeHolderTitle="Manager/Supervisor" 
                options={addProjectValue?.employees?.map((employee) => ({ value: employee.id, label:employee.name}))}
                onChangeHandler={(selectedOption) => handleSelectAddProject(selectedOption, 'employeeId')}
                value={addProjectValue?.employeeId}
              
              />
            </div>
          </div>
          <div className='grid grid-cols-2 items-center gap-4'>
            <div className='space-y-1'>
              <label className='text-[#698592] text-[15px]'>Task Creation Access</label>  

              <CustomSelect 
                placeHolderTitle="Access" 
                options={taskCreationData?.map((ele) => ({ value: ele.value, label:ele.title}))}
                onChangeHandler={(selectedOption) => handleSelectAddProject(selectedOption, 'task_creation')}
                value={addProjectValue?.task_creation}
              
              />
            </div>
            <div className='space-y-1'>
              <label className='text-[#698592] text-[15px]'>Task accessibility/visibility</label>
              <div className='flex items-center'>
              {projectAccessData.map((ele)=>(
                <Radio
                  key={ele.id}
                  color='blue' 
                  name='task_access'
                  value={ ele.value }
                  onChange={handleChangeAddProject}
                  checked={addProjectValue.task_access === ele.value}
                  label={
                    <Typography 
                      className='text-nowrap'
                      
                    >{ele.title}</Typography>
                  }
                />
              ))}
            </div>
            </div>
          </div>
          <div>
            <CustomButton 
              type="submit"
              // loading=
              title="Submit"
            />
          </div>
        </div>
            
        <div className='flex flex-col gap-14'>
          <div className='space-y-6'>
            <label className='text-[#698592] text-[15px]'>Select Project Workflow Pattern</label>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                <div className='flex flex-col items-center gap-4'>
                    <motion.div className='border-dashed border-[1px] border-customBlack-400 rounded-lg flex w-20 h-20 items-center justify-center cursor-pointer'
                        onClick={handleAddWorkFlowToggle}
                        whileHover={{
                            scale:1.1
                        }}
                        transition={{ duration: 0.3 }}
                    >
                      <span className='text-[25px]'><FaPlus /></span>
                    </motion.div>
                    <span className='text-[13px]'>Add New</span>
                </div>
                {addProjectValue?.usedWorkFlow?.map((ele, i)=>(
                  <div key={i} className='w-20 h-20'>
                    <div className='flex flex-col items-center gap-4'
                      onClick={()=>handleSelectTemplate(ele)}
                    >
                      <motion.div style={{backgroundColor:addProjectValue?.selecedWorkFlowId === ele.id ? '#3da5f4' :  ele?.color_code }} className='flex items-center justify-center p-4 rounded-lg cursor-pointer'
                          whileHover={{
                              scale:1.1
                          }}
                          transition={{ duration: 0.3 }}
                      >
                        <img src={`https://accelerate.veevotech.com/assets/template_icons/${ele?.icon}`} alt={`workflow-${i}`}/>
                      </motion.div>
                      <span className='text-[13px] text-center truncate flex w-full'>{ele?.name}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
                  {generalTemplateData.map((ele)=>(
                      <div key={ele.id} 
                          className={`${
                              addProjectValue.generalTemplateState === ele.id? "text-white" : "hover:text-customBlack/60 text-customBlack-200 border-[.5px] border-customBlack-400"
                          } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                          style={{
                              WebkitTapHighlightColor: "transparent",
                          }}
                      onClick={() => toggleGeneralTemplateViewAdd(ele)}
                      >
                          {addProjectValue.generalTemplateState === ele.id && (
                          <motion.span
                              layoutId={`bubble-generalTemplateAdd`}
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
              {addProjectValue.generalTemplateState === 1 ? 
                <div className='flex flex-col gap-2 h-[300px] overflow-y-auto'>
                  {generalData?.map((ele)=>(
                    <div key={ele.id} className={`flex items-center gap-2  border-b border-b-customBlack-300 py-2 cursor-pointer ps-3 ${addProjectValue?.selecedWorkFlowId === ele.id ? 'bg-customBlue-300' :'' }`}
                      onClick={()=>handleSelectTemplate(ele)}
                    >
                      <div style={{backgroundColor: ele?.color_code}} className='h-8 w-8 p-2 rounded-lg'>
                        <img src={ele?.icon} alt={`general-${ele.id}`} />
                      </div>
                      <span className='text-[13px]'>{ele.name}</span>
                    </div>
                  ))}
                </div>
                :

                addProjectValue.generalTemplateState === 2 ?

                <div className='flex flex-col gap-2 h-[300px] overflow-y-auto'>
                    {orgData?.map((ele)=>(
                      <div key={ele.id} className={`flex items-center gap-2  border-b border-b-customBlack-300 py-2 cursor-pointer ps-3 ${addProjectValue?.selecedWorkFlowId === ele.id ? 'bg-customBlue-300' :'' }`}
                        onClick={()=>handleSelectTemplate(ele)}
                      >
                        <div className='flex items-center justify-center bg-customBlue-100 h-8 w-8 p-2 rounded-lg'>
                          <span className='text-white'><FaDiagramProject /></span>
                        </div>
                        <span className='text-[13px]'>{ele.name}</span>
                      </div>
                    ))}
                  </div>
                :
                

                addProjectValue.generalTemplateState === 3 ?

                <div className='flex flex-col gap-2 h-[300px] overflow-y-auto'>
                    {userData?.map((ele)=>(
                      <div key={ele.id} className={`flex items-center gap-2  border-b border-b-customBlack-300 py-2 cursor-pointer ps-3 ${addProjectValue?.selecedWorkFlowId === ele.id ? 'bg-customBlue-300' :'' }`}
                        onClick={()=>handleSelectTemplate(ele)}
                      >

                        <div className='flex items-center justify-center bg-customBlue-100 h-8 w-8 p-2 rounded-lg'>
                          <span className='text-white'><FaDiagramProject /></span>
                        </div>
                        <span className='text-[13px]'>{ele.name}</span>
                      </div>
                    ))}
                  </div>
                :

                null
              }
            </div>
          </div>
        </div>


      </form>
      {(addProjectValue.projectOwnerState || addProjectValue.workFlowState) && 
        <CustomDialog 
          openDialog={
            addProjectValue.projectOwnerState ? addProjectValue.projectOwnerState : 
            addProjectValue.workFlowState ? addProjectValue.workFlowState : 
            null
          }
          handleOpen = { 
            addProjectValue.projectOwnerState ? handleAddOwnerToggle : 
            addProjectValue.workFlowState ? handleAddWorkFlowToggle : 
            null
          }
          title={
            addProjectValue.projectOwnerState ? "Register owner" : 
            addProjectValue.workFlowState ? "Add Workflow" : 
            null
          }
          size={ 
            addProjectValue.projectOwnerState ? "sm" : 
            addProjectValue.workFlowState ? "lg" : 
            null

          }
          compo ={
            addProjectValue.projectOwnerState ?
            <AddOwner 
              addProjectValue ={addProjectValue}
              handleChangeAddProject ={handleChangeAddProject}
              addOwner ={addOwner}
            /> :
            addProjectValue.workFlowState ?
            <AddProjectFlow 
              addProjectValue = {addProjectValue}
              handleChangeAddProject = {handleChangeAddProject}
              addExtraPhase = {addExtraPhase}
              removePhase = {removePhase}
              addWorkFlow = {addWorkFlow}
            />
            :
            null

          }

        />
      }
    </>
  )
}

export default AddProject