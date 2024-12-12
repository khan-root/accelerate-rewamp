import { Accordion, AccordionBody, AccordionHeader, Card } from '@material-tailwind/react'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { motion } from 'framer-motion'

function Icon({ isOpen }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`h-5 w-5 transition-transform ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}


const ProjectWorkFlowView = (props) => {
    const { tasksData,handleSinglTaskMileStone } = props 


   const [open, setOpen] = React.useState([]); // Use an array to track open states

   const handleOpen = (index) => {
  setOpen((prev) =>
    prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
  );
};


  return (
    <div className='flex flex-nowrap items-start gap-4 '>
        {tasksData?.map((ele, i)=>(
            <Card key={i} className="w-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]  rounded-md flex-shrink-0 px-4 py-3">
                <div className='flex items-center justify-between'>
                    <div>
                        <span>{ele.name}</span>
                    </div>
                    <div>
                        <span><FaPlus /></span>
                    </div>
                </div>
                {ele?.tasks?.map((task, index) => (
      <Accordion
        key={index}
        open={open.includes(index)} // Check if the current index is in the open array
    icon={<Icon isOpen={open.includes(index)} />}
      >
        <AccordionHeader
          onClick={() => handleOpen(index)}
          className="text-[13px]"
        >
          {task?.title}
        </AccordionHeader>
        <AccordionBody>
          <motion.div  whileHover={{scale:1.04}} className='cursor-pointer ms-4'
            onClick={()=>handleSinglTaskMileStone(task)}
          >{task?.description}</motion.div>
        </AccordionBody>
      </Accordion>
    ))}
            </Card>
        ))}
    </div>
  )
}

export default ProjectWorkFlowView