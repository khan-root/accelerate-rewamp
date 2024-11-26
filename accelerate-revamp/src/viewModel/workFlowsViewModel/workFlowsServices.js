import { useState } from "react"
import useStore from "../../Store/Store"

const useWorkFlowsServices = ()=>{

    const workFlows = useStore((state)=> state.workFlows)
    const gettingWorkFlows = useStore((state)=> state.gettingWorkFlows)


    const [toggleStateValue, setToggleStateValue] = useState(1)

    const handleToggleStateValue = (id)=>{
        setToggleStateValue(id)
    }


    return {
        gettingWorkFlows,workFlows,
        toggleStateValue,
        handleToggleStateValue
    }
}

export default useWorkFlowsServices