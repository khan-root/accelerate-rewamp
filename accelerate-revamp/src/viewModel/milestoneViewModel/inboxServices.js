import { useState } from "react"
import useStore from "../../Store/Store"
import milestonApi from "../../Model/Milestone/Mileston"
import { showToast } from "../../components/Toaster/Toaster"

const useInboxServices = (taskId)=>{


    const gettingDiscussion = useStore((state)=> state.gettingDiscussion)
    const gettingStarred = useStore((state)=> state.gettingStarred)
    const inboxData = useStore((state)=> state.inboxData)
    const starredData = useStore((state)=> state.starredData)
    const gettingActivity = useStore((state)=> state.gettingActivity)
    const activityData = useStore((state)=> state.activityData)
    const addingChatToFav = useStore((state)=> state.addingChatToFav)
    const removeFromFav = useStore((state)=> state.removeFromFav)
    const removeFavFromList = useStore((state)=> state.removeFavFromList)
    const addNewChat = useStore((state)=> state.addNewChat)

    const [toggleInboxState, setToggleInboxState]= useState({
        state:1,
    })




    const handleToggleInboxState = (ele)=>{
        const caseId = ele.id
        
        switch (caseId) {
            case 1:
                gettingDiscussion(taskId)
                break;
        
            case 2:
                gettingStarred(taskId)
                break;
            case 3:
                gettingActivity(taskId)
                break;
        
            default:
                break;
        }
        setToggleInboxState((prevState)=>({
            ...prevState,
            state:ele.id
        }))
        
    }


    const handleAddToStar = async(data)=>{
        const apiData = {
            id: data.id
        }
        try {
            const response = await milestonApi.addToStar(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                showToast("Add to starred", 'success')
                addingChatToFav(data.id)
            } 
            console.log('response', response)       
        } catch (error) {
            
        }
    }
    
    const handleRemoveFromFav = async(data)=>{
        const apiData = {
            id: data.id
        }
        try {
            const response = await milestonApi.removedStar(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                showToast("Remove From starred", 'success')
                if(toggleInboxState.state === 1){

                    removeFromFav(data.id)
                }else{
                    removeFavFromList(data.id)
                }
            }       
        } catch (error) {
            
        }
    }


    const [sendMessageValue, setSendMessageValue] = useState({
        message:'',
        loading:false
    })


    const handleChangeSendMessage = (e)=>{
        const {name, value} = e.target 
        setSendMessageValue((prevState)=>({
            ...prevState,
            [name]: value
        }))
    }


    const handleSendMessage = async()=>{
        const {message} = sendMessageValue
        if(message.trim()=== ""){
            showToast("Message Content is required", 'error')
            return
        }
        const apiData = {
            task_id:taskId,
            message:message
        }


        try {
            const response = await milestonApi.addDiscussion(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                addNewChat(responseData.INSERTED_DATA)
                setSendMessageValue((prevState)=>({
                    ...prevState,
                    message:''
                }))
            }else{
                const error = responseData.ERROR_DESCRIPTION 
                showToast(error, 'error')
            }
        } catch (error) {
            
        }


    }




    return {toggleInboxState, handleToggleInboxState,gettingDiscussion,inboxData,
        starredData,activityData,
        handleAddToStar,handleRemoveFromFav,
        handleChangeSendMessage,
        sendMessageValue,handleSendMessage
    }
}


export default useInboxServices