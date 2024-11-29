import { useState } from "react"

const useTabToggle = ()=>{

    const [currentState, setCurrentState] = useState(1)

    const tabToggleState = (id)=>{
        setCurrentState(id)
    }

    return {currentState, tabToggleState}

}

export default useTabToggle