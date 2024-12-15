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
    },
    homeTask:function(data){
        return axiosInstance.request({
            method:"GET",
            url:'/get_data.php',
            params:{
                'operation': 'tasks' ,
                ...data
            }
        })
    },
    
    getNotifications:function(){
        return axiosInstance.request({
            method:"GET",
            url:'/get_data.php',
            params:{
                'operation': 'get_notifications_v2' 
            }
        })
    },

}


export default homeApi