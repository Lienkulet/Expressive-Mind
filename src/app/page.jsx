import BlogCard from '@/components/blogCard/BlogCard'
import HeroBanner from '@/components/heroBanner/HeroBanner';
import { CircleLoader } from 'react-spinners';
import dynamic from 'next/dynamic';

const LazyLink = dynamic(() => import('next/link'), { ssr: true });

export  async function fetchBlogs(){
  // const res = await fetch('https://expressive-mind-4yrsa1c9j-lienkulet.vercel.app/api/blog', {
  const res = await fetch('http://localhost:3000/api/blog', {
    method: 'GET',  
    // headers: {
    //   'Cache-Control': 'public, max-age=10'
    // }
    cache: 'no-store'
  });

  return res.json();
}


export default async function Home(){
  let loading = true;
  const blogs = await fetchBlogs();
  loading = false;

  console.log(blogs?.length);
  console.log(blogs?.length);
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
