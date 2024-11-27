import { useState } from "react"

const useProjectsServices = ()=>{

    const [projectState, setProjectState] = useState({
        state:1, 
    })


    const toggleProjectsState = (data)=>{
        setProjectState((prevState)=>({
            ...prevState,
            state: data.id
        }))
    }


    return { projectState, toggleProjectsState }

}


export default useProjectsServices