import { useState } from "react"
import milestonApi from "../../Model/Milestone/Mileston"
import { showToast } from "../../components/Toaster/Toaster"
import useStore from "../../Store/Store"

const useAddUserTaskMileston = (taskId, employeeDetails)=>{

    const addMemberToTaskMilestone = useStore((state)=> state.addMemberToTaskMilestone)

    const [addMemberToTask, setAddMemberToTask] = useState({
        show:false,
        loading: false,
        allUsersList:{},
        existedMembers:[],
        selectedMembers:[],
        memberId:null,
        employeeId: null

    })



    const toggleAddMemmberToTask = ()=>{

        if(addMemberToTask.show){
            setAddMemberToTask((prevState)=>({
                ...prevState,
                allUsersList:{},
                existedMembers:[],
                selectedMembers:[],
                memberId:null,
                employeeId: null,
                show:false
            }))
        }else{


            gettingMemebers()
            setAddMemberToTask((prevState)=>({
                ...prevState,
                show:true,
                existedMembers:employeeDetails
            }))
        }
    }



    const gettingMemebers = async()=>{
        try {
            const response = await milestonApi.getAddMemberToMileston()
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA
                setAddMemberToTask((prevState)=>({
                    ...prevState,
                    allUsersList: dbData
                }))
            }
            console.log('response', response)
        } catch (error) {
            
        }
    }



    const handleSelectAddMemberToTask = (select, field)=>{
        setAddMemberToTask((prevState)=>({
            ...prevState,
            [field]: select
        }))

        addingMemberToTask(select)
    }



    const addingMemberToTask = (data)=>{
        console.log('existedMembers', addMemberToTask.existedMembers)
        console.log('data', data)

        const existedEmp = addMemberToTask?.existedMembers?.find((ele)=> ele.employee_id === data?.value)
        const existedSelectedMembers = addMemberToTask?.selectedMembers?.find((ele)=> ele.id === data?.value)

        if(existedEmp){
            showToast("Employee Already in task", 'error')
            return
        }

        if(existedSelectedMembers){
            showToast("Employee Already existed in list", 'error')
            return
        }

        setAddMemberToTask((prevState)=>({
            ...prevState,
            selectedMembers: [...prevState.selectedMembers, {id:data.value, name:data.label}]
        }))
    }


    const removeTaskMemeberLsit = (id)=>{
        setAddMemberToTask((prevState)=>({
            ...prevState,
            selectedMembers: prevState.selectedMembers?.filter((ele)=> ele.id !== id)
        }))

        showToast("Employee Remove From List", 'success')
    }



    const handleAddMemberToTask = async(e)=>{
        e.preventDefault()
        const {selectedMembers} = addMemberToTask

        if(selectedMembers.length === 0){
            showToast("At least select one employee", 'error')
            return
        }


        const apiData ={
            task_id: taskId,
            members:selectedMembers.map((ele)=> ele.id)
        }

        setAddMemberToTask((prevState)=>({
            ...prevState,
            loading:true
        }))

        try{
            const response = await milestonApi.addMemberToTask(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.INSERTED_DATA
                addMemberToTaskMilestone(dbData)
                showToast("Employee added to task successfully", 'success')
                toggleAddMemmberToTask()

            }
            console.log('response', response)
        }catch(error){

        }finally{
            setAddMemberToTask((prevState)=>({
                ...prevState,
                loading:false
            }))
        }
    }




    return{
        addMemberToTask,
        toggleAddMemmberToTask,
        handleSelectAddMemberToTask,
        removeTaskMemeberLsit,
        handleAddMemberToTask
    }

}


export default useAddUserTaskMileston