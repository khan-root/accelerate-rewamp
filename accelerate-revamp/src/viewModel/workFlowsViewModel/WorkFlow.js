import workflowsApi from "../../Model/WorkFlows/WorkFlows"

const workFlowsServices = (set, get)=>({

    workFlows:[],
    workflowLoading:false, 

    gettingWorkFlows:async()=>{
        set({workflowLoading:true})
        try{
            const resposne = await workflowsApi.getAllWorkFlows()
            const responseData = resposne.data 
            if(resposne.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                set({workFlows: responseData.DB_DATA})
            }
            console.log('response', resposne)
        }catch(err){
            console.log('err', err)
        }finally{
            set({workflowLoading:false})

        }
    }

})


export default workFlowsServices