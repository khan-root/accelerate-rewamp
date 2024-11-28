import { useEffect, useRef, useState } from "react"
import projectsApi from "../../Model/Projects/Projetcs"
import { showToast } from "../../components/Toaster/Toaster"
import { getRandomHexColor } from "../../services/__projectsServices";

const useAddProjectServices = ()=>{

    const today = new Date().toISOString().split('T')[0];

   

    const [addProjectValue, setAddProjectValue] = useState({
      show:false ,
      name:'',
      description:'',
      start_date:today,
      end_date:today,
      date_continue:true,
      owners:[],
      employees:[],
      usedWorkFlow:[],
      generalTemplates:[],
      generalTemplateState:1,
      projectOwnerState:false,
      workFlowState:false,
      defaultWorkFlow:[
        {id:1, title:'Pending', phase:'(Start Phase)', required:true},
        {id:2, title:'Closed', phase:'(End Phase)', required:true},
      ],
      newPhase:'',
      loadingState:'',
      templateName:'',
      selecedWorkFlowId:'',
      ownerName:'',
      ownerId:null,
      employeeId:null,
      task_creation:{value:'PUBLIC', label:'Public' },
      task_access:'PUBLIC',
      privacy:1,
      colorPicker:false,
      color: getRandomHexColor()

    })






    const handleAddProject = async()=>{
        const apiData = {id:''}
        try{
            const response = await projectsApi.projectDetails(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA
                setAddProjectValue((prevState)=>({
                    ...prevState,
                    owners:dbData?.owners,
                    employees:dbData?.employees,
                    usedWorkFlow:dbData?.mostly_used_workflows,
                    generalTemplates:dbData?.generalTemplates,

                }))
            }
            console.log('response', response)
        }catch(err){
            console.log('err', err)
        }
        setAddProjectValue((prevState)=>({
            ...prevState,
            show:true
        }))
    }
    
    
    const toggleAddProject = ()=>{
        
        setAddProjectValue((prevState)=>({
            ...prevState,
            show:false,
            loadingState:'',
            name:'',
            employeeId:null,
            description:'',
            ownerId:null,
            selecedWorkFlowId:''

        }))
    }


    const toggleGeneralTemplateViewAdd = (data)=>{
        setAddProjectValue((prevState)=>({
            ...prevState,
            generalTemplateState:data.id
        }))
    }




    const handleAddOwnerToggle = ()=>{
        setAddProjectValue((prevState)=>({
            ...prevState,
            projectOwnerState:!prevState.projectOwnerState,
            loadingState:'',
            ownerName:'',
        }))
    }
    const handleAddWorkFlowToggle = ()=>{
        setAddProjectValue((prevState)=>({
            ...prevState,
            workFlowState:!prevState.workFlowState,
            templateName:'',
            defaultWorkFlow:[
                {id:1, title:'Pending', phase:'(Start Phase)', required:true},
                {id:2, title:'Closed', phase:'(End Phase)', required:true},
            ],
            loadingState:''
        }))
    }


    const addExtraPhase = () => {
        console.log('Current Workflow:', addProjectValue.defaultWorkFlow);
        const { newPhase, defaultWorkFlow } = addProjectValue;

        if (newPhase.trim() === '') {
            showToast('Phase Name is Required', 'error');
            return;
        }

        // Create a new phase object
        const newPhaseObject = {
            id: null, // Will be updated later to maintain sequence
            title: newPhase,
            phase: '',
            required: false,
        };

        // Insert the new phase after id: 1
        const updatedWorkFlow = [...defaultWorkFlow];
        const indexToInsert = updatedWorkFlow.findIndex((phase) => phase.id === 2); // Find where id: 2 starts
        updatedWorkFlow.splice(indexToInsert, 0, newPhaseObject); // Insert at the correct position

        // Reassign IDs to maintain sequential order
        updatedWorkFlow.forEach((phase, index) => {
            phase.id = index + 1; // Update IDs starting from 1
        });

        // Update state with the new workflow
        setAddProjectValue({
            ...addProjectValue,
            defaultWorkFlow: updatedWorkFlow,
            newPhase: '', // Reset the input field
        });

        showToast('New phase added successfully!', 'success');
    };


    const removePhase = (idToRemove) => {
        const { defaultWorkFlow } = addProjectValue;

        // Ensure the phase to remove is not one of the required phases
        const requiredIds = [1, defaultWorkFlow.length]; // IDs for "Pending" (start phase) and "Closed" (end phase)
        if (requiredIds.includes(idToRemove)) {
            showToast('Cannot remove required phases!', 'error');
            return;
        }

        // Filter out the phase with the given ID
        const updatedWorkFlow = defaultWorkFlow.filter((phase) => phase.id !== idToRemove);

        // Reassign IDs to maintain sequential order
        updatedWorkFlow.forEach((phase, index) => {
            phase.id = index + 1; // Update IDs starting from 1
        });

        // Update state with the new workflow
        setAddProjectValue({
            ...addProjectValue,
            defaultWorkFlow: updatedWorkFlow,
        });

        showToast('Phase removed successfully!', 'success');
    };



    const handleChangeAddProject = (event)=>{
        if(event?.target){

            const {name, value} = event.target
            if(name === 'date_continue'){
                
                setAddProjectValue((prevState)=>({
                    ...prevState,
                    date_continue: !prevState.date_continue
                }))
            }else{
                
                setAddProjectValue((prevState)=>({
                    ...prevState,
                    [name]: value
                }))
            }
        }else{
            console.log(event)

            setAddProjectValue((prevState)=>({
                ...prevState,
                color:event.hex
            }))
        }
    }


    const addWorkFlow = async()=>{
        const { defaultWorkFlow, templateName } = addProjectValue;
        if(templateName.trim()=== ''){
            showToast('Template Name is Required', 'error')
            return
        }
        if(defaultWorkFlow.length === 2) {
            showToast('At Least one phase is required', 'error')
            return
        }


        const apiData ={ 
            id:"",
            name: templateName,
            phase_name:defaultWorkFlow.map((ele)=> ele.title)
        }
        setAddProjectValue((prevState)=>({
            ...prevState,
            loadingState:'addWorkFlow'
        }))

        try{
            const response = await projectsApi.addWorkFlowTemplate(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const newData = responseData.INSERTED_DATA
                setAddProjectValue((prevState)=>({
                    ...prevState,
                    generalTemplates: {
                        ...prevState.generalTemplates,
                        user_array: [...(prevState.generalTemplates?.user_array || []), newData], // Append new data
                    },
                    selecedWorkFlowId: newData.id
                }))
                showToast('WorkFlow Added Successfully', 'success')
                handleAddWorkFlowToggle()
            }
            console.log('response add workFlow', response)
        }catch(err){
            console.log(err)
        }finally{
            setAddProjectValue((prevState)=>({
                ...prevState,
                loadingState:''
            }))
        }

    }



    const addOwner = async()=>{
        const {ownerName} = addProjectValue
        if(ownerName.trim() === ''){
            showToast('Owner Name is required', 'error')
            return
        }

        const apiData = {
            name: ownerName
        }
        setAddProjectValue((prevState)=>({
            ...prevState,
            loadingState:'add_owner'
        }))

        try {
            const response = await projectsApi.addOwner(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const newData = responseData.INSERTED_DATA 
                showToast("Owner Add Successfully")
                setAddProjectValue((prevState)=>({
                    ...prevState,
                    ownerId:{value:newData.id, label:newData.customer_name},
                    owners:[...prevState.owners, newData]
                }))
                handleAddOwnerToggle()
            }
            console.log('reponse', response)
        } catch (err) {
            console.log('err', err)
        }finally{
            setAddProjectValue((prevState)=>({
                ...prevState,
                loadingState:''
            }))
        }
    }



    const handleSelectAddProject = (selected, field)=>{
        setAddProjectValue((prevState)=>({
            ...prevState,
            [field]:selected
        }))
    }
    
    
    
    const handleSelectTemplate = (data)=>{
    
        setAddProjectValue((prevState)=>({
            ...prevState,
            selecedWorkFlowId:data.id
        }))
    }



    const pickerRef = useRef(null);

    const handleColorPickerToggle = (e) => {
       e.stopPropagation(); 
        setAddProjectValue((prevState) => ({
            ...prevState,
            colorPicker: !prevState.colorPicker
        }));
        
    };




    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (
          pickerRef.current &&
          !pickerRef.current.contains(e.target)
        ) {
            setAddProjectValue((prevState) => ({
                ...prevState,
                colorPicker: false
            }));
        }
      };

      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, [addProjectValue.colorPicker]);




    const createProjectValidation = ()=>{
        const {name,employeeId,description, ownerId,selecedWorkFlowId} = addProjectValue

        if(name.trim() === ""){
            showToast('Project Name is required', 'error')
            return
        }
        else if(description.trim() === ""){
            showToast('Project Description is required', 'error')
            return
        }
        else if(ownerId === null){
            showToast('Select Owner', 'error')
            return
        }
        else if(employeeId === null){
            showToast('Select Project Manager/Supervisor', 'error')
            return
        }else if(selecedWorkFlowId === ''){
            showToast("Select Template", 'error')
            return
        }

        return true
    }



    const handleAddNewProject = async(e)=>{
        e.preventDefault()

        const validation = createProjectValidation()

        if(validation){

            
            const {name, end_date, date_continue, start_date,selecedWorkFlowId,task_access,task_creation,
                employeeId,privacy,description, color,ownerId
            } = addProjectValue
            
            
            const apiData = {
                name: name,
                closing_date: date_continue ? "" : end_date,
                start_date: start_date,
                template_id:selecedWorkFlowId,
                id:'',
                date_continue: date_continue ? 1 : '',
                task_access:task_access,
                task_creation:task_creation?.value,
                supervisor_id:employeeId?.value,
                owner_id:ownerId?.value,
                privacy:privacy,
                description:description,
                color_code:color
                
                
            }
            
            try {
                const response = await projectsApi.createProject(apiData)
                console.log('response', response)
            } catch (error) {
                
            }
        }
    }



    return {
        addProjectValue,handleAddProject,
        toggleAddProject,
        toggleGeneralTemplateViewAdd,
        handleAddOwnerToggle,
        handleAddWorkFlowToggle,
        handleChangeAddProject,
        addExtraPhase,
        removePhase,
        addWorkFlow,
        addOwner,
        handleSelectAddProject,
        handleSelectTemplate,
        handleColorPickerToggle,
        pickerRef,
        handleAddNewProject
    }

}

export default useAddProjectServices

// 