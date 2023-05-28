'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js';
import { BsHeartFill } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { CircleLoader } from 'react-spinners';

const Dashboard = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

    

  useEffect(() => {
    async function fetchBlogs() {
        setLoading(true)
        const res = await fetch(`/api/blog`, {
            method: 'GET',  
            cache: 'no-store'
        });
        if(!res.ok){
            return
        }
        let xxx = await res.json();
        console.log(xxx);
        setBlogs(xxx.filter(blog => blog.authorId._id === session?.user?._id));
        console.log(blogs);
        setLoading(false);
      }
    fetchBlogs();
  }, []);

  
  
  const handleDelete = async (id) => {
    try {
        const res = await fetch(`/api/blog/${id}`, {
            headers: {
                'Authorization' : `Bearer ${session?.user?.accessToken}`
            },
            method: 'DELETE',
        });

        if(res.ok){
            toast.success('Successfully deleted')
            fetchBlogs();
        }

    } catch (error) {
        console.log(error);
    }
  }

  return (
    <section className='min-h-screen w-screen pt-16 pb-7 flex justify-items-center'>
        <div className='flex flex-col items-start m-auto gap-5'>
        {
            !session && <h1 className='font-bold text-4xl text-[#005B6B] uppercase'>You need to be logged in to use the dashboard!</h1>
        }
        {
           session && loading ? ( 
                <CircleLoader size={150} color='#005B6B' />
            ) : (
                <>
                {blogs?.length > 0 && 
                    <h1 className='font-bold text-4xl text-[#777]'>Your Blogs:</h1>
                }
                {
                 ( blogs?.length > 0 ? blogs.map((blog) => (
                    <figure key={blog._id} className='flex md:flex-row flex-col items-start
                            gap-2 shadow-md '>
                        <Image 
                            src={blog.imgUrl}
                            width={450}
                            height={450}
                            className='object-cover rounded-2xl md:rounded-tr-none 
                                    md:rounded-br-none w-[450px] h-[350px] my-0 
                                    hover:shadow-lg mx-auto'
                        />
                        <figcaption className='p-4 flex flex-col min-w-[400px]'>
                             <div className='flex flex-wrap gap-4 justify-end'>
                                <Link href={`/blog/edit/${blog._id}`} className='flex flex-row gap-2 items-center bg-[#4CC186] 
                                    py-2 px-3 rounded-md text-xl text-white'>
                                    <AiOutlineEdit />
                                    Edit
                                    </Link>
                                <button className='flex flex-row gap-2 items-center bg-[#D90000] 
                                    py-2 px-3 rounded-md text-xl text-white'
                                    onClick={() => handleDelete(blog._id)}>
                                    <RiDeleteBin5Line />
                                    Delete
                                    </button>
                            </div>
                            <div className='flex flex-col'>
                                <Link href={`/blog/${blog._id}`}
                                    className='font-extrabold text-3xl text-[#005B6B]'
                                >{blog.title}</Link>
                                <div className='flex flex-row justify-between mt-2'>
                                    <time>{format(blog.createdAt)}</time>
                                    <h2 className='flex flex-row items-center gap-2'>
                                        {blog.likes.length}
                                        <BsHeartFill fill='red' />
                                        </h2>
                                </div>
                            </div>
                            
                        </figcaption>
                    </figure>
                    
                    )
                    )
                     : 
                     <h1 className='font-bold text-4xl text-[#777] uppercase'>You don`t have any blogs yet...</h1>
                     )
                     }
                </>
            )
        }
   
        </div>
    </section>
  )
}

export default Dashboard