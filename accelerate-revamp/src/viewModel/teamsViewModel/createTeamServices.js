import { useState } from "react"
import { validateEmail } from "../../validation/customValidation"
import { showToast } from "../../components/Toaster/Toaster"
import teamsApi from "../../Model/Teams/Teams"
import useStore from "../../Store/Store"

const useCreateTeamServices = ()=>{
    
    const addTeam = useStore((state)=> state.addTeam)

    const [createTeamValue, setCreateTeamValue] = useState({
        show:false, 
        name:'',
        email:'',
        members:'',
        emailList:[],
        loading:false,

    })


    const toggleAddTeam = ()=>{
        setCreateTeamValue((prevState)=>({
            ...prevState,
            show:!prevState.show,
            name:'',
            email:'',
            members:'',
            emailList:[]
        }))
    }


    const handleChangeTeam = (e)=>{
        const {name, value} = e.target
        setCreateTeamValue((prevState)=>({
            ...prevState,
            [name]: value
        }))
    }


    const validEmail = () => {
        const { email } = createTeamValue;

        const emailValidation = validateEmail('Email', email);
        if (!emailValidation.isValid) {
        return { isValid: false, message: emailValidation.message };
        }
        return {isValid: true}

  }



    const handleBulkEmail = (e) => {
        if (e.key === "Enter") {
            const validation = validEmail(createTeamValue.email); // Pass the email to the validator
            if (!validation.isValid) {
                showToast(validation.message, 'error'); // Show validation error
                return;
            }

            // Check if the email already exists
            if (createTeamValue.emailList.includes(createTeamValue.email)) {
                showToast("This email is already in the list.", "error"); // Show duplicate error
                return;
            }

            // Add email to the list
            setCreateTeamValue((prevState) => ({
                ...prevState,
                emailList: [...prevState.emailList, createTeamValue.email],
                email:''
            }));

            // Show success message
            showToast("Email added successfully!", "success");
        }
    };


    const handleRemoveEmail = (index)=>{
        setCreateTeamValue((prevState) => ({
            ...prevState,
            emailList: prevState.emailList.filter((__, i)=> i !==index)
        }));
    }



    const handleAddTeam = async()=>{
        const {name, emailList} = createTeamValue
        if(name.trim() === ""){
            showToast("Team name is required", 'error')
            return
        }


        const apiData = {
            name:name,
            id:'',
            add_member:[],
            email_phone:emailList?.map((ele)=> ele)
        }

        setCreateTeamValue((prevState)=>({
            ...prevState,
            loading:true
        }))

        try {
            const response = await teamsApi.cerateTeam(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.INSERTED_DATA[0]
                showToast("Team created successfully", 'success')
                toggleAddTeam()
                addTeam(dbData)

            }
        } catch (error) {
            
        }finally{
            setCreateTeamValue((prevState)=>({
                ...prevState,
                loading:false
            }))

        }
    }
    


    return { createTeamValue, toggleAddTeam, handleChangeTeam,handleBulkEmail,handleRemoveEmail,handleAddTeam }
}


export default useCreateTeamServices