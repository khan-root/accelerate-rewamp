import workflowsApi from "../../Model/WorkFlows/WorkFlows"

const workFlowsServices = (set, get)=>({

    workFlows:[],

    gettingWorkFlows:async()=>{
        try{
            const resposne = await workflowsApi.getAllWorkFlows()
            const responseData = resposne.data 
            if(resposne.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                set({workFlows: responseData.DB_DATA})
            }
            console.log('response', resposne)
        }catch(err){
            console.log('err', err)
        }
    }

})


export default workFlowsServices