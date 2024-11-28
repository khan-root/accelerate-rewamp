import React from 'react'
import CustomButton from '../../components/CustomButton'
import { CgAsterisk } from 'react-icons/cg'
import { HiMiniXMark } from 'react-icons/hi2'

const AddProjectFlow = (props) => {
    const {addProjectValue,addExtraPhase,handleChangeAddProject, removePhase,addWorkFlow} = props
  return (
    <div className='grid grid-cols-2 gap-4'>
       <div className='flex flex-col gap-5'>
            <div className='space-y-1'>
                <label className='text-[#698592] text-[15px]'>Template Name</label>  
                <input 
                    className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                    type='text' 
                    value={addProjectValue.templateName}
                    name='templateName' 
                    onChange={handleChangeAddProject}
                    placeholder='Template Name'
                />
            </div>
            <div className='space-y-1'>
                <label className='text-customBlue-100 text-[15px]'>Add new phase(s) beside the two phases</label>  
                <div className='flex justify-between gap-2'>
                    <input 
                        className='w-[60%] text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                        type='text' 
                        value={addProjectValue.newPhase}
                        name='newPhase' 
                        onChange={handleChangeAddProject}
                        placeholder='Phase Name'
                    />
                    <CustomButton 
                        title='Add Phase'
                        onClick={addExtraPhase}
                        loading={addProjectValue?.loadingState === 'addFlow'}
                    />
                </div>
            </div>
            <div className='flex items-center justify-center py-3'>
                <CustomButton 
                    onClick={addWorkFlow} 
                    loading={addProjectValue?.loadingState === 'addWorkFlow'}
                    title="Submit"
                />

            </div>
        </div>
        <div className='ps-4 border-l border-l-customBlack-400'>
            <div className='space-y-1'>
                <label className='text-[#698592] text-[15px]'>Phases</label> 
                <div className='flex flex-col gap-2'> 
                    {addProjectValue?.defaultWorkFlow?.map((ele, i)=>(
                        <div key={ele.id} className='bg-customGray-200 p-2 flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className='text-customBlue-100'>{ele.required && <CgAsterisk />}</span>
                                <span className='text-customBlack-200'>{ele.title}</span>
                                <span className='text-[12px] text-customBlack-200'>{ele.phase}</span>
                            </div>
                            {!ele.required && 
                                <div className='bg-red-500 p-1 rounded-full cursor-pointer' onClick={()=>removePhase(ele.id)}>
                                    <span className='text-white'><HiMiniXMark /></span>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddProjectFlow