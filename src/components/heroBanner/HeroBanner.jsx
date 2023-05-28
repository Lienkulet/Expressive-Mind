'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { MdOutlineAccountCircle } from 'react-icons/md';
import { RxDotFilled} from 'react-icons/rx'
import { format } from 'timeago.js';
const HeroBanner = ({blogs}) => {

    const [currentImg, setCurrentImg] = useState(0);   

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImg((prevImage) => (prevImage + 1) % blogs?.length);
        }, 5000); // 5000 milliseconds = 5 seconds
    
        return () => {
          clearInterval(interval);
        };
      }, []);
    
      useEffect(() => {
        // Check if the current image is the last image in the array
        // If so, after 5 seconds, change back to the first image
        if (currentImg === blogs?.length - 1) {
          const timeout = setTimeout(() => {
            setCurrentImg(0);
          }, 5000); // 5000 milliseconds = 5 seconds
    
          return () => {
            clearTimeout(timeout);
          };
        }
      }, [currentImg, blogs?.length]);

    const handleChangeImg = (value) => {
        if (value === 'dec') {
            if (currentImg === 0) {
                setCurrentImg(blogs?.length -1 );
            } else {
                setCurrentImg(prev => prev - 1);
            }
        }
        if (value === 'inc') {
            if (currentImg === blogs?.length - 1) {
                setCurrentImg(0);
            } else {
                setCurrentImg(prev => prev + 1);
            }
        }
    }

  return (
    <section className='h-full w-full flex flex-col items-center justify-center 
    mt-16 z-1'>
        <h1 className='text-[2rem] font-extrabold text-[#353534]'>Trending Posts</h1>
        <div className='h-fit w-fit md:h-[650px] md:w-[75%] m-auto py-4 px-4 relative group'>
            {blogs && (
              
            <figure
            className='w-full h-fit rounded-2xl bg-center bg-cover duration-500 shadow '>
            <div  className='hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black
            text-white cursor-pointer'>
             <BsChevronCompactLeft size={30} onClick={() => handleChangeImg('dec')}/>
             </div>
            <div className='hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black
            text-white cursor-pointer'>
                <BsChevronCompactRight size={30} onClick={() => handleChangeImg('inc')}/>
             </div>
                <img 
                    src={blogs[currentImg]?.imgUrl}
                    className='w-[450px] h-[400px] md:w-screen md:h-[600px] object-cover objectFit="contain mb-2 rounded-tr-xl rounded-tl-xl z-0'
                />
                <figcaption className='p-6 '>
                    <Link  href={`/blog/${blogs[currentImg]?._id}`}
                     className='font-extrabold text-xl uppercase'>
                    {blogs[currentImg]?.title}

                    </Link>
                    
                    <div className='b-0 flex flex-wrap justify-between'>
                        <span className='flex flex-row gap-2 items-center'>
                            <MdOutlineAccountCircle size={'1rem'} />
                            {blogs[currentImg]?.authorId?.username}
                            </span>
                    <time className='flex flex-row gap-2 items-center'>
                        <AiOutlineCalendar size={'1rem'} />
                        {format(blogs[currentImg]?.createdAt)}</time>
                    </div>
                    </figcaption>
            </figure>
              )}
          
        </div>
        <div className='flex mt-20 justify-center py-2'>
            {blogs?.map((blog, blogIndex) => (
                <div key={blogIndex} className='text-3xl cursor-pointer'>
                <RxDotFilled onClick={() => setCurrentImg(blogIndex)} />
                </div>
            ))}
        </div>
    </section>
  )
}

export default HeroBanner