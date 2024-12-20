import { axiosInstance } from "../Base"

const taskApi = {
    getMileStones:function(data){
        return axiosInstance.request({
            method:'GET',
            url:'/get_data.php',
            params:{
                'operation':'get_task_milestones',
                ...data
            }
        })
    },
    taskCreate:function(data){
        return axiosInstance.request({
            method:'GET',
            url:'/set_data.php',
            params:{
                'operation':'create_task',
                ...data
            }
        })
    }
}


export default taskApi