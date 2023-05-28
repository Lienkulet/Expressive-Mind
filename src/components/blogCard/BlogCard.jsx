'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {AiFillHeart, AiOutlineCalendar, AiOutlineHeart} from 'react-icons/ai';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { format } from 'timeago.js';

const BlogCard = ({
    blog: {
        _id,
        title,
        summary,
        imgUrl,
        likes,
        authorId,
        createdAt
    }
}) => {
    const [isLiked, setIsLiked]= useState(false);
    const [blogLikes, setBlogLikes] = useState(0);
    const {data: session} = useSession();

    useEffect(() => {
        session && likes && setIsLiked(likes.includes(session?.user?._id))
        likes && setBlogLikes(likes.length)
      }, [likes, session])

    const handleLike = async () => {
        try {
            const res = await fetch(`/api/blog/${_id}/like`, {
                headers: {
                    'Authorization': `Bearer ${session?.user?.accessToken}`
                },
                method: 'PUT'
            });

            if(res.ok){
                if(isLiked){
                    setIsLiked(prev => !prev)
                    setBlogLikes(prev => prev - 1);
                } else {
                    setIsLiked(prev => !prev)
                    setBlogLikes(prev => prev + 1);
                }
            } 

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-[350px] max-h-[350px] md:w-[800px] shadow-md transition-[150ms] rounded-2xl
                      hover:shadow-lg'>
            <div className=' h-full flex md:flex-row flex-col'>
                <Link href={`/blog/${_id}`}>
                    <Image 
                        src={imgUrl}
                        alt={title}
                        width={450}
                        height={350}
                        className='object-cover rounded-2xl md:rounded-tr-none
                         md:rounded-br-none w-[450px] max-h-[350px] my-0 h-full
                        hover:shadow-lg mx-auto'
                    />
                </Link>
                <div className='ml-3 p-5 flex flex-col justify-between w-[80%]'>
                    <div>
                        <h3 className='text-3xl text-[#005B6B] font-extrabold'>{title}</h3>
                    <div className='text-[#777]  flex flex-wrap justify-between'>
                        <span className='flex flex-row gap-2 items-center'>
                            <MdOutlineAccountCircle size={'1rem'} />
                            {authorId.username}
                        </span>
                        <time className='flex flex-row gap-2 items-center'>
                            <AiOutlineCalendar size={'1rem'} />
                            {format(createdAt)}
                        </time>
                    </div>
                        <p className='mt-5 text-md'>{summary}</p>
                    </div>
                    
                    <footer className='flex flex-end justify-between items-end 
                                    relative bottom-0'>
                        <div className='text-2xl 
                            cursor-pointer flex items-center gap-2'>
                        
                            {blogLikes} 
                            {" "}
                            {session? (
                                <>
                                {
                                    isLiked ? (
                                        <AiFillHeart onClick={handleLike} size={20}/>
                                    ) : (
                                        <AiOutlineHeart onClick={handleLike} size={20}/>
                                    )
                                    }
                                </>
                            ) : (
                                <AiFillHeart fill='red' size={20}/>
                            ) 
                             }
                            
                        
                    </div>
                        <Link href={`/blog/${_id}`}
                         className='py-2 px-3 rounded-2xl border-2 
                         border-[#005B6B] hover:font-bold text-[#005B6B]'>
                            Read More
                        </Link>
                    </footer>
                </div>
                
            </div>
        </div>
    )
}

export default BlogCard
