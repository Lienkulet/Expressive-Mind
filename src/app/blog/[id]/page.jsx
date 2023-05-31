'use client';

import Comment from '@/components/comment/Comment';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import { toast } from 'react-hot-toast';
import {
    AiFillDelete,
    AiFillHeart,
    AiOutlineHeart,
} from 'react-icons/ai';
import { CgQuote } from 'react-icons/cg'
import { BsFillPencilFill} from 'react-icons/bs';
import { CircleLoader } from 'react-spinners';
import {format} from 'timeago.js';
import dynamic from 'next/dynamic';
import { MdOutlineWatchLater } from 'react-icons/md';

const LazyLink = dynamic(() => import('next/link'), {ssr: false});

const BlogDetails = (ctx) => {
    const [blogDetails, setBlogDetails] = useState('');
    const [blogLikes, setBlogLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentTitle, setCommentTitle] = useState('');
    const [commentDesc, setCommentDesc] = useState('');
    const [comments, setComments] = useState([]);
    const router = useRouter();
    const { data: session } = useSession()

    useEffect(() => {
      setLoading(true);
      axios.get(`/api/blog/${ctx.params.id}`).then(res => {
              setBlogDetails(res.data)
              setIsLiked(res.data?.likes?.includes(session?.user?._id))
              setBlogLikes(res.data?.likes?.length || 0)
              setLoading(false)
            })
    }, [])

    useEffect(() => {
      setCommentsLoading(true);
      axios.get(`/api/comment/${ctx.params.id}`).then(res => {
              setComments(res.data);
              setCommentsLoading(false);
            })
    }, [])

    const handleLike  = async () => {
        try {
            await axios.put(`/api/blog/${ctx.params.id}/like`, null, {
              headers: {
                'Authorization': `Bearer ${session?.user?.accessToken}`
              }
            })
                if(isLiked){
                    setIsLiked(prev => !prev);
                    setBlogLikes(prev => prev-1);
                } else {
                    setIsLiked(prev => !prev)
                    setBlogLikes(prev => prev + 1);
                }

        } catch (error) {
            console.log(error); 
        }
    }

    const handleDelete = async () => {
        try {
          const res = await axios.delete(`/api/blog/${ctx.params.id}`);

                if (res.status === 200) {
                  toast.success('Successfully deleted');
                    router.push('/')
                }
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = async (e) => {
        e.preventDefault();

        if(!session){
            toast.error('Please login first')
            return;
        }

        if(commentDesc === '' || commentTitle === ''){
            return;
        }

        try {
            const body = {
                blogId: ctx.params.id,
                authorId: session?.user?._id,
                title: commentTitle,
                text: commentDesc
            }
            setCommentsLoading(true);
            await axios.post(`/api/comment`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user?.accessToken}`
                },
            }).then(res => {
              if(res.status === 200){
                const newComment = res.data;

                setComments(prev => {
                    return [newComment, ...prev]
                })
    
                setCommentTitle('');
                setCommentDesc('');
                setCommentsLoading(false);
            }
            })

            
            
        } catch (error) {
         console.log(error);   
        }
    }

    return (
      <>
        {loading ? (
          <article className='flex items-center justify-center mt-28'>
            <CircleLoader size={150} color='#45c6a6' />
          </article>
        ) : (
          <article className='my-6 md:p-20 p-5 m-auto max-w-[900px] flex flex-col w-screen h-fit'>
            
            <figure className='flex flex-col gap-5 my-5'>
              <Image
                src={blogDetails?.imgUrl}
                alt={blogDetails?.title}
                width={800}
                height={300}
                className='rounded-md object-cover max-h-[500px] w-full'
              />
              <figcaption  className='flex justify-between items-center text-gray-400'>
            <address className='text-[#777] gap-2 items-center flex flex-wrap justify-between'>
                  <time className='flex flex-row gap-1 items-center'>
                              <MdOutlineWatchLater fill='#45c6a6' size={'1.25rem'} />
                              {format(blogDetails?.createdAt)}
                  </time>
                  <span className='text-[#45c6a6] flex flex-row '>
                              by {blogDetails?.authorId?.username}
                  </span>
              </address>
              <nav className='ml-auto'>
                {blogDetails?.authorId?._id.toString() === session?.user?._id ? (
                  <ul className='flex flex-wrap gap-2'>
                    <li>
                      <LazyLink
                        href={`/blog/edit/${blogDetails?._id}`}
                        className='flex gap-2 items-center 
                          hover:text-[#45c6a6] ease-in-out duration-700
                        '
                      >
                        <BsFillPencilFill />
                        Edit
                      </LazyLink>
                    </li>
                    <li>
                      <button
                        onClick={handleDelete}
                        className='flex gap-2 items-center 
                        hover:text-[#red] ease-in-out duration-700
                        '
                      >
                        <AiFillDelete />
                        Delete
                      </button>
                    </li>
                  </ul>
                ) : (
                  ''
                )}
              </nav>
              
              </figcaption>
            </figure>
            <header className='flex flex-col items-center justify-center my-5 gap-5'>
              <h1 className='text-2xl font-bold'>{blogDetails?.title}</h1>
              <h1 className='text-lg text-[#777] font-medium flex flex-row'>
                <CgQuote />
                {blogDetails?.caption}
                <CgQuote />
                </h1>
            </header>
            <main>
            <p className="whitespace-pre-line">{blogDetails?.desc}</p>
            </main>
            <footer className='my-5 border-y-2 border-[#45c6a6] py-5'>
              <ul className='flex flex-wrap items-center justify-between'>
                <li className='flex flex-wrap items-center gap-5'>
                  <h6 className='flex flex-row items-center gap-2'>
                    {blogLikes}
                    {isLiked ? (
                      <AiFillHeart
                        size={20}
                        onClick={handleLike}
                        className='text-[#45c6a6] cursor-pointer'
                      />
                    ) : (
                      <AiOutlineHeart
                        size={20}
                        onClick={handleLike}
                        className='text-[#45c6a6] cursor-pointer'
                      />
                    )}
                  </h6>
                  <h6 className='flex flex-row items-center gap-2'>
                    {comments?.length} comments
                  </h6>
                </li>
                <li className='flex flex-row items-center gap-1'>
                  <h6>Category: </h6>
                  <h6 className='text-[#45c6a6] font-bold'> {blogDetails?.category}</h6>
                </li>
              </ul>
            </footer>
            <div className='flex md:flex-row flex-col gap-2'>
              <form
                onSubmit={(e) => handleComment(e)}
                className='flex flex-col w-full md:w-[300px] gap-2 border-r'
              >
                <h1 className='font-bold text-lg'>Leave a thought:</h1>
                <label className='flex flex-col gap-2'>
                  <h2 className='font-medium'>Title:</h2>
                  <input
                    type='text'
                    value={commentTitle}
                    className='w-full p-2 rounded-md bg-gray-200 outline-[#45c6a6]'
                    placeholder='Title'
                    onChange={(e) => setCommentTitle(e.target.value)}
                  />
                </label>
                <label className='flex flex-col gap-2'>
                  <h2 className='font-medium'>Message:</h2>
                  <textarea
                    value={commentDesc}
                    className='w-full p-2 rounded-md min-h-[50px] max-h-[150px] 
                      bg-gray-200 outline-[#45c6a6]'
                    placeholder='Message...'
                    onChange={(e) => setCommentDesc(e.target.value)}
                  />
                </label>
                <button className='py-2 px-3 border-2 w-full 
                  rounded-md border-[#45c6a6] text-[#45c6a6]
                  hover:bg-[#45c6a6] hover:text-white ease-in-out duration-700
                 '>
                  Post
                </button>
              </form>
              
                {commentsLoading && <div className='flex justify-center items-center mt-4 w-full'>
                    <CircleLoader color='#45c6a6' />
                    </div>
                }
                { comments.length > 0 ? (
                  <div className='flex flex-col w-full items-center '>
                    <header className='flex  text-center border-b-2 
                            border-[#45c6a6] py-2 px-14'>
                         <h1 className='font-semibold text-lg text-center'>Comments</h1>
                    </header>
                    <div className='flex flex-col items-start w-full mt-4'>
                    {comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                       ))}
                   </div>
                  </div>
                )
                : (
                  <div className='flex justify-center items-center mt-4'>
                    <h1>There are no comments yet</h1>
                  </div>
                )}
                </div>
                </article>
        )}
      </>
    )
}

export default BlogDetails

