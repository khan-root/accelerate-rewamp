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
    }
}


export default workflowsApi