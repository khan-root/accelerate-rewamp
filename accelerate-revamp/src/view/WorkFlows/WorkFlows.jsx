import React, { useEffect } from 'react'
import useWorkFlowsServices from '../../viewModel/workFlowsViewModel/workFlowsServices'

const WorkFlows = () => {
    
    const {gettingWorkFlows} = useWorkFlowsServices()

    useEffect(()=>{
        gettingWorkFlows()
    },[])

  return (
    <div>WorkFlows</div>
  )
}

export default WorkFlows