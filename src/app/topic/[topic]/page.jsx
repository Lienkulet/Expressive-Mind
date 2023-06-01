'use client'

import AsideComponent from '@/components/asideComponent/AsideComponent';
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
    <section className='mt-16 md:px-28 py-16'>
        
        <main className='h-full w-[70%] my-0 mx-auto mt-10 flex flex-col'>
          <h1 className='font-semibold text-[2rem] mb-2'>{ctx.params.topic} Blogs</h1>
        <div className='flex md:flex-row flex-col justify-between gap-5'>
          <div className='flex flex-col gap-12'>
           {blogs?.length > 0 ? blogs?.map((blog) => (
             <BlogCard key={blog._id} blog={blog} />
             )) : <h1>There are no blogs available at the moment</h1>}
          </div>
          <AsideComponent />
        </div>
      </main>                   
        
    </section>
  )
}

export default Topic