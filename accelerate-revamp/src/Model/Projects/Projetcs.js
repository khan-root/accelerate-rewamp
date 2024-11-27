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
    }
}


export default projectsApi