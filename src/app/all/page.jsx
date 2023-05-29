'use client';

import BlogCard from '@/components/blogCard/BlogCard';
import React, { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchBlogs(){
            setLoading(true);
            const res = await fetch('https://expressive-mind.vercel.app/api/blog', {
            // const res = await fetch('http://localhost:3000/api/blog', {
              method: 'GET',  
              // headers: {
              //   'Cache-Control': 'public, max-age=10'
              // }
            //   cache: 'no-store'
            });
          
            const xxx = await res.json();
            setBlogs(xxx);
            setLoading(false);
          }

          fetchBlogs();
    }, []);
    


  return (
    <div>
        {loading? (
       <main className='h-screen flex items-center justify-center mt-28' >
            <CircleLoader size={150} color='#005B6B' />
      </main>
        ) : (
            <main>
            {blogs?.length > 0 ? blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
                )) : <h1>There are no blogs available at the moment</h1>}
            </main>
        )
        }
        
    </div>
  )
}

export default AllBlogs