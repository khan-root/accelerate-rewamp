import homeApi from "../../Model/Home/Home"

const homeServices = (set, get)=>({
    inComingTasks:[],

    homeTaskData:{},
    notificationData:[],
    homeLoading:false,


    getInComingTasks: async(data)=>{
        // try{
        //     const response = await homeApi.inComingTasks(data)
        //     const responseData = response.data 
        //     if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
        //         const dbData = responseData.DB_DATA 
        //         set({
        //             inComingTasks: dbData
        //         })
        //     }
        //     console.log('response', response)
        // }catch(err){
        //     console.log('err', err)
        // }
    },
    gettingHomeTask: async(data)=>{
        set({homeLoading: true})
        try{
            const response = await homeApi.homeTask(data)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({
                    homeTaskData: dbData
                })
            }
        }catch(err){
            console.log('err', err)
        }finally{
            set({homeLoading: false})
        }
    },
    gettingHomeTaskByMont: async(data)=>{
        try{
            const response = await homeApi.homeTask(data)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({
                    homeTaskData: dbData
                })
            }
        }catch(err){
            console.log('err', err)
        }finally{
        }
    },
    gettingNotifications: async()=>{
        try{
            const response = await homeApi.getNotifications()
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({
                    notificationData: dbData
                })
            }else{
                set({
                    notificationData: []
                })

            }
        }catch(err){
            console.log('err', err)
        }
    },
})


export default homeServices