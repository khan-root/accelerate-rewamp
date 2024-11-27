import projectsApi from "../../Model/Projects/Projetcs"

const projectsServices = (set, get)=>({

    projects:[],

    gettingProjects :async(apiData)=>{
        try {
            const response = await projectsApi.getProjects(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({projects: dbData})
            }
            console.log('response', response)
        } catch (error) {
            
        }
    }

})


export default projectsServices