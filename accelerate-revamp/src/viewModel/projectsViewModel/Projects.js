import projectsApi from "../../Model/Projects/Projetcs"

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const projectsServices = (set, get)=>({

    projects:[],

    fetchProjects :async(apiData)=>{
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
    },
    gettingProjects: debounce(async (apiData) => {
        const fetchProjects = get().fetchProjects;
        await fetchProjects(apiData);
    }, 500),

})


export default projectsServices