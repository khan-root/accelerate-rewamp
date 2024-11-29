import { useState } from "react"
import { getRandomHexColor } from "../../services/__projectsServices"
import teamsApi from "../../Model/Teams/Teams"
import { showToast } from "../../components/Toaster/Toaster"
import useStore from "../../Store/Store"
import useMouseHoverService from "../../services/__mouseHoverService"

const useActionTeamService = ()=>{

    const updatingTeamColor = useStore((state)=> state.updatingTeamColor)
    const updateTeamName = useStore((state)=> state.updateTeamName)
    const {isHovered, handleMouseEnter, handleMouseLeave} = useMouseHoverService()

    const [teamActionValue, setTeamActionValue] = useState({
        color:getRandomHexColor(),
        id:'',
        loadingState:'',
        name:'',
        confirm:false, 
        showDialog:false,
        openMenu:false
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


    const handleOpenMenu = ()=>{
        setTeamActionValue((prevState)=>({
            ...prevState,
            openMenu: !prevState.openMenu
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


    return {
        teamActionValue,
        updateTeamColor,
        handleChangeTeamAction,
        handleTeamActionList,handleOpenMenu,
        isHovered, handleMouseEnter, handleMouseLeave,
        toggleEditTeam,
        handleUpdateTeam
    }

}


export default useActionTeamService