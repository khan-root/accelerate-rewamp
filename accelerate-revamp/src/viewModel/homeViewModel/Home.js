import homeApi from "../../Model/Home/Home"

const homeServices = (set, get)=>({
    inComingTasks:[],


    getInComingTasks: async(data)=>{
        try{
            const response = await homeApi.inComingTasks(data)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({
                    inComingTasks: dbData
                })
            }
            console.log('response', response)
        }catch(err){
            console.log('err', err)
        }
    }
})


export default homeServices