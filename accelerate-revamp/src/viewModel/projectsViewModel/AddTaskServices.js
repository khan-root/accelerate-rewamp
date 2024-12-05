import { useState } from "react"

const useAddTaskServices = ()=>{


    const [addTaskValue, setAddTaskValue] = useState({
        show:false,
        taskType:"0",
        wtbdList:[
            {id:1, description:'', selectionList:[] , mPriority:'', uploadFile:'', date:''},
            {id:2, description:'', selectionList:[] , mPriority:'', uploadFile:'', date:''},
        ]
    })


    const addTaskHandle = ()=>{
        if(addTaskValue.show){
            setAddTaskValue((prevState)=>({
                ...prevState,
                show:false
            }))
        }
        else{    
            setAddTaskValue((prevState)=>({
                ...prevState,
                show:true
            }))
        }
    }


    const handleChangeAddTask = (e)=>{
        const {name, value} = e.target 
        console.log('*****')
        console.log(value)

        setAddTaskValue((prevState)=>({
            ...prevState,
            [name]: value
        }))
    }


    return {addTaskHandle,addTaskValue, handleChangeAddTask}

}


export default useAddTaskServices