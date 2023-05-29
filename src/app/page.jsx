import BlogCard from '@/components/blogCard/BlogCard'
import HeroBanner from '@/components/heroBanner/HeroBanner';
import { CircleLoader } from 'react-spinners';
import dynamic from 'next/dynamic';
// import { blogs } from '@/lib/data';
import axios from 'axios';
const LazyLink = dynamic(() => import('next/link'), { ssr: true });

export  async function fetchBlogs(){
  const res = await axios.get('https://expressive-mind.vercel.app/api/blog')
  // const res = await axios.get('http://localhost:3000/api/blog')

  return res.data;
}


export default async function Home(){
  let loading = true;
  const blogs = await fetchBlogs();
  loading = false;

  
  return (
    <section className=' flex flex-col w-full my-7 p-4'>
      
      <HeroBanner blogs={blogs} />
      
      
      {loading? (
       <main className='h-screen flex items-center justify-center mt-28' >
            <CircleLoader size={150} color='#005B6B' />
      </main>
      ) : (
        <main className='h-full w-[70%] my-0 mx-auto mt-10 flex flex-wrap-reverse justify-between'>
          <div className='flex flex-col gap-2'>

          <h1 className='font-extrabold text-[2rem] text-[$777]'>Recent Posts</h1>

           {blogs?.length > 0 ? blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
          )) : <h1>There are no blogs available at the moment</h1>}
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='font-extrabold text-[2rem] text-[$777]'>Interesting Topics:</h1>
            <LazyLink href='/topic/Nature' className='border-2 p-3 hover:bg-gray-100 rounded-md font-semibold text-md'>
              Nature
            </LazyLink>
            <LazyLink href='/topic/Tech' className='border-2 p-3 hover:bg-gray-100 rounded-md font-semibold text-md'>
              Tech
            </LazyLink>
            <LazyLink href='/topic/Food' className='border-2 p-3 hover:bg-gray-100 rounded-md font-semibold text-md'>
              Food
            </LazyLink>
            <LazyLink href='/topic/Gym' className='border-2 p-3 hover:bg-gray-100 rounded-md font-semibold text-md'>
              Gym
            </LazyLink>
            <LazyLink href='/topic/Health' className='border-2 p-3 hover:bg-gray-100 rounded-md font-semibold text-md'>
              Health
            </LazyLink>
          </div>
      </main>
      )}
      
    </section>
  )
}
