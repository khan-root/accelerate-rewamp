import { useState } from "react"
import { getRandomHexColor } from "../../services/__projectsServices"
import teamsApi from "../../Model/Teams/Teams"
import { showToast } from "../../components/Toaster/Toaster"
import useStore from "../../Store/Store"
import useMouseHoverService from "../../services/__mouseHoverService"

const useActionTeamService = ()=>{

    const updatingTeamColor = useStore((state)=> state.updatingTeamColor)
    const updateTeamName = useStore((state)=> state.updateTeamName)
    const deleteTeam = useStore((state)=> state.deleteTeam)
    const {isHovered, handleMouseEnter, handleMouseLeave} = useMouseHoverService()

    const [teamActionValue, setTeamActionValue] = useState({
        color:getRandomHexColor(),
        id:'',
        loadingState:'',
        name:'',
        confirm:false, 
        showDialog:false,
        deleteConfirmation:false
    })



    const updateTeamColor = async(data)=>{
        const apiData = {
            team_id: data.id,
            color_code: teamActionValue.color
        }
        setTeamActionValue((prevState)=>({
            ...prevState,
            loadingState:'update-color'
        }))
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
        }finally{
            setTeamActionValue((prevState)=>({
                ...prevState,
                loadingState:''
            }))
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




    const handleTeamActionList = (data, id)=>{
        const caseID = id 
        switch (caseID) {
            case 1:
                setTeamActionValue((prevState)=>({
                    ...prevState,
                    showDialog:true,
                    name:data.name,
                    id:data.id
                }))
                break;
            case 2:
                setTeamActionValue((prevState)=>({
                    ...prevState,
                    deleteConfirmation:true,
                    id:data.id
                }))
                break;
        
            default:
                break;
        }
    }



    const toggleEditTeam = ()=>{
        setTeamActionValue((prevState)=>({
            ...prevState,
            showDialog:false,
            name:''
        }))
    }
    const toggleDeleteTeam = ()=>{
        setTeamActionValue((prevState)=>({
            ...prevState,
            deleteConfirmation:false,
            id:''
        }))
    }


    


    const handleUpdateTeam = async()=>{

        const apiData = {
            name: teamActionValue.name,
            id: teamActionValue.id
        }

        if(teamActionValue.name.trim() === ""){
            showToast("Team Name is Required", 'error')
            return
        }

        setTeamActionValue((prevState)=>({
            ...prevState,
            loadingState:'update-team'
        }))

        try {
            const response = await teamsApi.updateTeam(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                showToast("Team Name Updated Successfully", 'success')
                updateTeamName(teamActionValue.id, teamActionValue.name)
                toggleEditTeam()

            }else{
                const error = responseData.ERROR_DESCRIPTION
                showToast(error, 'error')
            }
            console.log('response', response)
        } catch (error) {
            
        }finally{
            setTeamActionValue((prevState)=>({
                ...prevState,
                loadingState:''
            }))
        }

    }


    const handleDeleteTeam = async()=>{

        const apiData = {
            id: teamActionValue.id 
        }

        setTeamActionValue((prevState)=>({
            ...prevState, 
            loadingState:'delete-team'
        }))
        try {
            const response = await teamsApi.deleteTeam(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS ==="SUCCESSFUL"){
                showToast("Team Deleted Successfully", 'success')
                toggleDeleteTeam()
                deleteTeam(teamActionValue.id)
            }else{
                const error = error.ERROR_DESCRIPTION
                showToast(error, 'error')
            }
        } catch (error) {
            
        }finally{
            setTeamActionValue((prevState)=>({
                ...prevState, 
                loadingState:''
            }))
        }

    }


    return {
        teamActionValue,
        updateTeamColor,
        handleChangeTeamAction,
        handleTeamActionList,
        isHovered, handleMouseEnter, handleMouseLeave,
        toggleEditTeam,
        handleUpdateTeam,
        handleDeleteTeam,
        toggleDeleteTeam
    }

}


export default useActionTeamService