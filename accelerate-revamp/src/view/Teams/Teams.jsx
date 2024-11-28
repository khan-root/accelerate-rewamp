import React, { useEffect } from 'react'
import useTeamsServices from '../../viewModel/teamsViewModel/teamsServices'
import { FaPlus } from 'react-icons/fa6'
import TeamsList from './TeamsList'

const Teams = () => {

  const {gettingAllTeams, allTeams} = useTeamsServices()

  useEffect(()=>{
    gettingAllTeams()
  },[])

  return (
    <div className='px-10 py-5 space-y-6 '>
      <div className='text-[20px] text-customBlack-300'>
        <span>Teams</span>
      </div>

      <div className='grid grid-cols-6 gap-6'>
        <div className='h-[200px] border-dashed border-[1px] border-customBlack-400 rounded-lg flex items-center justify-center cursor-pointer'
          // onClick={handleAddProject}
        >
          <span className='text-[25px]'><FaPlus /></span>
        </div>
          {allTeams?.map((ele)=>(
            <TeamsList 
              key={ele?.id}
              ele = {ele}
            />
          ))}
      </div>
    </div>
  )
}

export default Teams