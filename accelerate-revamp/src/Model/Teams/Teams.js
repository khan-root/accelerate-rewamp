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
    },
    updateTeamColor:function(data){
        return axiosInstance.request({
            method:"POST",
            url:'/set_data.php',
            data:{
                'operation':'update_team_color',
                ...data
            }
        })
    },
    updateTeam:function(data){
        return axiosInstance.request({
            method:"POST",
            url:'/set_data.php',
            data:{
                'operation':'edit_team',
                ...data
            }
        })
    }
}


export default teamsApi