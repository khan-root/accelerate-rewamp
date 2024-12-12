import React, { useEffect } from 'react'
import { FaCheck, FaPlus, FaXmark } from 'react-icons/fa6'
import { IoMdTrash } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import BacklogDetails from './BacklogDetails'
import useBacklogServices from '../../viewModel/backlogViewModel/backlogServices'
import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import ConfirmationDialog from '../../components/ConfirmationDialog'

const categoryData = [
    {id:1, name:'Conversation'},
    {id:2, name:'Conversation'},
    {id:3, name:'Conversation'},
    {id:4, name:'Conversation'},
    {id:5, name:'Conversation'},
]

const Backlog = () => {


    const params = useParams()


    
    
    
    
    const {gettingAllCategories, backlogCatLabValue,handleAddCategoryToggle,handleAddLabelToggle,
        handleChangeBacklog,handleSubmitCategory,categories,
        deleteActionValue,toggleDeleteCategory,toggleDeleteLabel,confirmDeleteCategory,
        handleUpdateCategoryToggle,handleUpdateCategory
    } = useBacklogServices()
    useEffect(()=>{
        gettingAllCategories(params.id)
    },[])
    
  return (
    <>
        <div className='px-10 py-5 grid grid-cols-12 '>
            <div className='col-span-3 shadow-lg rounded-[14px] h-auto'>
                <div className="sticky top-5 z-10 bg-white space-y-3">
                    <div className='p-4 h-[200px] rounded-tl-[7px] rounded-tr-[7px] flex items-center justify-center text-white text-wrap text-center bg-customBlue-100'>
                        <span>SPEXT</span>
                        
                    </div>
                    <div className='space-y-5'>
                        <div className='p-4 space-y-3 border border-customGray-600 rounded-lg'>
                            <div className='flex items-center gap-4'>
                                <span>Categories</span>
                                <motion.span whileHover={{scale:1.2}} className='w-6 h-6 flex items-center justify-center border border-customBlue-100 text-customBlue-100 cursor-pointer bg-customBlue-600 text-[12px] rounded-lg'
                                    onClick={handleAddCategoryToggle}
                                ><FaPlus /></motion.span>
                            </div>
                            {backlogCatLabValue?.showCategory && 
                                <div className='flex items-center gap-5'>
                                    <div className='flex-1'>
                                        <input 
                                            className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                                            type='text' 
                                            placeholder='Add Category'
                                            name='category'
                                            onChange={handleChangeBacklog}
                                        />
                                    </div>
                                    <div className='flex items-center gap-2 mt-4'>
                                        <motion.span whileHover={{scale:1.2}} className='text-customGreen-100 cursor-pointer' onClick={()=>handleSubmitCategory(params.id)}><FaCheck /></motion.span>
                                        <motion.span whileHover={{scale:1.2}} className='text-customRed-100 cursor-pointer' onClick={handleAddCategoryToggle}><FaXmark /></motion.span>
                                    </div>
                                </div>
                            }
                            <div className='flex flex-col gap-2'>
                                {categories?.map((ele)=>(
                                    <div key={ele?._id} className='flex items-center gap-2 border-b border-b-customGray-600 py-2'>
                                        
                                        <div className='flex-1'>
                                            {(backlogCatLabValue.updateCategory && ele._id === backlogCatLabValue.id) ? 
                                                <input 
                                                    className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                                                    type='text' 
                                                    placeholder='Update Category'
                                                    name='category'
                                                    value={backlogCatLabValue?.category}
                                                    onChange={handleChangeBacklog}
                                                />
                                            :
                                            <span>{ele?.name}</span>
                                            }
                                        </div>
                                        {(backlogCatLabValue.updateCategory && ele._id === backlogCatLabValue.id) ? 
                                            <div className='flex items-center gap-2'>
                                                <motion.span whileHover={{scale:1.1}} className='text-customGreen-100 cursor-pointer' 
                                                    onClick={()=>handleUpdateCategory(params.id, ele._id)}
                                                ><FaCheck /></motion.span>
                                                <motion.span whileHover={{scale:1.1}} className='text-customRed-100 cursor-pointer'
                                                    onClick={()=> handleUpdateCategoryToggle(ele)}
                                                ><FaXmark /></motion.span>
                                            </div>
                                        
                                        :
                                        <div className='flex items-center gap-2'>
                                            <motion.span whileHover={{scale:1.1}} className='text-customGreen-100 cursor-pointer' 
                                                onClick={()=>handleUpdateCategoryToggle(ele)}
                                            ><MdEdit /></motion.span>
                                            <motion.span whileHover={{scale:1.1}} className='text-customRed-100 cursor-pointer'
                                                onClick={()=> toggleDeleteCategory(ele._id)}
                                            ><IoMdTrash /></motion.span>
                                        </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='p-4 space-y-3 border border-customGray-600 rounded-lg'>
                            <div className='flex items-center gap-4'>
                                <span>Labels</span>
                                <span className='w-6 h-6 flex items-center justify-center border border-customBlue-100 text-customBlue-100 cursor-pointer bg-customBlue-600 text-[12px] rounded-lg'
                                    onClick={()=>handleAddLabelToggle(params.id)}
                                ><FaPlus /></span>
                            </div>
                            {backlogCatLabValue.showLabel && 
                                <div className='flex items-center gap-5'>
                                    <div className='flex-1'>
                                        <input 
                                            className='w-full text-[#333333] text-[15px] py-[4px] px-[10px] border-b border-b-gray-500 outline-none focus:border-b-customBlue-100'
                                            type='text' 
                                            placeholder='Add Category'
                                        />
                                    </div>
                                    <div className='flex items-center gap-2 mt-4'>
                                        <span className='text-customGreen-100'><FaCheck /></span>
                                        <span className='text-customRed-100' onClick={()=>handleAddLabelToggle(params.id)}><FaXmark /></span>
                                    </div>
                                </div>
                            }
                            <div className='flex flex-col gap-2'>
                                {categoryData.map((ele)=>(
                                    <div key={ele.id} className='flex items-center gap-2 border-b border-b-customGray-600 py-2'>
                                        <div className='flex-1'>
                                            <span>{ele.name}</span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-customGreen-100'><MdEdit /></span>
                                            <span className='text-customRed-100'><IoMdTrash /></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                            
                    </div>  
                </div>
            </div>
            <div className='col-span-9 ps-3'>
                <BacklogDetails />
            </div> 
        </div>
        {(deleteActionValue.showCategoryDelete || deleteActionValue.showLabelDelete) && 
            <ConfirmationDialog 
                openDialog = {
                    deleteActionValue.showCategoryDelete ?
                    deleteActionValue.showCategoryDelete :
                    deleteActionValue.showLabelDelete ?
                    deleteActionValue.showLabelDelete :
                    null
                }
                handleOpen={
                    deleteActionValue.showCategoryDelete ?
                    toggleDeleteCategory :
                    deleteActionValue.showLabelDelete ?
                    toggleDeleteLabel :
                    null
                }
                title ={
                    deleteActionValue.showCategoryDelete ?
                    "Delete Category" :
                    deleteActionValue.showLabelDelete ?
                    "Delete Label" :
                    null
                }
                message ={
                    deleteActionValue.showCategoryDelete ?
                    "Are you sure you want to delete this category ? " :
                    deleteActionValue.showLabelDelete ?
                    "Are you sure you want to delete this label ? " :
                    null
                }
                handleConfirm = {
                    deleteActionValue.showCategoryDelete ?
                    confirmDeleteCategory :
                    deleteActionValue.showLabelDelete ?
                    toggleDeleteLabel :
                    null
                }
                loading = {
                    deleteActionValue.loading
                }
            
            />
        }
    </>
  )
}

export default Backlog