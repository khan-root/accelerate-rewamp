import { axiosInstance } from "../Base"

const projectsApi = {
    getProjects: function(){
        return axiosInstance.request({
            method: "GET"
        })
    }
}


export default projectsApi