import teamsApi from "../../Model/Teams/Teams"

const teamsServices = (set, get)=>({
    allTeams:[],


    gettingAllTeams:async()=>{
        try {
            const response = await teamsApi.getTeams()
            console.log('response', response) 
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({allTeams: dbData})
            }
        } catch (error) {
            
        }
    }
})


export default teamsServices