import BlogCard from '@/components/blogCard/BlogCard'
import HeroBanner from '@/components/heroBanner/HeroBanner';
import Link from 'next/link';
import { CircleLoader } from 'react-spinners';

export  async function fetchBlogs(){
  const res = await fetch('https://expressive-mind-4yrsa1c9j-lienkulet.vercel.app//api/blog', {
    method: 'GET',  
    cache: 'no-store'
  });

  return res.json();
}


export default async function Home(){
  let loading = true;
  const blogs = await fetchBlogs();
  loading = false;

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
            <Link href="/topic/Nature" className='border-2 p-3 hover:bg-gray-100 rounded-md font-semibold text-md'>Nature</Link>
            <Link href="/topic/Tech" className='border-2 p-3 hover:bg-gray-100 rounded-md font-semibold text-md'>Tech</Link>
            <Link href="/topic/Food" className='border-2 p-3 hover:bg-gray-100 rounded-md font-semibold text-md'>Food</Link>
            <Link href="/topic/Gym" className='border-2 p-3 hover:bg-gray-100 rounded-md font-semibold text-md'>Gym</Link>
            <Link href="/topic/Health" className='border-2 p-3 hover:bg-gray-100 rounded-md font-semibold text-md'>Health</Link>
          </div>
      </main>
      )}
      
    </section>
  )
}
