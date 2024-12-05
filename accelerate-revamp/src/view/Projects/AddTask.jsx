import { Radio, Typography } from '@material-tailwind/react'
import React, { useRef, useState } from 'react'
import { taskPrioriyCustomData, taskTypeCustomData } from '../../utils/projectsUtils'
import CustomSelect from '../../components/CustomSelect'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa6'
import { CgTrash } from 'react-icons/cg'
import { Autocomplete, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
const AddTask = (props) => {
    const  { handleChangeAddTask, addTaskValue } = props
  return (
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
                //   name='name' 
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
                //   name='name' 
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
                    value={ ele.id }
                    //   onChange={handleChangeAddProject}
                    //   checked={addProjectValue.privacy == ele.id}
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
                    //   value={addProjectValue.name}
                    //   name='name' 
                    //   onChange={handleChangeAddProject}
                />
                </div>
                <div className='space-y-1'>
                <label className='text-[#698592] text-[15px]'>Deadline</label>  
                <input 
                    className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                    type='datetime-local' 
                    //   value={addProjectValue.name}
                    //   name='name' 
                    //   onChange={handleChangeAddProject}
                />
                </div>
            </div>
            <div className='grid grid-cols-12 gap-2'>
                <div className='space-y-1 col-span-4'>
                    <button className='text-customBlack-400 border border-customGray-400 text-[12px] py-3 px-3 rounded-full'>Select Employee</button>
                </div>
                <div className='space-y-1 col-span-4'>
                    <CustomSelect 
                    placeHolderTitle="Team" 
                    // options={addProjectValue?.employees?.map((employee) => ({ value: employee.id, label:employee.name}))}
                    // onChangeHandler={(selectedOption) => handleSelectAddProject(selectedOption, 'employeeId')}
                    // value={addProjectValue?.employeeId}
                    
                    />
                </div>
                <div className='space-y-1 col-span-4'>
                    <CustomSelect 
                    placeHolderTitle="Memeber" 
                    // options={addProjectValue?.employees?.map((employee) => ({ value: employee.id, label:employee.name}))}
                    // onChangeHandler={(selectedOption) => handleSelectAddProject(selectedOption, 'employeeId')}
                    // value={addProjectValue?.employeeId}
                    
                    />
                </div>
            </div>
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
                    {taskTypeCustomData.map((ele)=>(
                        <Radio
                            key={ele.id}
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
                        {addTaskValue?.wtbdList.map((list)=>(
                            <div className='flex items-start gap-1'>
                                <div className='space-y-5 p-2 border border-customGray-400' key={list.id}>
                                    <div className='grid grid-cols-4 gap-2'>
                                        <div className='col-span-2'>
                                            <textarea 
                                                rows="4" 
                                                // cols="50" 
                                                name="description"
                                                className='text-[#333333] text-[12px] rounded-md   py-[10px] px-[17px] border border-[#cccccc] outline-none resize-none w-full'
                                                // onChange={handleChangeRepetitive}
                                                placeholder='Task Milestone Description'
                                            >
                                            </textarea>
                                        </div>
                                        <div className='col-span-2'>
                                            <CustomSelect 
                                                // options={addProjectValue?.employees?.map((employee) => ({ value: employee.id, label:employee.name}))}
                                                // onChangeHandler={(selectedOption) => handleSelectAddProject(selectedOption, 'employeeId')}
                                                // value={addProjectValue?.employeeId}
                                            
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
                                            value={ ele.id }
                                            //   onChange={handleChangeAddProject}
                                            //   checked={addProjectValue.privacy == ele.id}
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
                                                
                                                />
                                            </label>
                                        </div>
                                        <div className='space-y-1'>
                                            <input 
                                                className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                                                type='datetime-local' 
                                                //   value={addProjectValue.name}
                                                //   name='name' 
                                                //   onChange={handleChangeAddProject}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <motion.span whileHover={{scale: 1.1}} className='h-6 w-6 flex items-center justify-center text-white bg-customGreen-100 rounded-full text-[12px] cursor-pointer'><FaPlus /></motion.span>
                                    <motion.span whileHover={{scale: 1.1}} className='h-6 w-6 flex items-center justify-center text-white bg-customRed-100 rounded-full text-[12px] cursor-pointer'><CgTrash /></motion.span>
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
  )
}

export default AddTask



function CustomGoogleMap() {
    const mapRef = useRef();
    const autocompleteRef = useRef();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDQ5csDpZbI4g7G5YX07OtXzX5gQ_R6vj0',
        libraries:["places"]
    });


    
    const defaultCenter = {
        lat: 34.0028888889,
        lng: 71.4998333333
    };
    const [center, setCenter] = useState(defaultCenter);

    const containerStyle = {
        width: '100%',
        height: 'calc(100vh - 150px)',
        borderRadius: '10px'
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
        zIndex:"999999"
    };

    

   

    const onLoadMap = (map) => {
        mapRef.current = map;
    };

   

    const onLoadAutocomplete = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {
        const { geometry } = autocompleteRef.current.getPlace();
        const bounds = new window.google.maps.LatLngBounds();
        if (geometry.viewport) {
            bounds.union(geometry.viewport);
        } else {
            bounds.extend(geometry.location);
        }
        mapRef.current.fitBounds(bounds);
    };

   

    
    

    

    return (
        isLoaded ? (
            <div className='map-container' style={{ position: 'relative' }}>
               
                <GoogleMap
                    zoom={15}
                    center={center}
                    onLoad={onLoadMap}
                    mapContainerStyle={containerStyle}
                >
                    
                    <Autocomplete
                        onLoad={onLoadAutocomplete}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            type='text'
                            placeholder='Search Location'
                            style={autocompleteStyle}
                        />
                    </Autocomplete>
                </GoogleMap>

                
            </div>
        ) : null
    );
}

