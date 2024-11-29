import React, { useEffect } from 'react'
import useTeamsServices from '../../viewModel/teamsViewModel/teamsServices'
import { FaPlus } from 'react-icons/fa6'
import TeamsList from './TeamsList'
import useActionTeamService from '../../viewModel/teamsViewModel/TemaActionServices'
import useCreateTeamServices from '../../viewModel/teamsViewModel/createTeamServices'
import CustomDrawer from '../../components/CustomDrawer'
import CreateTeam from './CreateTeam'
import { motion } from 'framer-motion'
const Teams = () => {

  const {gettingAllTeams, allTeams} = useTeamsServices()
  const {teamActionValue,handleChangeTeamAction,updateTeamColor,handleTeamActionList,
    toggleEditTeam,handleUpdateTeam,
    handleDeleteTeam,toggleDeleteTeam

  } = useActionTeamService()

  useEffect(()=>{
    gettingAllTeams()
  },[])


  const {createTeamValue, toggleAddTeam, handleChangeTeam,handleBulkEmail, handleRemoveEmail} = useCreateTeamServices()

  

  return (
    <>
      <div className='px-10 py-5 space-y-6 '>
        <div className='text-[20px] text-customBlack-300'>
          <span>Teams</span>
        </div>

        <div className='grid grid-cols-7 gap-6'>
          <motion.div className='h-[200px] border-dashed border-[1px] border-customBlack-400 rounded-lg flex items-center justify-center cursor-pointer'
            onClick={toggleAddTeam}
            whileHover={{
              scale:1.05
            }}

          >
            <span className='text-[35px]'><FaPlus /></span>
          </motion.div>
            {allTeams?.map((ele, i)=>(
              <TeamsList 
                index={i}
                key={ele?.id}
                ele = {ele}
                teamActionValue = {teamActionValue}
                handleChangeTeamAction= {handleChangeTeamAction}
                updateTeamColor= {updateTeamColor}
                handleTeamActionList= {handleTeamActionList}
                
                toggleEditTeam= {toggleEditTeam}
                handleUpdateTeam= {handleUpdateTeam}
                toggleDeleteTeam= {toggleDeleteTeam}
                handleDeleteTeam= {handleDeleteTeam}
              />
            ))}
        </div>
      </div>
      {createTeamValue.show &&
        <CustomDrawer 
          open={createTeamValue.show}
          closeDrawer={toggleAddTeam}
          compo = {
            <CreateTeam 
              handleChangeTeam = {handleChangeTeam}
              createTeamValue ={createTeamValue}
              handleBulkEmail ={handleBulkEmail}
              handleRemoveEmail ={handleRemoveEmail}
            />
          }
          title="Create Team"
          widthSize={650}
        />
      }
    </>
  )
}

export default Teams