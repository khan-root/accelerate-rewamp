import { axiosInstance } from "../Base"

const projectsApi = {
    getProjects: function(data){
        return axiosInstance.request({
            method: "GET",
            url:'/get_data.php',
            params:{
                'operation':'get_projects',
                ...data
            }
        })
    },
    projectDetails:function(data){
        return axiosInstance.request({
            method:"GET",
            url:'/get_data.php',
            params:{
                'operation':'get_project_details',
                ...data
            }
        })
    },
    addWorkFlowTemplate:function(data){
        return axiosInstance.request({
            method:"POST",
            url:'/set_data.php',
            params:{
                'operation':'set_workflow',
                ...data
            }
        })
    },
    addOwner:function(data){
        return axiosInstance.request({
            method:"POST",
            url:'/set_data.php',
            data:{
                'operation':'set_owner',
                ...data
            }
        })
    },

    createProject:function(data){
       return axiosInstance.request({
            method:"POST",
            url:'/set_data.php',
            data:{
                'operation':'create_project',
                ...data
            }
        })
    },
    projectTasks:function(data){
       return axiosInstance.request({
            method:"GET",
            url:'/get_data.php',
            params:{
                'operation':'project_tasks',
                ...data
            }
        })
    },
    addProjectTaskDetails:function(data){
       return axiosInstance.request({
            method:"GET",
            url:'/get_data.php',
            params:{
                'operation':'get_task_details',
                ...data
            }
        })
    },
    getTeamMemebers:function(data){
       return axiosInstance.request({
            method:"GET",
            url:'/get_data.php',
            params:{
                'operation':'get_team_member_dropdown',
                ...data
            }
        })
    },
    deleteProject:function(data){
       return axiosInstance.request({
            method:"POST",
            url:'/set_data.php',
            params:{
                'operation':'delete_project',
                ...data
            }
        })
    },
    closeProject:function(data){
       return axiosInstance.request({
            method:"POST",
            url:'/set_data.php',
            params:{
                'operation':'project_close',
                ...data
            }
        })
    },
    projectStarToggle:function(data){
       return axiosInstance.request({
            method:"POST",
            url:'/set_data.php',
            params:{
                'operation':'star_project',
                ...data
            }
        })
    },
    
    
}


export default projectsApi