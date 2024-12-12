import { useEffect, useState } from "react"
import { getAllMonths } from "../../utils/monthsUtils";
import useStore from "../../Store/Store";
import { DDY, DMYT } from "../../services/__dateTimeServices";

const useHomeServices = ()=>{

    const getInComingTasks = useStore((state)=> state.getInComingTasks)
    const inComingTasks = useStore((state)=> state.inComingTasks)


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


    useEffect(()=>{
        setCalendarData((prevState)=>({
            ...prevState,
            daysAttr:inComingTasks?.calender_task
        }))
    },[inComingTasks])



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

        console.log('dateString', dateString)
        console.log('calendarData', calendarData.daysAttr)
        
        // const tasks = calendarData?.daysAttr?.find(
        //     (att) => DDY(att.start) === dateString
        // );
        // // console.log('tasks', tasks)
    
        // return tasks ? tasks.title : null;
    };


    const getCalendarTasks = (day, month, year)=>{
        const dateString = `${String(day).padStart(2, "0")}-${String(
            month +1
        ).padStart(2, "0")}-${year}`; // Use passed month and year
        
        const tasks = calendarData?.daysAttr?.find(
            (att) => DDY(att.start) === dateString
        );
        // console.log('tasks', tasks)
    
        return tasks ? tasks : null;
    }



    return {
        calendarData, getInComingTasks,
        getCalendarTaskLabel,
        getCalendarTasks
    }



}


export default useHomeServices