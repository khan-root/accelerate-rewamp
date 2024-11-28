import { axiosInstance } from "../Base"

const teamsApi = {
    getTeams:function(){
        return axiosInstance.request({
            method:"GET",
            url:'/get_data.php',
            params:{
                'operation':'get_teams'
            }
        })
    }
}


export default teamsApi