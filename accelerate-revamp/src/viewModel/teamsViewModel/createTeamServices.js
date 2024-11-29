import { useState } from "react"
import { validateEmail } from "../../validation/customValidation"
import { showToast } from "../../components/Toaster/Toaster"

const useCreateTeamServices = ()=>{

    const [createTeamValue, setCreateTeamValue] = useState({
        show:false, 
        name:'',
        email:'',
        members:'',
        emailList:[]

    })


    const toggleAddTeam = ()=>{
        setCreateTeamValue((prevState)=>({
            ...prevState,
            show:!prevState.show,
             name:'',
            email:'',
            members:''
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



    return { createTeamValue, toggleAddTeam, handleChangeTeam,handleBulkEmail,handleRemoveEmail }
}


export default useCreateTeamServices