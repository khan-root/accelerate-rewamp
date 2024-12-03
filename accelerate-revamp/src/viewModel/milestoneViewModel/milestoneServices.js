import { useNavigate } from "react-router-dom"
import useStore from "../../Store/Store"

const useMilestoneServices = ()=>{


    const gettingMileStones = useStore((state)=> state.gettingMileStones)
    const milstones = useStore((state)=> state.milstones)


    const navigate = useNavigate()

    const handleSinglTaskMileStone=(data)=>{
        console.log('data', data)
        navigate(`/task/${data.id}`)
    }



    return {handleSinglTaskMileStone, gettingMileStones,milstones}


}


export default useMilestoneServices