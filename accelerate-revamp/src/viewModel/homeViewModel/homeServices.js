import { useEffect, useState } from "react"
import { getAllMonths } from "../../utils/monthsUtils";
import useStore from "../../Store/Store";
import { DDY, DMYT } from "../../services/__dateTimeServices";

const useHomeServices = ()=>{

    const getInComingTasks = useStore((state)=> state.getInComingTasks)
    // const inComingTasks = useStore((state)=> state.inComingTasks)
    const gettingHomeTask = useStore((state)=> state.gettingHomeTask)
    const homeTaskData = useStore((state)=> state.homeTaskData)


    const calendarTasks = homeTaskData?.calender_tasks
    const categoryTasks = homeTaskData?.categorized_tasks




    let date  = new Date()
    const months = getAllMonths()

    const currentMonthIndex = new Date().getMonth();
    const currentYearIndex = new Date().getFullYear();
    const updateMonth = months[currentMonthIndex]

    const [calendarData, setCalendarData] = useState({
        daysArray:generateDays(date.getFullYear(), date.getMonth()),
        month:{value:updateMonth.id, label:updateMonth.title},
        year:{value:currentYearIndex, label:currentYearIndex},
        currentDate:getCurrentMonthObject(new Date()),
        
        daysAttr:[]
    })

    const [toggleValue, setToggleValue] = useState({
        main:1,
        sub:1,
        taskData:[],
    })



    


    useEffect(()=>{

        if(toggleValue.main === 1){
            setCalendarData((prevState)=>({
                ...prevState,
                daysAttr:calendarTasks?.incoming,
            }))
            
        }else{
            setCalendarData((prevState)=>({
                ...prevState,
                daysAttr:calendarTasks?.outgoing,
            }))
            
            
        }
    },[homeTaskData])

    useEffect(()=>{


        console.log('categoryTasks', toggleValue)

        if(toggleValue.main === 1){
          
            setToggleValue((prevState)=>({
                ...prevState,
                taskData:categoryTasks?.incoming_due
            }))
        }else{
            
            setToggleValue((prevState)=>({
                ...prevState,
                taskData:categoryTasks?.outgoing_due
            }))
            
        }
    },[])


   



    function getCurrentMonthObject(currentDate){
        // Get the month index (0-11)
        const monthIndex = currentDate.getMonth(); 

        // Array of month names
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Create the desired object
        return {
            value: monthIndex + 1, // Add 1 to make it 1-based (1 for January, 12 for December)
            label: monthNames[monthIndex] // Get the month name
        };
    };


    function generateDays(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
      
        let daysArray = [];
      
        // Fill in blank spaces for days of the previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
          daysArray.push(null);
        }
      
        // Fill in the days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
          daysArray.push(i);
        }



      
        return daysArray;
    }


    const getCalendarTaskLabel = (day, month, year) => {

        const dateString = `${String(day).padStart(2, "0")}-${String(
            month +1
        ).padStart(2, "0")}-${year}`; // Use passed month and year

        
        const tasks = calendarData?.daysAttr?.find(
            (att) => DDY(att.start) === dateString
        );
    
        return tasks ? tasks.title : null;
    };


    const getCalendarTasks = (day, month, year) => {
        const dateString = `${String(day).padStart(2, "0")}-${String(
            month + 1
        ).padStart(2, "0")}-${year}`; // Use passed month and year

        const tasks = calendarData?.daysAttr?.filter(
            (att) => DDY(att.start) === dateString
        );

        return tasks ? tasks.length : 0; // Return the count of tasks
    };
    const getCalendarTasksLabel = (day, month, year) => {
        const dateString = `${String(day).padStart(2, "0")}-${String(
            month + 1
        ).padStart(2, "0")}-${year}`; // Use passed month and year

        const tasks = calendarData?.daysAttr?.filter(
            (att) => DDY(att.start) === dateString
        );

        return tasks ? tasks : 0; // Return the count of tasks
    };




     useEffect(()=>{
        
        if(toggleValue.main === 1){
            if(toggleValue.sub === 1){
                setToggleValue((prevState)=>({
                    ...prevState,
                    taskData:categoryTasks?.incoming_due
                }))

            }else{
                setToggleValue((prevState)=>({
                    ...prevState,
                    taskData:categoryTasks?.incoming_overdue
                }))

            }
            setCalendarData((prevState)=>({
                ...prevState,
                daysAttr:calendarTasks?.incoming
            }))
        }
        else if(toggleValue.main === 2){
            if(toggleValue.sub === 1){
                setToggleValue((prevState)=>({
                    ...prevState,
                    taskData:categoryTasks?.outgoing_due

                }))

            }else{
                setToggleValue((prevState)=>({
                    ...prevState,
                    taskData:categoryTasks?.outgoing_overdue
                }))

            }
            setCalendarData((prevState)=>({
                ...prevState,
                daysAttr:calendarTasks?.outgoing
            }))
        }

        
        

    },[toggleValue.main, toggleValue.sub])
    




    const toggleState = (label, id)=>{
        console.log('homeTaskData', homeTaskData)
        if(label === 'main'){
            
            setToggleValue((prevState)=>({
                ...prevState,
                main:id
            }))
            }else{
            setToggleValue((prevState)=>({
                ...prevState,
                sub:id
            }))

        }
    }


    const handlePreviousMonth = () => {
        const currentMonth = calendarData.month.value - 1; // Month index (0-11)
        const currentYear = calendarData.year.value;

        // Create a new Date object to handle month/year calculation
        const prevMonthDate = new Date(currentYear, currentMonth - 1); // Move to previous month
        
        const newMonth = prevMonthDate.getMonth(); // Get the previous month index (0-11)
        const newYear = prevMonthDate.getFullYear(); // Get the updated year if necessary

        // Get the updated month object (assuming `getAllMonths()` is the function that returns month info)
        const updatedMonth = months.find((m) => m.id === newMonth + 1); // +1 to make it 1-based (1 for January)
        
        setCalendarData((prevState) => ({
            ...prevState,
            month: { value: newMonth + 1, label: updatedMonth.title }, // Update month (1-based index)
            year: { value: newYear, label: newYear }, // Update year if necessary
            daysArray:generateDays(newYear, newMonth)
        }));
        const apiData = {
            filter: `${updatedMonth?.id}-${newYear}`
        }
        gettingHomeTask(apiData)
        
    };


    const handleNextMonth = () => {
        const currentMonth = calendarData.month.value - 1; // Month index (0-11)
        const currentYear = calendarData.year.value;
        
        // Create a new Date object to handle month/year calculation
        const nextMonthDate = new Date(currentYear, currentMonth + 1); // Move to next month
        
        const newMonth = nextMonthDate.getMonth(); // Get the next month index (0-11)
        const newYear = nextMonthDate.getFullYear(); // Get the updated year if necessary

        // Get the updated month object (assuming `getAllMonths()` is the function that returns month info)
        const updatedMonth = months.find((m) => m.id === newMonth + 1); // +1 to make it 1-based (1 for January)

        setCalendarData((prevState) => ({
            ...prevState,
            month: { value: newMonth + 1, label: updatedMonth.title }, // Update month (1-based index)
            year: { value: newYear, label: newYear }, // Update year if necessary
            daysArray:generateDays(newYear, newMonth)
        }));

        const apiData = {
            filter: `${updatedMonth?.id}-${newYear}`
        }
        gettingHomeTask(apiData)
        

    };





    return {
        calendarData, getInComingTasks,
        getCalendarTaskLabel,
        getCalendarTasks,
        gettingHomeTask,
        getCalendarTasksLabel,
        toggleState,
        toggleValue,
        handlePreviousMonth,
        handleNextMonth
    }



}


export default useHomeServices