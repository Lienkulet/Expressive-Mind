'use client'

import BlogCard from '@/components/blogCard/BlogCard';
import React, { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners';

const Topic = (ctx) => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function fetchBlogs(){
            setLoading(true);

            const res = await fetch(`/api/topic/${ctx.params.topic}`, {method: 'GET'});
            
            if(res.ok){
                const xxx = await res.json();
                setBlogs(xxx);
            }
            setLoading(false);

        }
        fetchBlogs();
    }, [])


  return (
    <div className='mt-16 px-28 py-16'>
        <h1 className='font-extrabold text-2xl'>
            {ctx.params.topic} Blogs
        </h1>
        {
            loading? (
                <div className='flex items-center justify-center mt-16'>
                    <CircleLoader size={150} color='#005B6B' />
                </div>
            ) : (
            <div className='flex flex-wrap gap-4 mt-5'>
            {
                blogs.length > 0 && blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))
            }
        </div>
            )
        }
        {
            blogs.length < 0 && (
                <div className='flex items-center justify-center mt-4'>
                    <h1>There are 0 blogs about this topic</h1>    
                </div>
            )
        }
    </div>
  )
}

export default Topic