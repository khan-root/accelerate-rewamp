import { HiMiniTrash } from "react-icons/hi2"
import { MdModeEdit } from "react-icons/md"

export const projectToggleData = [
    {id:1, title: 'Active Projects', value:'active'},
    {id:2, title: 'All Projects', value:'all_projects'},
    {id:3, title: 'Favourite Projects', value:'starred'},
    {id:4, title: 'Closed Projects', value:'closed'},
    {id:5, title: 'My Projects', value:'my_projects'},
]


export const projectVisiblityData = [
    {id:1, title:'Visible to all Employees'},
    {id:2, title:'Only Visible Employee working in this'},
]
export const projectAccessData = [
    {id:1, title:'Public', value:'PUBLIC'},
    {id:2, title:'Private', value:'PRIVATE'},
]


export const generalTemplateData = [
    {id:1, title:'General Templates'},
    {id:2, title: 'Veevo Tech'},
    {id:3, title:'Sarmad Faizan'}
]


export const taskCreationData = [
    {id:1, title:'Public', value:'PUBLIC'},
    {id:2, title:'Project Members', value:'PRIVATE_MEMBERS'},
    {id:3, title:'Only Managers', value:'MANAGER'},
    {id:4, title:'Manager and Creator', value:'MANAGER_AND_CREATOR'},
    {id:1, title:'Only Creator', value:'ONLY_CREATOR'},
]



export const projectActonList = [
    {id:1, title:'Edit Team', icon:<MdModeEdit />, color:'text-[#3da5f4]'},
    {id:2, title:'Delete Team', icon:<HiMiniTrash />, color:'text-red-600'}
]


export const projectDetailsToggleData = [
    {id:1, title:'List View'},
    {id:2, title:'WorkFlow View'}
]


export const priorityCustomData = [
    {id:1, title:'Low', value:"0"},
    {id:2, title:"Medium", value:"1"},
    {id:3, title:"High", value:"2"}
]
export const taskPrioriyCustomData = [
    {id:1, title:'Low', value:"0"},
    {id:2, title:"Normal", value:"1"},
    {id:3, title:"High", value:"2"}
]
export const taskTypeCustomData = [
    {id:1, title:'Indoor', value:"0"},
    {id:2, title:'Field', value:""},
]