import { useState } from "react"
import useStore from "../../Store/Store"
import teamsApi from "../../Model/Teams/Teams"
import { validateEmail } from "../../validation/customValidation"
import { showToast } from "../../components/Toaster/Toaster"

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


    const [addNewMember, setAddNewMember] = useState({
        email:'',
        emailList:[],
        loading:false
    })

    const toggleViewTeam =()=>{
        setViewTeamValue((prevState)=>({
            ...prevState,
            showViewTeam:false,
            data:[],
            teamInfo:{}
            
        }))
        setAddNewMember((prevState)=>({
            ...prevState,
            showViewTeam:false,
            email:'',
            emailList:[],
            
        }))
    }





    const handleInviteMember = (e)=>{
            const {name, value} = e.target
            setAddNewMember((prevState)=>({
                ...prevState,
                [name]: value
            }))
        }
    
    
    const validEmail = () => {
        const { email } = addNewMember;

        const emailValidation = validateEmail('Email', email);
        if (!emailValidation.isValid) {
        return { isValid: false, message: emailValidation.message };
        }
        return {isValid: true}
    
    }


    const handleBulkEmailInvite = (e) => {
        if (e.key === "Enter") {
            const validation = validEmail(addNewMember.email); // Pass the email to the validator
            if (!validation.isValid) {
                showToast(validation.message, 'error'); // Show validation error
                return;
            }

            // Check if the email already exists
            if (addNewMember.emailList.includes(addNewMember.email)) {
                showToast("This email is already in the list.", "error"); // Show duplicate error
                return;
            }

            // Add email to the list
            setAddNewMember((prevState) => ({
                ...prevState,
                emailList: [...prevState.emailList, addNewMember.email],
                email:''
            }));

            // Show success message
            showToast("Email added successfully!", "success");
        }
    };


    const handleRemoveEmailInvite = (index)=>{
        setAddNewMember((prevState) => ({
            ...prevState,
            emailList: prevState.emailList.filter((__, i)=> i !==index)
        }));
    }


    const handleNewMember = async(id)=>{
        const {emailList} = addNewMember
       
        if(emailList.length === 0){
            showToast("At Least one email is required", 'error')
            return
        }


        const apiData = {
            id:id,
            email_phone:emailList?.map((ele)=> ele)
        }

        setAddNewMember((prevState)=>({
            ...prevState,
            loading:true
        }))

        try {
            const response = await teamsApi.inviteMember(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                setAddNewMember((prevState)=>({
                    ...prevState,
                    emailList:[],
                    email:''
                }))
                showToast("Invitation send successfully", 'success')
            }
        } catch (error) {
            
        }finally{
            setAddNewMember((prevState)=>({
                ...prevState,
                loading:false
            }))

        }
    }


    return {
        allTeams,
        gettingAllTeams,
        viewTeamValue,
        handleViewTeam,
        toggleViewTeam,
        setViewTeamValue,
        addNewMember, handleInviteMember,handleBulkEmailInvite ,handleRemoveEmailInvite,
        handleNewMember
    }

}

export default useTeamsServices

