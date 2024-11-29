import { useState } from "react"
import { getRandomHexColor } from "../../services/__projectsServices"
import teamsApi from "../../Model/Teams/Teams"
import { showToast } from "../../components/Toaster/Toaster"
import useStore from "../../Store/Store"

const useActionTeamService = ()=>{

    const updatingTeamColor = useStore((state)=> state.updatingTeamColor)

    const [teamActionValue, setTeamActionValue] = useState({
        color:getRandomHexColor(),
        id:'',
        loadingState:'',
        name:'',
        confirm:false, 
    })



    const updateTeamColor = async(data)=>{
        console.log('data', data)
        const apiData = {
            team_id: data.id,
            color_code: teamActionValue.color
        }
        try {
            const response = await teamsApi.updateTeamColor(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                showToast('Team Color Updated Successfully', 'success')
                updatingTeamColor(data.id, teamActionValue?.color)
            }else{
                const error  = responseData.ERROR_DESCRIPTION 
                showToast(error, 'error')
            }
            console.log('response', response)            
        } catch (error) {
            console.log(error)
        }
    }



    const handleChangeTeamAction = (e)=>{
        if(!e.target){
            setTeamActionValue((prevState)=>({
                ...prevState,
                color:e.hex
            }))
        }else{
            const {name, value} = e.target
            setTeamActionValue((prevState)=>({
                ...prevState,
                [name]: value
            }))
        }
    }


    return {
        teamActionValue,
        updateTeamColor,
        handleChangeTeamAction
    }

}


export default useActionTeamService