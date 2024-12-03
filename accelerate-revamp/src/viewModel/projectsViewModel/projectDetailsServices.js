import { useNavigate } from "react-router-dom"
import projectsApi from "../../Model/Projects/Projetcs"
import { useState } from "react"

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


    return {projectDetails,projectTasksData, gettingProjectTasks}

}


export default useProjectDetailsServices