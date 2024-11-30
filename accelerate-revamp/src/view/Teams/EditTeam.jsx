import React from 'react'
import CustomButton from '../../components/CustomButton'

const EditTeam = (props) => {
  const {handleChangeTeamAction, teamActionValue,handleUpdateTeam} = props
    return(
        <div className='space-y-5'>
            <div className='space-y-1'>
              <label className='text-[#698592] text-[15px]'>Team Name</label>  
              <input 
                  className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                  type='text' 
                  value={teamActionValue?.name}
                  name='name' 
                  onChange={handleChangeTeamAction}
                  placeholder='Project Name'
              />
            </div>
            <div>
                <CustomButton 
                    title ="Update Team"
                    onClick={handleUpdateTeam}
                    loading={teamActionValue?.loadingState === "update-team"}
                />
            </div>
        </div>
    )
}

export default EditTeam

