'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import { MdOutlineWatchLater } from 'react-icons/md';
import { format } from 'timeago.js';
import dynamic from 'next/dynamic';

const LazyLink = dynamic(() => import('next/link'), { ssr: false })

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
        <article className='h-[750px] max-w-[800px]
                         shadow-md transition-[150ms] hover:shadow-lg
                         border-2 border-[#45c6a6] p-6
                         flex flex-col
                         '>
            <header className=''>
                    <Image 
                        src={imgUrl}
                        alt={title}
                        width={450}
                        height={350}
                        className='object-cover w-full max-h-[400px] my-0 h-full mx-auto'
                    />
            </header>
                <main className='h-full mt-6 flex flex-col  gap-3'>
                        <LazyLink href={`/blog/${_id}`} 
                            className='text-2xl font-semibold
                                hover:text-[#45c6a6] ease-in-out duration-1000
                            '>
                                {title}
                        </LazyLink>

                        <p className='text-md'>{summary}</p>

                        <LazyLink href={`/blog/${_id}`}
                         className='py-2 px-3 rounded-2xl border-2  w-fit
                         border-[#45c6a6] text-[#45c6a6]
                         hover:bg-[#45c6a6] hover:font-bold hover:text-white
                         ease-in-out duration-1000
                         '>
                            Read More
                        </LazyLink>
                    
                    
                </main>
                <footer className='flex flex-end justify-between items-center 
                                    relative bottom-0'>
                        <div className='text-[#777] gap-2 items-center flex flex-wrap justify-between'>
                            
                            <time className='flex flex-row gap-1 items-center'>
                                <MdOutlineWatchLater fill='#45c6a6' size={'1.25rem'} />
                                {format(createdAt)}
                            </time>
                            <span className='text-[#45c6a6] flex flex-row '>
                                by {authorId?.username}
                            </span>
                        </div>
                        <div className='text-md
                            cursor-pointer flex items-center gap-1'>
                        {session? (
                                <>
                                {
                                    isLiked ? (
                                        <AiFillHeart fill='#45c6a6' onClick={handleLike} size={'1rem'}/>
                                    ) : (
                                        <AiOutlineHeart fill='#45c6a6' onClick={handleLike} size={'1rem'}/>
                                    )
                                    }
                                </>
                            ) : (
                                <AiFillHeart fill='#45c6a6' size={'1rem'}/>
                            ) 
                             }
                            {blogLikes} 
                    </div>
                        
                    </footer>
        </article>
    )
}

export default BlogCard
