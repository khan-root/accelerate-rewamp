import { Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { DMYT } from '../../services/__dateTimeServices'
import { IoMdCheckmark } from 'react-icons/io'
import { AiOutlineExclamation } from 'react-icons/ai'
import { formatDeadlineDifference } from '../../services/__projectsServices'
import { FaPlus } from 'react-icons/fa'
import { GoChevronRight } from 'react-icons/go'
import { AnimatePresence, motion } from 'framer-motion'

const tableHeader = [
    "Status", "Task Name", "Assigned By", "Due Date", "Priority", "Type"
]

const currentUnixTimestamp = Math.floor(Date.now() / 1000);

const ProjectTable = (props) => {
    const {tasksData} = props


    const [expandedRows, setExpandedRows] = useState({});

    const toggleExpand = (index) => {
        setExpandedRows((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const rowVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            overflow: 'hidden',
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            },
        },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            },
        },
    };
  return (
     <table className="w-full min-w-max text-left h-full">
        <thead className='sticky top-0 z-[40]'>
          <tr>
            {tableHeader?.map((head,i) => (
                <th
                    key={i}
                    className="border-b border-blue-gray-100 bg-white"
                >
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="leading-none opacity-70 capitalize text-[14px] text-customGray-300 font-semibold"
                    >
                        {head}
                    </Typography>
                </th>
            ))}
          </tr>
        </thead>
        <tbody>
  {tasksData?.map((ele, i) => (
    <React.Fragment key={i}>
      {/* Display the main name */}
      <tr>
        <td colSpan={4}>
          <div className='flex items-center gap-2'>
            <span
                                        className={`transform transition-transform ${
                                            expandedRows[i] ? 'rotate-90' : ''
                                        }`}
                                        onClick={() => toggleExpand(i)}
                                    >
                                        <GoChevronRight />
                                    </span>
            <span
                className="font-semibold"
            >
            {ele?.name}
            </span>
            <span><FaPlus /></span>
          </div>
        </td>
      </tr>
      
      {/* Loop through the tasks of each name */}
      <AnimatePresence>
  {expandedRows[i] &&
    ele?.tasks?.map((task, index) => (
      <motion.tr
        key={index}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ overflow: 'hidden' }} // Ensure overflow is hidden while animating
      >
        <td>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {task?.status === "1"
              ? "Completed"
              : task.status === "0" && task?.deadline_date < currentUnixTimestamp
              ? formatDeadlineDifference(task?.deadline_date)
              : "Pending"}
          </Typography>
        </td>
        <td className="px-2">
          <div className="flex items-center gap-2">
            <span
              className={`h-4 w-4 flex items-center justify-center text-[13px] rounded-full 
                ${task?.status === "1"
                  ? "bg-customGreen-100 text-white"
                  : task.status === "0" && task?.deadline_date < currentUnixTimestamp
                  ? "bg-red-500 text-white"
                  : "border border-customGray-300 text-customGray-300"
                }`}
            >
              {task?.status === "1" ? (
                <IoMdCheckmark />
              ) : task.status === "0" && task?.deadline_date < currentUnixTimestamp ? (
                <AiOutlineExclamation />
              ) : (
                <IoMdCheckmark />
              )}
            </span>
            <Typography variant="small" color="blue-gray" className="font-normal">
              {task?.title}
            </Typography>
          </div>
        </td>
        <td>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {task?.assigned_by}
          </Typography>
        </td>
        <td>
          <Typography className="font-normal">{DMYT(task?.deadline_date)}</Typography>
        </td>
        <td className="px-5 py-1">
          <span
            variant="small"
            className={`rounded-xl px-2 py-1 text-white text-[14px] w-[80%] flex justify-center
              ${task?.priority === "0"
                ? "bg-customGreen-200"
                : task?.priority === "1"
                ? "bg-customOrange-100"
                : task?.priority === "2"
                ? "bg-customRed-100"
                : ""
              }`}
          >
            {task?.priority === "0"
              ? "Low"
              : task?.priority === "1"
              ? "Medium"
              : task?.priority === "2"
              ? "High"
              : ""}
          </span>
        </td>
        <td>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {task?.task_type === "0" ? "Indoor" : "Client Visit"}
          </Typography>
        </td>
      </motion.tr>
    ))}
</AnimatePresence>



        </React.Fragment>
    ))}
</tbody>

    </table>
  )
}

export default ProjectTable