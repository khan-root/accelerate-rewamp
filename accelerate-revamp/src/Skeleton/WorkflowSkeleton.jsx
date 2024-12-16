import React from 'react'


const WorkflowSkeleton = () => {
    const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  return (
    <div className='px-10 py-5 space-y-6'>
        <span className='bg-gray-300 animate-pulse h-4 p-4 w-52 flex rounded-lg'></span>
        <div className='flex flex-row gap-4'>
            <span className='bg-gray-300 animate-pulse h-4 p-4 w-60 flex rounded-full'></span>
            <span className='bg-gray-300 animate-pulse h-4 p-4 w-60 flex rounded-full'></span>
        </div>
        <div className='grid grid-cols-6 gap-y-10'>
            {numbers.map((ele)=>(
                <div key={ele} className='flex flex-col gap-4 w-48'>
                    <div className='h-40 w-48 bg-gray-300 animate-pulse rounded-lg'></div>
                    <span className='flex bg-gray-300 animate-pulse w-[100px] h-[4px] self-center'></span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default WorkflowSkeleton