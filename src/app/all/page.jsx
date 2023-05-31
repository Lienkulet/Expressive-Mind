
import AsideComponent from '@/components/asideComponent/AsideComponent';
import BlogCard from '@/components/blogCard/BlogCard';
import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import { Useri } from '@/models/Useri';
import { CircleLoader } from 'react-spinners';

const AllBlogs = async() => {
    // const [blogs, setBlogs] = useState([]);
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //         setLoading(true);
    //         axios.get('/api/blog').then(res => setBlogs(res.data));
          
    //         setLoading(false);
    // }, []);
    
  async function fetchBlogs(){
    'use server'
    await mongooseConnect();
      const blox = await Blog.find({}, { 
      title: 1,
      summary: 1,
      imgUrl: 1,
      likes: 1,
      authorId: 1,
      createdAt: 1
   }).sort({createdAt: -1}).limit(20).populate({
       path: "authorId", 
       select: 'username',
        model: Useri
      });
      // console.log(blox.length);

      return JSON.parse(JSON.stringify(blox));
  }

  const blogs = await fetchBlogs()


  return (
    // <section className='mt-16 px-28 py-16'>
    <section className='flex flex-col w-full my-7 mt-16 p-4'>
      <main className='h-full w-[70%] my-0 mx-auto flex flex-col'>
          <h1 className='font-semibold text-[2rem] mb-2'>All Blogs</h1>
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

export default AllBlogs