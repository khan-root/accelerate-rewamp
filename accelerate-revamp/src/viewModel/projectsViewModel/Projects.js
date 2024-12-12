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

        // console.log(data, phase)
        // console.log('*****', get().projectTasksData.project_tasks)
        // const tasks =  get().projectTasksData.project_tasks
        // const updateTask = tasks.find((ele)=> ele.position == phase)
        // const newTasks = [data, ...updateTask.tasks]
        // console.log(newTasks)

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
    }

})


export default projectsServices