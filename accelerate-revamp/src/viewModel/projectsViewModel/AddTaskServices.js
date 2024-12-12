import { useEffect, useRef, useState } from "react"
import { addProjectTaskDetails, addProjectTeamEmp } from "../../services/__projectsServices"
import { showToast } from "../../components/Toaster/Toaster"
import {  GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { fileHitting } from "../../services/__elephantServices";
import taskApi from "../../Model/Task/Task";
import useStore from "../../Store/Store";

const LIBRARIES = ['places'];
const useAddTaskServices = (projectID)=>{



    const settingNewTask = useStore((state)=> state.settingNewTask)



    const today = new Date().toISOString().split('T')[0];


    const [addTaskValue, setAddTaskValue] = useState({
        show:false,
        taskType:"0",
        taskTitle:'',
        taskDescription:'',
        taskPriority:'1',
        startDate:today,
        endDate:'',
        file:'',
        quickEmpSelectionList:[],
        wtbdList:[
            {id:1, description:'', selectionList:[] , mPriority:'0', uploadFile:'', date:'', selectEmp:null},
        ],
        selectEmpModal:false,
        empList:[],
        empId:null,
        allSelectedEmp:[],
        allTeams:[],
        teamId:null,
        teamEmployees:[],
        teamEmployeeId:null,
        responsible:[],
        accountable:[],
        consultant:[],
        informed:[],
        personName:'',
        personContact:'',
        meetingDate:'',
        meetingPlace:'',
        lon:'',
        lat:'',
        phaseId:'',
        loading:false,

    })


    const mapRef = useRef();
    const autocompleteService = useRef(null); // Create a reference for AutocompleteService
    const placesServiceRef = useRef(null);


    


    const addTaskHandle = async(phaseId)=>{
        if(addTaskValue.show){
            setAddTaskValue((prevState)=>({
                ...prevState,
                show:false,
                taskType:"0",
                taskTitle:'',
                taskDescription:'',
                taskPriority:'1',
                startDate:today,
                endDate:'',
                file:'',
                quickEmpSelectionList:[],
                wtbdList:[
                    {id:1, description:'', selectionList:[] , mPriority:'0', uploadFile:'', date:'', selectEmp:null},
                ],
                selectEmpModal:false,
                empList:[],
                empId:null,
                allSelectedEmp:[],
                allTeams:[],
                teamId:null,
                teamEmployees:[],
                teamEmployeeId:null,
                responsible:[],
                accountable:[],
                consultant:[],
                informed:[],
                personName:'',
                personContact:'',
                meetingDate:'',
                meetingPlace:'',
                lon:'',
                lat:'',
                phaseId:''

            }))
        }
        else{ 
            console.log('phaseId', phaseId)
            const apiData = {
                project_id : projectID
            }
            setAddTaskValue((prevState)=>({
                ...prevState,
                show:true,
                phaseId:phaseId
            }))
            const taskDetails = await addProjectTaskDetails(apiData)
            const responseData = taskDetails.data
            if(taskDetails.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA
                console.log('dbData', dbData)

                setAddTaskValue((prevState)=>({
                    ...prevState,
                    quickEmpSelectionList:dbData?.quick_selection,
                    empList:dbData?.employees_list,
                    allTeams:dbData?.teams
                }))
            }
        }
    }

    // if(fieldName === "uploadFile"){
    //         const fileResult = await fileHitting(value);

    //         setAddMilestoneValue((prev) => ({
    //             ...prev,
    //             milestone: prev.milestone.map((item) =>
    //                 item.id === id ? { ...item, [fieldName]: fileResult?.FILE_PATH } : item
    //             ),
    //         }));
    //     }


    const handleChangeAddTask = async(e)=>{
        const {name, value, files} = e.target 

        if(files){
            const fileResult = await fileHitting(files[0]);
            setAddTaskValue((prevState)=>({
                ...prevState,
                [name]: fileResult?.FILE_PATH
            }))
        }else{
            setAddTaskValue((prevState)=>({
                ...prevState,
                [name]: value
            }))

        }
    }


    const addMoreMileStone = ()=>{

        const lastElement = addTaskValue?.wtbdList[addTaskValue?.wtbdList.length - 1];
        console.log('lastElement', lastElement)
        
        setAddTaskValue((prevState)=>({
            ...prevState,
            wtbdList:[...prevState.wtbdList, {id:lastElement.id+1, description:'', selectionList:lastElement.selectionList , mPriority:"0", uploadFile:'', date:'', selectEmp:null}]
        }))

    }



    const removeMilestone = (id)=>{
        setAddTaskValue((prevState)=>({
            ...prevState,
            wtbdList:prevState.wtbdList.filter((ele)=> ele.id !== id)
        }))
    }



    const handleToggleSelectEmp = ()=>{
        
        setAddTaskValue((prevState)=>({
            ...prevState,
            selectEmpModal: !prevState.selectEmpModal
        }))
    }




    const handleSelectAddTask = async(select, field)=>{


        if(field === 'empId'){

            setAddTaskValue((prevState)=>({
                ...prevState,
                [field]: select,
                
            }))
            addToSelectedEmpList({id:select.value, name:select.label})
        }
        if(field === "teamId"){
            setAddTaskValue((prevState)=>({
                ...prevState,
                [field]: select
            }))
           temMemberEmpList(select.value)
        }
        
        if(field === "teamEmployeeId"){
            
            setAddTaskValue((prevState)=>({
                ...prevState,
                [field]: select
            }))

            addSelectMember({id:select.value, name:select.label})
        }
        
        
    }
    const  temMemberEmpList =async(id)=>{
         const apiData = {
                team_id: id
            }
            
            const teamMemberResponse = await addProjectTeamEmp(apiData) 
            const responseData = teamMemberResponse.data
            if(teamMemberResponse.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const dbData = responseData.DB_DATA
                setAddTaskValue((prevState)=>({
                    ...prevState,
                    teamEmployees:dbData
                }))
                
            }else{
                setAddTaskValue((prevState)=>({
                    ...prevState,
                    teamEmployees:[]
                }))

            }
    }


    const addToSelectedEmpList = (data)=>{
        const existedEmpAllSelectedEmp = addTaskValue?.allSelectedEmp?.find((ele)=> ele.id === data?.id)
        const existedEmpresponsible = addTaskValue?.responsible?.find((ele)=> ele.id === data?.id)

        console.log('existedEmpresponsible', existedEmpresponsible)
        

        if(existedEmpAllSelectedEmp || existedEmpresponsible){
            showToast('Employee Already Exist in Selected List', 'error')
        }else{
            setAddTaskValue((prevState)=>({
                ...prevState,
                allSelectedEmp:[...prevState.allSelectedEmp, {id:data.id, name:data.name }],
                responsible:[...prevState.responsible, {id:data.id, name:data.name }],
                wtbdList: prevState.wtbdList.map((wtbd) => ({
                    ...wtbd,
                    selectionList: [...wtbd.selectionList, { id: data.id, name: data.name }],
                })),
                
            }))
            showToast('Employee Add To Selected List', 'success')
        }
    }
    const addSelectMember = (data)=>{
        const existedEmpAllSelectedEmp = addTaskValue?.allSelectedEmp?.find((ele)=> ele.id === data?.id)
        const existedEmpresponsible = addTaskValue?.responsible?.find((ele)=> ele.id === data?.id)
        

        if(existedEmpAllSelectedEmp || existedEmpresponsible){
            showToast('Employee Already Exist in Selected List', 'error')
        }else{
            setAddTaskValue((prevState)=>({
                ...prevState,
                responsible:[...prevState.responsible, {id:data.id, name:data.name }],
                wtbdList: prevState.wtbdList.map((wtbd) => ({
                    ...wtbd,
                    selectionList: [...wtbd.selectionList, { id: data.id, name: data.name }],
                })),
                
            }))
            showToast('Employee Add To Selected List', 'success')
        }
    }



    const removeFromSelectedList = (id)=>{
        setAddTaskValue((prevState) => {
            const updatedState = { ...prevState };

            // Dynamically iterate over target arrays
            ["responsible", "accountable", "consultant", "informed"].forEach((key) => {
                updatedState[key] = prevState[key].filter((emp) => emp.id !== id);
            });

            // Existing logic for allSelectedEmp and wtbdList
            updatedState.allSelectedEmp = prevState.allSelectedEmp?.filter((ele) => ele.id !== id);
            updatedState.wtbdList = prevState.wtbdList.map((wtbd) => ({
                ...wtbd,
                selectionList: wtbd.selectionList.filter((emp) => emp.id !== id),
            }));

            return updatedState;
        });
        showToast('Employee Removed from Selected List', 'success')
    }
    const removeFromTeamMemberSelect = (id,category)=>{
        setAddTaskValue((prevState)=>({
            ...prevState,
            [category]: prevState[category].filter((item) => item.id !== id),
            wtbdList: prevState.wtbdList.map((wtbd) => ({
                ...wtbd,
                selectionList: wtbd.selectionList.filter((emp) => emp.id !== id),
            })),
            allSelectedEmp: prevState.allSelectedEmp?.filter((ele)=> ele.id !== id),
        }))
        showToast('Employee Removed from Selected List', 'success')
    }





    const handleMultipleMSChange = async(value, id, fieldName)=>{

        if(fieldName === "uploadFile"){
            const fileResult = await fileHitting(value);

            console.log('fileResult', fileResult)

            setAddTaskValue((prev) => ({
                ...prev,
                wtbdList: prev.wtbdList.map((item) =>
                    item.id === id ? { ...item, [fieldName]: fileResult?.FILE_PATH } : item
                ),
            }));
        }else{
            setAddTaskValue((prev) => ({
                ...prev,
                wtbdList: prev.wtbdList.map((item) =>
                    item.id === id ? { ...item, [fieldName]: value } : item
                ),
            }));
        }

    }

    const [center, setCenter] = useState({
        lat: 34.0028888889,
        lng: 71.4998333333,
    });
    const [places, setPlaces] = useState([]); // State to hold the places list
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query


    const handleDragEnd = (result) => {
        const { source, destination } = result;

        // If dropped outside any droppable, exit
        if (!destination) return;

        // If dropped in the same place, do nothing
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return;
        }

        const sourceList = Array.from(addTaskValue[source.droppableId]);
        const destList = Array.from(addTaskValue[destination.droppableId]);
        const [movedItem] = sourceList.splice(source.index, 1);

        destList.splice(destination.index, 0, movedItem);

        setAddTaskValue({
        ...addTaskValue,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
        });
    };


    const onSelectPlace = (place) => {
        if (place.place_id) {
            // Use PlacesService to get more details about the selected place
            placesServiceRef.current.getDetails(
                { placeId: place.place_id },
                (details, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && details.geometry) {
                    const location = details.geometry.location;
                    const newCenter = {
                    lat: location.lat(),
                    lng: location.lng(),
                    };
                    setCenter(newCenter); // Update the map center to the selected place
                    mapRef.current.panTo(newCenter); // Pan the map smoothly
                    setSearchQuery(place.description); // Update the input with the selected place
                    setPlaces([]); // Clear suggestions
                } else {
                    console.error('Error fetching place details:', status);
                }
                }
            );
        }
    }


    const onSearchChange = (e) => {
        const query = e.target.value;
       setSearchQuery(query);
     
       // Check if the input is a valid latitude/longitude
       const latLngRegex = /^[-+]?\d{1,2}(\.\d+)?[,]?\s*[-+]?\d{1,3}(\.\d+)?$/;
       
       if (latLngRegex.test(query)) {
         // If it's a valid Lat/Lng, parse and center the map on it
         const [lat, lng] = query.split(',').map(coord => parseFloat(coord.trim()));
         const latLng = new window.google.maps.LatLng(lat, lng);
         setCenter({ lat, lng });
         mapRef.current.panTo(latLng); // Optionally pan to the coordinates
         
         // Clear places since it's not a name-based search
         setPlaces([]);
       } else if (query) {
         // If it's a name-based search, fetch place predictions
         autocompleteService?.current.getPlacePredictions(
           {
             input: query,
             // Optionally, you can add additional parameters like location or radius
           },
           (predictions, status) => {
             if (status === window.google.maps.places.PlacesServiceStatus.OK) {
               setPlaces(predictions);
             } else {
               console.error("Error fetching places:", status);
             }
           }
         );
       } else {
         // Clear the places if the input is empty
         setPlaces([]);
       }
       };


       const onLoadMap = (map) => {
            mapRef.current = map;
        };


        const onMapClick = (event) => {
            const newCenter = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            };
            setCenter(newCenter);
            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({ location: newCenter }, (results, status) => {
                if (status === "OK" && results[0]) {
                    const fullAddress = results[0].formatted_address;
                    const filteredAddress = fullAddress
                    .split(',')
                    .slice(1) // Skip the first part (e.g., "2F2X+WRF")
                    .join(',') // Rejoin the remaining parts
                    .trim();
    
                    setAddTaskValue((prevState)=>({
                        ...prevState,
                        meetingPlace: filteredAddress
                    }))  // Optionally save to state
                } else {
                    console.error('Geocoder failed due to:', status);
                }
            });
        };


        const { isLoaded, loadError } = useJsApiLoader({
          googleMapsApiKey: 'AIzaSyDQ5csDpZbI4g7G5YX07OtXzX5gQ_R6vj0',
          libraries: LIBRARIES,
      });
        useEffect(() => {
            if (isLoaded) {
              // Initialize services after the map has loaded
              if (mapRef.current) {
                autocompleteService.current = new window.google.maps.places.AutocompleteService();
                placesServiceRef.current = new window.google.maps.places.PlacesService(mapRef.current);
              }
            }
          }, [isLoaded]);
    

    const generateTaskMembersRole = (taskValue) => {
        const taskMembersRole = [];

        Object.keys(taskValue).forEach((role) => {
            const members = taskValue[role]; // Get members for the current role
            if (members && members.length > 0) {
                members.forEach((member) => {
                    taskMembersRole.push({ id: member.id, role }); // Use the `id` property
                });
            }
        });

        return taskMembersRole;
    };


    const handleSubmitTask = async(e)=>{
        e.preventDefault()

        



        const {
            taskTitle,taskDescription,taskPriority,
            startDate, endDate, file,
            taskType,wtbdList,responsible,accountable,consultant,informed,
            personName,personContact, meetingDate,meetingPlace,
            phaseId
        } = addTaskValue

        const apiData = {
            project_id: projectID,
            title:taskTitle,
            description:taskDescription,
            priority:taskPriority,
            start_date: startDate,
            closing_date:endDate ==='' ? 0 : endDate ,
            task_file_data:file,
            task_type:taskType === "0" ? "0" : "1",
            milestone:taskType === "0" ? wtbdList.map((ele)=> ele?.description) : [],
            assigned_to:taskType === "0" ? wtbdList.map((ele)=> ele?.selectEmp?.value ? ele?.selectEmp?.value : '') : [],
            milestone_priority:taskType === "0" ? wtbdList.map((ele)=> ele?.mPriority) : [],
            milestone_file: taskType === "0" ?  wtbdList.map((ele)=> ele?.uploadFile) : [],
            milestone_deadline: taskType === "0" ? wtbdList.map((ele)=> ele?.date) : [],
            task_members_role:generateTaskMembersRole({responsible,accountable,consultant,informed}),
            phase_id:phaseId,
            person_name: taskType === "0" ? '' : personName,
            person_contact:taskType === "0" ? '' : personContact,
            meeting_date:taskType === "0" ? '' : meetingDate,
            meeting_place:taskType === "0" ? '' : meetingPlace,
            lon: taskType === "0" ? '' : center.lng,
            lat:taskType === "0" ? '' : center.lat



        }

        
                
        setAddTaskValue((prevState)=>({
            ...prevState,
            loading:true
        }))

        try {
            
            const response = await taskApi.taskCreate(apiData)
            const responseData = response.data 
            console.log('response', response)
            if(response.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const newData = responseData.INSERTED_DATA
                    settingNewTask(newData,phaseId)
                    showToast("Task Created successfully", 'success')
                addTaskHandle()

            }else{
                const error = responseData.ERROR_DESCRIPTION
                showToast(error, 'error')
            }
        } catch (error) {
            
        }finally{
            setAddTaskValue((prevState)=>({
                ...prevState,
                loading:false
            }))
        }
    }


    return {addTaskHandle,addTaskValue, handleChangeAddTask,addMoreMileStone,removeMilestone,handleToggleSelectEmp,handleSelectAddTask,removeFromSelectedList, addToSelectedEmpList,
        removeFromTeamMemberSelect,handleMultipleMSChange,
        handleDragEnd,
        mapRef,autocompleteService,placesServiceRef,center,places,searchQuery,onLoadMap,
        onSearchChange,onSelectPlace,onMapClick,
        isLoaded,
        handleSubmitTask
    }

}


export default useAddTaskServices