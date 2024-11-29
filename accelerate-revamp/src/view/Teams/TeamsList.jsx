import React from 'react'
import { DMYT } from '../../services/__dateTimeServices'
import { LuClock5 } from 'react-icons/lu'
import { HiDotsVertical } from 'react-icons/hi'
import { motion } from 'framer-motion'
import useMouseHoverService from '../../services/__mouseHoverService'
import { Button, Card, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import Wheel from '@uiw/react-color-wheel';
import { projectActonList } from '../../utils/projectsUtils'
import CustomDialog from '../../components/CustomDialog'
import CustomButton from '../../components/CustomButton'
import ConfirmationDialog from '../../components/ConfirmationDialog'


const TeamsList = (props) => {
    const {ele, handleChangeTeamAction, teamActionValue,updateTeamColor,handleTeamActionList, toggleEditTeam,handleUpdateTeam, toggleDeleteTeam,handleDeleteTeam} = props
    const oneid = 10268458
    const {isHovered, handleMouseEnter, handleMouseLeave} = useMouseHoverService()
    


   

  return (
    <>
        <div className='flex flex-col gap-2'>
            <motion.div whileHover={{scale:1.05}} transition={{ duration: 0.3 }} className='w-full h-[200px] rounded-lg flex items-center justify-center gap-2 cursor-pointer relative' style={{backgroundColor:ele?.color_code}}
                onMouseEnter={handleMouseEnter} // Trigger on hover
                onMouseLeave={handleMouseLeave} // Trigger on hover end
            >
                <span className='text-8xl text-white uppercase'>{ele.name[0]}</span>
                {isHovered && ele?.oneid == oneid && (
                    <motion.div
                        className='text-2xl text-white absolute right-2 top-3 z-4'
                        whileHover={{
                            scale: 1.3,
                            transition: { duration: 0.2 }, // Smooth transition
                        }}
                    >
                        <Menu 
                           dismiss={
                                !teamActionValue.showDialog
                                    
                                && { itemPress: false } // Prevent dismiss on item press otherwise
                            }
                        >
                            <MenuHandler>
                                <Button
                                variant="text"
                                className="text-base font-normal capitalize tracking-normal text-white p-0 bg-none"
                                >
                                    <HiDotsVertical />
                                </Button>
                            </MenuHandler>
                            <MenuList className="hidden w-[32rem] grid-cols-7 gap-4 overflow-visible lg:grid -mt-1">
                                <Card
                                    className="col-span-3 flex h-full w-full items-center justify-center shadow-none"
                                >
                                    <Typography variant="h6" color="blue-gray" className="mb-1">Choose Color</Typography>
                                    
                                    <Wheel
                                        color={teamActionValue?.color}
                                        onChange={(e)=>handleChangeTeamAction(e)}
                                    />
                                    
                            
                                </Card>
                                <ul className="col-span-4 flex w-full flex-col gap-2">
                                    {projectActonList.map(({ title, icon, id, color }) => (
                                        <MenuItem key={id}>
                                        
                                    
                                            <div className='flex items-center justify-between'>
                                                <Typography variant="h6" color="blue-gray" className="mb-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent the event from bubbling up
                                                        handleTeamActionList(ele, id);
                                                    }}
                                                >
                                                    {title}
                                                </Typography>
                                                <span className={`${color}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent the event from bubbling up
                                                        handleTeamActionList(ele, id);
                                                    }}
                                                >{icon}</span>
                                            </div>
                                        </MenuItem>
                                    ))}
                                    
                                    <div className='flex items-center justify-between'>
                                        <Button style={{backgroundColor: teamActionValue?.color}} className='text-white' onClick={()=>updateTeamColor(ele)}
                                            loading={teamActionValue?.loadingState === "update-color"}
                                            >Update Color</Button>
                                    </div>
                                </ul>
                            </MenuList>
                        </Menu>
                        
                    </motion.div>
                )} 
            </motion.div>
            <div className='flex flex-col items-center gap-1'>
                <span className='text-customBlack-400 text-[17px] text-center'>{ele?.name}</span>
                <span className='text-customBlack-400 text-[13px] text-center'>Added By: {ele?.owner_name}</span>
                <div className='flex flex-row items-center gap-2'>
                    <span><LuClock5 /></span>
                    <span className='text-customBlack-400 text-[13px]'>{DMYT(ele?.entry_time)}</span>
                </div>
            </div>
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
        </div>

    </>
  )
}


function EditTeam (props){
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
export default TeamsList