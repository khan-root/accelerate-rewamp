import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { LuLayoutList } from 'react-icons/lu'
import { calendarToggleData } from '../../utils/homeUtils';
import useTabToggle from '../../services/__tabToggleService';
import { hexToRGBA, titleNameAlpha } from '../../services/__colorServices';

const Calendar = (props) => {
    const {tabToggleState, currentState,} = useTabToggle()
    const { calendarData, getCalendarTaskLabel, getCalendarTasks,getCalendarTasksLabel} = props;
    const today = new Date(); // Current date
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getDayOfWeek = (day) => {
        const date = new Date(calendarData.year.label, calendarData.month.value - 1, day);
        return date.getDay(); // 0 = Sunday, 6 = Saturday
    };


    const [hoveredDay, setHoveredDay] = useState(null);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <div className='flex items-center gap-4'>
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        className="w-10 h-10 flex items-center justify-center border border-customBlack-100 rounded-full hover:bg-customGray-400 hover:text-customGray-300"
                    >
                        <FaChevronLeft />
                    </motion.button>
                        <motion.button
                        whileHover={{ scale: 1.2 }}
                        className="w-10 h-10 flex items-center justify-center border border-customGray-300 rounded-full hover:bg-customGray-400 hover:text-customGray-300"
                    >
                        <FaChevronRight />
                    </motion.button>
                </div>
                
                <div className="text-xl text-customGray-400 font-bold flex flex-col items-center">
                    <span>{calendarData?.month.label}</span>
                    <span className="font-normal">{calendarData.year.label}</span>
                </div>
                <div className='flex items-center gap-4'>

                    {calendarToggleData.map((ele)=>(
                        <div key={ele.id} 
                            className={`${
                                currentState === ele.id? "text-white" : "hover:text-customBlack/60 text-customBlack-200"
                            } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
                            style={{
                                WebkitTapHighlightColor: "transparent",
                            }}
                        onClick={() => tabToggleState(ele.id)}
                        >
                            {currentState === ele.id && (
                            <motion.span
                                layoutId={`bubble-workflow`}
                                className="absolute inset-0 z-10 bg-[#8bc9f8]"
                                style={{ borderRadius: 9999 }}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                            )}
                            <span className='relative cursor-pointer text-[14px] z-20' >{ele.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-7 gap-4 text-center">
                {daysOfWeek.map((day) => (
                    <div
                        key={day}
                        className="text-md text-customGray-400 font-normal w-full h-full flex items-center justify-center"
                    >
                        {day}
                    </div>
                ))}

                <>
            {calendarData?.daysArray?.map((day, index) => {
                const attLabel = getCalendarTaskLabel(day, calendarData.month.value - 1, calendarData.year.value);
                const dayTasks = getCalendarTasksLabel(day, calendarData.month.value - 1, calendarData.year.value)
                const colors = titleNameAlpha(attLabel);
                const rgbaColor = hexToRGBA(colors?.bgColor, 0.2); // 50% opacity
                const taskCount = getCalendarTasks(day, calendarData.month.value - 1, calendarData.year.value);
                const isWeekend = getDayOfWeek(day) === 0 || getDayOfWeek(day) === 6;


                return day ? (
                    <motion.div 
                        whileHover={{scale:1.06}}
                        key={index}
                        className="w-full h-[100px] flex flex-col rounded-xl cursor-pointer"
                        onMouseEnter={() => setHoveredDay({ day, tasks: taskCount })}
                        onMouseLeave={() => setHoveredDay(null)}
                    >
                        <div
                            className={`w-full h-full flex flex-col rounded-xl relative -z-10 ${
                                isWeekend ? "bg-[#FDEFEE]" : "hover:border hover:border-customGray-blueGray bg-[#F9FAFC]"
                            }`}
                            style={{ backgroundColor: rgbaColor }}
                        >
                            <span className="text-[20px] flex-1 flex items-start ps-3 pt-2">{day}</span>
                            <span
                                className="flex-1 flex items-start ps-3 text-[15px] font-semibold"
                                style={{ color: colors?.bgColor }}
                            >
                                {taskCount > 0 ? `${taskCount} ${taskCount > 1 ? "Tasks" : "Task"}` : ""}
                            </span>
                        </div>

                        {/* Popover */}
                        {hoveredDay?.day === day && (
                            <div className="absolute right-[-300px] bg-white p-4 rounded-lg shadow-lg z-50 w-[400px]">
                                <p className="text-gray-500 text-sm font-semibold">{`Tasks for ${day}`}</p>
                                {dayTasks?.length > 0 ? (
                                    <ul className="mt-2 space-y-1">
                                        {dayTasks.map((task, i) => (
                                            <motion.li 
                                                whileHover={{scale:1.04}}
                                                key={i}
                                                className="flex items-center gap-2 text-customBlack-400 text-[13px] overflow-hidden cursor-pointer"
                                            >
                                                <span><LuLayoutList /></span>
                                                {task.title} {/* Displaying task title */}
                                            </motion.li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 mt-2 text-sm">No tasks for this day</p>
                                )}
                            </div>
                        )}

                    </motion.div>
                ) : (
                    <div key={index} className="px-4 py-2"></div>
                );
            })}
            </>
            </div>
        </div>
    );
};

export default Calendar;
