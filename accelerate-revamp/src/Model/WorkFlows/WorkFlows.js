import { axiosInstance } from "../Base"

const workflowsApi = {
    getAllWorkFlows:function(){
        return axiosInstance.request({
            method:"GET",
            url:'/get_data.php',
            params:{
                'operation':'get_workflows'
            }
        })
    },
    getWorkFlowTemplte:function(data){
        return axiosInstance.request({
            method:"GET",
            url:'/get_data.php',
            params:{
                'operation':'get_workflow_template_phases',
                ...data
            }
        })
    }
}


export default workflowsApi