import taskApi from "../../Model/Task/Task"

const milestonServices = (set, get)=>({

    milstones:{},



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
        console.log('milestones', milestones)

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
    }

    




})


export default milestonServices