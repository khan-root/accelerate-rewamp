import React, { useState } from 'react'
import { DMYT } from '../../services/__dateTimeServices'
import { LuClock5 } from 'react-icons/lu'
import { HiDotsVertical } from 'react-icons/hi'
import { motion } from 'framer-motion'
import useMouseHoverService from '../../services/__mouseHoverService'
import { Button, Card, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import Wheel from '@uiw/react-color-wheel';
import { projectActonList } from '../../utils/projectsUtils'
import CustomButton from '../../components/CustomButton'


const TeamsList = (props) => {
    const {ele} = props
    const oneid = 10268458
    const {isHovered, handleMouseEnter, handleMouseLeave} = useMouseHoverService()
    const [openMenu, setOpenMenu] = React.useState(false);
    const [selectedColor, setSelectedColor] = useState('#fff')
    


    const testColor = (e)=>{
        console.log('e', e)
        setSelectedColor(e.hex)
    }


  return (
    <div className='flex flex-col gap-2'>
        <motion.div whileHover={{scale:1.05}} transition={{ duration: 0.3 }} className='w-full h-[200px] rounded-lg flex items-center justify-center gap-2 cursor-pointer relative' style={{backgroundColor:ele?.color_code}}
            onMouseEnter={handleMouseEnter} // Trigger on hover
            onMouseLeave={handleMouseLeave} // Trigger on hover end
        >
            <span className='text-8xl text-white'>{ele.name[0]}</span>
            {isHovered && ele?.oneid == oneid && (
                <motion.div
                    className='text-2xl text-white absolute right-2 top-3 z-4'
                    whileHover={{
                        scale: 1.3,
                        transition: { duration: 0.2 }, // Smooth transition
                    }}
                >
                    <Menu open={openMenu} handler={setOpenMenu} allowHover 
                        dismiss={{
                            itemPress: false,
                        }}
                    >
                        <MenuHandler>
                            <Button
                            variant="text"
                            className="text-base font-normal capitalize tracking-normal text-white p-0 bg-none"
                            >
                                <HiDotsVertical />
                            </Button>
                        </MenuHandler>
                        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid -mt-1">
                            <Card
                                className="col-span-3 flex h-full w-full items-center justify-center shadow-none"
                            >
                                <Typography variant="h6" color="blue-gray" className="mb-1">Choose Color</Typography>
                                
                                <Wheel
                                    color={selectedColor}
                                    onChange={(e)=>testColor(e)}
                                />
                                
                        
                            </Card>
                            <ul className="col-span-4 flex w-full flex-col gap-1">
                                {projectActonList.map(({ title, icon, id, color }) => (
                                    <MenuItem key={id}>
                                        <div className='flex items-center justify-between'>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                            {title}
                                            </Typography>
                                            <span className={`${color}`}>{icon}</span>
                                        </div>
                                    </MenuItem>
                                ))}
                                
                                <div className='flex items-center justify-between'>
                                    {/* <span className='h-10 w-20 rounded-xl flex' style={{backgroundColor:selectedColor}}></span> */}
                                    {/* <CustomButton 
                                        title='Update Color'
                                    /> */}
                                    <Button style={{backgroundColor: selectedColor}} className='text-white'>Update Color</Button>
                                </div>
                            </ul>
                        </MenuList>
                    </Menu>
                    
                </motion.div>
            )} 
        </motion.div>
        <div className='flex flex-col items-center gap-1'>
            <span className='text-customBlack-400 text-[17px] text-center'>{ele?.name}</span>
            <span className='text-customBlack-400 text-[13px] text-center'>added By: {ele?.owner_name}</span>
            <div className='flex flex-row items-center gap-2'>
                <span><LuClock5 /></span>
                <span className='text-customBlack-400 text-[13px]'>{DMYT(ele?.entry_time)}</span>
            </div>
        </div>
    </div>
  )
}

export default TeamsList