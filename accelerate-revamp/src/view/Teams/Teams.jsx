import React, { useEffect } from 'react'
import useTeamsServices from '../../viewModel/teamsViewModel/teamsServices'
import { FaPlus } from 'react-icons/fa6'
import TeamsList from './TeamsList'
import useActionTeamService from '../../viewModel/teamsViewModel/TemaActionServices'
import useCreateTeamServices from '../../viewModel/teamsViewModel/createTeamServices'
import CustomDrawer from '../../components/CustomDrawer'
import CreateTeam from './CreateTeam'
import { motion } from 'framer-motion'
import CustomDialog from '../../components/CustomDialog'
import ViewTeam from './ViewTeam'
import ConfirmationDialog from '../../components/ConfirmationDialog'
import EditTeam from './EditTeam'
import TeamSkeleton from '../../Skeleton/TeamSkeleton'
const Teams = () => {

  const {gettingAllTeams, allTeams,handleViewTeam, toggleViewTeam, viewTeamValue,
    addNewMember, handleInviteMember,handleBulkEmailInvite ,handleRemoveEmailInvite,handleNewMember,teamLoading
  } = useTeamsServices()


  const {teamActionValue,handleChangeTeamAction,updateTeamColor,handleTeamActionList,
    toggleEditTeam,handleUpdateTeam,
    handleDeleteTeam,toggleDeleteTeam

  } = useActionTeamService()

  useEffect(()=>{
    gettingAllTeams()
  },[])


  const {createTeamValue, toggleAddTeam, handleChangeTeam,handleBulkEmail, handleRemoveEmail,handleAddTeam} = useCreateTeamServices()

  

  return (
    <> 
      {teamLoading? 
        <TeamSkeleton />
        :
      
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
                  
                  key={ele?.id}
                  ele = {ele}
                  teamActionValue = {teamActionValue}
                  handleChangeTeamAction= {handleChangeTeamAction}
                  updateTeamColor= {updateTeamColor}
                  handleTeamActionList= {handleTeamActionList}
                  handleViewTeam = {handleViewTeam}

                />
              ))}
          </div>
        </div>
      }
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
              handleAddTeam ={handleAddTeam}
            />
          }
          title="Create Team"
          widthSize={650}
        />
      }
      {viewTeamValue.showViewTeam && 
        <CustomDialog 
          openDialog ={viewTeamValue.showViewTeam}
          handleOpen = {toggleViewTeam}
          title = {`View ${viewTeamValue?.teamInfo?.name} Team`}
          compo = {
            <ViewTeam 
              viewTeamValue = {viewTeamValue}
              addNewMember = {addNewMember}
              handleInviteMember = {handleInviteMember}
              handleBulkEmailInvite = {handleBulkEmailInvite}
              handleRemoveEmailInvite = {handleRemoveEmailInvite}
              handleNewMember = {handleNewMember}
              
            />
          }
          outsidePress = {false}
        />
      }
      {teamActionValue?.showDialog &&
            <CustomDialog 
                openDialog = {teamActionValue?.showDialog}
                handleOpen = {toggleEditTeam}
                title='Edit Team'
                compo = {
                    <EditTeam 
                        teamActionValue ={teamActionValue}
                        handleChangeTeamAction = {handleChangeTeamAction}
                        handleUpdateTeam = {handleUpdateTeam}
                    />
                }
                outsidePress={false}
                size="sm"
            
            />
        }
        {teamActionValue?.deleteConfirmation &&
            <ConfirmationDialog 
                openDialog = {teamActionValue?.deleteConfirmation}
                handleOpen = {toggleDeleteTeam}
                title='Delete Confirmation'
                outsidePress={false}
                message="Are you sure, you want to Delete this Team ?"
                size="sm"
                loading={teamActionValue?.loadingState === "delete-team"}
                handleConfirm={handleDeleteTeam}
                
            
            />
        }
    </>
  )
}

export default Teams