import { create } from "zustand";
import workFlowsServices from "../viewModel/workFlowsViewModel/WorkFlow";
import { devtools } from "zustand/middleware";

const useStore = create(devtools((set, get)=>({

    ...workFlowsServices(set, get)

})))


export default useStore