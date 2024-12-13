import { useState } from "react"

const useInboxServices = (projectId)=>{


    const [toggleInboxState, setToggleInboxState]= useState({
        state:1,
    })




    const handleToggleInboxState = (ele)=>{
        setToggleInboxState((prevState)=>({
            ...prevState,
            state:ele.id
        }))
    }



    return {toggleInboxState, handleToggleInboxState}
}


export default useInboxServices