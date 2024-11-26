import useStore from "../../Store/Store"

const useWorkFlowsServices = ()=>{

    const gettingWorkFlows = useStore((state)=> state.gettingWorkFlows)


    return {
        gettingWorkFlows
    }
}

export default useWorkFlowsServices