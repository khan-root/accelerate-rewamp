import React from 'react'
import { calculateDaysLeft } from '../../services/__projectsServices'
import { motion } from 'framer-motion'
import { Button, Card, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import Wheel from '@uiw/react-color-wheel';
import useMouseHoverService from '../../services/__mouseHoverService'
import { HiDotsVertical } from 'react-icons/hi'
import { projectMainAction } from '../../utils/projectsUtils'
import { HiOutlineStar, HiStar } from 'react-icons/hi2';
const ProjectsList = (props) => {
    const {ele,projectDetails,projectActionValue, handleChangeProjectAction,
        updateProjectColor,
        handleProjectActionList,handleFavProject
    } = props
    const {isHovered, handleMouseEnter, handleMouseLeave,} = useMouseHoverService()

  return (
   <motion.div className='w-full h-[200px] rounded-lg flex flex-col gap-2 cursor-pointer relative' style={{backgroundColor:ele?.view_background}}
    whileHover={{scale:1.05}} transition={{ duration: 0.3 }}
    onMouseEnter={handleMouseEnter} // Trigger on hover
    onMouseLeave={handleMouseLeave} // Trigger on hover end
    onClick={(e)=>{
        e.stopPropagation();
        projectDetails(ele)
    }}
   >
        <div  className='flex-1'></div>
        <div className='flex items-center justify-center text-wrap text-center'>
            <span className='text-white'>{ele?.name}</span>

        </div>
        <div className='flex-1 p-2 flex flex-col items-center gap-1'>
            <span className="text-[12px] text-center text-white">{ele?.proj_progress}% Progress</span>
            <div className="w-full border border-white bg-transparent  rounded-full h-4">
                <div
                    className="bg-white  h-full rounded-full"
                    style={{ width: `${ele?.proj_progress}%` }}
                    ></div>
                </div>
        </div>
        <div className='flex-1 flex justify-end text-white text-[13px] pe-4'>
            <span>{calculateDaysLeft(ele?.closing_date)}</span>
        </div>
        {isHovered && (
        
            <motion.div
                className='text-2xl text-white absolute right-2 top-3 z-5'
                whileHover={{
                    scale: 1.3,
                    transition: { duration: 0.2 }, // Smooth transition
                }}

                onClick={(e)=>e.stopPropagation()}
            >
                <Menu 
                //    dismiss={
                //         teamActionValue.showDialog ? { itemPress: false } : undefined
                //     }
                    onClick={(e)=>e.stopPropagation()}
                    // portal={{ inert: true }}
                    dismiss={{
                        itemPress: false,
                    }}
                >
                    <MenuHandler>
                        <Button
                        variant="text"
                        className="text-base font-normal capitalize tracking-normal text-white p-0 bg-none"
                        onClick={(e)=>e.stopPropagation()}
                        >
                            <HiDotsVertical />
                        </Button>
                    </MenuHandler>
                    <MenuList className="hidden w-[32rem] grid-cols-7 gap-4 overflow-visible lg:grid -mt-1"
                    onClick={(e)=>e.stopPropagation()}
                    >
                        <Card
                            className="col-span-3 flex h-full w-full items-center justify-center shadow-none"
                        >
                            <Typography variant="h6" color="blue-gray" className="mb-1">Choose Color</Typography>
                            
                            <Wheel
                                color={projectActionValue?.color}
                                onChange={(e)=>handleChangeProjectAction(e)}
                                onClick={(e)=>e.stopPropagation()}
                            />
                            
                    
                        </Card>
                        <ul className="col-span-4 flex w-full flex-col gap-2" onClick={(e)=>e.stopPropagation()}>
                            {projectMainAction.map(({ title, icon, id, color }) => (
                                <MenuItem key={id}>
                                
                            
                                    <div className='flex items-center justify-between'>
                                        <Typography variant="h6" color="blue-gray" className="mb-1"
                                            // onClick={(e) => {
                                            //     e.stopPropagation(); // Prevent the event from bubbling up
                                            //     handleTeamActionList(ele, id);
                                            // }}
                                        >
                                            {title}
                                        </Typography>
                                        <span className={`${color}`}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent the event from bubbling up
                                                handleProjectActionList(ele, id);
                                            }}
                                        >{icon}</span>
                                    </div>
                                </MenuItem>
                            ))}
                            
                            <div className='flex items-center justify-between'>
                                <Button style={{backgroundColor: projectActionValue?.color}} className='text-white' 
                                    onClick={(e)=>{e.stopPropagation(); updateProjectColor(ele)}}
                                    // loading={teamActionValue?.loadingState === "update-color"}
                                    
                                    >Update Color</Button>
                            </div>
                        </ul>
                    </MenuList>
                </Menu>
                
            </motion.div>
            
            
            

        )} 

        {isHovered && 
            <motion.div className='absolute right-7 top-5 z-5' 
                whileHover={{
                    scale: 1.3,
                    transition: { duration: 0.2 }, // Smooth transition
                }}
            >
                {ele?.star == 1 ?
                    <span className='text-[16px] text-customYellow-100' onClick={(e)=>{e.stopPropagation(); handleFavProject(ele)}}>
                        <HiStar />
                    </span>
                    :
                    <span className='text-[16px] text-white' onClick={(e)=>{e.stopPropagation(); handleFavProject(ele)}}>
                        <HiOutlineStar />
                    </span>
                }
            </motion.div>
        }
    </motion.div>
  )
}

export default ProjectsList