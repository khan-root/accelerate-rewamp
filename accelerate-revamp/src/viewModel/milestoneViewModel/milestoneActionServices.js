import { useState } from "react"
import milestonApi from "../../Model/Milestone/Mileston"
import { showToast } from "../../components/Toaster/Toaster"
import useStore from "../../Store/Store"

const useMilestoneActionService = ()=>{


    const updateRating = useStore((state)=> state.updateRating)
    const rejectingMilestone = useStore((state)=> state.rejectingMilestone)
    const pickMilestone = useStore((state)=> state.pickMilestone)
    const completeMilestone = useStore((state)=> state.completeMilestone)
    const deleteMilestone = useStore((state)=> state.deleteMilestone)


    const [milestoneActionValue, setMilestoneActionValue] = useState({
        reject: false,
        milestonId: '',
        taskId:'',
        rejectionDesctiption:'',
        alreadyAssinged:true,
        loading:'',
        remove:false
    })


    const [ratingValue, setRatingValue] = useState({
        rating:0,
        loading:false, 
        hoverRating:[0,0,0,0,0],


    })



    const toggleMilestonReject = (data)=>{
        if(milestoneActionValue.reject){
            
            setMilestoneActionValue((prevstate)=>({
                ...prevstate,
                reject:false,
                milestonId:'',
                taskId:'',
                loading:false,
                rejectionDesctiption:'',
                
            }))
        }else{
            setMilestoneActionValue((prevstate)=>({
                ...prevstate,
                milestonId: data.id,
                taskId:data.task_id,
                reject: true
            }))
        }
    }



    const handleChangMilestonAction = (e)=>{
        const {name, value} = e.target
        if(name === 'alreadyAssinged'){
                
                setMilestoneActionValue((prevState)=>({
                    ...prevState,
                    alreadyAssinged: !prevState.alreadyAssinged
                }))
            }else{
                
                setMilestoneActionValue((prevState)=>({
                    ...prevState,
                    [name]: value
                }))
            }

       
    }



    const handleConfirmReject = async()=>{
        const {taskId, milestonId, alreadyAssinged  , rejectionDesctiption} = milestoneActionValue

        setMilestoneActionValue((prevState)=>({
            ...prevState,
            loading:'rejecting'
        }))
        try {
            const apiData = {
                task_id:taskId,
                milestone_id:milestonId,
                status:'',
                completed_by:alreadyAssinged ? 'on' :'',
                rejection_reason:rejectionDesctiption

            }

            
            
            if(rejectionDesctiption.trim() === ""){
                showToast("Rejection Reason is required", 'error')
                return
            }


            const response = await milestonApi.rejectMilestone(apiData)
            const responseData = response.data
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                showToast("Milestone rejected successfully", 'success')
                rejectingMilestone(milestonId)
                toggleMilestonReject()
            }
        } catch (error) {
            
        }finally{
            setMilestoneActionValue((prevState)=>({
                ...prevState,
                loading:''
            }))
        }
    }


   const handleMouseLeave = () => {
  setRatingValue((prevState) => ({
    ...prevState,
    hoverRating: [0, 0, 0, 0, 0], // Reset hoverRating for all stars
  }));
};



const handleMouseMove = (event, starIndex) => {
  const rect = event.target.getBoundingClientRect();
  const offsetX = event.clientX - rect.left; // Cursor position inside the star
  const fractionalPart = offsetX / rect.width; // Calculate fractional hover rating

  setRatingValue((prevState) => {
    const updatedHoverRating = [...prevState.hoverRating]; // Create a copy of hoverRating array
    updatedHoverRating[starIndex] = fractionalPart; // Update the hover rating of the hovered star
    return {
      ...prevState,
      hoverRating: updatedHoverRating, // Update hoverRating for the star being hovered
    };
  });
};


const handleRatingClick = (starIndex) => {
  setRatingValue((prevState) => {
    const updatedHoverRating = [...prevState.hoverRating];
    const newRating = updatedHoverRating[starIndex]; // Set the clicked rating
    return {
      ...prevState,
      rating: newRating, // Save the clicked rating
      hoverRating: [0, 0, 0, 0, 0], // Reset hover effect after click
    };
  });
};




    const handleSubmitRating = async(mId, tId)=>{
        const {rating, loading} = ratingValue


        const apiData = {
            task_id: tId,
            milestone_id: mId,
            star_rating: rating.toFixed(1)
        }


        try {
            const response = await milestonApi.rateMilestone(apiData)
            const responseData = response.data
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                showToast('Milestone Rated Successfully', 'success')
                updateRating(mId, rating )
            }
            console.log('response', response)
        } catch (error) {
            
        }


        console.log('apiData', apiData)
    }


    const handlePickCompleteMilestone = async(data, status)=>{
        console.log('data, status', data, status)

        const apiData = {
            task_id: data.task_id,
            milestone_id:data.id,
            status: status


        }

        try {
            const response = await milestonApi.pickCompleteMilestone(apiData)
            const responseData = response.data
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                
                if(status === "pick"){
                    pickMilestone(data.id)
                    showToast("You Picked Milestone", "success")
                }else{
                    completeMilestone(data.id)
                    showToast("You Completed Milestone", "success")
                }
            }
        } catch (error) {
            console.log(error) 
        }



    }


   


    const handleRemoveMilestone = (data)=>{
        if(milestoneActionValue.remove){
            
            setMilestoneActionValue((prevstate)=>({
                ...prevstate,
                remove:false,
                milestonId:'',
                taskId:'',
                loading:false,
                
            }))
        }else{
            setMilestoneActionValue((prevstate)=>({
                ...prevstate,
                milestonId: data.id,
                taskId:data.task_id,
                remove: true
            }))
        }
    }


    const handleConfirmRemoveMilestone = async()=>{
        const { taskId, milestonId } = milestoneActionValue
        const apiData = {
            task_id:taskId,
            milestone_id:milestonId,

        }

        setMilestoneActionValue((prevState)=>({
            ...prevState,
            loading:'delete_milestone'
        }))
        try {
            const response = await milestonApi.deleteMilestone(apiData)
            const responseDate = response.data 
            if(response.status === 200 && responseDate.STATUS === "SUCCESSFUL"){
                showToast('Milestone Deleted Successfully', 'success')
                handleRemoveMilestone()
                deleteMilestone(milestonId)

            }

            console.log('apiData', apiData)
            
        } catch (error) {
            
        }finally{
            setMilestoneActionValue((prevState)=>({
                ...prevState,
                loading:''
            }))
        }
    }





    return{
        toggleMilestonReject, milestoneActionValue,
        handleChangMilestonAction,
        handleConfirmReject,
        handleRatingClick,handleMouseLeave ,handleMouseMove, ratingValue,
        handleSubmitRating,
        handleSubmitRating,
        handlePickCompleteMilestone,
        handleRemoveMilestone,
        handleConfirmRemoveMilestone
    }
}


export default useMilestoneActionService




