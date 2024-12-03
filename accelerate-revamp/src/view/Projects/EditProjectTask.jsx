import React from 'react'
import CustomSelect from '../../components/CustomSelect'
import CustomButton from '../../components/CustomButton'
import { priorityCustomData } from '../../utils/projectsUtils'

const EditProjectTask = (props) => {
    const { editProjectTaskValue,handleChangeEditTask } = props
    console.log('editProjectTaskValue', editProjectTaskValue)
  return (
    <div className='space-y-4'>
        <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>Due Date</label>  
            <input 
                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                type='datetime-local' 
                value={editProjectTaskValue?.date}
                name='date' 
                onChange={handleChangeEditTask}
                placeholder='Team Name'
            />
        </div>
        <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>Priority</label>
            <CustomSelect 
                placeHolderTitle="Priority" 
                options={priorityCustomData?.map((priority) => ({ value: priority.value, label:priority.title}))}
                value={
                    priorityCustomData?.find(option => option.value ===  editProjectTaskValue?.priority) 
                    ? { value: priorityCustomData.find(option => option.value ===  editProjectTaskValue?.priority).value, 
                        label: priorityCustomData.find(option => option.value ===  editProjectTaskValue?.priority).title

                    }
                    :
                    editProjectTaskValue?.priority
                }
                // onChangeHandler={(selectedOption) => handleSelectAddProject(selectedOption, 'employeeId')}
                // value={addProjectValue?.employeeId}
            
            />
        </div>
        <div>
            <CustomButton 
                title="Update"
            />
        </div>
    </div>
  )
}

export default EditProjectTask