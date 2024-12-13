import React from 'react'
import CustomSelect from '../../components/CustomSelect'
import { priorityCustomData, taskPrioriyCustomData } from '../../utils/projectsUtils'

const AddBacklog = (props) => {
    const  { addBackLogValue, handleAddBacklog,handleSelectAddBackLog } = props 
    return (
    <div className='space-y-5 p-2' >
        <div className='space-y-2'>
            <label className='text-[#698592] text-[15px]'>Description</label>
            <textarea 
                rows="4" 
                name="description"
                className='text-[#333333] text-[12px] rounded-md   py-[10px] px-[17px] border border-[#cccccc] outline-none resize-none w-full focus:border-customBlue-100'
                placeholder='Enter Description...'
                value={addBackLogValue?.description}
                onChange={handleAddBacklog}
            >
            </textarea>
        </div>
        <div className='space-y-2'>
            <label className='text-[#698592] text-[15px]'>Attach File</label>
            <label className="block">
                
                <input type="file" className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                    onChange={handleAddBacklog}
                />
            </label>
        </div>
        <div className='grid grid-cols-2 gap-3'>
            <div className='space-y-2'>
                <label className='text-[#698592] text-[15px]'>Reported Date</label>
                <input 
                    className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                    type='date' 
                    name="reportedDate"
                    value={addBackLogValue?.reportedDate}
                    onChange={handleAddBacklog}
                />
            </div>
            <div className='space-y-1'>
                <label className='text-[#698592] text-[15px]'>Priority</label>
                <CustomSelect 
                    placeHolderTitle="Priority"
                    options={priorityCustomData?.map((priotiy) => ({ value: priotiy.value, label:priotiy.title}))}
                    onChangeHandler={(selectedOption) => handleSelectAddBackLog(selectedOption,  'priorityId')}
                    value={addBackLogValue?.priorityId}
                
                />
            </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
            <div className='space-y-1'>
                <label className='text-[#698592] text-[15px]'>Category</label>
                <CustomSelect 
                    placeHolderTitle="Category"
                    // options={addMilestoneValue?.milestoneUser?.map((employee) => ({ value: employee.employee_id, label:employee.name}))}
                    onChangeHandler={(selectedOption) => handleSelectAddBackLog(selectedOption,  'categoryId')}
                    value={addBackLogValue?.categoryId}
                
                />
            </div>
            <div className='space-y-1'>
                <label className='text-[#698592] text-[15px]'>Label</label>
                <CustomSelect 
                    placeHolderTitle="Label"
                    // options={addMilestoneValue?.milestoneUser?.map((employee) => ({ value: employee.employee_id, label:employee.name}))}
                    onChangeHandler={(selectedOption) => handleSelectAddBackLog(selectedOption,  'labelId')}
                    value={addBackLogValue?.labelId}
                
                />
            </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
            <div className='space-y-2'>
                <label className='text-[#698592] text-[15px]'>Refrence(optional)</label>
                <input 
                    className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                    type='text' 
                    name = 'refrence'
                    onChange={handleAddBacklog}
                    
                />
            </div>
            <div className=''>
                <label className='text-[#698592] text-[15px]'>Status</label>
                <CustomSelect 
                    placeHolderTitle="Status"
                    options={taskPrioriyCustomData?.map((status) => ({ value: status.value, label:status.title}))}
                    onChangeHandler={(selectedOption) => handleSelectAddBackLog(selectedOption,  'status')}
                    value={addBackLogValue?.status}
                
                />
            </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
            <div className='space-y-2'>
                <label className='text-[#698592] text-[15px]'>Pickd Date(optional)</label>
                <input 
                    className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                    type='date' 
                    name="pickedDate"
                    onChange={handleAddBacklog}
                    
                />
            </div>
            <div className='space-y-2'>
                <label className='text-[#698592] text-[15px]'>Completion Date(optional)</label>
                <input 
                    className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                    type='date' 
                    name='completionDate'
                    onChange={handleAddBacklog}
                    
                />
            </div>
            
        </div>
        <div className='space-y-2'>
            <label className='text-[#698592] text-[15px]'>Comment(optional)</label>
            <textarea 
                rows="4" 
                name="comment"
                className='text-[#333333] text-[12px] rounded-md   py-[10px] px-[17px] border border-[#cccccc] outline-none resize-none w-full focus:border-customBlue-100'
                placeholder='Enter text for comment'
                onChange={handleAddBacklog}
            >
            </textarea>
        </div>
    </div>
  )
}

export default AddBacklog