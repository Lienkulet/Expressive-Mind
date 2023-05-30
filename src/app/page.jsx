'use server';
import BlogCard from '@/components/blogCard/BlogCard'
import HeroBanner from '@/components/heroBanner/HeroBanner';
import dynamic from 'next/dynamic';
import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import { Useri } from '@/models/Useri';
const LazyLink = dynamic(() => import('next/link'), { ssr: true });

export default async function Home(){
  // const blogs = await fetchBlogs();

  async function fetchBlogs(){
    await mongooseConnect();
      const blox = await Blog.find({}, { 
      title: 1,
      summary: 1,
      imgUrl: 1,
      likes: 1,
      authorId: 1,
      createdAt: 1
   }).limit(5).populate({
       path: "authorId", 
       select: 'username',
        model: Useri
      });
      console.log(blox.length);

      return JSON.parse(JSON.stringify(blox));
  }

  const blogs = await fetchBlogs()
 
  return (
    <section className=' flex flex-col w-full my-7 p-4'>
      
      <HeroBanner blogs={blogs} />
      
      
        <main className='h-full w-[70%] my-0 mx-auto mt-10 flex flex-wrap-reverse justify-between'>
          <div className='flex flex-col gap-2'>

          <h1 className='font-extrabold text-[2rem] text-[$777]'>Recent Posts</h1>

           {blogs?.length > 0 ? blogs?.map((blog) => (
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
      
      
    </section>
  )
}