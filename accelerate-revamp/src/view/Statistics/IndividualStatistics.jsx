import React from 'react'
import CustomSelect from '../../components/CustomSelect'
import { Input, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import Calendar from 'react-calendar';
import { RiFileSettingsFill } from 'react-icons/ri';
import { CiCircleList } from 'react-icons/ci';
import { PiClockClockwiseFill } from 'react-icons/pi'
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'


const IndividualStatistics = () => {
  return (
    <div className='space-y-7'>
        <div className='flex items-center gap-4'>
            <div className='space-y-1'>
              <label className='text-[#698592] text-[15px]'>Choose Branch</label>  

              <CustomSelect 
                placeHolderTitle="Branch" 
                // options={taskCreationData?.map((ele) => ({ value: ele.value, label:ele.title}))}
                // onChangeHandler={(selectedOption) => handleSelectAddProject(selectedOption, 'task_creation')}
                // value={addProjectValue?.task_creation}
              
              />
            </div>
            <div className='space-y-1'>
              <label className='text-[#698592] text-[15px]'>Choose Department</label>  

              <CustomSelect 
                placeHolderTitle="Department" 
                // options={taskCreationData?.map((ele) => ({ value: ele.value, label:ele.title}))}
                // onChangeHandler={(selectedOption) => handleSelectAddProject(selectedOption, 'task_creation')}
                // value={addProjectValue?.task_creation}
              
              />
            </div>
            <div className='w-[200px]'>
                <Popover placement="bottom">
                  <PopoverHandler className="space-y-[10px]">
                    <div className='space-y-1'>
                        <label className='text-[#698592] text-[15px]'>Choose Date</label>  
                        <input 
                            className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                            
                            // value={addProjectValue?.start_date}
                            // name='start_date' 
                            // onChange={handleChangeAddProject}
                            placeholder='Select Date'
                        />
                    </div>
                  </PopoverHandler>
                  <PopoverContent>
                    <Calendar 
                        // onChange={(selected)=>handleDOB(selected, 'dob')}  
                      className='border-0'
                    />
                    </PopoverContent>
                </Popover>
              </div>
             
        </div>
        <div className='flex items-start gap-3'>
            <div className='flex flex-col gap-2  w-[500px] shadow-md rounded-md bg-customGray-200 p-3'>
                <div className='flex items-center border-dashed border-b border-b-customGray-500 py-1'>
                    <div className='flex-1 flex items-center gap-2 '>
                        <span className='text-customBlue-100 text-[18px]'><RiFileSettingsFill /></span>
                        <span className='text-customBlack-400 text-[16px]'>Ongoing Projects</span>
                    </div>
                    <div className='flex-1 text-[16px] text-customBlack-400'>
                      <span>5 active projects</span>
                    </div>
                </div>
                <div className='flex items-center border-dashed border-b border-b-customGray-500 py-1'>
                    <div className='flex-1 flex items-center gap-2 '>
                        <span className='text-customOrange-100 text-[18px]'><CiCircleList /></span>
                      <span className='text-customBlack-400 text-[16px]'>Tasks</span>
                    </div>
                    <div className='flex-1 text-[16px] text-customBlack-400'>
                      <span>12 tasks to be completed</span>
                    </div>
                </div>
                <div className='flex items-center border-dashed border-b border-b-customGray-500 py-1'>
                    <div className='flex-1 flex items-center gap-2 '>
                        <span className='text-customRed-100 text-[18px]'><PiClockClockwiseFill /></span>
                      <span className='text-customBlack-400 text-[16px]'>Workoad</span>
                    </div>
                    <div className='flex-1 text-[16px] text-customBlack-400'>
                      <span>0 task overdue</span>
                    </div>
                </div>
                <div className='flex items-center py-1'>
                    <div className='flex-1 flex items-center gap-2 '>
                        <span className='text-customGreen-100 text-[18px]'><IoMdCheckmarkCircleOutline /></span>
                      <span className='text-customBlack-400 text-[16px]'>Progress</span>
                    </div>
                    <div className='flex-1 text-[16px] text-customBlack-400'>
                      <span>65% Complete</span>
                    </div>
                </div>
                
            </div>
            <div>2</div>
        </div>
    </div>
  )
}

export default IndividualStatistics
