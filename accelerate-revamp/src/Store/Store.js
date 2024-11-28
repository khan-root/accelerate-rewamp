import { create } from "zustand";
import workFlowsServices from "../viewModel/workFlowsViewModel/WorkFlow";
import { devtools } from "zustand/middleware";
import projectsServices from "../viewModel/projectsViewModel/Projects";
import teamsServices from "../viewModel/teamsViewModel/Team";

const useStore = create(devtools((set, get)=>({

    ...workFlowsServices(set, get),
    ...projectsServices(set, get),
    ...teamsServices(set, get),

})))


export default useStore