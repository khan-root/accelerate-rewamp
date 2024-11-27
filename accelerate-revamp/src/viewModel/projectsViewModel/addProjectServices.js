import { useState } from "react"

const useAddProjectServices = ()=>{

    const [addProjectValue, setAddProjectValue] = useState({
      show:false  
    })




    const handleAddProject = ()=>{
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


    return {
        addProjectValue,handleAddProject,
        toggleAddProject
    }

}

export default useAddProjectServices