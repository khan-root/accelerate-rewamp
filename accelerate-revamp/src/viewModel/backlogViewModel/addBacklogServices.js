import { useState } from "react"

const useAddBacklogServices = ()=>{


    const [addBackLogValue, setAddBacklogValue] = useState({
        show:false, 
        loading:false,
        description:'',
        file:'',
        reportedDate:'',
        priorityList:[],
        priorityId:null,
        categoryList:[],
        categoryId:null,
        labelList:[],
        labelId:null,
        refrence:'',
        statusList:[],
        status:null,
        pickedDate:'',
        completionDate:'',
        comment:''
    })



    const handleAddBacklog =()=>{

        if(addBackLogValue.show){
            setAddBacklogValue((prevstate)=>({
                ...prevstate,
                show:false
            }))
        }else{
            setAddBacklogValue((prevstate)=>({
                ...prevstate,
                show:true
            }))
        }
    }



    const handleChangeAddBackLog = async(e)=>{
        const {name, value, files} = e.target 

        if(files){
            // const fileResult = await fileHitting(files[0]);
            // setAddTaskValue((prevState)=>({
            //     ...prevState,
            //     [name]: fileResult?.FILE_PATH
            // }))
        }else{
            setAddBacklogValue((prevState)=>({
                ...prevState,
                [name]: value
            }))

        }
    }

    const handleSelectAddBackLog = async(select, field)=>{

        setAddBacklogValue((prevState)=>({
            ...prevState,
            [field]: select,
            
        }))
    }


    return { addBackLogValue, handleAddBacklog, handleChangeAddBackLog,handleSelectAddBackLog }

}



export default useAddBacklogServices