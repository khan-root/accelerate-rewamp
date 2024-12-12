import { Checkbox } from '@material-tailwind/react'
import React from 'react'

const RejectMilestone = (props) => {
    const { milestoneActionValue,handleChangMilestonAction } = props
  return (
     <div className='flex flex-col gap-5'>
        <div className='space-y-1'>
            <label className='text-[#698592] text-[15px]'>Reason of Rejecttion</label>  
            <input 
                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                type='text' 
                value={milestoneActionValue.rejectionDesctiption}
                name='rejectionDesctiption' 
                onChange={handleChangMilestonAction}
                placeholder='Description'
            />
        </div>
        <div>
            <Checkbox
              color='blue' 
              label='Keep milestone assignee ? '
              name='alreadyAssinged'
              checked={milestoneActionValue?.alreadyAssinged}
              value={milestoneActionValue?.alreadyAssinged}
              onChange={handleChangMilestonAction}
            />
        </div>
    </div>
  )
}

export default RejectMilestone