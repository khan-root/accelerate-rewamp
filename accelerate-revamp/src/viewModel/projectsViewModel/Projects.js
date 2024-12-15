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
    projectTasksData:{},


    fetchProjects :async(apiData)=>{
        try {
            const response = await projectsApi.getProjects(apiData)
            console.log('******response', response)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({projects: dbData})
            }
        } catch (error) {
            
        }
    },
    gettingProjects: debounce(async (apiData) => {
        const fetchProjects = get().fetchProjects;
        await fetchProjects(apiData);
    }, 500),


    gettingProjectTasks: async(id)=>{

        const apiData = {
            project_id: id
        }

        try {
            const response = await projectsApi.projectTasks(apiData)
            const responseData = response.data 
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA 
                set({projectTasksData: dbData})
            }
        } catch (error) {
            
        }
    },

    settingNewTask:(data, phase)=>{

        set((state) => ({
            projectTasksData: {
                ...state.projectTasksData, // Preserve other properties
                project_tasks: state.projectTasksData.project_tasks.map((ele) => 
                    ele.id == phase
                        ? {
                            ...ele, 
                            tasks: [data, ...ele.tasks,], // Add `data` to the `tasks` array, initialize if undefined
                        }
                        : ele
                ),
            },
        }));
    },

    addNewProject: (data)=>{

        set((state) => ({
            projects: {
                ...state.projects, // Preserve all properties in `projects`
                projects_details: {
                    ...state.projects.projects_details, // Preserve all properties in `projects_details`
                    data: [
                        ...state.projects.projects_details.data, // Copy existing `data` array
                        data, // Add the new project to the array
                    ],
                },
            },
        }));
    },
    deleteProject: (id)=>{

        set((state) => ({
            projects: {
                ...state.projects, // Preserve all properties in `projects`
                projects_details: {
                    ...state.projects.projects_details, // Preserve all properties in `projects_details`
                    data: 
                        state.projects.projects_details.data?.filter((ele)=> ele.id !== id)
                        
                    
                },
            },
        }));
    },
    closedProject: (id)=>{
        console.log('id', id)

        set((state) => ({
            projects: {
                ...state.projects, // Preserve all properties in `projects`
                projects_details: {
                    ...state.projects.projects_details, // Preserve all properties in `projects_details`
                    data: 
                        state.projects.projects_details.data?.filter((ele)=> ele.id !== id)
                        
                    
                },
            },
        }));
    },
    favToggleProject: (id, fav)=>{
        set((state) => ({
            projects: {
                ...state.projects, // Preserve all properties in `projects`
                projects_details: {
                    ...state.projects.projects_details, // Preserve all properties in `projects_details`
                    data: 
                        state.projects.projects_details.data?.map((ele)=> ele.id === id ? {...ele, star:fav } : ele)  
                },
            },
            projectTasksData:{
                ...state.projectTasksData,
                project_info: {
                    ...state.projectTasksData?.project_info,
                    star: fav, // Replace 'newStarValue' with the updated value
                },
            }
        }));
    },
    

})


export default projectsServices