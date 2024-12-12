import backlogApi from "../../Model/Backlog/Backlog"

const backlogServices = (set, get)=>({

    categories:[],

    gettingAllCategories: async(id)=>{
        try {
            const response = await backlogApi.gettingCategories(id)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA
                set({categories: dbData})
            }
            console.log('response', response)
        } catch (error) {
            set({categories: []})
            console.log('error', error)
        }
    },
    addNewCategory:(data)=>{
        set({categories: [...new Set([data, ...get().categories])]})
    },
    deleteCategory :(id)=>{
        set({categories: get().categories?.filter((ele)=> ele._id !== id)})
    },
    updatingCategory :(data)=>{
        set({categories: get().categories?.map((ele)=> ele._id == data._id ? data : ele)})
    }

})


export default backlogServices