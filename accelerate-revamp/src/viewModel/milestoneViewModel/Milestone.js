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
    }


})


export default milestonServices