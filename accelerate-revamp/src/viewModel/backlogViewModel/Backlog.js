import backlogApi from "../../Model/Backlog/Backlog"

const backlogServices = (set, get)=>({
    backlogs:{},
    categories:[],
    labels:[],

    getAllBacklogs: async(id)=>{
        try {
            const response = await backlogApi.gettingBackLog(id)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA
                set({backlogs: dbData})
            }           
        } catch (error) {
            console.log('error', error)
            set({backlogs: {}})
        }
    },
    gettingAllCategories: async(id)=>{
        try {
            const response = await backlogApi.gettingCategories(id)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA
                set({categories: dbData})
            }
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
    },
    gettingAllLabels: async(id)=>{
        try {
            const response = await backlogApi.gettingLabels(id)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA
                set({labels: dbData})
            }
        } catch (error) {
            set({labels: []})
            console.log('error', error)
        }
    },

    addNewLabel:(data)=>{
        set({labels: [...new Set([data, ...get().labels])]})
    },
    deleteLabel :(id)=>{
        set({labels: get().labels?.filter((ele)=> ele._id !== id)})
    },
    updatingLabel :(data)=>{
        set({labels: get().labels?.map((ele)=> ele._id == data._id ? data : ele)})
    },

})


export default backlogServices