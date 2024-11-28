import React from 'react'
import CustomButton from '../../components/CustomButton'

const AddOwner = (props) => {
    const {
        addOwner,addProjectValue,handleChangeAddProject
    } = props
  return (
    <div className='flex flex-col gap-5'>
        <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>Owner Name</label>  
            <input 
                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                type='text' 
                value={addProjectValue.ownerName}
                name='ownerName' 
                onChange={handleChangeAddProject}
                placeholder='Owner Name'
            />
        </div>
        <div>
            <CustomButton 
                title="Add Owner"
                onClick={addOwner}
                loading = {addProjectValue.loadingState === 'add_owner'}
            />
        </div>
    </div>
  )
}

export default AddOwner