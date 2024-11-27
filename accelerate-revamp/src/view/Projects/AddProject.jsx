import { Checkbox, Radio, Typography } from '@material-tailwind/react'
import React from 'react'
import { generalTemplateData, projectAccessData, projectVisiblityData } from '../../utils/projectsUtils'
import CustomSelect from '../../components/CustomSelect'
import { FaPlus } from 'react-icons/fa6'
import { motion } from 'framer-motion'
const AddProject = (props) => {
  const {addProjectValue,toggleGeneralTemplateViewAdd} = props
  console.log('addProjectValue', addProjectValue?.generalTemplates)
  return (
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
      <div className='space-y-5'>
        <div className='grid grid-cols-2 items-center gap-4'>
          <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>Project Name</label>  
            <input 
                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                type='text' 
                // value={PRCAddValue.name}
                // name='name' 
                // onChange={handleChangeRPC}
                placeholder='Project Name'
            />
          </div>
          <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>Select Project Color</label>
            <div>
              {/* <Sketch
                // onChange={handleColorChange}
              /> */}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1'>
          <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>Project Description</label>  
            <input 
                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                type='text' 
                // value={PRCAddValue.name}
                // name='name' 
                // onChange={handleChangeRPC}
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
                // value={PRCAddValue.name}
                // name='name' 
                // onChange={handleChangeRPC}
            />
          </div>
          <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>End Date</label>
            <input 
                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                type='date' 
                // value={PRCAddValue.name}
                // name='name' 
                // onChange={handleChangeRPC}
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <Checkbox
            color='blue' 
            label='Continous'
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
              />
            ))}
          </div>
        </div>
        <div className='grid grid-cols-2 items-center gap-4'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <label className='text-[#698592] text-[15px]'>Project Owner</label>  
              <span className='h-5 w-5 bg-customBlue-100 text-white flex items-center justify-center cursor-pointer rounded-md'><FaPlus /></span>
            </div>
            <CustomSelect
              placeHolderTitle="Owner" 
              options={addProjectValue?.owners?.map((owner) => ({ value: owner.id, label:owner.customer_name}))} 
            
            />
          </div>
          <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>Project Manager/Supervisor</label>
            <CustomSelect 
              placeHolderTitle="Manager/Supervisor" 
              options={addProjectValue?.employees?.map((employee) => ({ value: employee.id, label:employee.name}))}
            
            
            />
          </div>
        </div>
        <div className='grid grid-cols-2 items-center gap-4'>
          <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>Task Creation Access</label>  

            <CustomSelect 
            
            
            />
          </div>
          <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>Task accessibility/visibility</label>
            <div className='flex items-center'>
            {projectAccessData.map((ele)=>(
              <Radio
                key={ele.id}
                color='blue' 
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
      </div>
          
      <div className='flex flex-col gap-14'>
        <div className='space-y-6'>
          <label className='text-[#698592] text-[15px]'>Select Project Workflow Pattern</label>
          <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
              <div className='flex flex-col items-center gap-4'>
                  <motion.div className='border-dashed border-[1px] border-customBlack-400 rounded-lg flex w-20 h-20 items-center justify-center cursor-pointer'
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
                      <div className='flex flex-col items-center gap-4'>
                          <motion.div style={{backgroundColor:ele?.color_code}} className='flex items-center justify-center p-4 rounded-lg cursor-pointer'
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
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProject