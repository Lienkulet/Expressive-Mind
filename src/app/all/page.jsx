'use client';

import BlogCard from '@/components/blogCard/BlogCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            setLoading(true);
            axios.get('/api/blog').then(res => setBlogs(res.data));
          
            setLoading(false);
    }, []);
    


  return (
    <section className='mt-16 px-28 py-16'>
      <h1 className='font-extrabold text-2xl'>
            All Blogs
        </h1>
        {loading? (
       <main className='h-screen flex items-center justify-center mt-28' >
            <CircleLoader size={150} color='#005B6B' />
      </main>
        ) : (
            <main className='flex flex-wrap gap-4 mt-5'>
            {blogs?.length > 0 ? blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
                )) : <h1>There are no blogs available at the moment</h1>}
            </main>
        )
        }
        
    </section>
  )
}

export default AllBlogs