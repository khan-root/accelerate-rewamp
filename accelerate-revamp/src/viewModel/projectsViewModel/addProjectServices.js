import { useState } from "react"
import projectsApi from "../../Model/Projects/Projetcs"

const useAddProjectServices = ()=>{

    const [addProjectValue, setAddProjectValue] = useState({
      show:false ,
      owners:[],
      employees:[],
      usedWorkFlow:[],
      generalTemplates:[],
      generalTemplateState:1
    })




    const handleAddProject = async()=>{
        const apiData = {id:''}
        try{
            const response = await projectsApi.projectDetails(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA
                setAddProjectValue((prevState)=>({
                    ...prevState,
                    owners:dbData?.owners,
                    employees:dbData?.employees,
                    usedWorkFlow:dbData?.mostly_used_workflows,
                    generalTemplates:dbData?.generalTemplates,

                }))
            }
            console.log('response', response)
        }catch(err){
            console.log('err', err)
        }
        setAddProjectValue((prevState)=>({
            ...prevState,
            show:true
        }))
    }
    
    
    const toggleAddProject = ()=>{
        
        setAddProjectValue((prevState)=>({
            ...prevState,
            show:false
        }))
    }


    const toggleGeneralTemplateViewAdd = (data)=>{
        setAddProjectValue((prevState)=>({
            ...prevState,
            generalTemplateState:data.id
        }))
    }

    return {
        addProjectValue,handleAddProject,
        toggleAddProject,
        toggleGeneralTemplateViewAdd
    }

}

export default useAddProjectServices

// 