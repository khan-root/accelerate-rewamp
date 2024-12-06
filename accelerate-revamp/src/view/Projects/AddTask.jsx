import { Radio, Typography } from '@material-tailwind/react'
import React, { useEffect, useRef, useState } from 'react'
import { taskPrioriyCustomData, taskTypeCustomData } from '../../utils/projectsUtils'
import CustomSelect from '../../components/CustomSelect'
import { motion } from 'framer-motion'
import { FaPlus, FaXmark } from 'react-icons/fa6'
import { CgTrash } from 'react-icons/cg'
import {  GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import SelectEmpTask from './SelectEmpTask'
import CustomDialog from '../../components/CustomDialog'
import DragAndDropEmp from './DragAndDropEmp'
const LIBRARIES = ['places'];
const AddTask = (props) => {
    const  { handleChangeAddTask, addTaskValue, addMoreMileStone,removeMilestone,handleToggleSelectEmp,handleSelectAddTask,removeFromSelectedList,addToSelectedEmpList,removeFromTeamMemberSelect,handleMultipleMSChange,
      handleDragEnd
    } = props

  return (
    <>
    <form className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='space-y-5'>
            <div>
                <span className='text-customBlue-100 text-[16px]'>Task Info</span>
            </div>
            <div className='space-y-1'>
              <label className='text-[#698592] text-[15px]'>Task Title</label>  
              <input 
                  className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                  type='text' 
                //   value={addProjectValue.name}
                  name='taskTitle' 
                //   onChange={handleChangeAddProject}
                  placeholder='Task Title'
              />
            </div>
            <div className='space-y-1'>
              <label className='text-[#698592] text-[15px]'>Brief Description (Optional)</label>  
              <input 
                  className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                  type='text' 
                //   value={addProjectValue.name}
                  name='taskDescription' 
                //   onChange={handleChangeAddProject}
                  placeholder='Description'
              />
            </div>
            <div className='space-y-1'>
                <label className='text-[#698592] text-[15px]'>Priority</label>
                <div className='flex items-center'>
                {taskPrioriyCustomData.map((ele)=>(
                    <Radio
                    key={ele.id}
                    color='blue' 
                    label={
                        <Typography 
                        className='text-nowrap'
                        
                        >{ele.title}</Typography>
                    }
                    value={ ele.value }
                    name='taskPriority'
                    //   onChange={handleChangeAddProject}
                      checked={addTaskValue.taskPriority == ele.id}
                    />
                ))}
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                <label className='text-[#698592] text-[15px]'>Inititation</label>  
                <input 
                    className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                    type='date' 
                      value={addTaskValue.startDate}
                      name='startDate' 
                    //   onChange={handleChangeAddProject}
                />
                </div>
                <div className='space-y-1'>
                <label className='text-[#698592] text-[15px]'>Deadline</label>  
                <input 
                    className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                    type='datetime-local' 
                    //   value={addProjectValue.name}
                    //   name='endDate' 
                    //   onChange={handleChangeAddProject}
                />
                </div>
            </div>
            <div className='grid grid-cols-12 gap-2'>
                <div className='space-y-1 col-span-4'>
                    <button className='text-customBlack-400 border border-customGray-400 text-[12px] py-3 px-3 rounded-full' type='button'
                       
                        onClick={(e)=>{
                            e.stopPropagation();
                            handleToggleSelectEmp()
                        }}
                    >
                        {addTaskValue?.allSelectedEmp?.length === 0 ? 'Select Employee' : `${addTaskValue?.allSelectedEmp?.length} Member Selected`}
                    </button>
                </div>
                <div className='space-y-1 col-span-4'>
                    <CustomSelect 
                        placeHolderTitle="Team" 
                        options={addTaskValue?.allTeams?.map((team) => ({ value: team.id, label:team.owner_name}))}
                        onChangeHandler={(selectedOption) => handleSelectAddTask(selectedOption, 'teamId')}
                        value={addTaskValue?.teamId}
                        
                    />
                </div>
                <div className='space-y-1 col-span-4'>
                    <CustomSelect 
                        placeHolderTitle="Memeber" 
                        options={addTaskValue?.teamEmployees?.map((employee) => ({ value: employee.oneid, label:employee.full_name}))}
                        onChangeHandler={(selectedOption) => handleSelectAddTask(selectedOption, 'teamEmployeeId')}
                        value={addTaskValue?.employeeId}
                    />
                </div>
            </div>

              <DragAndDropEmp 
                handleDragEnd = {handleDragEnd}
                addTaskValue = {addTaskValue}
                removeFromTeamMemberSelect = {removeFromTeamMemberSelect}
              />
              
            <div className='grid grid-cols-2'>
                
                <div className='space-y-2'>
                    <label className='text-[#698592] text-[15px]'>Upload File (Optional)</label>
                    <label className="block">
                        
                            <input type="file" className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100
                            "/>
                    </label>
                </div>
                <div className='space-y-1'>
                    <label className='text-[#698592] text-[15px]'>Task Type</label>
                    <div className='flex items-center'>
                    {taskTypeCustomData.map((ele,i)=>(
                        <Radio
                            key={i}
                            color='blue' 
                            label={
                                <Typography 
                                className='text-nowrap'
                                
                                >{ele.title}</Typography>
                            }
                            name='taskType'
                            value={ ele.value }
                            onChange={handleChangeAddTask}
                            checked={addTaskValue.taskType === ele.value}
                        />
                    ))}
                    </div>
                </div>
            </div>
            

        </div>

        <div>

            {
                addTaskValue.taskType === "0" ?
                    
                    <div className='space-y-5'>
                         <div>
                            <span className='text-customBlue-100 text-[16px]'>Work To Be Done</span>
                        </div>
                        {addTaskValue?.wtbdList.map((list,index)=>(
                            <div className='flex items-start gap-1' key={list.id}>
                                <div className='space-y-5 p-2 border border-customGray-400' >
                                    <div className='grid grid-cols-4 gap-2'>
                                        <div className='col-span-2'>
                                            <textarea 
                                                rows="4" 
                                                value={list?.description}
                                                name="description"
                                                className='text-[#333333] text-[12px] rounded-md   py-[10px] px-[17px] border border-[#cccccc] outline-none resize-none w-full'
                                                onChange={(e)=> handleMultipleMSChange(e.target.value, list.id, 'description')}
                                                placeholder='Task Milestone Description'
                                            >
                                            </textarea>
                                        </div>
                                        <div className='col-span-2'>
                                            <CustomSelect 
                                                placeHolderTitle="Member"
                                                options={([{id:0, name:'For All'}, ...list?.selectionList])?.map((employee) => ({ value: employee.id, label:employee.name}))}
                                                onChangeHandler={(selectedOption) => handleMultipleMSChange(selectedOption, list.id,  'selectEmp')}
                                                value={list?.selectEmp}
                                            
                                            />
                                        </div>
                                    </div>
                                    <div className='space-y-1'>
                                        <label className='text-[#698592] text-[15px]'>Milestone Priority</label>
                                        <div className='flex items-center'>
                                        {taskPrioriyCustomData.map((ele)=>(
                                            <Radio
                                              key={ele.id}
                                              color='blue' 
                                              label={
                                                <Typography 
                                                className='text-nowrap'
                                                
                                                >{ele.title}</Typography>
                                              }
                                              value={ ele.value }
                                              onChange={(e)=> handleMultipleMSChange(e.target.value, list.id, 'mPriority')}
                                              checked={list.mPriority === ele.value}
                                            />
                                        ))}
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-2'>
                                    
                                        <div className='space-y-2'>
                                            <label className="block">
                                                
                                                <input type="file" className="block w-full text-sm text-slate-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-violet-50 file:text-violet-700
                                                    hover:file:bg-violet-100"
                                                    onChange={(e) => handleMultipleMSChange(e.target.files[0], list.id, 'uploadFile')}
                                                
                                                />
                                            </label>
                                        </div>
                                        <div className='space-y-1'>
                                            <input 
                                                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                                                type='datetime-local' 
                                                value={list.date}
                                                onChange={(e)=> handleMultipleMSChange(e.target.value, list.id, 'date')}
                                                
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    {index === addTaskValue?.wtbdList.length - 1 && (
                                        <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        className="h-6 w-6 flex items-center justify-center text-white bg-customGreen-100 rounded-full text-[12px] cursor-pointer"
                                        onClick={addMoreMileStone}
                                        >
                                        <FaPlus />
                                        </motion.span>
                                    )}
                                    {addTaskValue?.wtbdList.length !== 1 &&
                                        <motion.span whileHover={{scale: 1.1}} className='h-6 w-6 flex items-center justify-center text-white bg-customRed-100 rounded-full text-[12px] cursor-pointer' onClick={()=>removeMilestone(list.id)}><CgTrash /></motion.span>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>

                :
                <div className='space-y-5'>

                    <div>
                        <span className='text-customBlue-100 text-[16px]'>Personal Info</span>
                    </div>
                    <div className='space-y-5'>
                        <div className='space-y-1'>
                            <label className='text-[#698592] text-[15px]'>Name</label>  
                            <input 
                                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                                type='text' 
                                //   value={addProjectValue.name}
                                //   name='name' 
                                //   onChange={handleChangeAddProject}
                                placeholder='Name'
                            />
                        </div>
                        <div className='space-y-1'>
                            <label className='text-[#698592] text-[15px]'>Contact #</label>  
                            <input 
                                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                                type='text' 
                                //   value={addProjectValue.name}
                                //   name='name' 
                                //   onChange={handleChangeAddProject}
                                placeholder='Contact #'
                            />
                        </div>
                        <div className='space-y-1'>
                            <label className='text-[#698592] text-[15px]'>Meeting Date & Time</label>  
                            <input 
                                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                                type='datetime-local' 
                                //   value={addProjectValue.name}
                                //   name='name' 
                                //   onChange={handleChangeAddProject}
                            />
                        </div>
                    </div>
                    <div className='h-[300px] w-full'>
                        <CustomGoogleMap />
                    </div>
                </div>
                
            }
        </div>
    </form>
        {
        addTaskValue?.selectEmpModal &&
        <CustomDialog 
            openDialog={addTaskValue?.selectEmpModal}
            handleOpen = {handleToggleSelectEmp}
            compo={
                <SelectEmpTask 
                    addTaskValue = {addTaskValue}
                    handleSelectAddTask = {handleSelectAddTask}
                    removeFromSelectedList = {removeFromSelectedList}
                    addToSelectedEmpList = {addToSelectedEmpList}
                />
            }
            title="Select Employee"
            size="lg"
            outsidePress={false}
        />
    }
    </>
  )
}

export default AddTask


const CustomGoogleMap = ()=> {
     const mapRef = useRef();
    const autocompleteRef = useRef();
    const autocompleteService = useRef(null); // Create a reference for AutocompleteService
    const placesServiceRef = useRef(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDQ5csDpZbI4g7G5YX07OtXzX5gQ_R6vj0',
        libraries: LIBRARIES,
    });

    const [center, setCenter] = useState({
        lat: 34.0028888889,
        lng: 71.4998333333,
    });
    const [places, setPlaces] = useState([]); // State to hold the places list
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

    const containerStyle = {
        width: '100%',
        height: 'calc(100vh - 150px)',
        borderRadius: '10px',
    };

    const autocompleteStyle = {
        boxSizing: 'border-box',
        border: '1px solid transparent',
        width: '240px',
        height: '38px',
        padding: '0 12px',
        borderRadius: '3px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        fontSize: '14px',
        outline: 'none',
        textOverflow: 'ellipsis',
        position: 'absolute',
        left: '60%',
        top: '11px',
        marginLeft: '-120px',
        zIndex: "999999",
    };

  // Initialize the AutocompleteService instance
    useEffect(() => {
    if (isLoaded) {
      // Initialize services after the map has loaded
      if (mapRef.current) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
        placesServiceRef.current = new window.google.maps.places.PlacesService(mapRef.current);
      }
    }
  }, [isLoaded]);

    const onLoadMap = (map) => {
        mapRef.current = map;
    };

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
    autocompleteService.current.getPlacePredictions(
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
  };

  const onMapClick = (event) => {
        const newCenter = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setCenter(newCenter);
    };

  return (
    isLoaded ? (
      <div className="map-container" style={{ position: 'relative' }}>
        <GoogleMap
          zoom={17}
          center={center}
          onLoad={onLoadMap}
          onClick={onMapClick}
          mapContainerStyle={containerStyle}
        >
          <input
            type="text"
            placeholder="Search Location"
            value={searchQuery}
            onChange={onSearchChange}
            style={autocompleteStyle}
          />

          {places.length > 0 && (
            <ul style={{
              position: 'absolute',
              top: '50px',
              left: '60%',
              marginLeft: '-120px',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              maxHeight: '300px',
              overflowY: 'auto',
              width: '240px',
              zIndex: '999999',
            }}>
              {places.map((place, index) => (
                <li
                  key={index}
                  onClick={() => onSelectPlace(place)}
                  style={{
                    padding: '8px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {place.description}
                </li>
              ))}
            </ul>
          )}
          
          <Marker position={center} />
        </GoogleMap>
      </div>
    ) : null
  );
}
