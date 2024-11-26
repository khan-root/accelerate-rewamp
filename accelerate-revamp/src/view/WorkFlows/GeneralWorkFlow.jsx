import React from 'react'
import { motion } from 'framer-motion'
import CustomDialog from '../../components/CustomDialog'
import ViewTemplate from './ViewTemplate'


const GeneralWorkFlow = (props) => {
    const { generalData, handleViewTemplate, viewTemplate, handleToggleViewTemplate, handleToggleSubViewTemplate } = props

  return (
    <>
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-10'>
        {generalData?.map((ele, i)=>(
            <div key={i} className='h-40 w-48 '>
                <div className='flex flex-col items-center gap-4'>
                    <motion.div style={{backgroundColor:ele?.color_code}} className='flex items-center justify-center h-full w-full p-4 rounded-lg cursor-pointer'
                        whileHover={{
                            scale:1.1
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={()=>handleViewTemplate(ele)}
                    >
                        <img src={ele?.icon} alt={`workflow-${i}`}/>
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

export default GeneralWorkFlow