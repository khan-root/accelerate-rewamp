import React from 'react'

const TeamSkeleton = () => {
    const numbers = Array.from({ length: 15 }, (_, index) => index + 1);
  return (
    <div className='px-10 py-5 space-y-6'>
        <span className='bg-gray-300 animate-pulse h-4 p-4 w-52 flex rounded-lg'></span>
        <div className='grid grid-cols-7 gap-6'>
            {numbers.map((ele)=>(
                <div key={ele} className='flex flex-col gap-2 items-center'>
                    <div className='h-[200px] bg-gray-300 animate-pulse rounded-lg w-full'></div>
                    <span className='flex justify-center bg-gray-300 animate-pulse w-[100px] h-[10px]'></span>
                    <span className='flex justify-center bg-gray-300 animate-pulse w-[150px] h-[10px]'></span>
                    <span className='flex justify-center bg-gray-300 animate-pulse w-[200px] h-[10px]'></span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TeamSkeleton