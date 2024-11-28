import { useState } from "react";

const useMouseHoverService = ()=>{
    const [isHovered, setIsHovered] = useState(false); // Track hover state

    // Handle mouse enter (hover)
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    // Handle mouse leave (when hover ends)
    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    return {
        isHovered, handleMouseEnter, handleMouseLeave
    }
}

export default useMouseHoverService