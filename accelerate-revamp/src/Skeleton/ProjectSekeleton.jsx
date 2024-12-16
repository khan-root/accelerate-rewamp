import React from 'react'

const ProjectSekeleton = () => {
    const numbers = Array.from({ length: 15 }, (_, index) => index + 1);
  return (
    <div className=' px-10 py-5 space-y-6'>
        <span className='bg-gray-300 animate-pulse h-4 p-4 w-52 flex rounded-lg'></span>
        <div className='w-full h-full grid grid-cols-12 bg-gray-300 animate-pulse p-4 gap-6 rounded-lg'>
            <div className='col-span-6 flex items-center justify-between'>
                <div className='h-20 w-20 rounded-lg bg-gray-100 animate-pulse'></div>
                <div className='h-20 w-20 rounded-lg bg-gray-100 animate-pulse'></div>
                <div className='h-20 w-20 rounded-lg bg-gray-100 animate-pulse'></div>
            </div>
            <div className='col-span-6 grid grid-cols-3 gap-5'>
                {[1,2,3,5,6,7].map((ele)=>(
                    <div key={ele} className='flex flex-col gap-3'>
                        <span className='bg-gray-100 animate-pulse w-[50%] h-3 flex '></span>
                        <span className='bg-gray-100 animate-pulse w-full h-4 flex '></span>
                    </div>
                ))}
            </div>
        </div>
        <div className='grid grid-cols-7 gap-6'>
            {numbers.map((ele)=>(
                <div key={ele} className='flex flex-col gap-2 items-center'>
                    <div className='h-[200px] bg-gray-300 animate-pulse rounded-lg w-full flex items-center justify-center'>
                        <div className='p-2 w-full space-y-3 flex items-center flex-col'>
                            <span className='w-[50%] h-3 bg-gray-100 animate-pulse flex'></span>
                            <span className='w-full h-3 bg-gray-100 animate-pulse flex'></span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProjectSekeleton