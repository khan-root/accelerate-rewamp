import { useState } from "react"
import useStore from "../../Store/Store"
import workflowsApi from "../../Model/WorkFlows/WorkFlows"

const useWorkFlowsServices = ()=>{

    const workFlows = useStore((state)=> state.workFlows)
    const gettingWorkFlows = useStore((state)=> state.gettingWorkFlows)


    const [toggleStateValue, setToggleStateValue] = useState(1)

    const handleToggleStateValue = (id)=>{
        setToggleStateValue(id)
    }




    const [viewTemplate, setViewTemplate] = useState({
        data:[],
        show:false, 
        loading: false,
        toggleState:1,
        prevFlowData:{}
    })


    const handleViewTemplate = async(data)=>{
        const apiData = {
            temp_id: data.id
        }
        setViewTemplate((prevState)=>({
            ...prevState,
            loading:true

        }))
        try {
            const response = await workflowsApi.getWorkFlowTemplte(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                setViewTemplate((prevState)=>({
                    ...prevState,
                    show:true,
                    data:responseData.DB_DATA,
                    toggleState:1,
                    prevFlowData:data

                }))
            }
            console.log('response', response)
        } catch (error) {
            console.log(error)
        }finally{
            setViewTemplate((prevState)=>({
                ...prevState,
                loading:false

            }))
        }
    }

    const handleToggleViewTemplate = ()=>{
        setViewTemplate((prevState)=>({
            ...prevState,
            show:false,
            loading:false,
            data:[],
            toggleState:1,
            prevFlowData:{}

        }))
    }
    
    
    const handleToggleSubViewTemplate = (id)=>{
        
        setViewTemplate((prevState)=>({
            ...prevState,
            toggleState:id,
    
        }))
    }



    return {
        gettingWorkFlows,workFlows,
        toggleStateValue,
        handleToggleStateValue,
        handleViewTemplate,
        handleToggleViewTemplate,
        viewTemplate,
        handleToggleSubViewTemplate
    }
}

export default useWorkFlowsServices