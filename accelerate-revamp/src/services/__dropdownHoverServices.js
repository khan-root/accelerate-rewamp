import { useRef, useState } from "react";

const useDropdownService = ()=>{



    const [openMenuValue, setOpenMenuValue] = useState({});
    const toggleMenuValue = (index, isOpen) => {
        setOpenMenuValue((prevOpenMenu) => ({
            ...prevOpenMenu,
            [index]: isOpen
        }))
    }

    


    const triggerRefs = useRef([]);

    const getDropdownPosition = (index) => {
        const triggerElement = triggerRefs.current[index];
        if (triggerElement) {
        const triggerRect = triggerElement.getBoundingClientRect();
        const dropdownHeight = 200; // Assume the height of your dropdown

        return window.innerHeight - triggerRect.bottom < dropdownHeight ? 'top' : 'bottom';
        }
        return 'bottom';
    };

    return { getDropdownPosition , triggerRefs,openMenuValue, toggleMenuValue}
}


export default useDropdownService
