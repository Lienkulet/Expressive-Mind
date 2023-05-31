'use server';
import BlogCard from '@/components/blogCard/BlogCard'
import HeroBanner from '@/components/heroBanner/HeroBanner';
import dynamic from 'next/dynamic';
import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import { Useri } from '@/models/Useri';
import AsideComponent from '@/components/asideComponent/AsideComponent';

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
   }).sort({createdAt: -1}).limit(10).populate({
       path: "authorId", 
       select: 'username',
        model: Useri
      });
      // console.log(blox.length);

      return JSON.parse(JSON.stringify(blox));
  }

  const blogs = await fetchBlogs()
 
  return (
    <section className='flex flex-col w-full my-7 p-4'>
      
      <header>
        <HeroBanner blogs={blogs} />
      </header>
      
      
      <main className='h-full w-[70%] my-0 mx-auto mt-10 flex flex-col'>
          <h1 className='font-semibold text-[2rem] mb-2'>Recent Posts</h1>
        <div className='flex md:flex-row flex-col justify-between gap-5'>
          <div className='flex flex-col gap-12'>
           {blogs?.length > 0 ? blogs?.map((blog) => (
             <BlogCard key={blog._id} blog={blog} />
             )) : <h1>There are no blogs available at the moment</h1>}
          </div>
          <AsideComponent />
        </div>
      </main>
      
      
    </section>
  )
}