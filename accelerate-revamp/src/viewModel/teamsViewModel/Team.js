import teamsApi from "../../Model/Teams/Teams"

const teamsServices = (set, get)=>({
    allTeams:[],
    teamLoading:false,

    gettingAllTeams:async()=>{
        set({teamLoading: true})
        try {
            const response = await teamsApi.getTeams()
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({allTeams: dbData})
            }
        } catch (error) {
            
        }finally{
            set({teamLoading: false})
        }
    },
    updatingTeamColor: (id, color)=>{
        set({allTeams: get().allTeams.map((ele)=> ele.id === id ? {...ele,color_code: color } : ele)})
    },
    updateTeamName: (id, name)=>{
        set({allTeams: get().allTeams.map((ele)=> ele.id === id ? {...ele,name: name } : ele)})
    },
    deleteTeam: (id)=>{
        set({allTeams: get().allTeams.filter((ele)=> ele.id !== id)})
    },
    addTeam:(data)=>{
        set({allTeams: [...new Set([data, ...get().allTeams])]})
    }
})


export default teamsServices