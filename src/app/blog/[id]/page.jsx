'use client';

import Comment from '@/components/comment/Comment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import { toast } from 'react-hot-toast';
import {
    AiFillDelete,
    AiFillHeart,
    AiOutlineHeart,
} from 'react-icons/ai';
import {BsDot, BsFillPencilFill} from 'react-icons/bs';
import { CircleLoader } from 'react-spinners';
import {format} from 'timeago.js';

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
        async function fetchBlog() {
          setLoading(true);
            const res = await fetch(`/api/blog/${ctx.params.id}`, { method: 'GET' })
            if(res.ok){

                const blog = await res.json();
                
                setBlogDetails(blog)
                setIsLiked(blog?.likes?.includes(session?.user?._id))
                setBlogLikes(blog?.likes?.length || 0)
            }
            setLoading(false)
        }

       
         fetchBlog();
    }, [])

    useEffect(() => {
        async function fetchComments() {
          setCommentsLoading(true);
            const res = await fetch(`/api/comment/${ctx.params.id}`, { method: 'GET', cache: 'no-store' })
            if(res.ok){

                const comment = await res.json();
                
                setComments(comment);
                console.log(comments.length)
            }
            setCommentsLoading(false);
        }

        fetchComments();
    }, [])

    const handleLike  = async () => {
        try {
            const res = await fetch(`/api/blog/${ctx.params.id}/like`, {
                headers:{
                    'Authorization': `Bearer ${session?.user?.accessToken}`
                },
                method: 'PUT'
            });

            if(res.ok){
                if(isLiked){
                    setIsLiked(prev => !prev);
                    setBlogLikes(prev => prev-1);
                } else {
                    setIsLiked(prev => !prev)
                    setBlogLikes(prev => prev + 1);
                }
            }

        } catch (error) {
            console.log(error); 
        }
    }

    const handleDelete = async () => {
        try {
                const res = await fetch(`/api/blog/${ctx.params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${session?.user?.accessToken}`
                    },
                    method: "DELETE"
                })

                if (res.ok) {
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
    
            const res = await fetch(`/api/comment`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user?.accessToken}`
                },
                method: "POST",
                body: JSON.stringify(body)
            });

            if(res.ok){
                const newComment = await res.json();

                setComments(prev => {
                    return [newComment, ...prev]
                })
    
                setCommentTitle('');
                setCommentDesc('');
            }
            
        } catch (error) {
         console.log(error);   
        }
    }

    return (
        <>
        {loading ? (
          <article className='flex items-center justify-center mt-28'>
            <CircleLoader size={150} color='#005B6B' />
          </article>
        ) : (
          <article className='my-6 md:p-20 p-5 m-auto max-w-[900px] flex flex-col w-screen h-fit bg-gray-100'>
            <header className='flex justify-between items-center text-gray-400'>
              <address className='flex items-center line-clamp-2 text-sm font-bold'>
                {blogDetails?.authorId?.username}
                <BsDot />
                <time>{format(blogDetails?.createdAt)}</time>
              </address>
              <nav className='ml-auto'>
                {blogDetails?.authorId?._id.toString() === session?.user?._id ? (
                  <ul className='flex flex-wrap gap-2'>
                    <li>
                      <Link
                        href={`/blog/edit/${blogDetails?._id}`}
                        className='flex gap-2 items-center'
                      >
                        <BsFillPencilFill />
                        Edit
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleDelete}
                        className='flex gap-2 items-center'
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
            </header>
            <section className='flex flex-col my-5 gap-5'>
              <h1 className='text-2xl font-bold'>{blogDetails?.title}</h1>
              <p className='text-md font-bold'>{blogDetails?.summary}</p>
            </section>
            <figure className='flex flex-col gap-5 my-5'>
              <Image
                src={blogDetails?.imgUrl}
                alt={blogDetails?.title}
                width={800}
                height={300}
                className='rounded-md'
              />
              <figcaption className='font-bold text-md'>
                {blogDetails?.caption}
              </figcaption>
            </figure>
            <main>
            <p className="whitespace-pre-line">{blogDetails?.desc}</p>
            </main>
            <footer className='my-5 border-y-2 py-5'>
              <ul className='flex flex-wrap items-center justify-between'>
                <li className='flex flex-wrap items-center gap-5'>
                  <h6 className='flex flex-row items-center gap-2'>
                    {blogLikes}
                    {isLiked ? (
                      <AiFillHeart
                        size={20}
                        onClick={handleLike}
                        className='text-red-500 cursor-pointer'
                      />
                    ) : (
                      <AiOutlineHeart
                        size={20}
                        onClick={handleLike}
                        className='text-red-500 cursor-pointer'
                      />
                    )}
                  </h6>
                  <h6 className='flex flex-row items-center gap-2'>
                    {comments?.length} comments
                  </h6>
                </li>
                <li>
                  <h6>Category: {blogDetails?.category}</h6>
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
                  <h2>Title:</h2>
                  <input
                    type='text'
                    value={commentTitle}
                    className='w-full p-2 rounded-md'
                    placeholder='Title'
                    onChange={(e) => setCommentTitle(e.target.value)}
                  />
                </label>
                <label className='flex flex-col gap-2'>
                  <h2>Message:</h2>
                  <textarea
                    value={commentDesc}
                    className='w-full p-2 rounded-md min-h-[50px] max-h-[150px]'
                    placeholder='Message...'
                    onChange={(e) => setCommentDesc(e.target.value)}
                  />
                </label>
                <button className='py-2 px-3 border-2 w-full bg-[#005B6B] rounded-md text-white'>
                  Post
                </button>
              </form>
              <div className='flex flex-col w-full'>
                {commentsLoading && <div><CircleLoader /></div>}
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                  ))
                ) : (
                  <div className='flex justify-center items-center mt-4'>
                    <h1>There are no comments yet</h1>
                  </div>
                )}
              </div>
            </div>
          </article>
        )}
      </>
    )
}

export default BlogDetails

