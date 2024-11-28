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
    }
}


export default projectsApi