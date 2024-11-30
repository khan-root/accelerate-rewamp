import { axiosInstance } from "../Base"

const homeApi = {
    inComingTasks:function(){
        return axiosInstance.request({
            method:"GET",
            url:'/get_data.php',
            params:{
                'operation': 'incoming_tasks' 
            }
        })
    }
}


export default homeApi