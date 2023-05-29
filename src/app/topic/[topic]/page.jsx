'use client'

import BlogCard from '@/components/blogCard/BlogCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners';

const Topic = (ctx) => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
            setLoading(true);

            axios.get(`/api/topic/${ctx.params.topic}`).then(res => {    
                setBlogs(res.data);
                setLoading(false);
            })
    }, [])


  return (
    <section className='mt-16 px-28 py-16'>
        
        {
            loading? (
                <div className='flex items-center justify-center mt-16'>
                    <CircleLoader size={150} color='#005B6B' />
                </div>
            ) : (
                <>
                <h1 className='font-extrabold text-2xl'>
            {ctx.params.topic} Blogs
        </h1>
            <div className='flex flex-wrap gap-4 mt-5'>
            {
                blogs.length > 0 && blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                    ))
                }
        </div>
                </>
            )
        }
        {
            !loading && blogs.length <= 0 && (
                <div className='flex items-center justify-center mt-4'>
                    <h1>There are 0 blogs about this topic</h1>    
                </div>
            )
        }
    </section>
  )
}

export default Topic