import { useNavigate } from "react-router-dom"
import useStore from "../Store/Store"

const useHeaderServices = ()=>{
    const gettingNotifications = useStore((state)=> state.gettingNotifications)
    const notificationData = useStore((state)=> state.notificationData)
    
    
    
    const navigate = useNavigate()
    const backToHome =()=>{
        navigate('/')
    }


    const handleNavigation = (data)=>{
        console.log('data', data)
    }


    return {
        backToHome, handleNavigation,gettingNotifications,notificationData
    }
}


export default useHeaderServices