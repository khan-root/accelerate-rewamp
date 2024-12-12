import { axiosInstance } from "../Base"

const milestonApi = {

    rateMilestone: function(data){
        return axiosInstance.request({
            method:"POST",
            url:'/set_data.php',
            data:{
                'operation': 'rate_milestone',
                ...data
            }
        })
    },
    rejectMilestone :function (data){
        return axiosInstance.request({
        method:"POST",
            url:'/set_data.php',
            data:{
                'operation': 'reset_milestone_status',
                ...data
            }
        })
    },
    pickCompleteMilestone :function (data){
        return axiosInstance.request({
        method:"POST",
            url:'/set_data.php',
            data:{
                'operation': 'pick_complete_milestone',
                ...data
            }
        })
    },
    deleteMilestone :function (data){
        return axiosInstance.request({
        method:"POST",
            url:'/set_data.php',
            data:{
                'operation': 'delete_task_milestone',
                ...data
            }
        })
    },
    addMilestone :function (data){
        return axiosInstance.request({
        method:"POST",
            url:'/set_data.php',
            data:{
                'operation': 'add_milestone',
                ...data
            }
        })
    },
    updateMilestone :function (data){
        return axiosInstance.request({
        method:"POST",
            url:'/set_data.php',
            data:{
                'operation': 'update_milestone',
                ...data
            }
        })
    },
    getAddMemberToMileston :function (){
        return axiosInstance.request({
        method:"GET",
            url:'/get_data.php',
            params:{
                'operation': 'add_member_to_milestone_data',
                
            }
        })
    },
    addMemberToTask :function (data){
        return axiosInstance.request({
        method:"POST",
            url:'/set_data.php',
            data:{
                'operation': 'add_members_task',
                ...data
                
            }
        })
    },

    


     

    
}

export default milestonApi