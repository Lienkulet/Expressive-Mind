import React from 'react'
import dynamic from 'next/dynamic';
const LazyLink = dynamic(() => import('next/link'), { ssr: true });


const Topics = () => {
  return (
    <section className='flex flex-col gap-2 items-center px-7 py-4 border-2 border-gray-100 md:w-[350px]'>
      <header className='flex  text-center border-b-2 border-[#45c6a6] py-4 px-14'>
            <h1 className='font-semibold text-lg text-center'>TOPICS</h1>
      </header>
      <div className='flex flex-col gap-2 items-start 
                 py-2 pt-6 w-full'>
            <LazyLink href='/topic/Nature'
              // onClick={toast.loading('Loading')}
            className='hover:text-[#45c6a6] pb-2 font-medium uppercase text-md ease-in-out duration-500 w-full'>
              Nature
            </LazyLink>
            <LazyLink href='/topic/Tech' 
              className='border-t-2 border-gray-100 pt-4 pb-2 uppercase hover:text-[#45c6a6] ease-in-out duration-500 w-full font-medium text-md'>
              Tech
            </LazyLink>
            <LazyLink href='/topic/Food'
               className='border-y-2 border-gray-100 py-4 uppercase hover:text-[#45c6a6] ease-in-out duration-500 w-full font-medium text-md'>
              Food
            </LazyLink>
            <LazyLink href='/topic/Gym'
               className='border-b-2 border-gray-100 pb-4 pt-2 uppercase hover:text-[#45c6a6] ease-in-out duration-500 w-full font-medium text-md'>
              Gym
            </LazyLink>
            <LazyLink href='/topic/Health' 
              className='hover:text-[#45c6a6] pt-2 ease-in-out uppercase duration-500 w-full font-medium text-md'>
              Health
            </LazyLink>
          </div>
    </section>
  )
}

export default Topics