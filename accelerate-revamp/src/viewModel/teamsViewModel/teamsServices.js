import { useState } from "react"
import useStore from "../../Store/Store"
import teamsApi from "../../Model/Teams/Teams"

const useTeamsServices = ()=>{

    const allTeams = useStore((state)=> state.allTeams)
    const gettingAllTeams = useStore((state)=> state.gettingAllTeams)


    const [viewTeamValue, setViewTeamValue] = useState({
        showViewTeam:false, 
        state:1, 
        data:[],
        teamInfo:{}
    })

    


    const handleViewTeam = async(data)=>{
        const apiData = {
            id: data.id
        }

        try {
            const response = await teamsApi.teamDetails(apiData)
            console.log('response', response)
            const responseData = response.data
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                setViewTeamValue((prevState)=>({
                    ...prevState,
                    showViewTeam:true,
                    teamInfo:data,
                    data: dbData
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }



    const toggleViewTeam =()=>{
        setViewTeamValue((prevState)=>({
            ...prevState,
            showViewTeam:false,
            data:[],
            teamInfo:{}
            
        }))
    }


    return {
        allTeams,
        gettingAllTeams,
        viewTeamValue,
        handleViewTeam,
        toggleViewTeam
    }

}

export default useTeamsServices

