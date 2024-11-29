import { useState } from "react"
import useStore from "../../Store/Store"

const useTeamsServices = ()=>{

    const allTeams = useStore((state)=> state.allTeams)
    const gettingAllTeams = useStore((state)=> state.gettingAllTeams)


    const [viewTeamValue, setViewTeamValue] = useState({
        show:false, 
        state:1, 
        data:[],

    })

    


    const handleViewTeam = ()=>{
        setViewTeamValue((prevState)=>({
            ...prevState,
            show:true
        }))
    }



    const toggleViewTeam =()=>{
        setViewTeamValue((prevState)=>({
            ...prevState,
            show:false,
            data:[]
        }))
    }


    return {
        allTeams,
        gettingAllTeams
    }

}

export default useTeamsServices