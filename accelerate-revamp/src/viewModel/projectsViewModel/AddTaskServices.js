import { useState } from "react"
import { addProjectTaskDetails, addProjectTeamEmp } from "../../services/__projectsServices"
import { showToast } from "../../components/Toaster/Toaster"
import { object } from "framer-motion/client";

const useAddTaskServices = (projectID)=>{

    const today = new Date().toISOString().split('T')[0];


    const [addTaskValue, setAddTaskValue] = useState({
        show:false,
        taskType:"0",
        taskTitle:'',
        taskDescription:'',
        taskPriority:'1',
        startDate:today,
        endDate:'',
        quickEmpSelectionList:[],
        wtbdList:[
            {id:1, description:'', selectionList:[] , mPriority:'0', uploadFile:'', date:'', selectEmp:null},
        ],
        selectEmpModal:false,
        empList:[],
        empId:null,
        allSelectedEmp:[],
        allTeams:[],
        teamId:null,
        teamEmployees:[],
        teamEmployeeId:null,
        responsible:[],
        accountable:[],
        consultant:[],
        informed:[],

    })


    const addTaskHandle = async()=>{
        if(addTaskValue.show){
            setAddTaskValue((prevState)=>({
                ...prevState,
                show:false
            }))
        }
        else{ 
            const apiData = {
                project_id : projectID
            }
            setAddTaskValue((prevState)=>({
                ...prevState,
                show:true
            }))
            const taskDetails = await addProjectTaskDetails(apiData)
            const responseData = taskDetails.data
            if(taskDetails.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA
                console.log('dbData', dbData)

                setAddTaskValue((prevState)=>({
                    ...prevState,
                    quickEmpSelectionList:dbData?.quick_selection,
                    empList:dbData?.employees_list,
                    allTeams:dbData?.teams
                }))
            }
        }
    }


    const handleChangeAddTask = (e)=>{
        const {name, value} = e.target 

        setAddTaskValue((prevState)=>({
            ...prevState,
            [name]: value
        }))
    }


    const addMoreMileStone = ()=>{

        const lastElement = addTaskValue?.wtbdList[addTaskValue?.wtbdList.length - 1];
        console.log('lastElement', lastElement)
        
        setAddTaskValue((prevState)=>({
            ...prevState,
            wtbdList:[...prevState.wtbdList, {id:lastElement.id+1, description:'', selectionList:lastElement.selectionList , mPriority:"0", uploadFile:'', date:'', selectEmp:null}]
        }))

    }



    const removeMilestone = (id)=>{
        setAddTaskValue((prevState)=>({
            ...prevState,
            wtbdList:prevState.wtbdList.filter((ele)=> ele.id !== id)
        }))
    }



    const handleToggleSelectEmp = ()=>{
        
        setAddTaskValue((prevState)=>({
            ...prevState,
            selectEmpModal: !prevState.selectEmpModal
        }))
    }




    const handleSelectAddTask = async(select, field)=>{


        if(field === 'empId'){

            setAddTaskValue((prevState)=>({
                ...prevState,
                [field]: select,
                
            }))
            addToSelectedEmpList({id:select.value, name:select.label})
        }
        if(field === "teamId"){
            setAddTaskValue((prevState)=>({
                ...prevState,
                [field]: select
            }))
           temMemberEmpList(select.value)
        }
        
        if(field === "teamEmployeeId"){
            
            setAddTaskValue((prevState)=>({
                ...prevState,
                [field]: select
            }))

            addSelectMember({id:select.value, name:select.label})
        }
        
        
    }
    const  temMemberEmpList =async(id)=>{
         const apiData = {
                team_id: id
            }
            
            const teamMemberResponse = await addProjectTeamEmp(apiData) 
            const responseData = teamMemberResponse.data
            if(teamMemberResponse.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA
                setAddTaskValue((prevState)=>({
                    ...prevState,
                    teamEmployees:dbData
                }))
                
            }else{
                setAddTaskValue((prevState)=>({
                    ...prevState,
                    teamEmployees:[]
                }))

            }
    }


    const addToSelectedEmpList = (data)=>{
        const existedEmpAllSelectedEmp = addTaskValue?.allSelectedEmp?.find((ele)=> ele.id === data?.id)
        const existedEmpresponsible = addTaskValue?.responsible?.find((ele)=> ele.id === data?.id)

        console.log('existedEmpresponsible', existedEmpresponsible)
        

        if(existedEmpAllSelectedEmp || existedEmpresponsible){
            showToast('Employee Already Exist in Selected List', 'error')
        }else{
            setAddTaskValue((prevState)=>({
                ...prevState,
                allSelectedEmp:[...prevState.allSelectedEmp, {id:data.id, name:data.name }],
                responsible:[...prevState.responsible, {id:data.id, name:data.name }],
                wtbdList: prevState.wtbdList.map((wtbd) => ({
                    ...wtbd,
                    selectionList: [...wtbd.selectionList, { id: data.id, name: data.name }],
                })),
                
            }))
            showToast('Employee Add To Selected List', 'success')
        }
    }
    const addSelectMember = (data)=>{
        const existedEmpAllSelectedEmp = addTaskValue?.allSelectedEmp?.find((ele)=> ele.id === data?.id)
        const existedEmpresponsible = addTaskValue?.responsible?.find((ele)=> ele.id === data?.id)
        

        if(existedEmpAllSelectedEmp || existedEmpresponsible){
            showToast('Employee Already Exist in Selected List', 'error')
        }else{
            setAddTaskValue((prevState)=>({
                ...prevState,
                responsible:[...prevState.responsible, {id:data.id, name:data.name }],
                wtbdList: prevState.wtbdList.map((wtbd) => ({
                    ...wtbd,
                    selectionList: [...wtbd.selectionList, { id: data.id, name: data.name }],
                })),
                
            }))
            showToast('Employee Add To Selected List', 'success')
        }
    }



    const removeFromSelectedList = (id)=>{
        setAddTaskValue((prevState)=>({
            ...prevState,
            allSelectedEmp: prevState.allSelectedEmp?.filter((ele)=> ele.id !== id),
            wtbdList: prevState.wtbdList.map((wtbd) => ({
                ...wtbd,
                selectionList: wtbd.selectionList.filter((emp) => emp.id !== id),
            })),
            responsible: prevState.responsible?.filter((emp) => emp.id !== id),
            accountable: prevState.accountable?.filter((emp) => emp.id !== id),
            consultant: prevState.consultant?.filter((emp) => emp.id !== id),
            informed: prevState.informed?.filter((emp) => emp.id !== id),
        }))
        showToast('Employee Removed from Selected List', 'success')
    }
    const removeFromTeamMemberSelect = (id,category)=>{
        setAddTaskValue((prevState)=>({
            ...prevState,
            [category]: prevState[category].filter((item) => item.id !== id),
            wtbdList: prevState.wtbdList.map((wtbd) => ({
                ...wtbd,
                selectionList: wtbd.selectionList.filter((emp) => emp.id !== id),
            })),
            allSelectedEmp: prevState.allSelectedEmp?.filter((ele)=> ele.id !== id),
        }))
        showToast('Employee Removed from Selected List', 'success')
    }





    const handleMultipleMSChange = (value, id, fieldName)=>{
        
        setAddTaskValue((prev) => ({
            ...prev,
            wtbdList: prev.wtbdList.map((item) =>
                item.id === id ? { ...item, [fieldName]: value } : item
            ),
        }));

    }



    const handleDragEnd = (result) => {
        const { source, destination } = result;

        // If dropped outside any droppable, exit
        if (!destination) return;

        // If dropped in the same place, do nothing
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return;
        }

        const sourceList = Array.from(addTaskValue[source.droppableId]);
        const destList = Array.from(addTaskValue[destination.droppableId]);
        const [movedItem] = sourceList.splice(source.index, 1);

        destList.splice(destination.index, 0, movedItem);

        setAddTaskValue({
        ...addTaskValue,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
        });
    };



    return {addTaskHandle,addTaskValue, handleChangeAddTask,addMoreMileStone,removeMilestone,handleToggleSelectEmp,handleSelectAddTask,removeFromSelectedList, addToSelectedEmpList,
        removeFromTeamMemberSelect,handleMultipleMSChange,
        handleDragEnd
    }

}


export default useAddTaskServices