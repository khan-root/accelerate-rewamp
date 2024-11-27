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
    }
}


export default projectsApi