import milestonApi from "../../Model/Milestone/Mileston"
import taskApi from "../../Model/Task/Task"

const milestonServices = (set, get)=>({

    milstones:{},
    inboxData:[],
    starredData: [],
    activityData:[],


    gettingMileStones:async(id)=>{

        const apiData = {
            id: id
        }
        try {
            
            const response = await taskApi.getMileStones(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({milstones: dbData})
            }

        } catch (error) {
            console.log('err', error)
        }
    },

    updateRating:(id, rating)=>{
        const milestones = get().milstones

    },

    rejectingMilestone: (milestonId) => {
        set((state) => ({
            milstones: {
                ...state.milstones, // Preserve other properties in the `milestones` object
                task_milestones: state.milstones.task_milestones.map((ele) =>
                    ele.id == milestonId
                        ? { ...ele, reject_it: false, rate_it: false, status: "Rejected" } // Update specific milestone
                        : ele
                ),
            },
        }));
        
    },
    pickMilestone: (milestonId) => {
        set((state) => ({
            milstones: {
                ...state.milstones, // Preserve other properties in the `milestones` object
                task_milestones: state.milstones.task_milestones.map((ele) =>
                ele.id == milestonId
                    ? {
                          ...ele,
                          pick_it: false, // Update `pick_it`
                          complete_it: true,
                          status:  "Picked" // Dynamically update `status`
                      }
                    : ele
            ),
            },
        }));
        
    },
    completeMilestone: (milestonId) => {
        set((state) => ({
            milstones: {
                ...state.milstones, // Preserve other properties in the `milestones` object
                task_milestones: state.milstones.task_milestones.map((ele) =>
                ele.id == milestonId
                    ? {
                          ...ele,
                          pick_it: false, // Update `pick_it`
                          complete_it: false,
                          status:  "Completed" // Dynamically update `status`
                      }
                    : ele
            ),
            },
        }));
        
    },
    deleteMilestone: (milestonId) => {
        set((state) => ({
            milstones: {
                ...state.milstones, // Preserve other properties in the `milestones` object
                task_milestones: state.milstones.task_milestones.filter((ele)=> ele.id !== milestonId)
            },
        }));
        
    },

    addNewMilestone : (data)=>{
        set((state) => ({
            milstones: {
                ...state.milstones, // Preserve other properties in the `milestones` object
                task_milestones: [...data, ...state.milstones.task_milestones]
            },
        }));
    },
    updateMilestone : (data)=>{
        set((state) => ({
            milstones: {
                ...state.milstones, // Preserve other properties in the `milestones` object
                task_milestones: state.milstones.task_milestones.map((ele)=> ele.id === data.id ? data : ele)
            },
        }));
    },

    addMemberToTaskMilestone :(data)=>{
        set((state) => ({
            milstones: {
                ...state.milstones, // Preserve other properties in the `milestones` object
                employees_detail: [...data, ...state.milstones.employees_detail]
            },
        }));
    },

    gettingDiscussion:async(id)=>{
        const apiData = {
            task_id:id,
            chat_id:0
        }
        try {

            const response = await milestonApi.getDiscussion(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({
                    inboxData: dbData
                })
            }
            
        } catch (error) {
            
        }
    },
    gettingStarred:async(id)=>{
        const apiData = {
            task_id:id,
            is_notice:'notice',
            chat_id:0,
        }
        try {

            const response = await milestonApi.getStarred(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({
                    starredData: dbData
                })
            }
            
        } catch (error) {
            
        }
    },
    gettingActivity:async(id)=>{
        const apiData = {
            task_id:id,
        }
        try {

            const response = await milestonApi.getActivity(apiData)
            console.log('response', response)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({
                    activityData: dbData
                })
            }
            
        } catch (error) {
            
        }
    },
    addingChatToFav:(id)=>{
        set({
            inboxData: get().inboxData?.map((ele)=> ele.id === id ? {...ele, is_notice:"1" } : ele)
        })
    },
    removeFromFav:(id)=>{
        set({
            inboxData: get().inboxData?.map((ele)=> ele.id === id ? {...ele, is_notice: "0" } : ele)
        })
    },
    removeFavFromList:(id)=>{
        set({
            starredData: get().starredData?.filter((ele)=> ele.id !== id)
        })
    },
    addNewChat:(data)=>{
        set({inboxData: [...new Set([...get().inboxData, {...data, is_notice:'0', name:'Me'}])]})
    }
    




})


export default milestonServices