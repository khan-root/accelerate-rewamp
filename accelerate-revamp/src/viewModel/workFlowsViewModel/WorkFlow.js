import workflowsApi from "../../Model/WorkFlows/WorkFlows"

const workFlowsServices = (set, get)=>({

    workFlows:[],

    gettingWorkFlows:async()=>{
        try{
            const resposne = await workflowsApi.getAllWorkFlows()
            console.log('response', resposne)
        }catch(err){
            console.log('err', err)
        }
    }

})


export default workFlowsServices