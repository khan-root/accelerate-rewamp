import React from 'react'
import { taskPrioriyCustomData } from '../../utils/projectsUtils'
import { FaPlus } from 'react-icons/fa6'
import { CgTrash } from 'react-icons/cg'
import { motion } from 'framer-motion'
import { Radio, Typography } from '@material-tailwind/react'
import CustomSelect from '../../components/CustomSelect'
import CustomButton from '../../components/CustomButton'

const AddMilstone = (props) => {
    const {addMilestoneValue,addMoreMileStoneHandler,removeMilestoneHandler,multipleMSChangeHandler,handleAddMilestone} = props
  return (
   <form className='space-y-5 w-full' onSubmit={handleAddMilestone}>
        
        {addMilestoneValue?.milestone.map((list,index)=>(
            <div className='flex items-start gap-1 w-full' key={list.id}>
                <div className='space-y-5 p-2 border border-customGray-400 flex-1' >
                    {/* <div className='grid grid-cols-4 gap-2'> */}
                        <div className='space-y-2'>
                            <label className='text-[#698592] text-[15px]'>Milestone Description</label>
                            <textarea 
                                rows="4" 
                                value={list?.description}
                                name="description"
                                className='text-[#333333] text-[12px] rounded-md   py-[10px] px-[17px] border border-[#cccccc] outline-none resize-none w-full focus:border-customBlue-100'
                                onChange={(e)=> multipleMSChangeHandler(e.target.value, list.id, 'description')}
                                placeholder='Task Milestone Description'
                            >
                            </textarea>
                        </div>
                        {/* <div className='col-span-2'>
                            <CustomSelect 
                                placeHolderTitle="Member"
                                options={([{id:0, name:'For All'}, ...addMilestoneValue?.milestoneUser])?.map((employee) => ({ value: employee.id, label:employee.name}))}
                                onChangeHandler={(selectedOption) => multipleMSChangeHandler(selectedOption, list.id,  'selectEmp')}
                                value={list?.selectEmp}
                            
                            />
                        </div>
                    </div> */}
                    <div className='grid grid-cols-4 gap-2'>
                        <div className='col-span-2 space-y-2'>
                            <label className='text-[#698592] text-[15px]'>Assigned To</label>
                            <CustomSelect 
                                placeHolderTitle="Member"
                                options={addMilestoneValue?.milestoneUser?.map((employee) => ({ value: employee.employee_id, label:employee.name}))}
                                onChangeHandler={(selectedOption) => multipleMSChangeHandler(selectedOption, list.id,  'selectEmp')}
                                value={list?.selectEmp}
                            
                            />
                        </div>
                        <div className='space-y-2 col-span-2'>
                            <label className='text-[#698592] text-[15px]'>Milestone Priority</label>
                            <div className='flex items-center'>
                            {taskPrioriyCustomData.map((ele)=>(
                                <Radio
                                    key={ele.id}
                                    color='blue' 
                                    label={
                                    <Typography 
                                    className='text-nowrap'
                                    
                                    >{ele.title}</Typography>
                                    }
                                    value={ ele.value }
                                    onChange={(e)=> multipleMSChangeHandler(e.target.value, list.id, 'mPriority')}
                                    checked={list.mPriority === ele.value}
                                />
                            ))}
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2'>
                    
                        <div className='space-y-2'>
                            <label className='text-[#698592] text-[15px]'>File</label>
                            <label className="block">
                                
                                <input type="file" className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100"
                                    onChange={(e) => multipleMSChangeHandler(e.target.files[0], list.id, 'uploadFile')}
                                
                                />
                            </label>
                        </div>
                        <div className='space-y-2'>
                            <label className='text-[#698592] text-[15px]'>Date</label>
                            <input 
                                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                                type='datetime-local' 
                                value={list.date}
                                onChange={(e)=> multipleMSChangeHandler(e.target.value, list.id, 'date')}
                                
                            />
                        </div>
                    </div>
                </div>
                {!addMilestoneValue.update && 
                <div className='flex items-center gap-2'>
                    {index === addMilestoneValue?.milestone.length - 1 && (
                        <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="h-6 w-6 flex items-center justify-center text-white bg-customGreen-100 rounded-full text-[12px] cursor-pointer"
                        onClick={addMoreMileStoneHandler}
                        >
                        <FaPlus />
                        </motion.span>
                    )}
                    {addMilestoneValue?.milestone.length !== 1 &&
                        <motion.span whileHover={{scale: 1.1}} className='h-6 w-6 flex items-center justify-center text-white bg-customRed-100 rounded-full text-[12px] cursor-pointer' 
                            onClick={()=>removeMilestoneHandler(list.id)}
                        >
                            <CgTrash />
                        </motion.span>
                    }
                </div>
                }
            </div>
        ))}
        <div>
            <CustomButton 
                type="submit"
                title={addMilestoneValue.update ? "Update" : "Submit"}
                loading={addMilestoneValue.loading}
            />
        </div>
    </form>
  )
}

export default AddMilstone