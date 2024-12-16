import React from 'react'

const HomeSkeleton = () => {
    const numbers = Array.from({ length: 30 }, (_, index) => index + 1);
  return (
    <div className='px-10 py-5 w-full h-full space-y-6'>
        <span className='bg-gray-300 animate-pulse h-4 p-4 w-52 rounded-lg flex'></span>
        <div className='bg-gray-300 animate-pulse h-[200px] flex justify-between p-4 w-[70%] rounded-lg'>
            <div className='flex flex-col gap-3'>
            </div>
        </div>
        <div className='space-y-3'>
            <div className='animate-pulse flex gap-6 rounded-lg'>
                <div className='bg-gray-300 h-[40px] w-[100px] rounded-full'></div>
                <div className='bg-gray-300 h-[40px] w-[100px] rounded-full'></div>
            </div>
            <div className='animate-pulse flex gap-6 rounded-lg'>
                <div className='bg-gray-300 h-[30px] w-[70px] rounded-full'></div>
                <div className='bg-gray-300 h-[30px] w-[70px] rounded-full'></div>
            </div>
        </div>
        <div className='bg-gray-300 animate-pulse h-10 p-4 w-[70%] rounded-lg'></div>
        <div className='bg-gray-300 animate-pulse  p-4 w-[70%] rounded-lg space-y-3'>
           

            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <span className='bg-gray-100 animate-pulse h-10 w-10 rounded-full'></span>
                    <span className='bg-gray-100 animate-pulse h-10 w-10 rounded-full'></span>
                </div>
                <span className='w-[100px] h-[40px] bg-gray-100 rounded-lg animate-pulse'></span>
                <div className='flex items-center gap-4'>
                    <span className='bg-gray-100 h-[40px] w-[100px] rounded-full'></span>
                    <span className='bg-gray-100 h-[40px] w-[100px] rounded-full'></span>
                </div>
            </div>
            <div className='grid grid-cols-7 gap-4'>
                {[1,2,3,4,5,6,7]?.map((ele)=>(
                    <span key={ele} className='bg-gray-100 animate-pulse h-[10px] w-[30px] flex items-center justify-center rounded-full'></span>
                ))}
                {numbers?.map((ele)=>(
                    <div key={ele} className="w-full h-[100px] bg-gray-100 animate-pulse flex flex-col rounded-xl cursor-pointer"></div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default HomeSkeleton