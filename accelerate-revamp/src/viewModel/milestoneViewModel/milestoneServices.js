import { useNavigate } from "react-router-dom"
import useStore from "../../Store/Store"
import { useState } from "react"

const useMilestoneServices = ()=>{


    const gettingMileStones = useStore((state)=> state.gettingMileStones)
    const milstones = useStore((state)=> state.milstones)


    const navigate = useNavigate()

    const handleSinglTaskMileStone=(data)=>{
        navigate(`/task/${data.id}`)
    }



    const [completeTaskValue, setCompleteTaskValue] = useState({
        id:'',
        show:false, 
        loading:false
    })


    const toggleCompleteTask = (id)=>{
        if(completeTaskValue.show){
            setCompleteTaskValue((prevstate)=>({
                ...prevstate,
                id:'',
                show:false, 
                loading:false
            }))
        }else{
            setCompleteTaskValue((prevstate)=>({
                ...prevstate,
                id:id,
                show:true, 
                loading:false
            }))
        }
    }




    const handleConfirmTaskComplete = async()=>{
        const apiData = {

        }
    }




    const [deleteMemberTask, setDeleteMemberTask] = useState({
        show:false, 
        loading:false, 
        id:'',
        task_id:'',
        member_id:'',
        role:''
    })



    const toggleDeleteMemberTask = (empData, taskData)=>{

        console.log(empData)
        console.log(taskData)

        if(deleteMemberTask.show){
            setDeleteMemberTask((prevstate)=>({
                ...prevstate,
                show:false, 
                loading:false, 
                id:'',
                task_id:'',
                member_id:'',
                role:''
            }))
        }else{
            setDeleteMemberTask((prevstate)=>({
                ...prevstate,
                show:true, 
                id:'',
                task_id:'',
                member_id:'',
                role:''
            }))

        }

    }


    const handleConfirmRemoveEmpTask = ()=>{

    }

    


    return {handleSinglTaskMileStone, gettingMileStones,milstones,toggleCompleteTask, completeTaskValue,handleConfirmTaskComplete,
        toggleDeleteMemberTask,deleteMemberTask,handleConfirmRemoveEmpTask
    }


}


export default useMilestoneServices