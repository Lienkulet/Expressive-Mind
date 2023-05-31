'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js';
import { BsHeartFill } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { CircleLoader } from 'react-spinners';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { MdOutlineWatchLater } from 'react-icons/md';

const LazyLink = dynamic(() => import('next/link'), {ssr: false});

const Dashboard = () => {
  const {data: session} = useSession();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs()
  }, []);

  const fetchBlogs = async () => {
    setLoading(true)
        axios.get(`/api/blog`).then(res => {
            const xxx = res.data
            setBlogs(xxx.filter(blog => blog.authorId._id === session?.user?._id));
            setLoading(false);
        })
  }


//   async function fetchBlogs(){
//     await mongooseConnect();
//       const blox = await Blog.find({}, { 
//       title: 1,
//       summary: 1,
//       imgUrl: 1,
//       likes: 1,
//       authorId: 1,
//       createdAt: 1
//    }).limit(5).populate({
//        path: "authorId", 
//        select: 'username',
//         model: Useri
//       });
//       console.log(blox.length);

//       return JSON.parse(JSON.stringify(blox));
//   }

//   const xxx = await fetchBlogs();

//   setBlogs(xxx.filter(blog => blog.authorId._id === session?.user?._id));


  const handleDelete = async (id) => {
    try {
        await axios.delete(`/api/blog/${id}`).then(res => {
            if(res.status === 200){
                toast.success('Successfully deleted')
                fetchBlogs();
            }
        });
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <section className='min-h-screen w-full px-2 pt-16 pb-7 flex justify-items-center'>
        <div className='flex flex-col items-start m-auto gap-5'>
        {
            !session && <h1 className='font-bold text-4xl text-[#45c6a6] uppercase'>
                            You need to be logged in to use the dashboard!
                        </h1>
        }
        {
           session && loading ? ( 
                <CircleLoader size={150} color='#45c6a6' />
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
                                    md:rounded-br-none w-full md:w-[450px] h-[350px] my-0 
                                     mx-auto'
                        />
                        <figcaption className='p-4 flex flex-col md:min-w-[400px]'>
                             
                            <div className='flex flex-col'>
                                <LazyLink href={`/blog/${blog._id}`}
                                    className='font-semibold text-3xl 
                                     hover:text-[#45c6a6] ease-in-out duration-700'
                                >{blog.title}</LazyLink>
                                <div className='flex md:flex-row flex-col justify-between'> 

                                <div className='flex flex-col justify-between mt-2'>
                                    <time className='flex flex-row items-center'>
                                        <MdOutlineWatchLater fill='#45c6a6' size={'1.25rem'} />
                                        {format(blog.createdAt)}
                                    </time>
                                    <h2 className='flex flex-row items-center gap-2'>
                                        <BsHeartFill fill='#45c6a6' />
                                        {blog.likes.length}
                                        </h2>
                                </div>
                                <div className='flex flex-wrap gap-4 justify-end'>
                                <LazyLink href={`/blog/edit/${blog._id}`} className='flex flex-row gap-2 
                                    items-center hover:text-[#45c6a6] ease-in-out duration-700 
                                     rounded-md text-xl text-[#777]'>
                                    <AiOutlineEdit />
                                    Edit
                                    </LazyLink>
                                <button className='flex flex-row gap-2 items-center text-[#777]
                                    hover:text-red-500 ease-in-out duration-700
                                     rounded-md text-xl'
                                    onClick={() => handleDelete(blog._id)}>
                                    <RiDeleteBin5Line />
                                    Delete
                                    </button>
                            </div>
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