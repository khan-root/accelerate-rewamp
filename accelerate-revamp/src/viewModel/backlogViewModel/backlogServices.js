import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { showToast } from "../../components/Toaster/Toaster"
import backlogApi from "../../Model/Backlog/Backlog"
import useStore from "../../Store/Store"

const useBacklogServices = ()=>{


    const gettingAllCategories = useStore((state)=> state.gettingAllCategories)
    const categories = useStore((state)=> state.categories)
    const addNewCategory = useStore((state)=> state.addNewCategory)
    const deleteCategory = useStore((state)=> state.deleteCategory)
    const updatingCategory = useStore((state)=> state.updatingCategory)


    const navigate = useNavigate()


    const handleBacklogs = (id)=>{
        navigate(`/backlog/${id}`)
    }



    const [backlogCatLabValue, setBacklogCatLabValue] = useState({
        showCategory:false,
        showLabel:false,
        category:'',
        label:'',
        projectid:'',
        loading:'',
        updateCategory:false,
        id:''
        
    })



    const handleAddCategoryToggle = ()=>{
        setBacklogCatLabValue((prevState)=>({
            ...prevState,
            category:'',
            projectid:'',
            showCategory:!prevState.showCategory,
        }))
    }
    const handleAddLabelToggle = ()=>{
        setBacklogCatLabValue((prevState)=>({
            ...prevState,
            label:'',
            projectid:'',
            showLabel:!prevState.showLabel,
        }))
    }



    const handleChangeBacklog = (e)=>{
        const {name, value} = e.target 
        setBacklogCatLabValue((prevState)=>({
            ...prevState,
            [name]: value
        }))
    }



    const handleSubmitCategory = async(id)=>{
        const {category} = backlogCatLabValue

        if(category.trim() === ''){
            showToast('Category name is required', 'error')
            return
        }

        const apiData = {
            name:category,
            project_id:id
        }


        try {
            const response = await backlogApi.createBacklog(apiData)
            const responseData = response.data 
            if(response.status === 201 && responseData.STATUS === "SUCCESSFUL"){
                const newData = responseData.DB_DATA
                handleAddCategoryToggle()
                showToast("Category created successfully", 'success')
                addNewCategory(newData)
            }
        } catch (error) {
            const errorResponse = error.response.data
            const errorDescription = errorResponse.ERROR_DESCRIPTION
            showToast(errorDescription, 'error')
        }
    }





    const [deleteActionValue, setDeleteActionValue] = useState({
        id:'',
        showCategoryDelete: false, 
        showLabelDelete: false, 
        loading:false
    })



    const toggleDeleteCategory = (id)=>{
        setDeleteActionValue((prevState)=>({
            ...prevState,
            id:id, 
            showCategoryDelete: !prevState.showCategoryDelete,
        }))
    }
    const toggleDeleteLabel = (id)=>{
        setDeleteActionValue((prevState)=>({
            ...prevState,
            id:id, 
            showLabelDelete: !prevState.showLabelDelete,
        }))
    }


    const confirmDeleteCategory = async()=>{
        setDeleteActionValue((prevState)=>({
            ...prevState,
           loading:true
        }))
        try {
            const response = await backlogApi.deleteCategory(deleteActionValue.id)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                toggleDeleteCategory('')
                showToast("Category deleted successfully", 'success')
                deleteCategory(deleteActionValue.id)

            }
        } catch (error) {
            const errorResponse = error.response.data
            const errorDescription = errorResponse.ERROR_DESCRIPTION
            showToast(errorDescription, 'error')
        }finally{
            setDeleteActionValue((prevState)=>({
                ...prevState,
            loading:false
            }))
        }
    }



    const handleUpdateCategoryToggle = (data)=>{
        if(!backlogCatLabValue.updateCategory){
            setBacklogCatLabValue((prevState)=>({
                ...prevState,
                category:data.name,
                id:data._id,
                updateCategory:true
            }))
        }else{
            setBacklogCatLabValue((prevState)=>({
                ...prevState,
                name:'',
                id: '',
                updateCategory:false
            }))
        }
    }


//     {
//     "id": "674da70d8bdccf1a78382fe4",
//     "name": "Bug Fixes11111111111",
//     "description": "Tasks related to resolving bugs in the system.",
//     "project_id": 456
// }


    const handleUpdateCategory = async(pid, id)=>{

        const {category} = backlogCatLabValue
        if(category.trim() === ''){
            showToast("Category name is required", 'error')
            return
        }

        const apiData = {
            id: id, 
            name:category,
            project_id:pid
        }



        try {
            const response = await backlogApi.updateCategory(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS == "SUCCESSFUL"){
                const newData = responseData.DB_DATA
                handleUpdateCategoryToggle()
                showToast("Category updated successfully")
                updatingCategory(newData)

            }
            console.log('response', response)
        } catch (error) {
            const errorResponse = error.response.data
            const errorDescription = errorResponse.ERROR_DESCRIPTION
            showToast(errorDescription, 'error')
        }


    }



    return { handleBacklogs,handleAddCategoryToggle,handleAddLabelToggle,backlogCatLabValue,handleChangeBacklog,handleSubmitCategory,gettingAllCategories,categories,
        deleteActionValue, toggleDeleteCategory,
        toggleDeleteLabel,confirmDeleteCategory,
        handleUpdateCategoryToggle,
        handleUpdateCategory
        
     }
}


export default useBacklogServices