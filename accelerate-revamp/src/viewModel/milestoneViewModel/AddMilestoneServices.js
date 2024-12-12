import { useState } from "react"
import { fileHitting } from "../../services/__elephantServices"
import { showToast } from "../../components/Toaster/Toaster"
import milestonApi from "../../Model/Milestone/Mileston"
import useStore from "../../Store/Store"
import { gettingValue } from "../../services/__gettingSelectValue"

const useAddMilestoneServices = (taskId,employeeDetails)=>{


    const addNewMilestone = useStore((state)=> state.addNewMilestone)
    const updateMilestone = useStore((state)=> state.updateMilestone)

    const [addMilestoneValue, setAddMilestoneValue] = useState({
        show:false, 
        milestoneUser:[],
        milestone:[
            {id:1, description:'', selectionList:[] , mPriority:'0', uploadFile:'', date:'', selectEmp:{value:0, label:'For All'}},
        ],
        loading:false,
        update:false,
        milestoneId:''
    })



    const toggleAddMilestone = (data)=>{
        if(addMilestoneValue.show){
            setAddMilestoneValue((prevstate)=>({
                ...prevstate,
                show:false,
                milestoneUser:[],
                milestone:[
                    {id:1, description:'', selectionList:[] , mPriority:'0', uploadFile:'', date:'', selectEmp:{value:0, label:'For All'}},
                ],
            }))
        }else{
            setAddMilestoneValue((prevstate)=>({
                ...prevstate,
                milestoneUser:[{employee_id:0, name:'For All'} , ...data],
                show:true,
                milestone:[
                    {id:1, description:'', selectionList:[] , mPriority:'0', uploadFile:'', date:'', selectEmp:{value:0, label:'For All'}},
                ],

            }))
        }
    }



    const addMoreMileStoneHandler = ()=>{

        const lastElement = addMilestoneValue?.milestone[addMilestoneValue?.milestone.length - 1];
        // console.log('lastElement', lastElement)
        
        setAddMilestoneValue((prevState)=>({
            ...prevState,
            milestone:[...prevState.milestone, {id:lastElement.id+1, description:'', milestoneUser:lastElement.milestoneUser , mPriority:"0", uploadFile:'', date:'', selectEmp:{value:0, label:'For All'}}]
        }))

    }

    

    const removeMilestoneHandler = (id)=>{
        setAddMilestoneValue((prevState)=>({
            ...prevState,
            milestone:prevState.milestone.filter((ele)=> ele.id !== id)
        }))
    }



    const multipleMSChangeHandler = async(value, id, fieldName)=>{
        if(fieldName === "uploadFile"){
            const fileResult = await fileHitting(value);

            setAddMilestoneValue((prev) => ({
                ...prev,
                milestone: prev.milestone.map((item) =>
                    item.id === id ? { ...item, [fieldName]: fileResult?.FILE_PATH } : item
                ),
            }));
        }else{

            setAddMilestoneValue((prev) => ({
                ...prev,
                milestone: prev.milestone.map((item) =>
                    item.id === id ? { ...item, [fieldName]: value } : item
                ),
            }));
        }

    }




    const handleAddMilestone = async(e)=>{
        const {milestone, show, update, milestoneId} = addMilestoneValue
        e.preventDefault()
        const emptyDescriptionIndex = milestone.findIndex((ele) => !ele.description || ele.description.trim() === "");

        if (emptyDescriptionIndex !== -1) {
            showToast(`Description is required for Milestone ${emptyDescriptionIndex + 1}`, 'error');
            return; 
        }

        const apiData = {
            task_id:taskId,
            milestone:milestone?.map((ele)=> ele.description),
            assigned_to:milestone?.map((ele)=> gettingValue(ele.selectEmp?.value)),
            milestone_priority:milestone?.map((ele)=> ele.mPriority),
            milestone_deadline:milestone?.map((ele)=> ele.date),
            milestone_file_data: milestone?.map((ele)=> ele.uploadFile)
        }
        const updateApiData = {
            task_id:taskId,
            milestone:milestone?.map((ele)=> ele.description),
            assigned_to:milestone?.map((ele)=> gettingValue(ele.selectEmp?.value)),
            milestone_priority:milestone?.map((ele)=> ele.mPriority),
            milestone_deadline:milestone?.map((ele)=> ele.date),
            milestone_file_data: milestone?.map((ele)=> ele.uploadFile),
            milestone_id:milestoneId
        }

        setAddMilestoneValue((prevState)=>({
            ...prevState,
            loading:true
        }))

        try{
            const response = await (!update ? milestonApi.addMilestone(apiData) : milestonApi.updateMilestone(updateApiData));
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const newData = responseData.INSERTED_DATA
                if(update){
                    updateMilestone(newData)
                    showToast("Milestone Updated Successfully", 'success')
                    editSingleMilestone()
                }else{
                    
                    showToast("Milestone added successfully", 'success')
                    toggleAddMilestone()
                    addNewMilestone(newData)
                }
            }
        }catch(err){
        }finally{
            setAddMilestoneValue((prevState)=>({
                ...prevState,
                loading:false
            }))
        }

    }

    



    async function editSingleMilestone(data){
        console.log('data', data)

        if(addMilestoneValue.update){
            setAddMilestoneValue((prevState)=>({
                ...prevState,
                milestoneUser: [],
                milestone:[
                    {id:1, description:'', selectionList:[] , mPriority:'0', uploadFile:'', date:'', selectEmp:{value:0, label:'For All'}},
                ],
                update: false, 
                milestoneId:''
            }))
        }else{

            const updatedList = [{employee_id:'0', name:'For All'}, ...employeeDetails]
            const updatedEmp = updatedList.find((ele) => ele.employee_id === data.completed_by_id);
            const updatedEmpId = updatedEmp ? { value: updatedEmp.employee_id, label: updatedEmp.name } : null;
            setAddMilestoneValue((prevState)=>({
                ...prevState,
                milestoneUser: updatedList,
                milestone:[
                    {id:1, description:data.milestone, mPriority:data.milestone_priority, uploadFile:'', date:data.deadline === "0" ? '' : data.deadline , selectEmp:updatedEmpId},
                ],
                milestoneId:data.id,
                update: true, 
            }))
            
        }
    }




    return{
        addMilestoneValue,
        toggleAddMilestone,
        addMoreMileStoneHandler,
        removeMilestoneHandler,
        multipleMSChangeHandler,
        handleAddMilestone,
        editSingleMilestone
    }
}


export default useAddMilestoneServices