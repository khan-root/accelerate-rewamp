import React from 'react'
import { motion } from 'framer-motion'
import CustomSelect from '../../components/CustomSelect'
import { FaXmark } from 'react-icons/fa6'
const SelectEmpTask = (props) => {
    const {addTaskValue,handleSelectAddTask,removeFromSelectedList,addToSelectedEmpList} = props 
  return (
    <div className='grid grid-cols-4'>
        <div className='col-span-2 flex flex-col gap-3'>
            <div className='flex items-center gap-1 text-[13px] text-customBlue-100 flex-wrap justify-center'>
                <span>Please make sure you have already subscribed </span>
                <a href="" className='font-semibold'>Empleado</a>
                <span> in the same organization on </span>
            </div>
            <span>Quick employee selection</span>
            <div className='flex items-center gap-3 flex-wrap'>
                {addTaskValue?.quickEmpSelectionList?.map((emp, index) => {
                    const isSelected = addTaskValue?.allSelectedEmp?.find((ele)=>(ele.id === emp.oneid))
                    return (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            key={index}
                            className={`text-[11px] font-semibold border border-customGray-400 p-1 rounded-full cursor-pointer 
                                ${isSelected ? 'bg-customGreen-100 text-white' : 'hover:text-white hover:bg-customGray-400'}
                            `}
                            onClick={() => addToSelectedEmpList({id:emp.oneid, name:emp.full_name})}
                        >
                            {emp?.full_name}
                        </motion.div>
                    );
                })}
            </div>
            <div className='space-y-1 mb-20'>
              <label className='text-[#698592] text-[15px]'>Employees</label>
              <CustomSelect 
                placeHolderTitle="Employee" 
                options={addTaskValue?.empList?.map((employee) => ({ value: employee.id, label:employee.name}))}
                onChangeHandler={(selectedOption) => handleSelectAddTask(selectedOption, 'empId')}
                value={addTaskValue?.empId}
              
              />
            </div>
        </div>
        <div className='col-span-2 flex flex-col gap-2 '>
            <span>Selected Employee(s)</span>
            <div className='flex items-center gap-3 flex-wrap'>
                {addTaskValue?.allSelectedEmp?.map((ele, index)=>(
                    <div key={index} className='flex items-center gap-2 bg-customBlue-100 rounded-full px-3 py-1'>
                        <span className='text-white text-[12px]'>
                            {ele.name}
                        </span>
                        <motion.span whileHover={{scale:1.2}} className='h-6 w-6 flex items-center justify-center bg-white text-customRed-100 text-[12px] rounded-full cursor-pointer'
                            onClick={()=>removeFromSelectedList(ele.id)}
                        >
                            <FaXmark />
                        </motion.span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default SelectEmpTask