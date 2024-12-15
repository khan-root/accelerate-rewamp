import React from 'react'

const Activity = (props) => {
    const {data} = props
  return (
    <div className='bg-customBlue-600 rounded-lg flex items-center gap-3 py-4 px-2'>
        <div className='flex items-center flex-col'>
            <img className='w-[40px] object-contain' src={data?.dp} alt={`${data.id, data.task_id}`} />
        </div>
        
        <div className='flex flex-col'> 
            <div>
                <span className='text-[13px]'>{data?.full_name}</span>
                <span className='text-[13px]'>{data?.activity}</span>
            </div>
            <div className='text-[12px]'>
                <span>{data?.time_ago}</span>
            </div>
        </div>
        
    </div>
  )
}

export default Activity