import { HiMiniTrash } from "react-icons/hi2"
import { MdModeEdit } from "react-icons/md"

export const addTeamMemberData = [
    {id:1, title:'Invite Member'},
    // {id:2, title: 'Add Existing Members'},
]



export const viewTeamDataToggle = [
    {id:1, title:'Member(s)'},
    {id:2, title: 'Pending'},
    {id:3, title: 'Invite'},
]


export const teamActonList = [
    {id:1, title:'Edit Team', icon:<MdModeEdit />, color:'text-[#3da5f4]'},
    {id:2, title:'Delete Team', icon:<HiMiniTrash />, color:'text-red-600'}
]
