import { useNavigate } from "react-router-dom"
import projectsApi from "../../Model/Projects/Projetcs"
import { useState } from "react"
import { formatUnixToHTMLDateTime, formatUnixToYMD } from "../../services/__dateTimeServices"

const useProjectDetailsServices = ()=>{

    const [projectTasksData, setProjectTasksData] = useState({
        data:{},
        accordian:[]
    })

    const navigate = useNavigate()

    const projectDetails = (data)=>{
        const id = data.id
        navigate(`/projects/details/${id}`)
    }


    const gettingProjectTasks = async(id)=>{

        const apiData = {
            project_id: id
        }

        try {
            const response = await projectsApi.projectTasks(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                console.log('response', response)
                const dbData = responseData.DB_DATA 
                setProjectTasksData((prevState)=>({
                    ...prevState,
                    data:dbData
                }))
            }
        } catch (error) {
            
        }
    }


    const [editProjectTaskValue, setEditProjectTaskValue] = useState({
        show:false,
        date:'',
        priority:null,
        loading: false,
    })



    const editProjectHandler = (parent, child)=>{

        if(editProjectTaskValue.show){

            setEditProjectTaskValue((prevState)=>({
                ...prevState,
                show: false, 
                date:'',
                priority: null,
                loading:false
                
                
            }))
        }else{
            setEditProjectTaskValue((prevState)=>({
                ...prevState,
                show: true, 
                date:formatUnixToHTMLDateTime(child?.deadline_date),
                priority: child?.priority,
                loading:false
                
                
            }))
        }
    }



    const handleChangeEditTask = (e)=>{
        const {name, value} = e.target 

        setEditProjectTaskValue((prevState)=>({
            ...prevState,
            [name]: value
        }))
    }


    const handleSelectEditTask = (selected, field) =>{
        setEditProjectTaskValue((prevState)=>({
            ...prevState,
            [field]: selected
        }))
    }


    return {projectDetails,projectTasksData, gettingProjectTasks,editProjectHandler, editProjectTaskValue,
        handleChangeEditTask,handleSelectEditTask
    }

}


export default useProjectDetailsServices