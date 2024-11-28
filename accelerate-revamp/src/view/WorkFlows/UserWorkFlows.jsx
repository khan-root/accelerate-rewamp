import React from 'react'
import {motion} from 'framer-motion'
import { FaDiagramProject } from 'react-icons/fa6'
import CustomDialog from '../../components/CustomDialog'
import ViewTemplate from './ViewTemplate'
const UserWorkFlows = (props) => {
    const {orgData, handleViewTemplate, viewTemplate, handleToggleViewTemplate, handleToggleSubViewTemplate} = props
  return (
    <>
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-16'>
        {orgData?.map((ele, i)=>(
            <div key={i} className='h-40 w-48 '>
                <div className='flex flex-col items-center gap-4'>
                    <motion.div className='flex items-center justify-center bg-customBlue-100 h-full w-full p-8 rounded-lg cursor-pointer'
                        whileHover={{
                            scale:1.1
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={()=>handleViewTemplate(ele)}
                    >
                        <span className='text-7xl text-white'><FaDiagramProject /></span>
                    </motion.div>
                    <span className='text-center'>{ele?.name}</span>
                </div>
            </div>
        ))}
    </div>
    {viewTemplate.show && 
        <CustomDialog 
            openDialog ={viewTemplate.show}
            handleOpen={handleToggleViewTemplate}
            title="Workflow Template"
            compo={
                <ViewTemplate 
                    viewTemplate={viewTemplate}
                    handleToggleSubViewTemplate={handleToggleSubViewTemplate}
                />
            }
            size="lg"
        />
    }
    </>
  )
}

export default UserWorkFlows