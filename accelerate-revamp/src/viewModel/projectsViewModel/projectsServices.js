import { useEffect, useState } from "react"
import useStore from "../../Store/Store"

const useProjectsServices = ()=>{
    const gettingProjects = useStore((state)=> state.gettingProjects)
    const projects = useStore((state)=> state.projects)

    const [projectState, setProjectState] = useState({
        state:'active', 
        serach:'',

    })


    const toggleProjectsState = (data)=>{
        setProjectState((prevState)=>({
            ...prevState,
            state: data.value
        }))
    }


    const handleChangeSerachProjects = (e)=>{
        const { name, value } = e.target 

        setProjectState((prevState)=>({
            ...prevState,
            [name]: value
        }))
    }


    useEffect(()=>{
        const apiData = {
            search:projectState.serach,
            status_filter:projectState.state,

        }

        gettingProjects(apiData)
    },[projectState])


    return { projectState, toggleProjectsState,handleChangeSerachProjects,projects }

}


export default useProjectsServices