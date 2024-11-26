import { useNavigate } from "react-router-dom"

const useHeaderServices = ()=>{
    const navigate = useNavigate()
    const backToHome =()=>{
        navigate('/')
    }


    const handleNavigation = (data)=>{
        console.log('data', data)
    }


    return {
        backToHome, handleNavigation
    }
}


export default useHeaderServices